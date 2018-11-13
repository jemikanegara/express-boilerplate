require("dotenv").config();
const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const products = require("./api/products");
const accounts = require("./api/accounts");
const customers = require("./api/customers");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/products", products);
app.use("/customers", customers);
app.use("/accounts", accounts);

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
