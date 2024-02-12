const { FormRequest, getModel, bcrypt } = require("jcc-express-mvc");
const User = getModel("User");
class AuthRequest extends FormRequest {
  constructor(req) {
    super(req);
  }

  async rules() {
    return this.validate({
      name: ["required"],
      email: ["required", "email", this.route("user") ? "next" : "unique:user"],
      password: ["required", "min:6"],
    });
  }

  async save() {
    await this.rules();
    const user = this.route("user")
      ? await User.findById(this.route("user"))
      : new User();
    user.name = this.name;
    user.email = this.email;
    user.password = await bcrypt(this.password);
    return user.save();
  }
}
