const express = require('express');
const app = express();
const memberRoutes = express.Router();

// Require Member model in our routes module
let Member = require('../models/Member');

// Defined store route
memberRoutes.route('/add').post(function (req, res) {
  let member = new Member(req.body);
  member.save()
    .then(member => {
      res.status(200).json({ 'Member': 'Member has been added successfully' });
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
memberRoutes.route('/').get(function (req, res) {
  Member.find(function (err, members) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(members);
    }
  });
});

// Defined edit route
memberRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Member.findById(id, function (err, member) {
    res.json(member);
  });
});

//  Defined update route
memberRoutes.route('/update/:id').post(function (req, res) {
  Member.findById(req.params.id, function (err, member) {
    if (!member)
      res.status(404).send("Record not found");
    else {
      member.MemberName = req.body.MemberName;
      member.MemberBio = req.body.MemberBio;
      member.MemberAge = req.body.MemberAge;

      member.save().then(member => {
        res.json('Update complete');
      })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
memberRoutes.route('/delete/:id').get(function (req, res) {
  Member.findByIdAndRemove({ _id: req.params.id }, function (err, member) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

module.exports = memberRoutes;