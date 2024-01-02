const { getModel, Auth, bcrypt } = require("jcc-express-mvc");
const User = getModel("User");
class AuthController {
  async index(req, res, next) {
    return res.render("auth/register");
  }

  loginView(req, res) {
    return res.render("auth/login");
  }

  async login(req, res, next) {
    const vdData = await req.validate({
      email: ["required"],
      password: ["required"],
    });
    return vdData.errors
      ? res.redirect("/login")
      : Auth.attempt(req, res, next);
  }

  async store(req, res, next) {
    const validatedData = await req.validate({
      name: ["required"],
      email: ["email", "unique:user"],
      password: ["min:6"],
    });

    validatedData["password"] = await bcrypt(validatedData["password"]);
    const result = await User.create(validatedData);
    return result ? Auth.attempt(req, res, next) : res.redirect("/register");
  }
}

module.exports = new AuthController();
