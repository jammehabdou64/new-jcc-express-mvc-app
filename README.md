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
ts-node artisanNode make:controller UsersController
```

To generate a model:

```bash
ts-node artisanNode make:model User
```

To generate a request class:

```bash
ts-node artisanNode make:request UserRequest
```

To generate a controller, model and migration :

```bash
ts-node artisanNode make:model User -mcr
```

To generate a controller, model, migration and seeder:

```bash
ts-node artisanNode make:model User -mcsr
```

To generate a migration

```bash
ts-node artisanNode make:migration create_users_table
```

To generate a seeder

```bash
ts-node artisanNode make:seeder UserSeeder
```

To run migration

```bash
ts-node artisanNode migrate
```

To undo the last migration

```bash
ts-node artisanNode migrate:rollback
```

To undo multiple migration

```bash
ts-node artisanNode migrate:rollback --steps=3
```

To drop all migrations

````bash
ts-node artisanNode migrate:reset
``

To drop all migrations and re-run migrations

```bash
ts-node artisanNode migrate:fresh
````

To run seeders

```bash
ts-node artisanNode db:seed
```

To run single seeder

```bash
ts-node artisanNode db:seed --class=UserSeeder
```

## Project Structure

```bash
project-root/
|--app
| |--Config/
| | | --app.ts
| | |--egine.ts
| |--Http
| | |--Controllers/
| | | |--UsersController.ts
| | |--Middlewares/
| | |  |--app.js
| | |--Request/
| | |  |--UserRequest.js
| | |--kernel.ts
| |--Models/
| | |--User.ts
|--bootstrap
| |-app.ts
|--public/
| |--css/
| | |--app.css
| |--js/
| | |--app.js
|--resources/
| |--views/
| | |--partials/
| | | |--header.blade.html
| | |--layout.blade.html
| | |--index.blade.html
| |--css/
| | |--app.css
| |--js/
| | |--app.js
|--routes/
| |--web.ts
| |--api.ts

```

- `app/Config/`:Configuration files for the application.
- `app/Http/Controllers/`:Controllers handling the application logic.
- `app/Models/`:Mongoose for database interactions.
- `public/`:Static assets like CSS and JavaScript files.
- `routes/`: Two routes file (web.js | api.js) where routes are registered.
- `resources/views/`: jsBlade templates for rendering views.
- `server.ts`: Main application file.
- `app/Htpp/kernel.ts`:Global middlewares

## Routing and Middleware

Basic routing is meant to route your request to an appropriate controller. The routes of the application can be defined in route/web.js or route/api.js file. Here is the general route syntax for each of the possible request. You can define the URLs of your application with the help of routes. These routes can contain variable data, connect to controllers or can be wrapped into middlewares.

```js
import { Route } from "jcc-express-mvc/Route";
import { auth } from "jcc-express-mvc";
import { UsersController } from "@Controllers/UsersController";

Route.get("/", (req, res, next) => {
  return res.json({ message: "Hello, World" });
});
```

Or

```js
Route.get("/", [UsersController, "index"]);

Route.middleware(auth).get("/profile", (req, res, next) => {
  return res.json({ message: "I'm Authenticated" });
});
```

### Route Group

Route groups in this framework allow for the organization and sharing of route attributes, such as middleware, across multiple routes without the need to specify them individually for each route.

```js
Route.prefix("/users").group((Route) => {
  Route.get("/", UsersController.index);
  Route.get("/create", UsersController.create);
  Route.post("/", UsersController.store);
  Route.get("/:id", UsersController.show);
  Route.patch("/:id", UsersController.edit);
  Route.delete("/:id", UsersController.destroy);
});
```

### Route Prefix

The prefix method adds a string to the beginning of each route name in the group.
The method is used to prefix each route name in the group with "users", making it easier to identify and manage routes related to user functionality.

```js
Route.prefix("/users").group((Route) => {
  Route.get("/", "index");
  Route.get("/create", "create");
  Route.post("/", "store");
  Route.get("/{id}", "show");
  Route.patch("/{id}", "edit");
  Route.delete("/{id}", "destroy");
});
```

### Route Controller

If all routes in a group use the same controller, you can use the controller method to set that controller for the whole group. Then, when creating routes, you just need to specify the method they call on that controller.

```js
Route.controller(UsersController).group((Route) => {
  Route.get("/", "index");
  Route.get("/create", "create");
  Route.post("/", "store");
  Route.get("/{id}", "show");
  Route.patch("/{id}", "edit");
  Route.delete("/{id}", "destroy");
});
```

## Routes Parameter

In the `jcc-express-mvc` framework, routes often contain parameters that are dynamic values parsed from the URL path. These parameters are defined using placeholders in the route path and are accessible within route handlers via the `req.params` object.
Routes parameters can be defined in route paths using placeholders indicated by : or {} followed by the parameter name.

```js
const { Route } = require("jcc-express-mvc");

Route.get("/:id", (req, res) => {
  console.log(req.params.id);
});
```

or

```js
const { Route } = require("jcc-express-mvc");

Route.get("/{id}", (req, res) => {
  console.log(req.params.id);
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
import { bcrypt, Auth } from "jcc-express-mvc";
import { Request, Response, Next } from "jcc-express-mvc/http";
import { User } from "@/Model/User";
export class UsersController {
  //

  async index(req: Request, res: Response, next: Next) {
    return res.json({
      message: await User.all(),
    });
  }

  //

  async store(req: Request, res: Response, next: Next) {
    await req.validate({
      name: ["required"],
      email: ["required", "unique:users"],
      password: ["required", "min:6"],
    });

    const save = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt(req.body.password),
      primary_phone: "7501035",
    });

    return save
      ? Auth.attempt(req, res, next)
      : res.json({ message: "Invalid credentials" });
  }

  //

  async show(req: Request, res: Response, next: Next) {
    return res.json({
      message: await User.find(req.params.id),
    });
  }
}
```

## Validation

The jcc-express-mvc framework comes with built-in validation rules that enable you to ensure the validity of data submitted by users before further processing. These validation rules can be applied either in web routes or API routes using the provided methods.

#### Web Validation

In web routes, you can use the `req.validate()` method to validate incoming data. Here's an example of how to use it:

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

- `name`:Specifies the name of the field to be validated.
- `required`: Ensures that the field is present and not empty.
- `email`:Validates that the field is a valid email address.
- `unique:user`:Checks uniqueness of the field value against a database table (e.g., checking if an email is already registered).

#### Api Validation

For API routes, the `req.apiValidate()` method is used to perform validation. Here's an

```js
async store(req, res, next) {
  const validateData = await req.apiValidate({
    name: ["required"],
    email: ["email", "unique:user"],
    password: ["min:6"],
  });

  res.json({ validateData });
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
 ts-node artisanNode make:request UserRequest
```

### example

```js
import { FormRequest } from "jcc-express-mvc/FormRequest";
import { Request } from "jcc-express-mvc/http";

export class UserRequest extends FormRequest {
  constructor(req: Request) {
    super(req);
  }

  async rules() {
    await this.apiValidate({
      //
    });
  }

  async save() {
    await this.rules();
  }
}
```

In jcc-express-mvc, the `errors` variable in the view file holds all the validation errors. To access errors for a specific field, use errors.field. Whereas the `old` variable holds all the input values.

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

`jcc-express-starter` allows you to use any templating engine of your choice for rendering views. The package comes pre-configured with jsBlade, which is similar to Laravel's Blade templating engine. However, you can easily switch to another templating engine by configuring it in the `app/Config/engine.ts` file.

### Configuring Templating Engine

To configure a different templating engine, follow these steps:

1. Navigate to the `app/Config` directory in your project.

2. Open the `engine.ts` file.

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

- **bcrypt**: A async function for password hashing using bcrypt.

  ```javascript
  import { bcrypt } from "jcc-express-mvc";
  const hashPass = await bcrypt("123456");
  // Example usage
  ```

- **verifyHash**: A async function for verifying hashed passwords.

  ```javascript
  import { verifyHash } from "jcc-express-mvc";
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
const MessagesController = getApiController("MessagesController");

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

## jsBlade Templating Engine

jcc-express-starter supports the jsBlade templating engine, which provides directives similar to Laravel Blade. jsBlade allows you to write expressive and clean templates for rendering views in your Express.js applications.

### Usage

1. Create your view files with the .blade.html extension (or the extension specified in your template engine configuration).
2. Use jsBlade directives in your view files to write dynamic and reusable templates.

With jsBlade, you can create a flexible views for your Express.js applications, making it easier to build and maintain your frontend code.

### Directives

jsBlade provides several directives that you can use in your views:

- **@if**, **@else**, **@endif**, **@ternary**: Conditional statements for rendering content based on conditions.

  ```html
  @if(condition)
  <!-- Content to render if condition is true -->
  @else
  <!-- Content to render if condition is false -->
  @endif

  <!---->
  @ternary(condition ?
  <!--content-->
  :<!--content-->)
  ```

**@foreach, @endforeach:** Looping through arrays.

```html
@foreach(array as item)
<!-- Content to render for each item in the array -->
@endforeach
```

**@include**: Including other view files within the current view..

```html
@include('partials.header')
```

**@extends, @section, @endsection:** Template inheritance for creating reusable layouts and sections.

```html
<!-- layout.app.blade.html -->
@section('content')
<!-- Content to render in the section -->
@endsection

<!-- index.blade.html -->
@extends('layout') @section('content')
<!-- Content specific to the index view -->
@endsection
```

**@guest, @endguest, @auth, @endauth:** Authentication directives for displaying content based on the user's authentication status.

```html
@auth
<!-- Content to render for authenticated users -->
@endauth @guest
<!-- Content to render for guests (unauthenticated users) -->
@endguest
```

### Accessing Authenticated User

You can access the authenticated user in your frontend engine using the `{{ Auth.name }}` syntax. This allows you to retrieve the name of the authenticated user directly in your views.

For example, to display the name of the authenticated user in a welcome message:

```html
@if(Auth.name)
<p>Welcome, {{ Auth.name }}!</p>
@else
<p>Welcome, Guest!</p>
@endif
```

### TinkerNode

TinkerNode provides an interactive command-line interface for executing JavaScript code and Mongoose queries directly in the terminal, allowing for quick testing and debugging of MongoDB interactions.

### Features

- Interactive Console: TinkerNode provides an interactive console environment, similar to the Laravel Tinker, where you can execute JavaScript code and Mongoose queries on-the-fly.

- Mongoose Integration: TinkerNode seamlessly integrates with Mongoose, a popular MongoDB object modeling tool for Node.js, enabling you to work with MongoDB databases using familiar Mongoose syntax.

```bash
node TinkerNode

>User.all()
[
  {
    name:"John Doe",
    email:"john@gmail.com"
  }
]

```
