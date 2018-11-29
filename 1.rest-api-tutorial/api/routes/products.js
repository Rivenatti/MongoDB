const express = require("express");
const router = express.Router();
const Product = require("../models/product");

//------------ GET ALL

router.get("/", (req, res, next) => {
  Product.find()
    .select("name price _id")
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/products/" + doc._id
            }
          };
        })
      };
      // if (docs.length >= 0) {
      res.status(200).json(response);
      // } else {
      //   res.status(404).json({ message: "No entries founds" });
      // }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

//------------ POST

router.post("/", (req, res, next) => {
  // Product instance
  const product = new Product({
    name: req.body.name,
    price: req.body.price
  });

  // Save product in the DB
  product
    .save()
    .then(result => {
      res.status(201).json({
        message: "Product has been created",
        createdProduct: {
          name: result.name,
          price: result.price,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:3000/products/" + doc._id
          }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

//------------ GET BY PRODUCTID

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select("name price _id")
    .then(doc => {
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: "GET",
            description: "Get all products",
            url: "http://localhost/producsts"
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

//------------ PATCH

router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};

  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Product.update({ _id: id }, { $set: updateOps })
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({ error: err }));
});

//------------ DELETE

router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
