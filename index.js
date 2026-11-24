// import react from "react"
// // ES6

// // require
const fs = require("node:fs");
const path = require("node:path");

//   ".\depi.txt"
// two variables built in dir  filename

console.log("dir path", __dirname);

fs.writeFileSync(
  path.join(__dirname, "depi.txt"),
  "hello from hamada",
  (err) => {
    console.log(err);
  },
);

fs.readFileSync("./depi.txt", (err, data) => {
  console.log(data.toString());
});

// fs.unlinkSync("./depi.txt", (err) => {
//   console.log(err);
// });

// console.log("hamada");

const http = require("node:http");

let server = http.createServer((req, res) => {
  if (req.url === "/products") {
    if (req.method === "GET") {
    }
  }
  if (req.url === "/products") {
    res.end("products");
  }

  res.end("hello depi");
});

server.listen(3000, () => {
  console.log("server is running");
});

// path
