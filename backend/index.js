const express = require("express");
const connectToMongo = require("./db");
var cors = require("cors");
var app = express();
app.use(cors());

const PORT = 5000;
app.use(express.json());

connectToMongo();

app.use("/user/", require("./routes/userRoute"));
app.use("/note/", require("./routes/notesRoute"));

app.listen(PORT || process.env.PORT, () => {
  console.log(`listening on port ${PORT}`);
});
