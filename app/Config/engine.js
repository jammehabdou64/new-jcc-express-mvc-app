const getRoot = require("app-root-path").path;
const hbs = require("hbs");
module.exports = (app) => {
  hbs.registerPartials(`${getRoot}/resources/views/partials`, (err) => {
    if (err) {
      return console.log({ "Temp-engine": err });
    }
  });

  app.set("views", `${getRoot}/resources/views`);
  app.set("view engine", "hbs");

  return;
};
