## jcc-express-starter

jcc-express-mvc is a lightweight Node.js package that simplifies the development of Express.js applications using a structure inspired by Laravel's file organization. It encourages the use of the Model-View-Controller (MVC) architectural pattern, providing a clean and organized approach to building and scaling your Express.js projects.

## Features

- Sets up an Express.js web application with MVC architecture
- Opinionated project structure for organized code
- Built-in validation for form data
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

To generate a controller:

```bash
node jcc make:controller UsersController
```

To generate a model:

```bash
node jcc make:model User
```

To generate a request:

```bash
node jcc make:request UserRequest
```

To generate a controller and model:

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
- `views/`: Handlebars templates for rendering views.
- `server.js`: Main application file.

## Basic Routing

Basic routing is meant to route your request to an appropriate controller. The routes of the application can be defined in route/index.js file. Here is the general route syntax for each of the possible request.

```js
const { Route, getController } = require("jcc-express-mvc");
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
```
## Validation


## Configuration

Explain any configuration options or environment variables that can be set for customization.
