const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const logger = require("morgan");
const container = require("./container");
const http = require("http");
var router = require("express-promise-router")();

container.resolve(function(users) {
  const app = SetupExpress();

  function SetupExpress() {
    const app = express();
    const server = http.createServer(app);
    server.listen("8000", function() {
      console.log("Server is runnig port is 8000");
    });
    ConfigureExpress(app);
    users.SetRouting(router);
    app.use(router);
  }
  function ConfigureExpress(app) {
    app.use(logger());
    app.use(express.static(path.join(__dirname, "public")));
    app.set(path.join(__dirname, "views"));
    app.set("view engine", "ejs");
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
  }
});
