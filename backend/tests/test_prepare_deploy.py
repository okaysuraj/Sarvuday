import subprocess
import sys
from unittest.mock import Mock, call

import pytest

from scripts import prepare_deploy


def test_preparation_applies_both_schemas_from_backend_directory(monkeypatch, tmp_path):
    run = Mock()
    monkeypatch.setattr(prepare_deploy.subprocess, "run", run)
    monkeypatch.chdir(tmp_path)

    assert prepare_deploy.main([]) == 0
    assert run.call_args_list == [
        call([sys.executable, "-m", "alembic", "upgrade", "head"],
             cwd=prepare_deploy.BACKEND_DIR, check=True),
        call([sys.executable, "-m", "scripts.provision_mongo", "--apply"],
             cwd=prepare_deploy.BACKEND_DIR, check=True),
    ]


@pytest.mark.parametrize("failed_step", [0, 1])
def test_preparation_stops_and_returns_failure(monkeypatch, capsys, failed_step):
    failure = subprocess.CalledProcessError(7, ["python", "test-only"])
    run = Mock(side_effect=[None] * failed_step + [failure])
    monkeypatch.setattr(prepare_deploy.subprocess, "run", run)

    assert prepare_deploy.main([]) == 7
    assert run.call_count == failed_step + 1
    output = capsys.readouterr()
    assert "deployment preparation stopped" in output.err
    assert "ready for application startup" not in output.out


def test_legacy_preparation_verifies_before_migrating(monkeypatch):
    run = Mock()
    monkeypatch.setattr(prepare_deploy.subprocess, "run", run)

    assert prepare_deploy.main(["--adopt-legacy"]) == 0
    assert [call.args[0][2] for call in run.call_args_list] == [
        "scripts.adopt_legacy_postgres", "alembic", "scripts.provision_mongo",
    ]
    assert run.call_args_list[0].args[0][-1] == "--apply"


def test_legacy_verification_failure_prevents_all_schema_changes(monkeypatch):
    run = Mock(side_effect=subprocess.CalledProcessError(1, ["python", "test-only"]))
    monkeypatch.setattr(prepare_deploy.subprocess, "run", run)

    assert prepare_deploy.main(["--adopt-legacy"]) == 1
    assert run.call_count == 1
