var express = require('express');
var router = express.Router();
var knex = require('knex');
var knexfile = require('../knexfile');
var db = knex(knexfile.development);
var jwt = require('jsonwebtoken');
const config = require("../config/auth.config.js");

exports.loginRequired = function(req, res,next) {
	if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0]==='JWT'){
        jwt.verify(req.headers.authorization.split(' ')[1],config.secret,function(err,decode){
            if(err) { 
                 res.json({
		            response: false,
		            message: "Please login first"
		        });             
            }else{
                req.user =  decode;		      
                next();
            }
        }); 

    }else{
        res.json({
            response: false,
            message: "Please login first"
        });
    }
};