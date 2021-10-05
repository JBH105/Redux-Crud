const express = require("express");
require("./db/conn");
const cors = require("cors");
const bodyparser = require("body-parser");
const router = require("./routes/Router");
const app = express();
app.use(cors());

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.json());
app.use("/", router);

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}....`);
});
