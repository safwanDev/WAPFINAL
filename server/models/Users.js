let Users=[{
    "username":"safwan",
     "password":"abc123"
}];
module.exports = class User { 
    
    static checkUser(user)
     {
    const index = Users.findIndex(u=> u.username === user.username && u.password === user.password)
    if(index > -1)
    {
     return Users[index].username;
    }
    else
    {
     return new Error("Not found");
    }

}
}