const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Order = require("../models/order");
const Product = require("../models/product");

router.get("/", (req, res, next) => {
  Product.findById(req.body.productId)
    .then(product => {
      Order.find()
        .select("product quantity _id")
        .then(docs =>
          res.status(200).json({
            count: docs.length,
            orders: docs.map(doc => {
              return {
                _id: doc._id,
                product: doc.product,
                quantity: doc.quantity,
                request: {
                  type: "GET",
                  url: "http://localhost:3000/orders/" + doc._id
                }
              };
            })
          })
        )
        .catch(err => res.status(500).json({ error: err }));
    })
    .catch(err => {
      res.status(500).json({
        message: "Product not found",
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  Product.findById(req.body.productId).then(product => {
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
  });

  // Order instance
  const order = new Order({
    product: req.body.productId,
    quantity: req.body.quantity
  });

  order
    .save()
    .then(result => {
      res.status(201).json({ result });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.post("/:orderId", (req, res, next) => {
  res.status(201).json({
    message: "Order was created"
  });
});

router.get("/:orderId", (req, res, next) => {
  res.status(200).json({
    message: "Order details",
    orderId: req.params.orderId
  });
});

router.delete("/:orderId", (req, res, next) => {
  res.status(200).json({
    message: "Order deleted",
    orderId: req.params.orderId
  });
});

module.exports = router;
