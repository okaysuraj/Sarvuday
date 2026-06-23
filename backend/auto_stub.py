import sys
import os
import traceback
import subprocess

def run_auto_stub():
    for _ in range(50):
        try:
            # We must run it in a subprocess because import cache is persistent in the same process
            result = subprocess.run([sys.executable, "-c", "import app.main"], capture_output=True, text=True)
            if result.returncode == 0:
                print("Successfully imported app.main!")
                return
            
            stderr = result.stderr
            if "ModuleNotFoundError: No module named" in stderr:
                lines = stderr.split('\n')
                for line in lines:
                    if "ModuleNotFoundError: No module named" in line:
                        module_name = line.split("'")[1]
                        path = module_name.replace('.', '/')
                        # Check if it should be a directory or file
                        # Just create a file by default
                        os.makedirs(os.path.dirname(path), exist_ok=True)
                        if not os.path.exists(path + '.py'):
                            with open(path + '.py', 'w') as f:
                                if 'router' in path or 'routes' in path:
                                    router_name = path.split('/')[-1] + '_router'
                                    if router_name == '__init___router': router_name = 'router'
                                    f.write(f"from fastapi import APIRouter\n{router_name} = APIRouter()\n")
                                else:
                                    f.write("")
                            print(f"Created stub for module {module_name} at {path}.py")
                        elif not os.path.exists(os.path.join(path, '__init__.py')):
                            os.makedirs(path, exist_ok=True)
                            with open(os.path.join(path, '__init__.py'), 'w') as f:
                                pass
                            print(f"Created stub for package {module_name} at {path}/__init__.py")
                        break
            elif "ImportError: cannot import name" in stderr:
                lines = stderr.split('\n')
                for line in lines:
                    if "ImportError: cannot import name" in line:
                        parts = line.split("'")
                        if len(parts) >= 4:
                            import_name = parts[1]
                            module_name = parts[3]
                            path = module_name.replace('.', '/')
                            
                            target = path + '.py'
                            if not os.path.exists(target):
                                target = os.path.join(path, '__init__.py')
                            
                            if os.path.exists(target):
                                with open(target, 'a') as f:
                                    if 'router' in import_name.lower():
                                        f.write(f"\nfrom fastapi import APIRouter\n{import_name} = APIRouter()\n")
                                    elif 'schema' in import_name.lower() or 'response' in import_name.lower() or 'request' in import_name.lower():
                                        f.write(f"\nfrom pydantic import BaseModel\nclass {import_name}(BaseModel): pass\n")
                                    elif 'service' in import_name.lower():
                                        f.write(f"\nclass {import_name}:\n    pass\n")
                                    else:
                                        f.write(f"\nclass {import_name}:\n    pass\n")
                                print(f"Added {import_name} to {target}")
                            else:
                                os.makedirs(os.path.dirname(target), exist_ok=True)
                                with open(target, 'w') as f:
                                    if 'router' in import_name.lower():
                                        f.write(f"\nfrom fastapi import APIRouter\n{import_name} = APIRouter()\n")
                                    elif 'schema' in import_name.lower() or 'response' in import_name.lower() or 'request' in import_name.lower():
                                        f.write(f"\nfrom pydantic import BaseModel\nclass {import_name}(BaseModel): pass\n")
                                    else:
                                        f.write(f"\nclass {import_name}:\n    pass\n")
                                print(f"Created target {target} with {import_name}")
                        break
            else:
                print("Unknown error:")
                print(stderr)
                return
        except Exception as e:
            print(f"Exception: {e}")
            return
            
run_auto_stub()
