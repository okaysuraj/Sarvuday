import os
import glob

for root, _, files in os.walk(r"c:\Users\Suraj\Code\Sarvuday_Web\backend\app\models"):
    for file in files:
        if file.endswith(".py"):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8") as f:
                content = f.read()
            
            orig = content
            content = content.replace("DateTime(timezone=True), DateTime", "DateTime")
            content = content.replace("DateTime, DateTime(timezone=True)", "DateTime")
            content = content.replace("DateTime(timezone=True)", "DateTime")
            
            # Now we must restore DateTime(timezone=True) for Column() calls!
            # Wait, the string replace replaced all. I should only replace in lines starting with 'from sqlalchemy import'
            
            lines = content.split('\n')
            for i, line in enumerate(lines):
                if line.startswith("from sqlalchemy import"):
                    pass # it's already stripped of DateTime(timezone=True) by the global replace above!

            with open(path, "w", encoding="utf-8") as f:
                f.write(content)
