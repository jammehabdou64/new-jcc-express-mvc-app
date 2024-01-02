const { Route, authenticated, getController } = require("jcc-express-mvc");
const AuthController = getController("AuthController");

Route.controller(AuthController).group((Route) => {
  Route.get("/register", "index");
  Route.get("/login", "loginView");
  Route.post("/auth/register", "store");
  Route.post("/auth/login", "login");
});

Route.get("/", (req, res, next) => {
  res.render("index");
});

Route.middleware(authenticated).get("/home", (req, res) => {
  return res.render("home");
});

// console.log(Route);
