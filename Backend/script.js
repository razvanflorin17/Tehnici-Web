/*
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const fs = require("fs");

const app = express();

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(__dirname + '/static'));

app.post("/books", (req, res) => {
  const booksList = readJSONFile();
  booksList.push(req.body);
  if(booksList.length==1){
    booksList[0].id="1";
  }
  else{
    booksList[booksList.length-1].id=(parseInt(booksList[booksList.length-2].id)+1).toString();
  }
  writeJSONFile(booksList);
  res.json(booksList);
});

app.get("/books/:id", (req, res) => {
  const booksList = readJSONFile();
  let ok = 0;
  for (let book in booksList){
    if(booksList[book].id==req.params.id){
      ok=1;
      res.json(booksList[book]);
    }
  }
  if(ok==0){
    res.send('"Nu exista cartea."');
  }
});

app.get("/books", (req, res) => {
  const booksList = readJSONFile();
  console.log(booksList);
  res.json(booksList);
});

app.put("/books/:id", (req, res) => {
  const booksList = readJSONFile();
  let k=0;
  for(let book in booksList){
    if(booksList[book].id==req.params.id){
      let i=booksList[book].id;
      booksList[book]=req.body;
      booksList[book].id=i;
      k=1;
    }
  }
  if(k==0){
    res.send('"Nu exista cartea."');
  }
  else{
    writeJSONFile(booksList);
    res.send('"S-a modificat."');
  }
});

app.delete("/books/:id", (req, res) => {
  const booksList = readJSONFile();
  let newList=[];
  let k=0;
  for(let book in booksList){
    if(booksList[book].id!=req.params.id){
      newList.push(booksList[book]);
      k+=1;
    }
  }
  if(k==booksList.length){
    res.send('"Nu exista cartea."')
  }
  else{
    writeJSONFile(newList);
    res.send('"S-a sters."');
  }
  res.sendFile(__dirname + "/static/" + "uBook.html");
});

function readJSONFile() {
  return JSON.parse(fs.readFileSync("ubook.json"))["book"];
}

function writeJSONFile(content) {
  fs.writeFileSync(
    "ubook.json",
    JSON.stringify({ books: content }),
    "utf8",
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
}

app.listen("3000", () =>
  console.log("Server started at: http://localhost:3000")
);
*/

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
 
var idx = 8;
 
const fs = require("fs");
 
const app = express();

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());
 
 
app.use("/", express.static('frontend'));
 

app.post("/books", (req, res) => {
  const booksList = readJSONFile();
  const newBook = req.body;
  newBook.id = idx;
  const newBookList = [...booksList, newBook];
  writeJSONFile(newBookList);
  res.json(newBook);
  idx++;
});

app.get("/books/:id", (req, res) => {
  const booksList = readJSONFile();
  const id = req.params.id;
  let idFound = false;
  let foundBook;
 
  booksList.forEach(book => {
    if (id === book.id) {
      idFound = true;
      foundBook = book;
    }
  });
 
  if (idFound) {
    res.json(foundBook);
  } else {
    res.status(404).send(`Book ${id} was not found`);
  }
});
 
app.get("/books", (req, res) => {
  const booksList = readJSONFile();
  res.json(booksList);
});

app.put("/books/:id", (req, res) => {
  const booksList = readJSONFile();
  const id = req.params.id;
  const newBook = req.body;
  newBook.id = id;
  idFound = false;
 
  const newBooksList = booksList.map((book) => {
     if (book.id === id) {
       idFound = true;
       return newBook
     }
    return book
  })
  
  writeJSONFile(newBooksList);
 
  if (idFound) {
    res.json(newBook);
  } else {
    res.status(404).send(`Book ${id} was not found`);
  }
 
});

app.delete("/books/:id", (req, res) => {
  const booksList = readJSONFile();
  const id = req.params.id;
  const newBooksList = booksList.filter((book) => book.id !== id)
 
  if (booksList.length !== newBooksList.length) {
    res.status(200).send(`Book ${id} was removed`);
    writeJSONFile(newBooksList);
  } else {
    res.status(404).send(`Book ${id} was not found`);
  }
  idx--;
});

function readJSONFile() {
  return JSON.parse(fs.readFileSync("ubook.json"))["books"];
}

function writeJSONFile(content) {
  fs.writeFileSync(
    "ubook.json",
    JSON.stringify({ books: content }),
    "utf8",
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
}

app.listen("3000", () =>
  console.log("Server started at: http://localhost:3000")
);