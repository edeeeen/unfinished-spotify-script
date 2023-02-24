import requests, base64

######################################## REPLACE CLIENT ID AND CLIENT SECRET ########################################
clientId = "REPLACEME"
clientSecret = "REPLACEME"
print(str((clientId + ":" + clientSecret).encode("ascii"))[1:])
url = 'https://accounts.spotify.com/api/token'

message = f"{clientId}:{clientSecret}"
messageBytes = message.encode('ascii')
base64Bytes = base64.b64encode(messageBytes)
base64Message = base64Bytes.decode('ascii')

print(str(base64Bytes)[2:-1])
headers = {
    'Authorization':'Basic ' + str(base64Bytes)[2:-1],
    "Content-Type":"application/x-www-form-urlencoded"
}
data = {
    'grant_type':'client_credentials'
}

r = requests.post(url, headers=headers, data=data)
print(r.text)