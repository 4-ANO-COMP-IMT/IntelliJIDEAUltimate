#authenticate 3 users on the port 3000, endpoint /api/login and print on console the result
curl -X POST -H "Content-Type: application/json" -d '{"username":"user1","password":"password1"}' http://localhost:3000/api/login
# curl -X POST -H "Content-Type: application/json" -d '{"username":"user2","password":"password2"}' http://localhost:3000/api/login
# curl -X POST -H "Content-Type: application/json" -d '{"username":"user3","password":"password3"}' http://localhost:3000/api/login
