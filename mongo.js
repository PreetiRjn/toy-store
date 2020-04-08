const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://preeti:mydatabase@cluster0-pojb7.mongodb.net/toystore?retryWrites=true&w=majority';

const newToy = async (req, res, next) => {
    const newtoy = {
        category : req.body.category,
        name : req.body.name,
        price : req.body.price,
        storeid : req.body.storeid
    }
    const client = new MongoClient(url, { useUnifiedTopology: true });
    try {
        await client.connect();
        const db = client.db();
        const result = await db.collection('toys').insertOne(newtoy);
    }
    catch (error){
       return res.json({ message : 'Could not store toy!'})
    };
    client.close();
    res.json(newtoy)
}


const getToys = async(req, res, next) => {
    const client = new MongoClient( url, { useUnifiedTopology: true });
    let toys;
    try{
        await client.connect();
        const db = client.db();
         toys = await db.collection('toys').find().toArray()

    }catch (error){
        return res.json({message : 'No toys here!!'})
    }
    client.close();
    res.json(toys);
}
exports.newToy = newToy;
exports.getToys = getToys;