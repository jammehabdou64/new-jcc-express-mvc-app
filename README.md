## jcc-express-starter

jcc-express-mvc is a lightweight Node.js package that simplifies the development of Express.js applications using a structure inspired by Laravel's file organization. It encourages the use of the Model-View-Controller (MVC) architectural pattern, providing a clean and organized approach to building and scaling your Express.js projects.

## Features

- Sets up an Express.js web application with MVC architecturevalidation for form data
- Opinionated project structure for organized code
- Built-in
- Single route file for easy route management
- Comes with Handlebars for view rendering
- Includes configuration with MongoDB
- Includes configuration with dotenv

## Getting Started

### Prerequisites

Make sure you have Node.js and npm (Node Package Manager) installed on your machine.

### Usage

To create a new Express.js project using `jcc-express-starter`, simply run the following command in your terminal:

```bash
npx jcc-express-starter new-express-app
```

This will create a new directory named my-express-app and set up the Express.js application inside it.

Navigate to the newly created directory:

```bash
cd my-express-app
```

Run this command to create an env file.

```bash
cp .env.example .env
```

Start the application:

```bash
npm run dev
```

To generate a controller class:

```bash
node jcc make:controller UsersController
```

To generate a model:

```bash
node jcc make:model User
```

To generate a request class:

```bash
node jcc make:request UserRequest
```

To generate a controller class and model:

```bash
node jcc make:controller UsersController User --resources
```

Or

```bash
node jcc make:controller UsersController User -r
```

## Project Structure

```bash
project-root/
|--app
| |--Config/
| | |--cors/
| | | |--cors.js
| | | |--socket.js
| | |--egine.js
| |--Controllers/
| | |--UsersController.js
| |--Models/
| | |--User.js
| |--Middlewares/
| | |--app.js
| |--Request/
| | |--UserRequest.js
|--public/
| |--css/
| | |--app.css
| |--js/
| | |--app.js
|--resources/
| |--views/
| | |--partials/
| | | |--header.js
| | |--layout.hbs
| | |--index.hbs
|--routes/
| |--index.js
```

- `Config/`:Configuration files for the application.
- `Controllers/`:Controllers handling the application logic.
- `Models/`:Mongoose for database interactions.
- `public/`:Static assets like CSS and JavaScript files.
- `routes/`: Single route file (index.js) where all routes are registered.
- `resources/views/`: Handlebars templates for rendering views.
- `server.js`: Main application file.

## Routing and Middleware

Basic routing is meant to route your request to an appropriate controller. The routes of the application can be defined in route/index.js file. Here is the general route syntax for each of the possible request. You can define the URLs of your application with the help of routes. These routes can contain variable data, connect to controllers or can be wrapped into middlewares.

```js
const { Route, getController, authenticated } = require("jcc-express-mvc");
const UsersController = getController("UsersController");

Route.get("/", (req, res, next) => {
  return res.json({ message: "Hello, World" });
});

Route.post("/", (req, res, next) => {
  //
});

Route.patch("/:id", (req, res, next) => {
  return res.json({ id: req.params.id });
});

Route.put("/:id", (req, res, next) => {
  return res.json({ id: req.params.id });
});

Route.delete("/", (req, res, next) => {
  //
});

Route.middleware(authenticated).get("/profile", (req, res, next) => {
  return res.json({ message: "I'm Authenticated" });
});

Route.prefix("/users").group((Route) => {
  Route.get("/", UsersController.index);
  Route.get("/create", UsersController.create);
  Route.post("/", UsersController.store);
  Route.get("/:id", UsersController.show);
  Route.patch("/:id", UsersController.edit);
  Route.delete("/:id", UsersController.destroy);
});

Route.prefix("/users")
  .controller(UsersController)
  .group((Route) => {
    Route.get("/", "index");
    Route.get("/create", "create");
    Route.post("/", "store");
    Route.get("/:id", "show");
    Route.patch("/:id", "edit");
    Route.delete("/:id", "destroy");
  });
```

## Controller

```js
const { getModel } = require("jcc-express-mvc");
const User = getModel("User");
class UsersController {
  /**
   *
   * @return   @return Express request response next
   */
  async create(req, res, next) {
    return res.render("users/create");
  }

  /**
   *
   *  @return Express request response next
   */
  async index(req, res, next) {
    const users = await User.find();
    return res.render("users/index", { users });
  }

  /**
   *
   *
   * @return Express request response next
   */
  async store(req, res, next) {
    return res.json({ message: req.body });
  }

  /**
   *
   * @param    id
   * @return  @return Express request response next
   */
  async show(req, res, next) {
    return res.render("users/show");
  }

  /**
   *
   *
   * @param    id
   *  @return Express request response next
   */
  async update(req, res, next) {
    return res.json({ message: req.params.id });
  }

  /**
   *
   * @param  id
   * @return Express request response next
   */
  async destroy(req, res, next) {
    return res.json({ message: req.params.id });
  }
}
module.exports = new UsersController();
```

## Validation

cc-express-mvc comes built-in validation rules. Enabling you to ensure that the data submitted by users is valid before further processing.

```js
class UsersController {
  /**
   *
   *
   * @return Express request response next
   */
  async store(req, res, next) {
    const validateData = await req.validate({
      name: ["required"],
      email: ["email", "unique:user"],
      password: ["min:6"],
    });

    res.json({ validateData });
  }
}
```

### validation rules

- `required`
- `min`:value
- `max`:value
- `email`
- `unique`:table column
- `same`:field name
- `alpha`
- `alphaNum`
- `bool`
- `float`
- `int`
- `decimal`
- `jwt`
- `json`
- `postal`
- `slug`
- `url`
- `creditCard`
- `mongoId`
- `phone`,
- `nullable`
- `next`

## Form Request

Custom requests (or Form Requests) are useful in situations when one wants to authorize & validate a request before hitting the controller method.

```bash
 node jcc make:request UserRequest
```

### example

```js
const { getModel, FormRequest,bcrypt } = require("jcc-express-mvc");
const User = getModel("User");

class UserRequest extends FormRequest {
  constructor(req) {
    super(req);
  }

  rules() {
    return this.validate({
      name: ["required"],
      email: [
        "required",
        "email",
        `${this.route("user") ? "next" : "unique:user"}`,
      ],
      password: ["required", "min:6", "max:100"],
    });
  }

  save(){
    await this.rules()

    const user = new User()
    user.name  = this.name
    user.email = this.email
    user.password = await bcrypt(this.password)
    return user.save()
  }
}
```

In jcc-express-mvc, the errors variable in the view file holds all the validation errors. To access errors for a specific field, use [errors.field].

```html
<form
  action="/auth/register"
  class="w-11/12 sm:w-[450px] py-2 px-6 bg-white"
  method="post"
>
  <h2 class="text-center font-extrabold text-xl my-2 py-2">Register</h2>
  <div class="flex-col mt-1 flex">
    <label for="email" class="text-gray-800">Name</label>
    <input
      type="name"
      placeholder="name"
      class="outline-none border border-gray-400 mt-1 px-3 py-2"
      id="name"
      name="name"
      value="{{old.name}}"
    />
    <small
      class="{{#if errors.name}} text-red-500 text-xs mx-2{{else}} hidden {{/if}}"
      >{{errors.name}}</small
    >
  </div>
  <div class="flex-col mt-1 flex">
    <label for="email" class="text-gray-800">Email</label>
    <input
      type="email"
      placeholder="email"
      class="outline-none border border-gray-400 mt-1 px-3 py-2"
      id="email"
      name="email"
      value="{{old.email}}"
    />
    <small
      class="{{#if errors.email}} text-red-500 text-xs mx-2{{else}} hidden {{/if}}"
      >{{errors.email}}</small
    >
  </div>
  <div class="flex-col mt-4 flex">
    <label for="password" class="text-gray-800">Password</label>
    <input
      type="password"
      placeholder="password"
      class="outline-none border border-gray-400 mt-1 px-3 py-2"
      id="password"
      name="password"
      value=""
    />
    <small
      class="{{#if errors.password}} text-red-500 text-xs mx-2{{else}} hidden {{/if}}"
      >{{errors.password}}</small
    >
  </div>
  <div class="py-2 mt-3">
    <button type="submit" class="bg-orange-500 p-2 w-full text-white">
      login
    </button>
  </div>
  <div class="mb-2 py-3">
    <p class="text-sm">
      Already have an account?
      <a href="/login" class="text-orange-500 underline">login</a>
    </p>
  </div>
</form>
```

## Configuration

Explain any configuration options or environment variables that can be set for customization.
