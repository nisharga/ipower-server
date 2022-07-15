const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("xc not love u");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qemdz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const dbCollection = client.db("ipower").collection("product");
    console.log("Setup done");

    // add product to database
    app.post("/addinventory", async (req, res) => {
      const data = req.body;
      const result = await dbCollection.insertOne(data);
      res.send("data paisi res e");
      console.log(result, "gese data all");
    });
    // add product to database end

    // show product to ui
    app.get("/inventory", async (req, res) => {
      const query = {};
      const cursor = dbCollection.find(query);
      const data = await cursor.toArray();
      res.send(data);
    });
    //  show product to ui

    // show product to single product
    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const cursor = dbCollection.find(query);
      const data = await cursor.toArray();
      res.send(data);
    });
    //  show product to single product

    // show product to myitems
    app.get("/myitems/:id", async (req, res) => {
      const id = req.params.id;
      const query = { email: id };
      const cursor = dbCollection.find(query);
      const data = await cursor.toArray();
      res.send(data);
    });
    //  show product to myitems

    app.put("/product/:id/quantity", async (req, res) => {
      const data = req.body;
      const id = req.params.id;
      // const filter = { _id: ObjectId(id) };
      // const options = { upsert: true };
      // const result = await dbCollection.updateOne(
      //   filter,
      //   { $set: { quantity: data.quantity + 1 } },
      //   options
      // );
      // res.send(data);
      res.send(id);
    });

    app.delete("/inventory/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await dbCollection.deleteOne(query);
      if (result.deletedCount === 1) {
        console.log("Successfully deleted one document.");
      } else {
        console.log("No documents matched the query. Deleted 0 documents.");
      }
      res.send("DELETED");
    });
  } finally {
  }
}
run().catch(console.dir);

// client.connect((err) => {
//   const collection = client.db("ipower").collection("product");
//   console.log("Done");
// });

app.listen(port, () => {
  console.log("port listen");
});
