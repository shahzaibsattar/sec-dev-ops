module.exports = function (app,db) {
    //Route to manage user logins

    const bcrypt = require('bcrypt');
    app.post('/api/auth', async function (req, res) {
        if (!req.body) {
            return res.sendStatus(400)
        }

        users = await db.collection("users").find({email:req.body.email}).toArray();
       
        try{
          var customer = {};
          customer.id=0;
          customer.email = '';
          customer.username = '';
          
            for (let i = 0; i < users.length; i++) {
                const isPasswordValid = await bcrypt.compare(req.body.upwd, users[i].pwd);
                if (req.body.email == users[i].email && isPasswordValid) {
                    
                    customer.id = users[i].id;
                    customer.email = users[i].email;
                    customer.username = users[i].username;
                    customer.avatar = users[i].avatar;
                    customer.pwd = "";
    
                }
            }
            res.send(customer);
            
            }catch(err){
              console.log("Error parsing the userdata at login");
            }
              
        })
}
