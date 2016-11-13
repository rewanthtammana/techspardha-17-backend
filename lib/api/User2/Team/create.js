var express = require('express');
var router = express.Router();
var Teams = require('../../../../models/teams');
var Model = require('../../../../models');
console.log("outside fn");
/*
* GET request is directly redirected to home page
*/
router.post('/', function(req, res, next){
  res.send(404);
});

router.get('/', function(req, res, next){
  /*
  * authentication check api must be 
  * called from here
  * Check whether the token is valid or not
  */

  /*
  * decodes the token by calling
  * the verification code
  * var tokenDetails = [userId, emailId]
  */
  var tokenDetails = [10,15]
  var teamLeaderId = tokenDetails[0];
  var emailId = tokenDetails[1];
  var teamName = req.query.teamName;
  var eventId = req.query.eventId;
  var teamId;
    
  // Inserting data into Teams table by creating a new table.
  Model.Teams.create({
       Name: teamName,
       EventId: eventId,
  }).then(function(data) {
    console.log("++++++++++++++++++++++++++++++++++++++++++++");
    console.log("Data Successfully Inserted into Teams table");
    console.log("++++++++++++++++++++++++++++++++++++++++++++");
  
    Model.Teams.findAll({
      attributes: ['id'],
      where: {
        Name: teamName
      }
    }).then(function(data){
      teamId = data[0]['id'];
  
      // Inserting this teamLeader into the TeamUsers table 
      // since he created the team.
      Model.TeamUsers.create({
          TeamId: teamId,
          StudentId: teamLeaderId
      }).then(function(data) {
          console.log("++++++++++++++++++++++++++++++++++++++++++++");
          console.log("Data Successfully Inserted into TeamUsers table");
          console.log("++++++++++++++++++++++++++++++++++++++++++++");        
      });
  
    });
  
  }).catch(function(err) {
    console.log('----------------------------------Error--------------------------------------------------');
    console.log(err);
  });

 });

module.exports = router;