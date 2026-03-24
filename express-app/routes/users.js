const express = require('express');
const router = express.Router();

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
  res.send({
    items : usersList
  });
});

router.post('/', function(req, res, next){
  const name = req.body.name;
  const newIdUser = usersList.length;
  const newUser = {
    "id" : newIdUser,
    name
  };

  usersList.push(newUser);
  res.status(201).json(newUser);
});

module.exports = router;
