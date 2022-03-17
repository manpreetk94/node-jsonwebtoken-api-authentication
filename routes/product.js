var express = require('express');
var router = express.Router();
var Product = require('../models/Product');
/* GET user's product listing. */
router.get('/products', async function(req, res, next) {
  try{
    var products = await Product.where({'user_id':req.user.id}).fetchAll();
    products = products.toJSON();
     res.json({
            response: true,
            data: products
        });
   }catch(e){
       res.json({
            response: false,            
        });
   }
});

module.exports = router;
