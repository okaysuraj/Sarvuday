import os

skills_dir = r"c:\Users\Suraj\Code\Sarvuday_Web\skills\sarvuday-mobile-ui"
app_dir = r"c:\Users\Suraj\Code\Sarvuday_Web\mobile\src\app"

# Get all skill directories
skills = [d for d in os.listdir(skills_dir) if os.path.isdir(os.path.join(skills_dir, d))]

# Get all implemented files
implemented = []
for root, _, files in os.walk(app_dir):
    for file in files:
        if file.endswith('.tsx'):
            implemented.append(file)

missing = []
for skill in skills:
    base_name = skill.replace('_screen', '')
    found = False
    for impl in implemented:
        impl_base = impl.replace('.tsx', '').replace('-', '_')
        # Some special cases I know:
        # e.g., 'therapy_plan_overview' -> 'plan_overview'
        # 'therapist_search' -> 'search'
        if impl_base == base_name or impl_base in base_name or base_name in impl_base:
            found = True
            break
    if not found:
        missing.append(skill)

print("Missing skills:")
for m in sorted(missing):
    print(m)
