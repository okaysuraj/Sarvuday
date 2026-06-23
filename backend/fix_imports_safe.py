import os
import re

for root, _, files in os.walk('app'):
    for file in files:
        if file.endswith('.py'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = re.sub(r'from app\.models\.[a-zA-Z0-9_\.]+ import', 'from app.models import', content)
            
            # Also replace any direct imports of app.database.mysql to app.database.postgres
            new_content = new_content.replace('app.database.mysql', 'app.database.postgres')
            
            if new_content != content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated imports in {path}")
