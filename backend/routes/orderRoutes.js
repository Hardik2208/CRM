const express = require("express");
const Order = require("../models/Order");
const Customer = require("../models/Customer");
const Product = require("../models/Product");
const router = express.Router();

router.post("/order", async (req, res) => {
  let product = await Product.findOne({ modelName: req.body.modelName });
  if (!product || product.quantity == 0) {
    return res.status(404).send("Product Not Found in Stock! Update the Stock");
  } else {
    product.quantity -= res.body.quantity;
    await product.save();
    const newOrder = new Order(req.body);
    const allOrders = await Order.find();
    newOrder["orderNumber"] = allOrders.length + 1;
    await newOrder.save();

    const customer = await Customer.findOne({
      phoneNumber: req.body.customerObject.phoneNumber,
    });

    if (!customer) {
      let newCustomer = new Customer(req.body.customerObject);
      newCustomer["orderList"] = [
        { ...req.body, orderNumber: allOrders.length + 1 },
      ];
      await newCustomer.save();
    } else {
      customer["orderList"] = [
        ...customer.orderList,
        { ...req.body, orderNumber: allOrders.length + 1 },
      ];
      await customer.save();
    }
  }
});

router.get("/order", async (req, res) => {
  const allOrder = await Order.find();
  res.send(allOrder);
});

router.put("/order/:id", async (req, res) => {});

module.exports = router;
