const models = require("../models");

module.exports.getAll = (req, res) => {
  models.customers
    .findAll({ limit: 10 })
    .then(customers => {
      if (customers === []) {
        res.send("data not found");
      } else {
        res.send(customers);
      }
    })
    .catch(error => res.send(error));
};

module.exports.post = (req, res) => {
  models.customers
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
  models.customers
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

exports.deleteAll = (req, res) => {
  models.customers
    .destroy({
      where: {},
      truncate: true
    })
    .then(result => {
      res.send("success");
    })
    .catch(err => res.send(err));
};

exports.search = (req, res) => {
  console.log(req.query);
  models.customers
    .findAll({ where: req.query })
    .then(customers => res.send(customers))
    .catch(err => res.send(err));
};

// module.exports.deleteAll = (req, res) => {
//   models.customers
//     .findAll({ limit: 10 })
//     .then(product =>
//       product
//         .destroy()
//         .then(product =>
//           res.send({
//             message: `delete all customers success`
//           })
//         )
//         .catch(err => res.send(err))
//     )
//     .catch(err => res.send(err));
// };

module.exports.update = (req, res) => {
  models.customers
    .update(req.body, { where: { id: req.params.id } })
    .then(res => res.send(res))
    .catch(err => res.send(err));
};

// module.exports.search = (req, res) => {
//   models.customers
//     .findAll({ where: { name: req.query.name } })
//     .then(customers => {
//       if (customers === []) {
//         res.send("data not found");
//       } else {
//         res.send(customers);
//       }
//     })
//     .catch(error => res.send(error));
// };
