const express = require("express");
const app = express();

app.get("/", (req, res) => {
  if (req.query.q.includes('"')) {
    res.status(500).send("Internal Server Error");
  } else {
    res.send("Hello World!");
  }
});

app.listen(3000, () => {
  console.log("Vulnerable server listening on port 3000!");
});
