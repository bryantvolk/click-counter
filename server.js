"use strict";

const express = require("express");
const mongo = require("mongodb").MongoClient;

const routes = require("./app/routes/index.js");
const db = require("./db.js");

const app = express();

const port = process.env.PORT || 8000;

mongo.connect(db.url, function(err, db) {
  if (err) {
    console.error("database connection error");
  } else {
    console.log("mongodb connection success");
  }

  app.use("/public", express.static(process.cwd() + "/public"));
  app.use("/controllers", express.static(process.cwd() + "/app/controllers"));
  routes(app, db);

  app.listen(port, function() {
    console.log("server is on at port: " + port);
  });
});
