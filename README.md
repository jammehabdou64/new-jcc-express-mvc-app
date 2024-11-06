## Warning

**Note: This package is not recommended for use in production environments. It's intended for learning purposes only. Use in production at your own risk.**

# jcc-express-starter

## 1. Introduction

jcc-express-mvc is a lightweight Node.js package that simplifies the development of Express.js applications using a structure inspired by Laravel's file organization. It encourages the use of the Model-View-Controller (MVC) architectural pattern, providing a clean and organized approach to building and scaling your Express.js projects.

## 2. Features

- #### Express.js Framework (jcc-express-starter)

  - Sets up an Express.js web application with MVC architecturevalidation for form data
  - Opinionated project structure for organized code
  - Built-in validation methods
  - Two routes file for easy route management
  - Comes with jsBlade similar to laravel blade for view rendering, But you can use any templating engine of choice.
  - Includes configuration with Mysql
  - Includes configuration with dotenv

- #### ORM (jcc-eloquent)
  - Query Builder with methods for complex SQL operations
  - Model system with fillable, guarded, and casts properties
  - Relationships, including polymorphic relations (morphMany)
  - Event hooks (e.g., creating, booted) for action triggers
  - Schema Builder for migrations, inspired by Laravel's schema API

## 3. Installation

#### Prerequisites

- `Node.js and npm installed`
- `ts-node globally installed`

Make sure you have Node.js and npm (Node Package Manager) installed and install ts-node globally on your machine.
To create a new Express.js project using `jcc-express-starter`, simply run the following command in your terminal:

```bash
npx jcc-express-starter my-express-app
```

## 4. Quick Start Guide

This will create a new directory named my-express-app and set up the Express.js application inside it.

#### 1.Navigate to the newly created directory:

```bash
cd my-express-app
```

#### 2. Configure Environment

Edit the .env file to configure your database and other environment-specific settings. Example .env:

```bash
APP_SESSION_SECTRET=app-session-1203-4-556-22
PORT=5500

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=my_database
DB_USERNAME=root
DB_PASSWORD=password

```

#### 3. Start the application:

```bash
npm run dev
```

## 5. ArtisanNode CLI Commands

Generate Controllers, Models, Migrations, and Seeders:

```bash
ts-node artisanNode make:controller UsersController # Controller
ts-node artisanNode make:model User # Model
ts-node artisanNode make:request UserRequest #Request
ts-node artisanNode make:model User -mcr  # Model, Controller, Migration
ts-node artisanNode make:model User -mcsr # Model, Controller, Migration, Seeder

```

Run Database Migrations:

```bash
ts-node artisanNode migrate
ts-node artisanNode migrate:rollback            # Undo the last migration
ts-node artisanNode migrate:rollback --steps=3  # Undo multiple migrations
ts-node artisanNode migrate:fresh               # Reset migrations and re-run
ts-node artisanNode migrate:reset               # Reset migrations
ts-node artisanNode migrate:fresh               # Reset migrations and re-run
ts-node artisanNode db:seed                     # Run seeders
ts-node artisanNode db:seed --class=UserSeeder  # Check for UserSeeder in the seeders and run the seeder



```

## 6. Core Modules

#### Express Starter (jcc-express-starter)

- `Service Container`: Registers services and manages dependency injection. Services can be accessed in controllers through constructor injection.
- `CLI Commands`: Provides a custom CLI that can be extended with user-defined commands as providers.
- `Global Helpers`: Offers utility functions globally accessible across the application, similar to Laravel helpers.
- `Error Handling`: Exception handling is customized to include stack traces, file paths, and code snippets with highlights for the error line.

### ORM (jcc-eloquent)

- `Model Class`: Supports mass assignment protection with fillable and guarded properties. Includes attribute casting with the casts property.
- `Query Builder`: Flexible query builder supporting complex queries like select, where, orderBy, paginate, exists, onlyTrashed, and restore.
- `Schema Builder`: Includes a Blueprint class that allows defining table schemas, adding columns, foreign keys, and enabling soft deletes.

## 7. jcc-eloquent

`jcc-eloquent` is an ORM for Node.js designed to provide Eloquent-style features and database interaction. It simplifies complex queries and supports models, relationships, mass assignment, and events

#### Key Features

- Model relationships: hasOne, hasMany, morphMany, etc.
- Eloquent-like mass assignment with fillable and guarded properties
- Attribute casting with casts and hidden properties for sensitive fields
- Event hooks for lifecycle methods (booted, creating, etc.)
- QueryBuilder with chainable methods like select, where, orderBy, and pagination

#### Basic Usage

Define models with properties like fillable, guarded, hidden, casts, and event hooks.

```js
import { Model } from "jcc-eloquent";

class User extends Model {
    // Attributes hidden from JSON serialization
  protected static hidden: string[] = ["password"];

  // Attributes allowed for mass assignment
  protected static fillable: string[] = ["name"];

  // Attributes excluded from mass assignment
  protected static guarded: string[] = ["role_id"];

  // Enables soft delete functionality
  protected static softDelete: boolean = true;

// Cast attributes with custom transformations
  protected static casts = {
      created_at: 'date', // 2024-05-23
      created_at:'time',// 12:58
      created_at:'datetime'// 2024-05-23 12:58
      updated_at:'now'// 2 hours ago
      updated_at:'date:d-m-y' // 23-05-2024
      updated_at:'date:d/m/y' // 23/05/2024
      getEmail: this.getEmail
      setEmail: this.setEmail
      id:'integer' // return the id as an integer  1;
      price:'string' //  return the price as an string "20000"
      draft:'array' // Will parse to stringyfy the data
    };

     // Attribute getter - retrieves email in lowercase
    protected static getEmail(value)
    {
      return value.toUppercase()
    }

  // Attribute setter - sets email in uppercase
    protected static setEmail(value)
    {
      return value.toLowercase()
    }

}
```

#### Available Relationships

```js
class Post extends Model {
  author() {
    return this.belongsTo(User);
  }

  comments() {
    return this.hasMany(Comment);
  }

  likes() {
    return this.morphyMany("likes");
  }

  //Implement custom events to hook into model actions.
  static booted(): void {
    this.creating((data) => {
      // Custom logic before creating a post (e.g., setting defaults)
    });

    this.created((data) => {
      // Custom logic after creating a post (e.g., setting defaults)
    });

    this.updating((data) => {
      // Custom logic before updating a post (e.g., setting defaults)
    });

    this.updated((data) => {
      // Custom logic after updating a post (e.g., setting defaults)
    });

    this.deleting((data) => {
      // Custom logic before deleting a post (e.g., setting defaults)
    });
  }
}
```

### Querying the Database

```js
import { bcrypt, Auth } from "jcc-express-mvc";
import { Request, Response, Next } from "jcc-express-mvc/http";
import { Post } from "@/Model/Post";
import { Blueprint } from "jcc-eloquent/QueryBuilder";
export class PostsController {
  //

  async index(req: Request, res: Response, next: Next) {
    return res.json({
      message: await Post.with("author",{comments(query:QueryBuilder)=>query.where('status','active').with('user')
      }).paginate(req, 100),
    });
  }

  //

  async store(req: Request, res: Response, next: Next) {
    const attributes = await req.validate({
      name: ["required"],
      email: ["required", "unique:post"],
      password: ["required", "min:6"],
    });

    const save = await Post.create({ attributes });
    return save
      ? Auth.attempt(req, res, next)
      : res.json({ message: "Invalid credentials" });
  }

  //

  async show(req: Request, res: Response, next: Next) {
    return res.json({
      message: await Post.find(req.params.id),
    });
  }
}
```

`Model.all()`
Retrieves all records from the database table associated with the current model.

```js
const users = await User.all();
console.log(users);
```

`Model.find(id)`
Retrieves a single record from the database table associated with the current model by its ID.

```js
const user = await User.find(1);
console.log(user);
```

`Model.create(data)`
Creates one or more records in the database table associated with the current model.

```js
const user = await User.create({
  name: "John Doe",
  email: "john.doe@example.com",
  age: 30,
});
console.log(user);

const users = await User.create([
  { name: "Jane Doe", email: "jane.doe@example.com", age: 28 },
  { name: "John Smith", email: "john.smith@example.com", age: 35 },
]);
console.log(users);
```

`save()`
Saves the current instance to the database. If the instance has an id, it performs an update; otherwise, it performs an insert.

```js
const user = new User();
user.name = "Abdou";
await user.save();
```

### Relationship Definitions

- `hasOne(modelName, foreignKey = null, localKey = "id")`
  Defines a one-to-one relationship between the current model and another model.

- `hasMany(model, foreignKey = null, localKey = "id")`
  Defines a one-to-many relationship between the current model and another model.

- `belongsTo(modelName, foreignKey = null, localKey = "id")`
  Defines a belongs-to relationship between the current model and another model.

### Using Relationships

```js
import { QueryBuilder } from "jcc-eloquent/QueryBuilder";

const user = await User.with("posts").get();
const post = await Post.with({ author(query:QueryBuilder) => query.where('status', 'active') } , 'comments').get();
```

### Query Builder Methods

The following methods are available in the query builder:

- `select(...columns)`
- `distinct()`
- `from(tableName)`
- `where(column, operator, value)`
- `whereLike(column, searchValue)`
- `orWhere(column, operator, value)`
- `orderBy(column, direction)`
- `limit(value)`
- `take(value)`
- `offset(count)`
- `groupBy(...columns)`
- `having(column, operator, value)`
- `join(table, firstColumn, operator, secondColumn)`
- `innerJoin(table, firstColumn, operator, secondColumn)`
- `leftJoin(table, firstColumn, operator, secondColumn)`
- `rightJoin(table, firstColumn, operator, secondColumn)`
- `insert(data)`
- `get()`
- `update(data)`
- `delete(id)`
- `latest(column)`
- `oldest(column)`
- `with(...relations)`
- `each(callback)`
- `map(callback)`
- `value(field)`
- `exists()`
- `doesntExist()`
- `count()`
- `max(column)`
- `min(column)`
- `sum(column)`
- `avg(column)`
- `paginate(request, perPage)`
- `resetQuery()`
- `onlyTrashed()`
- `withTrashed()`
- `restore()`
- `whereHas(relationalMethod, callback)`

### Query Instance Methods

Once you've retrieved a model instance from the database, you can interact with it using the following methods:

#### 1. `save()`

**Description:** Saves the current instance to the database. If it's a new instance, it will perform an `INSERT`; if it's an existing instance, it will perform an `UPDATE`.

**Returns:** `Promise<any>`

**Example:**

```typescript
const user = await User.find(1);
user.name = "Updated Name";
await user.save(); // Updates the existing record
```

#### 2. `saveQuietly()`

**Description:** Similar to `save()`, but suppresses any events that would normally be triggered during the save operation.

**Returns:** `Promise<any>`

**Example:**

```typescript
import { Model } from "jcc-eloquent";

class Post extends Model {
  protected static booted() {
    this.created(async (data) => {
      data.slug = "slug";
      await data.saveQuietly(); // Saves without triggering any events
    });
  }
}
```

#### 3. `load(...relations: Array<any>)`

**Description:** Eager loads relationships on the model instance.

**Returns:** `Promise<any>`

**Example:**

```typescript
const user = await User.find(1);
await user.load("posts", "comments"); // Loads posts and comments for the user
```

#### 4. `update()`

**Description:** Updates the current instance in the database with the new attribute values.

**Returns:** `Promise<any>`

**Example:**

```typescript
const user = await User.find(1);
user.email = "new.email@example.com";
await user.update(); // Updates the email field in the database
```

#### 5. `delete()`

**Description:** Deletes the current instance from the database.

**Returns:** `Promise<boolean>`

**Example:**

```typescript
const post = await Post.find(1);
await post.delete(); // Deletes the post from the database
```

#### Query Instance Methods Overview

The following methods are part of the Query Instance used for interacting with the database:

```typescript
//Query Instance Methods
  save() ;
  saveQuietly();
  load(...relations: Array<any>): ; // Eager loads relationships
  update(); // Updates the current instance in the database
  delete(); // Deletes the current instance from the database

```

- **Methods**:
  - `save()`: Persists the current instance to the database.
  - `saveQuietly()`: Saves the instance without firing any events (e.g., hooks).
  - `load()`: Loads specified relationships for the instance, eager loading them for optimization.
  - `update()`: Updates the current instance with new data.
  - `delete()`: Deletes the instance from the database, returning a boolean indicating success.

#### Schema Builder

Define database schemas with `Blueprint` for migrations.

```js
import { Blueprint } from "jcc-eloquent";

Blueprint.create("users", (table) => {
  table.id();
  table.string("name");
  table.unsignedBigInteger("role_id");
  table.foreign("role_id").references("id").on("roles");
  table.timestamps();
});
```

## 8. Project Structure

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
| |--Providers
| | |--AppServiceProvider.ts
|--bootstrap
| |-app.ts
|--database
| |--migrations
| | |--create_users_table.ts
| |--seeders
| | |--UserSeeder.ts
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
- `app/Models/`:Models for database interactions.
- `app/Providers`:
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
import { Route } from "jcc-express-mvc/Route";

Route.get("/:id", (req, res) => {
  console.log(req.params.id);
});
```

or

```js
import { Route } from "jcc-express-mvc/Route";

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

## 8. Custom Providers

Create and register providers to extend the framework's functionality. Providers can register new services or handle custom logic for your app.

```js
import { Container } from "jcc-express-mvc/Container";
import { ServiceProvider } from "jcc-express-mvc/lib/Services/ServiceProvider";

export class AppServiceProvider extends ServiceProvider {
  constructor(app: Container) {
    super(app);
  }

  public register(): void {}

  public boot(): void {}
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

Save the changes to the engine.ts file.

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
  import { auth } from "jcc-express-mvc";
  import { Route } from "jcc-express-mvc/Route";

  Route.middleware(auth).get("/profile", (req, res) => {
    //Access auth user's profile
  });
  ```

- **apiAuthenticated**: A function for API JWT authentication. You can i get the user id with req.id

```javascript
const { ApiRoute, apiAuth } = require("jcc-express-mvc");

// Example usage
ApiRoute.middleware(apiAuth).post("/api/data", (req, res) => {
  // Access authenticated user's data
  //req.id
});
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

- Interactive Console: TinkerNode provides an interactive console environment, similar to the Laravel Tinker, where you can execute JavaScript code and jcc-eloquent queries.

- Jcc eloquent Integration: TinkerNode seamlessly integrates with jcc-eloquent. enabling you to work with mysql databases using jcc-eloquent syntax.

```bash
te-node tinkerNode

>User.all()
[
  {
    name:"John Doe",
    email:"john@gmail.com"
  }
]

```
