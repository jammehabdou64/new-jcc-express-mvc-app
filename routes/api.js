const { ApiRoute, apiAuthenticated } = require("jcc-express-mvc");

ApiRoute.get("/", (req, res) => {
  return res.json({ msg: "Hello, API" });
});
