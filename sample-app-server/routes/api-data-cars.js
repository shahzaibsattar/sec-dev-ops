module.exports = async function (app,db) {
    //Route to manage user logins


    app.get('/api/cars', async function (req, res) {
       
      let cars = await db.collection("cars").find({}).toArray();
        res.send(JSON.stringify(cars));
        return true;
    })
    
    
}
