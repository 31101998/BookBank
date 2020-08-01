const mysql = require("mysql");

let con = {};
class Database {
  constructor() {
    con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database : "bookbank",
    });
  }
  _queryExecutor(sqlQuery){

    return new Promise(function (resolve, reject) {
      console.log("Executing: "+sqlQuery);
      con.query(sqlQuery, (err, result) => {
        if (err) {
          reject(new Error("Error rows is undefined"));
        } else {
          resolve(result);
        }
      });
    });
  }
  getAllBooks() {
    let sqlQuery = "SELECT idbook, bookname, bookauthor FROM bookbank.book; ";
    return this._queryExecutor(sqlQuery);
  }
  getbook(bookid) {
    let sqlQuery = `SELECT idbook, bookname, bookauthor FROM book WHERE idBook = ${bookid}`;
    return this._queryExecutor(sqlQuery);
    
  }
  insertBook(bookname, bookAuthor) {
     
    let sqlQuery = `insert into book (bookname, bookauthor) values('${bookname}', '${bookAuthor}');`;
    return this._queryExecutor(sqlQuery);
  }
  checkIfDataExist(bookName, bookAuthor){
    let sqlQuery = `SELECT EXISTS(SELECT 1 FROM bookbank.book WHERE bookauthor LIKE '${bookAuthor}' and bookname like '${bookName}' LIMIT 1) as DATAEXIST;`
    return this._queryExecutor(sqlQuery);
  }
  DeleteBook(bookid) {

    let sqlQuery = `DELETE FROM book WHERE idBook = ${bookid}`;
    return this._queryExecutor(sqlQuery);
  }

  UpdateBook(bookid,bookAuthor,bookname)
  {
    let sqlQuery = `update book as B set B.bookauthor = '${bookAuthor}' , B.bookname = '${bookname}' Where B.idBook = ${bookid}`;
    return this._queryExecutor(sqlQuery);
  }

}
module.exports = Database;
