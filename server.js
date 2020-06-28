const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = requre("path");

const items = require("./routes/api/items");

const app = express();

//Bodyparser middleware
app.use(bodyParser.json());

//DB config
const db = require("./config/keys.js").mongoURI;

//Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

//Use routes
app.use("/api/items", items);

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
