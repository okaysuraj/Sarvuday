import json
import os
import re

transcript_path = r'C:\Users\Suraj\.gemini\antigravity-ide\brain\11f8a374-18de-46b2-82a9-b1b4ee4df91e\.system_generated\logs\transcript.jsonl'
output_dir = r'C:\Users\Suraj\Code\Sarvuday_Web\backend\app_recovery'

os.makedirs(output_dir, exist_ok=True)

lines = open(transcript_path, encoding='utf-8').readlines()
file_contents = {}

for line in lines:
    try:
        data = json.loads(line)
        content = data.get('content', '')
        if isinstance(content, str) and 'File Path: `file:///' in content:
            # Extract file path
            path_match = re.search(r'File Path: `file:///([^`]+)`', content)
            if not path_match:
                continue
            path = path_match.group(1).replace('%3A', ':') # Fix Windows drive letter if needed
            
            # We only care about files in backend/app/
            if '/backend/app/' not in path and '\\backend\\app\\' not in path:
                continue
                
            # Extract content (everything after the header)
            # Format:
            # File Path: `file:///c:/...`
            # Total Lines: 123
            # Total Bytes: 1234
            # Showing lines 1 to 123
            # The following code has been modified...
            # 1: ...
            
            content_lines = content.split('\n')
            code_lines = []
            parsing_code = False
            for c_line in content_lines:
                if 'The following code has been modified' in c_line:
                    parsing_code = True
                    continue
                if parsing_code:
                    if c_line == 'The above content shows the entire, complete file contents of the requested file.' or c_line.startswith('The above content shows lines'):
                        break
                    # Remove line number '1: '
                    match = re.match(r'^\d+: (.*)$', c_line)
                    if match:
                        code_lines.append(match.group(1))
                    else:
                        # Sometimes empty lines or other things
                        match_empty = re.match(r'^\d+:$', c_line)
                        if match_empty:
                            code_lines.append('')
            
            # Save the latest version of the file
            rel_path = path.split('backend/app/')[-1] if 'backend/app/' in path else path.split('backend\\app\\')[-1]
            file_contents[rel_path] = '\n'.join(code_lines)
    except Exception as e:
        print(f"Error parsing line: {e}")

# Also grep for any run_command outputs that might have outputted files using cat/type
# For now, let's just write the view_file contents
for rel_path, code in file_contents.items():
    full_path = os.path.join(output_dir, rel_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(code)

print(f"Recovered {len(file_contents)} unique files to app_recovery!")
