content = open(r'c:\Users\Suraj\Code\Sarvuday_Web\backend\app\models\postgres_models.py', encoding='utf-8').read()
content = content.replace("admin: Mapped[Optional['Admin']] = relationship('Admin', back_populates='counsellor')", "admin: Mapped[Optional['Admin']] = relationship('Admin', back_populates='counsellors')")
open(r'c:\Users\Suraj\Code\Sarvuday_Web\backend\app\models\postgres_models.py', 'w', encoding='utf-8').write(content)
print("Fixed!")
