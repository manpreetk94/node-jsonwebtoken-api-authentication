var express = require('express');
const app = express();
var router = express.Router();
var jwt = require('jsonwebtoken');
const config = require("../config/auth.config.js");
var bcrypt = require('bcrypt');
var UserModel = require('../models/User');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', async function(req, res, next) {
      
      var email     = req.body.email;
      var password  = req.body.password;

      if (email == '' || email == null) {
        res.json({
            response: false,
            message: "Email is required"
        });
      }
      if (password == '' || password == null) {
        res.json({
            response: false,
            message:"Password is required"
        });
      }


      var user = await UserModel.where({'email':email}).fetch();
     
      if(!user){
        res.json({
            response: false,
            message:  "Email does not found!",
        });
      }
      user      = user.toJSON();        
      var token = createToken(user);       
      
      if (await bcrypt.compareSync(password, hash) == true) {
        res.json({
            response: true,           
            token: token,
            date: user
        });
         
      }else{
           res.json({
                response: true,
                message:"Wrong credentials"
          });
      }
     
});

router.post('/register', async function(req, res, next) {
      
      var first_name     = req.body.first_name;
      var last_name     = req.body.last_name;
      var mobile_code = req.body.mobile_code;
      var mobile_number = req.body.mobile_number;
      var email     = req.body.email;
      var password  = req.body.password;
      

      if (first_name == '' || first_name == null) {
        res.json({
            response: false,
            message: "First Name is required"
        });
      }
      if (last_name == '' || last_name == null) {
        res.json({
            response: false,
            message: "Last Name is required"
        });
      }

      if (email == '' || email == null) {
        res.json({
            response: false,
            message: "Email is required"
        });
      }
      if (password == '' || password == null) {
        res.json({
            response: false,
            message: "Password is required"
        });
      }
      if (mobile_code == '' || mobile_code == null) {
        res.json({
            response: false,
            message: "Mobile Code is required"
        });
      }
      if (mobile_number == '' || mobile_number == null) {
        res.json({
            response: false,
            message: "Mobile NUmber is required"
        });
      }
        
      var user = await UserModel.where({'email':email}).count();
      
      if(user){
        res.json({
            response: false,
            message:  "Email already exists",
        });
      }
      
        var pwd = await bcrypt.hashSync(password, 10);      
        try {

                var newuser = await new UserModel({'first_name':first_name,
                    'last_name':last_name,
                    'email':email,
                    'phone_number':mobile_number,
                    'phone_code':mobile_code,
                    'password': pwd,
                    "user_type":"1",
                    "by":"app"
                    })
                    .save(null, {method: 'insert'});
              
                res.json({
                        response: true,
                        message:  "Registration has been successfull." 
                    });


        }catch(e){            
            res.json({
                response: false,
                message:  "Somethign went Wrong"
            });
        }
     
});

function createToken(user){
      var token = jwt.sign( user, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      return token;
}

 

module.exports = router;
