import os
import glob

models_dir = r"c:\Users\Suraj\Code\Sarvuday_Web\backend\app\models"
for root, dirs, files in os.walk(models_dir):
    for file in files:
        if file.endswith(".py"):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8") as f:
                content = f.read()
            
            if "TIMESTAMP" in content:
                content = content.replace("TIMESTAMP", "DateTime(timezone=True)")
                if "from sqlalchemy import" in content and "DateTime" not in content:
                    content = content.replace("from sqlalchemy import ", "from sqlalchemy import DateTime, ")
                
                with open(path, "w", encoding="utf-8") as f:
                    f.write(content)
                print(f"Updated TIMESTAMP in {file}")
