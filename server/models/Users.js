let Users=[{
    "id":"1",
    "username":"safwan",
     "password":"abc123"
},{
    "id":"2",
    "username":"abc",
     "password":"123"
}
  
];
module.exports = class User { 
    
    static checkUser(user)
     {
    const index = Users.findIndex(u=> u.username === user.username && u.password === user.password)
    if(index > -1)
    {
     return Users[index];
    }
    else
    {
     return new Error("Not found");
    }

}
}