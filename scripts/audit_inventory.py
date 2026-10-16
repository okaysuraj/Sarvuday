"""Regenerate source coverage without importing the app or reading credentials/data.

This is a static inventory, not a claim of passing end-to-end tests.
Run from the repository root: python scripts/audit_inventory.py
"""
import ast
import csv
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs" / "audits"
OUT.mkdir(parents=True, exist_ok=True)


def read(path):
    return path.read_text(encoding="utf-8-sig")


routers = {}
for path in sorted((ROOT / "backend/app/routes").rglob("*.py")):
    module = ".".join(path.relative_to(ROOT / "backend").with_suffix("").parts)
    is_package = module.endswith(".__init__")
    module = module.removesuffix(".__init__")
    package = module if is_package else module.rsplit(".", 1)[0]
    tree = ast.parse(read(path))
    imports = {}
    for node in tree.body:
        if isinstance(node, ast.ImportFrom):
            base = package.split(".")[:len(package.split(".")) - node.level + 1] if node.level else []
            base += (node.module or "").split(".") if node.module else []
            for alias in node.names:
                imports[alias.asname or alias.name] = ".".join(base + [alias.name])

    def resolve(node):
        if isinstance(node, ast.Name):
            return imports.get(node.id, f"{module}.{node.id}")
        if isinstance(node, ast.Attribute):
            return f"{resolve(node.value)}.{node.attr}"
        return ""

    for node in tree.body:
        if isinstance(node, ast.Assign) and isinstance(node.value, ast.Call) and getattr(node.value.func, "id", "") == "APIRouter":
            prefix = next((kw.value.value for kw in node.value.keywords if kw.arg == "prefix" and isinstance(kw.value, ast.Constant)), "")
            for target in node.targets:
                if isinstance(target, ast.Name):
                    routers[f"{module}.{target.id}"] = {"prefix": prefix, "includes": [], "endpoints": []}
    for node in tree.body:
        if isinstance(node, ast.Expr) and isinstance(node.value, ast.Call):
            call = node.value
            if isinstance(call.func, ast.Attribute) and call.func.attr == "include_router" and call.args:
                parent = routers.get(resolve(call.func.value))
                if parent is not None:
                    prefix = next((kw.value.value for kw in call.keywords if kw.arg == "prefix" and isinstance(kw.value, ast.Constant)), "")
                    parent["includes"].append((resolve(call.args[0]), prefix))
        if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
            for decorator in node.decorator_list:
                if not isinstance(decorator, ast.Call) or not isinstance(decorator.func, ast.Attribute):
                    continue
                method = decorator.func.attr
                router = routers.get(resolve(decorator.func.value))
                if router is None or method not in {"get", "post", "patch", "put", "delete", "websocket"}:
                    continue
                route = decorator.args[0].value if decorator.args and isinstance(decorator.args[0], ast.Constant) else ""
                dependencies = sorted(set(re.findall(r"Depends\((\w+)", ast.get_source_segment(read(path), node) or "")))
                router["endpoints"].append({"method": method.upper(), "path": route, "file": path.relative_to(ROOT).as_posix(), "line": node.lineno, "dependencies": dependencies})


def expand(name, prefix="", chain=()):
    if name in chain or name not in routers:
        return []
    router = routers[name]
    prefix += router["prefix"]
    endpoints = [{**entry, "path": prefix + entry["path"]} for entry in router["endpoints"]]
    for child, child_prefix in router["includes"]:
        endpoints.extend(expand(child, prefix + child_prefix, (*chain, name)))
    return endpoints


endpoints = sorted(expand("app.routes.api_router"), key=lambda item: (item["path"], item["method"]))
files = []
network = re.compile(r"(?:axiosInstance|axios|apiClient|api)\.(get|post|patch|put|delete)\(\s*['\"`]([^'\"`]+)")
signals = re.compile(r"\b(?:mock|dummy|sample_items|fallbackSlots|simulated)\b|Math\.random\(", re.I)
for platform, directory, suffixes in [("web", "frontend/src", {".js", ".jsx"}), ("mobile", "mobile/src", {".ts", ".tsx"}), ("backend", "backend/app", {".py"})]:
    for path in sorted((ROOT / directory).rglob("*")):
        if not path.is_file() or path.suffix not in suffixes or "__pycache__" in path.parts:
            continue
        source = read(path)
        references = [f"{method.upper()} {url}" for method, url in network.findall(source)]
        locations = [{"line": index, "text": line.strip()[:180]} for index, line in enumerate(source.splitlines(), 1) if signals.search(line)]
        aliases = re.findall(r"export\s*\{[^}]*\}\s*from\s*['\"]([^'\"]+)", source)
        files.append({"platform": platform, "file": path.relative_to(ROOT).as_posix(), "lines": len(source.splitlines()),
                      "direct_api_references": references, "shared_implementations": aliases,
                      "review_signals": locations, "verification": "source inventory; runtime user journeys require authenticated acceptance tests"})

app = read(ROOT / "frontend/src/App.jsx")
web_routes = re.findall(r'<Route\s+(?:\s|[^>])*?path="([^"]+)"', app)
mobile_routes = []
for path in sorted((ROOT / "mobile/src/app").rglob("*.tsx")):
    if path.name.startswith("_"):
        continue
    route = "/" + "/".join(part for part in path.relative_to(ROOT / "mobile/src/app").with_suffix("").parts if not part.startswith("("))
    route = route.removesuffix("/index") or "/"
    mobile_routes.append({"path": route, "file": path.relative_to(ROOT).as_posix()})

report = {"scope": "First-party source only; excludes installed dependencies, vendored llama-cpp, build output, secrets, and database contents.",
          "backend_endpoints": endpoints, "web_route_literals": web_routes, "mobile_routes": mobile_routes, "files": files}
(OUT / "source-inventory.json").write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
with (OUT / "source-inventory.csv").open("w", newline="", encoding="utf-8") as output:
    writer = csv.writer(output)
    writer.writerow(["platform", "file", "lines", "direct_api_references", "shared_implementations", "review_signal_lines", "verification"])
    for item in files:
        writer.writerow([item["platform"], item["file"], item["lines"], "; ".join(item["direct_api_references"]), "; ".join(item["shared_implementations"]), "; ".join(str(signal["line"]) for signal in item["review_signals"]), item["verification"]])
summary = {"source_files": len(files), "backend_endpoints_including_aliases": len(endpoints), "web_route_literals": len(web_routes), "mobile_route_files": len(mobile_routes), "files_with_review_signals": sum(bool(item["review_signals"]) for item in files)}
print(json.dumps(summary))
