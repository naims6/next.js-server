const { ServerApiVersion, MongoClient, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// mongo db uri
const uri =
  "mongodb+srv://Admin:BeXkpp1t97IWSlp3@cluster0.wsfcvqt.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db("Next_js");
    const productCollection = database.collection("Product");

    app.get("/all-product", async (req, res) => {
      const result = await productCollection.find().toArray();
      res.send(result);
    });

    app.get("/all-product/:id", async (req, res) => {
      const { id } = req.params;
      const query = { _id: new ObjectId(id) };
      const result = await productCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/all-product", async (req, res) => {
      const data = req.body;
      console.log(data);
      const result = await productCollection.insertOne(data);
      res.send(result);
    });

    app.delete("/all-product/:id", async (req, res) => {
      const { id } = req.params;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await productCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log("Server is running on port", port);
});
