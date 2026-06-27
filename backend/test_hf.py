import requests

url = "https://okaysuraj-sarvuday.hf.space/v1/models"
response = requests.get(url)
print("Status:", response.status_code)
print("Body:", response.text)

