const hpp = require("hpp");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
// const fileUpload = require("express-fileupload");
const mongooseSanitize = require("express-mongo-sanitize");
const cors = require("cors");
// const express = require("express");
// const appCors = require("../cors/cors");
const session = require("express-session");
const flash = require("connect-flash");

const app = [
  // express.static("client/build"),
  cookieParser(),
  cors(),
  hpp(),
  xss(),
  helmet(),
  // fileUpload(),
  mongooseSanitize(),
  session({
    secret: "app-session-1203-4-556-",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
  }),
  flash(),
];

module.exports = app;
