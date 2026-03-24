const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name text)`);

usersList = new Array(
  {"id": 1,
      "name": "Alexandr"},
      {"id": 2,
      "name": "Kristina"},
      {"id": 3,
      "name": "Pavel"},
      {"id": 4,
      "name": "Maximeeeeeeeeeeeeeeeeeeee"},
);

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.all("SELECT id, name FROM users", [], (err, rows) => {
   if (err) {
      console.log(err);
   } else {
      res.send(rows);
   }
  });

  res.send({
    items : usersList
  });
});

router.get('/:id', function(req, res, next) {
  const idUser = req.params.id - 1;
  if (idUser >= usersList.length){ //у меня id по порядку присваиваются, поэтому такая проверка
    res.status(404);
    res.send("User не найден(");
  }

  else {
    res.send(usersList[idUser]);
  }
});

router.post('/', function(req, res, next){
  const name = req.body.name;
  const newIdUser = usersList.length;
  const newUser = {
    "id" : newIdUser,
    name
  };

  usersList.push(newUser);

  const insert = "INSERT INTO users (name) VALUES (?)";
  db.run(insert, [name]);

  res.status(201).json(newUser);
});

module.exports = router;
