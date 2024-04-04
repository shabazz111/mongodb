const express = require("express");
const bycrypt = require("bcrypt");
const cors = require("cors");


const app = express();
app.use(express.json());

const authRoute = require("./routes/auth.route");

app.use("/api/test", (req, res) => {
  res.send("hello");
});
app.use("/api", authRoute);

app.listen(8000, () => {
  console.log("app server is running");
});



// export default app
module.exports = app