
const { MongoClient, ServerApiVersion } = require('mongodb');

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://td-task:C6IdsYqg0tQTXhNE@cluster0.rl5ffdh.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
    const taskCollection = client.db('taskDB').collection('task');

    app.post('/task', async(req, res)=>{
        const task = req.body;
        console.log(task);
        const result = await taskCollection.insertOne(task)
        res.send(result)
        
    })
    app.get('/task', async(req, res)=>{
        const cursor = taskCollection.find();
        const result = await cursor.toArray();
        res.send(result);
      })
    
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

    
  }
}
run().catch(console.dir);

app.get('/', (req,res)=>{
    res.send('Working');
})

app.listen(port,()=>{
    console.log(`Server is running at : ${port}`);
})
