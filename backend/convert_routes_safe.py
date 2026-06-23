import os

def process_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    content = content.replace('app.database.mysql', 'app.database.postgres')
    content = content.replace('datetime.utcnow()', 'datetime.now(timezone.utc)')
    content = content.replace('datetime.utcnow', 'lambda: datetime.now(timezone.utc)')
    
    if 'datetime.now(timezone.utc)' in content and 'from datetime import' in content and 'timezone' not in content:
        content = content.replace('from datetime import datetime', 'from datetime import datetime, timezone')
    elif 'datetime.now(timezone.utc)' in content and 'import datetime' not in content and 'from datetime import' not in content:
        content = 'from datetime import datetime, timezone\n' + content
        
    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)

for folder in [r'app\routes', r'app\services']:
    for root, _, files in os.walk(folder):
        for file in files:
            if file.endswith('.py'):
                process_file(os.path.join(root, file))

print("Services and routes converted safely!")
