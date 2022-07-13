const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

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
      console.log(data);
    });
    // add product to database end
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
