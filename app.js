const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");

const Database = require("./database");
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const database = new Database();
// database.insert();
app.get("/", function () {});
app.get("/getallbookNames", (req, res) => {
  database
    .getAllBooks()
    .then((result) => {
      result.isSuccess = true;
      res.status(200);
      res.json(result);
    })
    .catch((err) => {
      result.isSuccess = false;
      res.status(400);
      res.json(err);
    });
});
app.post("/getbook", (req, res) => {
  database
    .getbook(req.body.id)
    .then((result) => {
      result.isSuccess = true;
      res.status(200);
      res.json(result);
    })
    .catch((err) => {
      result.isSuccess = false;
      res.status(400);
      res.json(err);
    });
});

app.post("/insertBook", (req, res) => {
  database
    .checkIfDataExist(req.body.bookName, req.body.bookAuthor)
    .then((result) => {
  
      if (!result[0].DATAEXIST) {
        database
          .insertBook(req.body.bookName, req.body.bookAuthor)
          .then((result) => {
            result.isSuccess = true;
            res.status(200);
            res.json(result);
          })
          .catch((err) => {
            result.isSuccess = false;
            res.status(200);
            res.send(result);
          });
      } else {

        result.isSuccess = false;
        res.status(200);
        res.send(result);
      }
    })
    .catch((err) => {
      result.isSuccess = false;
      res.status(400);
    });
});

app.post("/DeleteBook", (req, res) => {
  database
    .DeleteBook(req.body.id)
    .then((result) => {
      res.status(200);
      result.isSuccess = true;
      res.json(result);
    })
    .catch((err) => {
      result.isSuccess = false;
      res.status(400);
      res.json(err);
    });
});

app.post("/UpdateBook", (req, res) => {
  database
    .UpdateBook(req.body.id, req.body.bookAuthor, req.body.bookName)
    .then((result) => {
      res.status(200);
      result.isSuccess = true;
      res.json(result);
    })
    .catch((err) => {
      err.isSuccess = false;
      res.status(400);
      res.json(err);
    });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
