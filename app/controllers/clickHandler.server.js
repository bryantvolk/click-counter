"use strict";

function clickHandler(db) {
  var clicks = db.collection("clicks");

  this.getClicks = function(req, res) {
    console.log("getClicks");
    var clickProj = {
      _id: false
    };
    clicks.findOne({}, clickProj, function(err, data) {
      if (err) {
        console.error(err);
      }
      if (data) {
        res.json(data);
      } else {
        clicks.insert({ clicks: 0 }, function(err) {
          if (err) {
            console.error(err);
          }

          clicks.findOne({}, clickProj, function(err, doc) {
            if (err) {
              console.error(err);
            }
            res.json(doc);
          });
        });
      }
    });
  };
  this.addClick = function(req, res) {
    clicks.findAndModify({}, { _id: 1 }, { $inc: { clicks: 1 } }, function(
      err,
      result
    ) {
      if (err) {
        console.error(err);
      }

      res.json(result);
    });
  };
  this.resetClicks = function(req, res) {
    clicks.update({}, { clicks: 0 }, function(err, result) {
      if (err) {
        console.error(err);
      }

      res.json(result);
    });
  };
}

module.exports = clickHandler;
