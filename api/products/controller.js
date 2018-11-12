const models = require("../models");

module.exports.getAll = (req, res) => {
  models.products
    .findAll()
    .then(products => {
      if (products === []) {
        res.send("data not found");
      } else {
        res.send(products);
      }
    })
    .catch(error => res.send(error));
};

module.exports.post = (req, res) => {
  models.products
    .create(req.body)
    .then(product =>
      res.send({
        message: "insert data success",
        data: product
      })
    )
    .catch(err => res.send(err));
};
