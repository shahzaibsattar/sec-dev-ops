module.exports = function (app,db) {
    //Route to manage user registrations
    
    const { v4: uuidv4 } = require('uuid');
    const bcrypt = require('bcrypt');
    app.post('/api/register', async function (req, res) {
        if (!req.body) {
            return res.sendStatus(400)
        }
        console.log(req.body);
        const {username, email, upwd,} = req.body;
        if (!username || !email || !upwd ) {
            return res.status(400).send("Required Fields Missing");
        }
        const san_email = req.sanitize(email);
        const san_username = req.sanitize(username);
     
        let dupuser = [];
        try {
            dupuser = await db.collection("users").find({email:san_email}).toArray();
            //dupuser = await db.collection("users").findOne({email:san_email}).count();
            console.log('dupuser',dupuser.length);
            if (dupuser.length < 0) {
                return res.status(409).send("A user with this username already exists.")
            }
           
            
             id = uuidv4();
             console.log('id',id);

         const saltRounds = 10;
         const hashedPassword = await bcrypt.hash(upwd, saltRounds);
            console.log(hashedPassword);
         const newUser = {
             id: id,
             username: username,
             email: email,
             pwd: hashedPassword,
             avatar: ""
            
         };
         const result = await db.collection("users").insertOne(newUser);
         if (result.acknowledged) {
             console.log("Data inserted successfully");
             var response = {
                 message: "User registration successful!",
                 success: true
             };
             res.send(response);
         } else {
             throw new Error("Error inserting user into database");
         }

        } catch (err){
            return res.sendStatus(500);  // Internal Server Error

        }
       
      
})
}
