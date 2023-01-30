const Category = require("../models/Category.js");
const express = require("express");
const router = express.Router();

router.get("/get-all", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).send(categories);
  } catch (error) {
    res.status(404).json(error)
  }
});

router.put("/update-category", async (req, res) => {
  try {
    await Category.findOneAndUpdate({ _id: req.body.categoryId }, req.body);
    res.status(200).send("Updated Successfully");
  } catch (error) {
    res.status(404).json(error)
  }
});

router.delete("/delete-category", async (req, res) => {
  try {
    await Category.findOneAndDelete({ _id: req.body.categoryId });
    res.status(200).send("Deleted Successfully");
  } catch (error) {
    res.status(404).json(error)
  }
});

router.post("/add-category", async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(200).send("Item added succesfully");
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
