const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
var fs = require('fs');
const https = require('https');
const axios = require('axios');
var CircularJSON = require('circular-json')
const JSPON = require('jspon');
var mongoose = require('mongoose');

var db = mongoose.connection
db.createCollection('gitData');
	var dataSaved = db.collection('gitDaata');

router.post('/github',function(request,response){
    axios.get('https://api.github.com/users/mralexgray/repos')
  .then(URLdata => {
     const str = CircularJSON.stringify(URLdata);
     
    var data=JSON.parse(str)
    
   response.send({
       "data":data
    }) 
    dataSaved.bulkWrite(data, function(err) {
        console.log("data saved in DB")
        if (err) throw err;
    })

  })
  .catch(error => {
    console.log(error);
  });
    
})
router.get('/github',function(request,response){
    var id=request.query.id
   var dataById= dataSaved.find({"id":id})
   response.send({
       "data":dataById
   })

 
})

module.exports = router;
