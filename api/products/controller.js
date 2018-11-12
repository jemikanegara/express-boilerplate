const models = require("../models");

module.exports.getAll = (req, res) => {
  models.products
    .findAll({ limit: 10 })
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

module.exports.delete = (req, res) => {
  models.products
    .findOne({ where: { id: req.params.id } })
    .then(product =>
      product
        .destroy()
        .then(product =>
          res.send({
            message: `delete product id : ${req.params.id} success`,
            data: product
          })
        )
        .catch(err => res.send(err))
    )
    .catch(err => res.send(err));
};

module.exports.deleteAll = (req, res) => {
  models.products
    .findAll({ limit: 10 })
    .then(product =>
      product
        .destroy()
        .then(product =>
          res.send({
            message: `delete all products success`
          })
        )
        .catch(err => res.send(err))
    )
    .catch(err => res.send(err));
};

module.exports.update = (req, res) => {
  models.products
    .update(req.body, { where: { id: req.params.id } })
    .then(res => res.send(res))
    .catch(err => res.send(err));
};

// module.exports.search = (req, res) => {
//   models.products
//     .findAll({ where: { name: req.query.name } })
//     .then(products => {
//       if (products === []) {
//         res.send("data not found");
//       } else {
//         res.send(products);
//       }
//     })
//     .catch(error => res.send(error));
// };
