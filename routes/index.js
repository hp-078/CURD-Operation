var express = require("express");
var router = express.Router();
const ProductModel = require("../models/Product");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/add-product", function (req, res, next) {
  res.render("add-product", { title: "Express" });
});
router.post("/add-product-process", function (req, res, next) {
  var mydata = {
    pname: req.body.txt1,
    pdetails: req.body.txt2,
    pprice: req.body.txt3,
  };

  var MyData = ProductModel(mydata);

  MyData.save()
    .then(() => {
      res.send("Data Added");
    })
    .catch((err) => {
      res.send(err);
    });
});
router.get("/display-product", function (req, res, next) {
  ProductModel.find()
    .then((mydata) => {
      res.render("display-product", { mydata: mydata });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/delete-product/:id", function (req, res, next) {
  var myid = req.params.id;
  ProductModel.findByIdAndDelete(myid)
    .then(() => res.redirect("/display-product"))
    .catch((err) => console.log(err));
});

router.get("/edit-product/:id", function (req, res, next) {
  var myid = req.params.id;
  ProductModel.findById(myid)
    .then((mydata) => {
      res.render("edit-product", { mydata: mydata });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.post("/update-product-process/:id", function (req, res, next) {
  var myid = req.params.id;
  var mydata = {
    pname: req.body.txt1,
    pdetails: req.body.txt2,
    pprice: req.body.txt3,
  };
  ProductModel.findByIdAndUpdate(myid, mydata)
    .then((mydata) => {
      res.render("edit-product", { mydata: mydata });
    })
    .catch((err) => {
      console.log(err);
    });
});


router.get("/fileUpload", function (req, res, next) {
  res.render("fileUpload-form");
});


router.post("/fileUpload", function (req, res, next) {
var myfile = req.files.file123;
console.log(myfile);
myfile.mv("public/uploads/"+myfile.name, function(err){
  if(err)
  {
    res.send(err);  
  }
  else
  {
    res.send("File Uploaded Successfully");
  }
})
});

module.exports = router;
