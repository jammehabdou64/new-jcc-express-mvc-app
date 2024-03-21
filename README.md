## Warning

**Note: This package is not recommended for use in production environments. It's intended for learning purposes only. Use in production at your own risk.**

## jcc-express-starter

jcc-express-mvc is a lightweight Node.js package that simplifies the development of Express.js applications using a structure inspired by Laravel's file organization. It encourages the use of the Model-View-Controller (MVC) architectural pattern, providing a clean and organized approach to building and scaling your Express.js projects.

## Features

- Sets up an Express.js web application with MVC architecturevalidation for form data
- Opinionated project structure for organized code
- Built-in validation methods
- Two routes file for easy route management
- Comes with jsBlade similar to laravel blade for view rendering, But you can use any templating engine of choice.
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

Start the application:

```bash
npm run dev
```

To generate a controller class:

```bash
node jcc make:controller UsersController
```

To generate a api controller class:

```bash
node jcc make:ApiController UsersController
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
|--bootstrap
| |-app.js
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
| |--web.js
| |--api.js

```

- `Config/`:Configuration files for the application.
- `Controllers/`:Controllers handling the application logic.
- `Models/`:Mongoose for database interactions.
- `public/`:Static assets like CSS and JavaScript files.
- `routes/`: Two routes file (web.js | api.js) where routes are registered.
- `resources/views/`: jsBlade templates for rendering views.
- `server.js`: Main application file.
- `bootstrap/app.js`:Global middlewares

## Routing and Middleware

Basic routing is meant to route your request to an appropriate controller. The routes of the application can be defined in route/web.js or route/api.js file. Here is the general route syntax for each of the possible request. You can define the URLs of your application with the help of routes. These routes can contain variable data, connect to controllers or can be wrapped into middlewares.

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

The controller UsersController contains methods to handle various user-related actions.

Methods

- create(req, res, next): Renders the view for creating a new user.
- index(req, res, next): Retrieves all users from the database and renders the user index view.
- store(req, res, next): Placeholder method for storing user data.
- show(req, res, next): Renders the view for displaying a specific user.
- edit(req, res, next): Placeholder method for updating user data.
- destroy(req, res, next): Placeholder method for deleting a user.
  These methods encapsulate the logic for handling different user-related operations within the application.

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

jcc-express-mvc comes built-in validation rules. Enabling you to ensure that the data submitted by users is valid before further processing.

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
const { getModel, FormRequest, bcrypt } = require("jcc-express-mvc");
const User = getModel("User");

class UserRequest extends FormRequest {
  constructor(req) {
    super(req);
  }

  async rules() {
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
      class="@if(errors.name) text-red-500 text-xs mx-2 @else hidden @endif
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
      class="@if(errors.email) text-red-500 text-xs mx-2 @else hidden @endif"
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
      class="@if(errors.password) text-red-500 text-xs mx-2 @else hidden @endif"
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

## Templating Engine

`jcc-express-starter` allows you to use any templating engine of your choice for rendering views. The package comes pre-configured with jsBlade, which is similar to Laravel's Blade templating engine. However, you can easily switch to another templating engine by configuring it in the `app/Config/engine.js` file.

### Configuring Templating Engine

To configure a different templating engine, follow these steps:

1. Navigate to the `app/Config` directory in your project.

2. Open the `engine.js` file.

3. Mention .env File Configuration: Explain how users can enable the chosen templating engine by setting the TEMPLATE_ENGINE variable to true in the .env file.

4. Import the desired templating engine module. For example, if you want to use EJS, you can add the following line:
   ```javascript
   const ejs = require("ejs");
   module.exports = (app) => {
     app.set("view engine", "ejs");
     return;
   };
   ```

```

Save the changes to the engine.js file.

Now, your Express.js application will use the configured templating engine for rendering views.

Available Templating Engines
Here are a few popular templating engines that you can use with jcc-express-starter:

ejs: Embedded JavaScript templates.
pug: High-performance template engine heavily influenced by Haml.
handlebars: Minimal templating on steroids.
Feel free to choose the templating engine that best fits your project requirements and preferences.
```

## Helpers

jcc-express-starter provides a set of helper functions to simplify common tasks in your Express.js applications:

- **bcrypt**: A function for password hashing using bcrypt.

  ```javascript
  const { bcrypt } = require("jcc-express-mvc");
  const hashPass = await bcrypt("123456");
  // Example usage
  ```

- **verifyHash**: A function for verifying hashed passwords.

  ```javascript
  const { verifyHash } = require("jcc-express-mvc");
  const isMatch = await verifyHash("password", hashedPassword);
  // Example usage
  ```

- **authenticated**: A function for implementing Passport authentication.

  ```javascript
  const { Route, authenticated } = require("jcc-express-mvc");
  Route.middleware(authenticated).get("/profile", (req, res) => {
    //Access authenticated user's profile
  });
  ```

- **apiAuthenticated**: A function for API JWT authentication.

```javascript
const { ApiRoute, apiAuthenticated } = require("jcc-express-mvc");

// Example usage
ApiRoute.middleware(apiAuthenticated).post("/api/data", (req, res) => {
  // Access authenticated user's data
});
```

**getModel**: A function to require a model file from the Models directory.

```javascript
const { getModel } = require("jcc-express-mvc");

// Example usage
const User = getModel("User");
```

**getController**: A function to require a controller file from the Controllers directory.

```javascript
const { Route, getController } = require("jcc-express-mvc");

// Example usage
const UsersController = getController("UsersController");

Route.get("/", UsersController.index);
```

**getApiController**: A function to require an API controller file from the API Controllers directory.

```javascript
const { ApiRoute, getApiController } = require("jcc-express-mvc");

// Example usage
const UsersController = getApiController("MessagesController");

ApiRoute.get("/", MessagesController.index);
```

**getMiddleware**: A function to require a middleware file from the Middlewares directory.

```javascript
const { getMiddleware } = require("jcc-express-mvc");

// Example usage
const AuthMiddleware = getMiddleware("AuthMiddleware");
```

**getRequest**: A function to require a request file from the Request directory

```javascript
const { getRequest } = require("jcc-express-mvc");

// Example usage
const AuthRequest = getRequest("AuthRequest");
```
