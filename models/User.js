var bookshelf = require('bookshelf');
var knex = require('knex');

var knexfile = require('../knexfile');
var db = knex(knexfile.development);
var bookshelf = require('bookshelf')(db);
var Product = require('./Product');

module.exports =  bookshelf.Model.extend({
  	tableName: 'users',
  	products: function () { 
  		return this.hasMany(Product ,'user_id','id');
  	} 
});

