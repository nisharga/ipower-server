const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("xc not love u");
});

// Basic setup Done

// MongoDB Setup
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qemdz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
// MongoDB Setup

async function run() {
  try {
    await client.connect();
    const dbCollection = client.db("ipower").collection("product");
    console.log("Setup done");

    // insertOne product to database
    app.post("/addinventory", async (req, res) => {
      const data = req.body;
      const result = await dbCollection.insertOne(data);
      res.send("data paisi res e");
      console.log(result, "gese data all");
    });
    // insertOne product to database end

    // show all product to ui(inventory page)
    app.get("/inventory", async (req, res) => {
      const query = {};
      const cursor = dbCollection.find(query);
      const data = await cursor.toArray();
      res.send(data);
    });
    //  show all product to ui inventory page end

    // show product to single product
    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const cursor = dbCollection.find(query);
      const data = await cursor.toArray();
      res.send(data);
    });
    //  show product to single product

    // find user detils by email-address
    app.get("/myitems/:id", async (req, res) => {
      const id = req.params.id;
      const query = { email: id };
      const cursor = dbCollection.find(query);
      const data = await cursor.toArray();
      res.send(data);
    });
    //  find user detils by email-address end

    // delet a product by _id
    app.delete("/myitems/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await dbCollection.deleteOne(query);
      if (result.deletedCount === 1) {
        console.log("Sucessfully deleted ");
      }
      res.send(result);
    });
    // delet a product by _id

    // update a field by id
    app.put("/product/:id", async (req, res) => {
      const quantity = req.body.quantity;
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const result = await dbCollection.updateOne(
        filter,
        { $set: { quantity: quantity } },
        options
      );
      res.send(result);
    });
    // update a field by id

    // update a field by id
    app.put("/product/minusquantity/:id", async (req, res) => {
      const quantity = req.body.quantity;
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const result = await dbCollection.updateOne(
        filter,
        { $set: { quantity: quantity } },
        options
      );
      res.send(result);
    });
    // update a field by id

    // delet a field by id
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
    // delet a field by id
  } finally {
    //        await client.close()
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
