# rmq-nest-postgres-docker

Первый созданный пользователь будет администратором.
Последующие пользователи создаются с правами пользователя.

Эндпойнты:
/auth
  /registration
  {
    "email":"mail@mail.ru",
    "password":"password"
  }

  
  /login
  {
    "email":"mail@mail.ru",
    "password":"password"
  }
  
/users - GET all users
  /delete
  {"id":1}
  
  /edit-user
  
  /create-role
  {"value":"Supervisor",
"description":"Supervisor"}

  /provide-role
  {"value":"Admin",
  "id":2}  
  
/profile - GET all profiles
  /create
 {
    "userName":"Peter",
    "userSurname":"Ki",
    "nickName":"Pet"
}
  /get-by-nick
  {"nick":"Pett2"}
  /edit PUT
  {
    "userName":"Peter2",
    "userSurname":"KiKi",
    "nickName":"Pett2"
}

