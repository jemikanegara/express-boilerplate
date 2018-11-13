const models = require("../models");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.getAll = (req, res) => {
  models.accounts
    .findAll({ limit: 10 })
    .then(accounts => {
      if (accounts === []) {
        res.send("data not found");
      } else {
        res.send(accounts);
      }
    })
    .catch(error => res.send(error));
};

module.exports.post = (req, res) => {
  const SALT_WORK_FACTOR = 7;
  const salt = bycrypt.genSaltSync(SALT_WORK_FACTOR);

  req.body.password = bycrypt.hashSync(req.body.password, salt);

  models.accounts
    .create(req.body)
    .then(account =>
      res.send({
        message: "insert data success",
        data: account
      })
    )
    .catch(err => res.send(err));
};

module.exports.delete = (req, res) => {
  models.accounts
    .findOne({ where: { id: req.params.id } })
    .then(account =>
      account
        .destroy()
        .then(account =>
          res.send({
            message: `delete account id : ${req.params.id} success`,
            data: account
          })
        )
        .catch(err => res.send(err))
    )
    .catch(err => res.send(err));
};

module.exports.deleteAll = (req, res) => {
  models.accounts
    .destroy({
      where: {},
      truncate: true
    })
    .then(account => {
      res.send("success");
    })
    .catch(err => res.send(err));
};

module.exports.search = (req, res) => {
  console.log(req.query);
  models.accounts
    .findAll({ where: req.query })
    .then(accounts => res.send(accounts))
    .catch(err => res.send(err));
};

module.exports.update = (req, res) => {
  models.accounts
    .update(req.body, { where: { id: req.params.id } })
    .then(res => res.send(res))
    .catch(err => res.send(err));
};

exports.login = (req, res) => {
  models.accounts
    .findOne({ where: { email: req.body.email } })
    .then(account => {
      if (account === null) {
        return res.send("account not found");
      }

      const validPassword = bycrypt.compareSync(
        req.body.password,
        account.password
      );

      if (validPassword === false) {
        return res.send("password is not valid");
      }

      // Generate Token
      const token_data = {
        payload: {
          id: account.id,
          name: account.name
        },
        secret: process.env.JWT_SECRET,
        options: {
          expiresIn: "7d"
        }
      };

      const token = jwt.sign(
        token_data.payload,
        token_data.secret,
        token_data.options
      );

      res.send({
        message: "you are logged in",
        id: account.id,
        token: token
      });
    })
    .catch(err => console.log(err));
};
