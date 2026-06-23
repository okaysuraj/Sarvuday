import os
import re

for root, _, files in os.walk(r'c:\Users\Suraj\Code\Sarvuday_Web\backend\app\models'):
    for file in files:
        if file.endswith('.py'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Switch mysql to postgres
            content = content.replace('app.database.mysql', 'app.database.postgres')
            content = content.replace("'mysql_engine'", "'postgresql_engine'")
            content = content.replace("'mysql_charset'", "'postgresql_charset'")
            
            # Remove postgresql_engine and postgresql_charset entirely from __table_args__
            content = re.sub(r'\'postgresql_(engine|charset)\':\s*\'[^\']+\'(,\s*)?', '', content)
            
            # Replace timestamp defaults with timezone.utc
            content = content.replace('datetime.utcnow()', 'datetime.now(timezone.utc)')
            content = content.replace('datetime.utcnow', 'lambda: datetime.now(timezone.utc)')
            
            # Make sure timezone is imported if we are using it
            if 'datetime.now(timezone.utc)' in content and 'from datetime import' in content and 'timezone' not in content:
                content = content.replace('from datetime import datetime', 'from datetime import datetime, timezone')
            if 'datetime.now(timezone.utc)' in content and 'import datetime' not in content and 'from datetime import' not in content:
                content = 'from datetime import datetime, timezone\n' + content
                
            # Replace TIMESTAMP with TIMESTAMP(timezone=True)
            content = re.sub(r'Column\(\s*TIMESTAMP\s*,', r'Column(TIMESTAMP(timezone=True),', content)
            
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)
                
print("Models converted to PostgreSQL format!")
