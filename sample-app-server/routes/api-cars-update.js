module.exports = async function (app,db) {
    //Route to manage user logins


    app.post('/api/updatecar', async function (req, res) {
       
       data = req.body.car;
       if (data._id){
       let updatedvalues = {$set:{make:data.make,model:data.model,year:data.year,color:data.color}}
       let result = await db.collection("cars").updateOne({id:data.id},updatedvalues)
      //let cars = await db.collection("cars").find({}).toArray();
        //res.send(JSON.stringify(cars));
        res.send(result);
       }
        return true;
    })
    
    
}
