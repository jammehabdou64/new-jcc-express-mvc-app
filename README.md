# JCC Express MVC Framework Documentation

Welcome to the JCC Express MVC framework documentation. JCC Express MVC is a powerful, expressive web application framework built on Express.js, designed to make web development a creative and enjoyable experience.

## 📚 Documentation

For complete documentation, visit: **[https://www.jcc-express.uk/](https://www.jcc-express.uk/)**

---

# Introduction

JCC Express MVC is a modern, full-featured web application framework built on Express.js that follows Laravel-style architecture patterns. It is **specifically designed and optimized for the Bun runtime**, offering a familiar developer experience for those coming from the Laravel ecosystem while leveraging the exceptional performance of Bun.

The framework provides a robust set of tools and features including routing, controllers, middleware, database abstraction with Eloquent ORM, authentication, caching, queues, events, and much more. Whether you're building a simple API or a complex enterprise application, JCC Express MVC has the tools you need.

## Why JCC Express MVC?

- **Laravel-Inspired**: Familiar patterns and conventions for Laravel developers
- **Bun Optimized**: Built specifically for Bun runtime for maximum performance
- **Type-Safe**: Full TypeScript support with excellent type inference
- **Eloquent ORM**: Beautiful, expressive database interactions
- **Modern Architecture**: Service container, dependency injection, and more
- **Developer Experience**: Intuitive APIs and comprehensive tooling

## Requirements

Before you begin, ensure your machine meets the following requirements:

- **Bun runtime** (v1.0.0 or higher) - Required
- **Node.js** (v18.0.0 or higher) - For npm package management
- **Database**: MySQL 5.7+, PostgreSQL 10+, or SQLite 3.8+
- **Redis** (optional) - For caching and queue management

---

# Installation

## Prerequisites

Before using this framework, you must have Bun installed on your machine.

1. Install Bun (if not already installed):

```bash
curl -fsSL https://bun.sh/install | bash
```

2. Verify Bun installation:

```bash
bun --version
```

## Creating a New Project

To create a new JCC Express MVC project, use the official starter template:

```bash
bunx jcc-express-starter my-express-app
```

This command will create a new directory named `my-express-app` with all the necessary files and directory structure for your application.

### Project Setup

After creating your project, navigate to the project directory:

```bash
cd my-express-app
```

Then install the project dependencies:

```bash
npm install
```

### Starting the Development Server

Once dependencies are installed, you can start the development server:

```bash
bun run dev
```

Your application will be available at `http://localhost:5500` (or the port specified in your `.env` file).

---

# Configuration

JCC Express MVC uses a centralized configuration system that allows you to manage your application's settings in a clean, organized manner. All configuration files are stored in the `app/Config` directory, and sensitive values are managed through environment variables.

## Environment Configuration

For security and flexibility, JCC Express MVC uses environment files to store sensitive configuration values. Your application's `.env` file should not be committed to version control, as it may contain API keys, passwords, and other sensitive information.

### Environment File Setup

Copy the example environment file to create your own:

```bash
cp .env.example .env
```

### Environment Variables

Edit your `.env` file to configure your application. Here are the essential variables:

```env
# Application
APP_NAME="JCC Express"
APP_ENV=local
APP_KEY=your-secret-key-here
APP_DEBUG=true
APP_URL=http://localhost:5500
PORT=5500

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=jcc_express
DB_USERNAME=root
DB_PASSWORD=

# Cache
CACHE_DRIVER=memory
CACHE_PREFIX=jcc_express_cache

# Session
SESSION_DRIVER=memory
SESSION_SECRET=your-session-secret

# Redis (optional)
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

### Accessing Environment Variables

You can access environment variables in your application using the `config` helper or by importing the config directly:

```typescript
import { config } from "@/app/Config";

const appName = config.get("APP_NAME");
const dbConnection = config.get("DB_CONNECTION");
```

## Configuration Files

All configuration files are located in the `app/Config/` directory. These files allow you to configure specific aspects of your application.

### CORS Configuration

The `cors.ts` file allows you to configure Cross-Origin Resource Sharing settings:

```typescript
// app/Config/cors.ts
export const cors = {
  origin: "*", // or specify allowed origins: ["http://localhost:3000"]
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true, // Allow cookies
};
```

### Rate Limiting

Configure rate limiting in `app/Config/rate-limit.ts`:

```typescript
export const rateLimit = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
};
```

### Session Configuration

Configure session settings in `app/Config/session.ts`:

```typescript
export const session = {
  secret: process.env.SESSION_SECRET || "your-secret-key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.APP_ENV === "production",
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
};
```

---

# Global Helpers

JCC Express MVC provides several global helper functions that are available everywhere in your application without needing to import them. These helpers are automatically registered when your application boots.

## Available Global Helpers

### Application Instance

Access the application instance anywhere in your code:

```typescript
const userService = app.resolve("UserService");
const config = app.resolve("Config");
```

### Environment Variables

Get environment variable values with optional default:

```typescript
const port = env("PORT", "5500");
const dbHost = env("DB_HOST");
const appName = env("APP_NAME", "JCC Express");
```

### Event Dispatching

Dispatch events using the `emit` helper:

```typescript
import { UserRegistered } from "@/Events/UserRegistered";

// Dispatch an event
await emit(new UserRegistered(user));
```

### Queue Job Dispatching

Dispatch queue jobs using the `dispatch` helper:

```typescript
import { ProcessPodcast } from "@/Jobs/ProcessPodcast";

// Dispatch a job immediately
await dispatch(new ProcessPodcast(podcast));

// Jobs with delay are automatically handled
const job = new ProcessPodcast(podcast);
job.delay = 5000; // 5 seconds
await dispatch(job);
```

### String Utilities

Access the `Str` utility class:

```typescript
const slug = str().slug("Hello World"); // "hello-world"
const random = str().random(10); // Random string
const camel = str().camel("hello_world"); // "helloWorld"
```

### Password Hashing

Hash and verify passwords:

```typescript
// Hash a password
const hashedPassword = await bcrypt("plain-text-password");

// Verify a password
const isValid = await verifyHash("plain-text-password", hashedPassword);
```

### JWT Tokens

Sign and verify JWT tokens:

```typescript
// Sign a JWT token
const token = jwtSign({ id: 1, email: "user@example.com" });

// Verify a JWT token
try {
  const payload = jwtVerify(token);
  console.log(payload); // { id: 1, email: "user@example.com" }
} catch (error) {
  // Token is invalid
}
```

### Root Path

Get the root path of your application:

```typescript
const storagePath = rootPath("storage/app");
const configPath = rootPath("app/Config");
const publicPath = rootPath("public");
```

## Complete Example

Here's an example showing multiple global helpers in use:

```typescript
import { UserRegistered } from "@/Events/UserRegistered";
import { SendWelcomeEmail } from "@/Jobs/SendWelcomeEmail";

// In a controller or service
async function registerUser(data: any) {
  // Hash password
  const hashedPassword = await bcrypt(data.password);
  
  // Create user
  const user = await User.create({
    ...data,
    password: hashedPassword,
  });
  
  // Dispatch event
  await emit(new UserRegistered(user));
  
  // Dispatch job
  await dispatch(new SendWelcomeEmail(user));
  
  // Generate JWT token
  const token = jwtSign({ id: user.id, email: user.email });
  
  // Get storage path
  const avatarPath = rootPath(`storage/app/avatars/${user.id}`);
  
  return { user, token };
}
```

---

# Directory Structure

JCC Express MVC follows a convention-over-configuration approach with a familiar, organized directory structure. Understanding this structure will help you know where to place files and how the framework organizes code.

## Root Directory Structure

```
project-root/
├── app/                    # Application core
│   ├── Config/             # Configuration files
│   ├── Events/             # Event classes
│   ├── Http/               # HTTP layer
│   │   ├── Controllers/    # Controller classes
│   │   ├── Middlewares/    # Middleware classes
│   │   ├── Requests/       # Form request classes
│   │   └── kernel.ts       # HTTP kernel (middleware registration)
│   ├── Jobs/               # Queue job classes
│   ├── Listener/           # Event listener classes
│   ├── Models/             # Eloquent model classes
│   ├── Observer/           # Model observer classes
│   ├── Providers/          # Service provider classes
│   ├── Repository/         # Repository classes
│   └── Services/           # Service classes
├── bootstrap/               # Application bootstrapping
│   ├── app.ts              # Application initialization
│   └── providers.ts        # Service provider registration
├── database/                # Database files
│   ├── migrations/         # Database migration files
│   └── seeders/            # Database seeder classes
├── public/                  # Publicly accessible files
│   └── build/              # Compiled assets
├── resources/               # Raw, uncompiled assets
│   ├── views/              # Template files (jsBlade)
│   ├── css/                # CSS files
│   └── js/                 # JavaScript files
├── routes/                  # Route definitions
│   ├── web.ts              # Web routes
│   └── api.ts              # API routes
├── storage/                 # Storage directory
│   ├── app/                # Application files
│   └── sessions/           # Session files
├── tests/                   # Test files
│   ├── Feature/            # Feature tests
│   └── Unit/               # Unit tests
└── server.ts                # Application entry point
```

## The App Directory

The `app` directory contains the core code of your application. Almost all of your application's classes will be in this directory.

### Controllers

Controllers are stored in `app/Http/Controllers` and handle incoming HTTP requests. They contain the logic for processing requests and returning responses.

### Middleware

Middleware classes are stored in `app/Http/Middlewares` and provide a mechanism for filtering HTTP requests entering your application.

### Models

Eloquent models are stored in `app/Models`. Models allow you to query for data in your database tables and insert new records.

### Providers

Service providers are stored in `app/Providers` and are the central place to bootstrap your application. They bind services into the service container and register event listeners.

## The Routes Directory

The `routes` directory contains all of your route definitions. The framework ships with two route files: `web.ts` for your web routes and `api.ts` for your API routes.

## The Resources Directory

The `resources` directory contains your raw, uncompiled assets such as CSS, JavaScript, and view templates.

## The Public Directory

The `public` directory contains the `index.php` file, which is the entry point for all requests entering your application. This directory also serves as a good place to store assets such as images, fonts, and compiled CSS and JavaScript files.

---

# Lifecycle Overview

Understanding the request lifecycle of JCC Express MVC will help you better understand how the framework works and where to hook into the framework's execution flow.

JCC Express MVC uses Express's native request/response lifecycle, extending Express's `Request` and `Response` objects with additional methods through `AppRequest` and `AppResponse` interfaces. This means all standard Express middleware and methods work seamlessly with the framework.

## Request Lifecycle

Every request to your JCC Express MVC application follows a specific lifecycle path. Understanding this lifecycle is crucial for building effective applications. The framework uses Express's native HTTP handling, so requests and responses are standard Express objects with additional framework methods.

### Entry Point

The entry point for all requests to a JCC Express MVC application is the `server.ts` file. This file is very simple and serves as the starting point for loading the rest of your application:

```typescript
// server.ts
import { app } from "./bootstrap/app";

app.run();
```

### Application Bootstrap

When a request enters your application, it first goes through the application bootstrap process:

1. **Service Container**: The application instance is created and the service container is initialized
2. **Service Providers**: All service providers are registered and booted
3. **Configuration**: Application configuration is loaded
4. **Routes**: Route files are loaded and registered

### HTTP Kernel

After bootstrapping, the request is sent to the HTTP kernel (`app/Http/kernel.ts`). The kernel handles:

1. **Global Middleware**: Applies middleware that should run on every request
2. **Route Matching**: Matches the request URI to a defined route
3. **Route Middleware**: Applies middleware specific to the matched route

### Route Execution

Once a route is matched:

1. **Controller Resolution**: If the route uses a controller, the controller is instantiated via the service container
2. **Dependency Injection**: Constructor and method dependencies are automatically resolved
3. **Method Execution**: The controller method or route closure is executed
4. **Response Generation**: A response is generated and returned

### Response

The response flows back through the middleware stack (in reverse order) and is finally sent to the client.

## Service Provider Lifecycle

Service providers are the central place where your application is bootstrapped. They have two lifecycle methods:

1. **Register**: Bind services into the service container
2. **Boot**: Perform any actions after all providers are registered

Understanding this lifecycle will help you know where to place your code and how to extend the framework's functionality.

---

# Service Container

The JCC Express MVC service container is a powerful tool for managing class dependencies and performing dependency injection. Dependency injection is a method of removing hard-coded class dependencies and replacing them with injected dependencies, making your code more maintainable and testable.

## Understanding the Service Container

The service container is the central place where all of your application's services are registered and resolved. It's responsible for automatically resolving class dependencies through constructor injection.

## Dependency Injection

The service container automatically resolves dependencies by examining a class's constructor type hints. When the container sees a type-hinted dependency, it will attempt to resolve it from the container.

### Basic Dependency Injection

You can type-hint dependencies in your controllers and other classes. The service container will automatically resolve them:

```typescript
import { Inject } from "jcc-express-mvc";
import { UserService } from "@/Services/UserService";

@Inject()
export class UserController {
  constructor(private userService: UserService) {}

  async index() {
    return this.userService.all();
  }
}
```

### Binding Services

You can bind services into the container in your service providers. It's recommended to use `class.name` instead of string literals for better maintainability:

```typescript
import { ServiceProvider } from "jcc-express-mvc";
import { UserService } from "@/Services/UserService";
import { EmailService } from "@/Services/EmailService";

export class AppServiceProvider extends ServiceProvider {
  register(): void {
    // Bind as singleton using class.name (recommended)
    this.app.singleton(UserService.name, () => {
      return new UserService();
    });
    
    // Bind as instance (new instance each time) using class.name
    this.app.bind(EmailService.name, () => {
      return new EmailService();
    });
    
    // You can also bind directly without a factory function
    this.app.singleton(UserService.name, UserService);
    this.app.bind(EmailService.name, EmailService);
  }
}
```

**Why use `class.name`?**
- More maintainable: If you rename the class, TypeScript will catch errors
- Less error-prone: No typos in string literals
- Better IDE support: Autocomplete and refactoring work better
- Type-safe: TypeScript can verify the class name matches

### Resolving Services

You can resolve services from the container using either the class name or `class.name`:

```typescript
import { app } from "@/bootstrap/app";
import { UserService } from "@/Services/UserService";

// Using class.name (recommended)
const userService = app.resolve(UserService.name);
// or with type annotation
const userService = app.resolve<UserService>(UserService.name);

// Using string literal (still works, but not recommended)
const userService = app.resolve("UserService");
```

## When to Use the Service Container

You typically don't need to manually interact with the service container. The framework automatically resolves dependencies through constructor injection. However, you may need to interact with the container when:

- Writing service providers
- Manually resolving services
- Binding custom services

---

# Service Providers

Service providers are the central place where all JCC Express MVC application bootstrapping takes place. Your own application, as well as all of the framework's core services, are bootstrapped via service providers.

## What are Service Providers?

Service providers are classes that bootstrap your application by binding services into the service container, registering event listeners, and performing other initialization tasks. Think of service providers as the "glue" that holds your application together.

## Writing Service Providers

All service providers extend the `ServiceProvider` class. Most service providers contain a `register` method and a `boot` method.

### The Register Method

Within the `register` method, you should only bind things into the service container. You should never attempt to register any event listeners, routes, or any other piece of functionality within the `register` method.

```typescript
import { ServiceProvider } from "jcc-express-mvc";
import { UserService } from "@/Services/UserService";
import { EmailService } from "@/Services/EmailService";

export class AppServiceProvider extends ServiceProvider {
  /**
   * Register any application services.
   */
  register(): void {
    // Bind services into the container using class.name (recommended)
    this.app.singleton(UserService.name, () => {
      return new UserService();
    });
    
    // Or bind directly
    this.app.bind(EmailService.name, EmailService);
  }
}
```

### The Boot Method

The `boot` method is called after all other service providers have been registered, meaning you have access to all other services that have been registered by the framework.

```typescript
import { ServiceProvider } from "jcc-express-mvc";

export class AppServiceProvider extends ServiceProvider {
  register(): void {
    // ...
  }

  /**
   * Bootstrap any application services.
   */
  boot(): void {
    // Access other services here
    const userService = this.app.resolve("UserService");
    // Perform initialization tasks
  }
}
```

## Registering Providers

All service providers are registered in the `bootstrap/providers.ts` file:

```typescript
import { AppServiceProvider } from "@/Providers/AppServiceProvider";
import { EventServiceProvider } from "@/Providers/EventServiceProvider";
import { QueueServiceProvider } from "@/Providers/QueueServiceProvider";

export const providers = [
  AppServiceProvider,
  EventServiceProvider,
  QueueServiceProvider,
  // Add your custom providers here
];
```

## Event Service Providers

For event-related functionality, extend the `EventServiceProvider` class:

```typescript
import { EventServiceProvider as ServiceProvider } from "jcc-express-mvc";
import { UserRegistered } from "@/Events/UserRegistered";
import { SendWelcomeEmail } from "@/Listeners/SendWelcomeEmail";

export class EventServiceProvider extends ServiceProvider {
  protected listen: Record<any, Function[]> = {
    UserRegistered: [SendWelcomeEmail],
  };

  protected subscribe: any[] = [];

  register(): void {}
}
```

## Deferred Providers

If your provider only registers bindings in the service container, you may choose to defer its registration until one of its registered bindings is actually needed. Deferring the loading of such a provider will improve the performance of your application, since it is not loaded from the filesystem on every request.

---

# Routing

## Basic Routing

The most basic JCC Express routes accept a URI and a closure, providing a very simple and expressive method of defining routes and behavior without complicated routing configuration files:

```typescript
import { Route } from "jcc-express-mvc/Core";

Route.get("/", (req, res) => {
  return res.json({ message: "Hello World" });
});

// Using Controller Array Syntax
Route.get("/user", [UserController, "index"]);
```

## Available Router Methods

The router allows you to register routes that respond to any HTTP verb:

```typescript
Route.get(uri, callback);
Route.post(uri, callback);
Route.put(uri, callback);
Route.patch(uri, callback);
Route.delete(uri, callback);
```

## Route Parameters

### Required Parameters

Sometimes you will need to capture segments of the URI within your route. For example, you may need to capture a user's ID from the URL. The framework supports both `:id` (Express-style) and `{id}` (Laravel-style) syntaxes:

```typescript
// Using :id syntax (Express-style)
Route.get("/user/:id", (req, res) => {
  return res.json({ id: req.params.id });
});

// Using {id} syntax (Laravel-style) - also works
Route.get("/user/{id}", (req, res) => {
  return res.json({ id: req.params.id });
});
```

Both syntaxes work identically and can be used interchangeably based on your preference.

### Route Model Binding

JCC Express automatically resolves Eloquent models defined in routes or controller actions whose type-hinted variable names match a route segment name.

```typescript
// Define a route with model binding (both :user and {user} work)
Route.get("/users/:user", [UsersController, "show"]);
// or
Route.get("/users/{user}", [UsersController, "show"]);

// Controller
import { httpContext } from "jcc-express-mvc";
import { Inject, Method } from "jcc-express-mvc";

@Inject()
class UsersController {
  @Method()
  async show(user: User, { res } = httpContext) {
    return res.json(user);
  }
}
```

#### Binding by Specific Column

You can specify which column to use for model binding by using the `{column$param}` syntax:

```typescript
// Find user by slug instead of ID
Route.get("/users/{slug$user}", [UsersController, "show"]);
// or with Express-style syntax
Route.get("/users/:slug$user", [UsersController, "show"]);

// Controller - the model will be resolved using the 'slug' column
@Inject()
class UsersController {
  @Method()
  async show(user: User, { res } = httpContext) {
    return res.json(user); // User found by slug column
  }
}
```

**Note:** The syntax `{column$param}` or `:column$param` tells the framework to find the model using the specified column instead of the default primary key.

## Route Groups

Route groups allow you to share route attributes, such as middleware, across a large number of routes without needing to define those attributes on each individual route.

### Middleware

To assign middleware to all routes within a group, you may use the `middleware` method before defining the group. Middleware are executed in the order they are listed in the array:

```typescript
Route.middleware(["auth"]).group(() => {
  Route.get("/", (req, res) => {
    // Uses Auth Middleware
  });

  Route.get("/user/profile", (req, res) => {
    // Uses Auth Middleware
  });
});
```

### Route Prefixes

The `prefix` method may be used to prefix each route in the group with a given URI. For example, you may want to prefix all route URIs within the group with `admin`:

```typescript
Route.prefix("admin").group(() => {
  Route.get("/users", (req, res) => {
    // Matches The "/admin/users" URL
  });
});
```

### Route Controllers

If a group of routes all utilize the same controller, you may use the `controller` method to define the common controller for all of the routes within the group. Then, when defining the routes, you only need to provide the controller method that they invoke:

```typescript
Route.controller(OrderController).group(() => {
  // Both :id and {id} syntaxes work
  Route.get("/orders/:id", "show");
  // or
  Route.get("/orders/{id}", "show");
  Route.post("/orders", "store");
});
```

---

# Controllers

## Introduction

Instead of defining all of your request handling logic as closures in your route files, you may wish to organize this behavior using "controller" classes. Controllers can group related request handling logic into a single class.

## Basic Controllers

Controllers are stored in the `app/Http/Controllers` directory.

```typescript
import { httpContext } from "jcc-express-mvc";
import { User } from "@/Models/User";

export class UserController {
  /**
   * Show the profile for a given user.
   */
  async show({ req, res } = httpContext) {
    const user = await User.find(req.params.id);
    return res.json({ user });
  }
}
```

## Dependency Injection & Method Injection

The framework features an improved controller architecture with method injection and elegant context handling.

### Constructor Injection

The JCC Express service container is used to resolve all controllers. As a result, you are able to type-hint any dependencies your controller may need in its constructor.

```typescript
import { Inject } from "jcc-express-mvc";

@Inject()
class UsersController {
  constructor(private readonly service: UserService) {}
}
```

### Method Injection

In addition to constructor injection, you may also type-hint dependencies on your controller's methods. A common use-case for method injection is injecting the `User` model into your controller methods.

```typescript
import { Inject, Method } from "jcc-express-mvc";

@Inject()
class UsersController {
  @Method()
  async show(user: User, { res } = httpContext) {
    return res.json(user);
  }
}
```

### HTTP Context

You can destructure the HTTP context (`req`, `res`, `next`) directly in your method signature:

```typescript
@Method()
async index({ req } = httpContext) {
    const { query } = req.query;
    // ...
}
```

---

# Middleware

## Introduction

Middleware provide a convenient mechanism for inspecting and filtering HTTP requests entering your application. For example, JCC Express includes a middleware that verifies the user of your application is authenticated. If the user is not authenticated, the middleware will redirect the user to the login screen. However, if the user is authenticated, the middleware will allow the request to proceed further into the application.

## Defining Middleware

Middleware can be created inside the `app/Http/Middlewares` directory. Import `Request`, `Response`, and `Next` from `"jcc-express-mvc"`:

```typescript
// app/Http/Middlewares/AuthMiddleware.ts
import { Request, Response, Next } from "jcc-express-mvc";

export function AuthMiddleware(req: Request, res: Response, next: Next) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}
```

**Note:** Always import `Request`, `Response`, and `Next` from `"jcc-express-mvc"` - these are aliases for `AppRequest`, `AppResponse`, and `AppNext` that provide full type support.

## Registering Middleware

### Global Middleware

If you want a middleware to run during every HTTP request to your application, list the middleware class in the `middleware` property of your `app/Http/kernel.ts` class.

### Assigning Middleware to Routes

If you would like to assign middleware to specific routes, you should first assign the middleware a key in your `app/Http/kernel.ts` file.

```typescript
// app/Http/kernel.ts
export class Kernel {
  static middlewareAliases = {
    auth: AuthMiddleware,
  };
}
```

Once defined, you may use the `middleware` method to assign middleware to a route:

```typescript
Route.middleware(["auth"]).get("/profile", (req, res) => {
  // ...
});
```

---

# Requests & Responses

JCC Express MVC extends Express's native `Request` and `Response` objects with additional methods through `AppRequest` and `AppResponse` interfaces. This provides a clean, fluent interface for working with HTTP requests and responses while maintaining compatibility with all Express methods.

## HTTP Requests

JCC Express MVC uses Express's `Request` object extended with additional methods via the `AppRequest` interface. All standard Express request methods are available, plus the framework's custom methods.

### Accessing The Request

In controllers, you use `httpContext` to access the request and response objects. TypeScript automatically infers the correct types:

```typescript
import { httpContext } from "jcc-express-mvc";

class UserController {
  async store({ req, res } = httpContext) {
    const name = req.body.name;
    const email = req.body.email;
    // ...
  }
}
```

**Note:** In route closures (like `Route.get("/", async (req, res) => {})`), TypeScript automatically knows the types - you don't need to import or type them explicitly.

### Request Data Methods

#### Basic Input Access

```typescript
// Get all input (body + query)
const all = req.body;

// Get specific input value
const name = req.input("name");
const email = req.input("email", "default@example.com"); // With default

// Get query parameters (Express native)
const page = req.query.page;

// Get route parameters (Express native)
const userId = req.params.id;
```

#### Input Helper Methods

```typescript
// Check if input key exists
if (req.has("name")) {
  // ...
}

// Check if input key exists and is not empty
if (req.filled("email")) {
  // ...
}

// Get only specified keys
const data = req.only("name", "email");

// Get all except specified keys
const data = req.except("password", "password_confirmation");

// Merge new data into request
req.merge({ status: "active" });

// Replace all request data
req.replace({ name: "John", email: "john@example.com" });
```

### Authentication & User

```typescript
// Access authenticated user
const user = req.user;

// Check if user is authenticated
if (req.user) {
  // User is authenticated
}
```

### Flash Messages

```typescript
// Get all flash messages
const flash = req.flash();

// Get flash messages by type
const successMessages = req.flash("success");
const errorMessages = req.flash("error");

// Set flash message
req.flash("success", "User created successfully!");
req.flash("error", ["Error 1", "Error 2"]); // Multiple messages
```

### Request Validation

```typescript
// Validate request data
await req.validate({
  name: ["required", "string", "max:255"],
  email: ["required", "email", "unique:users,email"],
  password: ["required", "string", "min:8", "confirmed"],
});

// Get validated data
const validated = await req.validated();
```

### Request Detection Methods

```typescript
// Check if request is an API request
if (req.isApi()) {
  // Request is to /api/* route
}

// Check if request is AJAX
if (req.ajax()) {
  // Request is XMLHttpRequest
}

// Check if request wants JSON
if (req.wantsJson()) {
  // Accept header includes JSON
}

// Check if request body is JSON
if (req.isJson()) {
  // Content-Type is application/json
}

// Check if request accepts JSON
if (req.acceptsJson()) {
  // Accept header prioritizes JSON
}

// Check if request expects JSON response
if (req.expectsJson()) {
  // Combines isApi, ajax, wantsJson, isJson checks
}

// Check if request is Inertia request
if (req.isInertia()) {
  // Request has X-Inertia header
}
```

### Headers & Cookies

```typescript
// Get header value
const authHeader = req.header("Authorization");
const userAgent = req.userAgent();

// Get cookie value
const token = req.cookie("auth_token");

// Get bearer token from Authorization header
const token = req.bearerToken();
```

### File Uploads

```typescript
// Check if file exists
if (req.hasFile("avatar")) {
  // File was uploaded
}

// Get file and store it
const filePath = req.file("avatar").store("avatars");

// Access file directly (Express native)
const file = req.files?.avatar;
```

### Request Information

```typescript
// Get full URL
const fullUrl = req.fullUrl();

// Check HTTP method
if (req.isMethod("POST")) {
  // ...
}

// Get request ID
const requestId = req.id;

// Access JCC session
const session = req.jccSession;

// Get previous URLs
const previousUrls = req.previsiousUrls;
```

### Complete Request Example

```typescript
// In route closures, TypeScript automatically infers types - no imports needed
Route.post("/users", async (req, res) => {
  // Validate request
  await req.validate({
    name: ["required", "string"],
    email: ["required", "email"],
  });

  // Get validated data
  const data = await req.validated();

  // Check request type
  if (req.expectsJson()) {
    // Return JSON response
    return res.json({ message: "User created", user: data });
  }

  // Set flash message
  req.flash("success", "User created successfully!");

  // Redirect
  return res.redirect("/users");
});
```

**Note:** In route closures, you don't need to import `Request` or `Response` - TypeScript automatically knows the types. Only import them if you need to use them in middleware or other contexts.

## HTTP Responses

JCC Express MVC uses Express's `Response` object extended with additional methods via the `AppResponse` interface. All standard Express response methods are available, plus the framework's custom methods.

### JSON Responses

**Note:** In route closures, TypeScript automatically infers the types for `req` and `res` - you don't need to import or type them explicitly.

```typescript
// JSON response (Express native)
return res.json({
  name: "Abigail",
  state: "CA",
});

// JSON with status code
return res.status(201).json({
  message: "Created",
  data: user,
});
```

### Redirect Responses

```typescript
// Simple redirect (Express native)
return res.redirect("/home");

// Redirect with status code
return res.redirect(303, "/home");

// Redirect back to previous URL
return res.redirectBack();

// Redirect with flash message
return res.with("User created!", "success").redirect("/users");
```

### View Responses

```typescript
// Render jsBlade view (Express native res.render)
return res.render("welcome", {
  name: "John",
  title: "Welcome",
});
```

### Inertia Responses

```typescript
// Render Inertia page
return res.inertia("Users/Index", {
  users: users,
});

// Inertia redirect
return res.inertiaRedirect("/users", "User created!", "success");
```

### File Downloads

```typescript
// Download file (Express native)
return res.download("/path/to/file.pdf");

// Download with custom filename
return res.download("/path/to/file.pdf", "custom-name.pdf");
```

### Response Headers

```typescript
// Set header (Express native)
res.set("X-Custom-Header", "value");

// Set multiple headers
res.set({
  "X-Custom-Header": "value",
  "X-Another-Header": "another-value",
});

// Get header
const contentType = res.get("Content-Type");
```

### Status Codes

```typescript
// Set status code (Express native)
res.status(201);

// Chain with response
return res.status(201).json({ message: "Created" });

// Common status codes
res.status(200); // OK
res.status(201); // Created
res.status(400); // Bad Request
res.status(401); // Unauthorized
res.status(404); // Not Found
res.status(500); // Internal Server Error
```

### Flash Messages with Redirects

```typescript
// Set flash message and redirect
return res.with("User created successfully!", "success").redirect("/users");

// Different flash types
res.with("Error occurred!", "error").redirect("/users");
res.with("Warning message!", "warning").redirect("/users");
res.with("Info message!", "info").redirect("/users");
```

### Complete Response Example

```typescript
// In route closures, TypeScript automatically infers types - no imports needed
Route.post("/users", async (req, res) => {
  const user = await User.create(await req.validated());

  if (req.expectsJson()) {
    return res.status(201).json({
      message: "User created",
      user: user,
    });
  }

  return res
    .with("User created successfully!", "success")
    .redirect("/users");
});
```

## Request & Response Lifecycle

JCC Express MVC uses Express's native request/response lifecycle. The framework extends these objects with additional methods while maintaining full compatibility with Express middleware and methods.

### Standard Express Methods

All standard Express `Request` and `Response` methods are available:

**Request Methods:**
- `req.body` - Request body
- `req.query` - Query parameters
- `req.params` - Route parameters
- `req.headers` - Request headers
- `req.cookies` - Request cookies
- `req.get()` - Get header
- `req.is()` - Check content type
- And all other Express request methods

**Response Methods:**
- `res.json()` - JSON response
- `res.send()` - Send response
- `res.render()` - Render view
- `res.redirect()` - Redirect
- `res.status()` - Set status code
- `res.set()` - Set header
- `res.cookie()` - Set cookie
- And all other Express response methods

### Framework Extensions

The framework adds the following methods to enhance the Express objects:

**AppRequest Extensions:**
- `req.validate()` - Validate request data
- `req.validated()` - Get validated data
- `req.input()` - Get input value
- `req.has()` - Check if input exists
- `req.filled()` - Check if input is filled
- `req.only()` - Get only specified keys
- `req.except()` - Get all except specified keys
- `req.merge()` - Merge new data
- `req.replace()` - Replace request data
- `req.flash()` - Flash messages
- `req.isApi()` - Check if API request
- `req.ajax()` - Check if AJAX request
- `req.wantsJson()` - Check if wants JSON
- `req.expectsJson()` - Check if expects JSON
- `req.isInertia()` - Check if Inertia request
- `req.file()` - Get uploaded file
- `req.hasFile()` - Check if file exists
- `req.store()` - Store uploaded file
- `req.bearerToken()` - Get bearer token
- `req.userAgent()` - Get user agent
- `req.cookie()` - Get cookie
- `req.header()` - Get header
- `req.isMethod()` - Check HTTP method
- `req.fullUrl()` - Get full URL

**AppResponse Extensions:**
- `res.inertia()` - Render Inertia page
- `res.inertiaRedirect()` - Inertia redirect
- `res.redirectBack()` - Redirect to previous URL
- `res.with()` - Set flash message and chain

---

# Validation

JCC Express MVC uses the [validatorjs](https://www.npmjs.com/package/validatorjs) package for validation, with custom validation methods registered by the framework. This provides a powerful, flexible validation system that works seamlessly with Express requests.

## Introduction

JCC Express MVC provides several different approaches to validate your application's incoming data:

1. **Inline Validation** - Using `req.validate()` directly in controllers
2. **Form Request Classes** - Encapsulating validation logic in dedicated request classes

Both approaches use the same validation rules and syntax.

## Inline Validation

You can validate request data directly in your controllers using the `req.validate()` method:

```typescript
// In route closures, TypeScript automatically infers types - no imports needed
Route.post("/users", async (req, res) => {
  // Validate request data
  await req.validate({
    name: "required|string|max:255",
    email: "required|email|unique:users,email", // Can use table name or model name
    password: "required|string|min:8",
  });

  // Get validated data
  const validated = await req.validated();

  // Create user with validated data
  const user = await User.create(validated);

  return res.json({ user });
});
```

### Validation Rules Syntax

Rules can be specified as:
- **String format**: `"required|email|min:5"`
- **Array format**: `["required", "email", "min:5"]`

```typescript
// String format (pipe-separated)
await req.validate({
  name: "required|string|max:255",
  email: "required|email",
});

// Array format
await req.validate({
  name: ["required", "string", "max:255"],
  email: ["required", "email"],
});
```

### Custom Error Messages

You can provide custom error messages:

```typescript
await req.validate(
  {
    name: "required|string",
    email: "required|email",
  },
  {
    "name.required": "The name field is required.",
    "email.email": "That doesn't look like an email address.",
  }
);
```

## Form Request Validation

For more complex validation scenarios, you may wish to create a "form request". Form requests are custom request classes that encapsulate their own validation and authorization logic.

### Creating Form Requests

To create a form request class, use the `make:request` Artisan command:

```bash
bun artisanNode make:request StoreUserRequest
```

The generated class will be placed in the `app/Http/Requests` directory.

### Writing Form Requests

Form requests are custom request classes that extend `FormRequest`. Let's look at an example form request:

```typescript
import { FormRequest } from "jcc-express-mvc/Core/FormRequest";

export class StoreUserRequest extends FormRequest {
  /**
   * Get the validation rules that apply to the request.
   */
  async rules() {
    await this.validate({
      name: "required|string|max:255",
      email: "required|email|unique:users,email", // Can use table name or model name
      password: "required|string|min:8",
    });
  }

  /**
   * Get custom messages for validator errors.
   */
  messages() {
    return {
      "name.required": "The name field is required.",
      "email.unique": "This email is already taken.",
    };
  }
}
```

### Using Form Requests

Now you can type-hint the form request in your controller method. The incoming request data will be automatically validated before the controller method is called:

```typescript
import { StoreUserRequest } from "@/Http/Requests/StoreUserRequest";
import { httpContext } from "jcc-express-mvc";

class UserController {
  async store(request: StoreUserRequest, { res } = httpContext) {
    // The incoming request has been validated...
    // You can access validated data via request.body or request.validated()
    const validated = await request.validated();
    const { name, email } = validated;
    
    // Create the user...
    const user = await User.create(validated);
    
    return res.json({ user });
  }
}
```

## Available Validation Rules

JCC Express MVC provides a wide variety of validation rules. The framework uses [validatorjs](https://www.npmjs.com/package/validatorjs) as the base validation library, which means all validatorjs rules are available. Additionally, the framework registers custom validation methods for database operations and other framework-specific needs.

### All Validatorjs Rules

Since JCC Express MVC uses validatorjs, all standard validatorjs rules are available. Refer to the [validatorjs documentation](https://www.npmjs.com/package/validatorjs) for the complete list of available rules. Common rules include:

- `accepted`, `active_url`, `after:date`, `after_or_equal:date`
- `alpha`, `alpha_dash`, `alpha_num`
- `array`, `before:date`, `before_or_equal:date`
- `between:min,max`, `boolean`
- `confirmed`, `date`, `date_equals:date`, `date_format:format`
- `different:field`, `digits:value`, `digits_between:min,max`
- `dimensions`, `distinct`, `email`, `exists:table,column`
- `file`, `filled`, `gt:field`, `gte:field`
- `image`, `in:value1,value2`, `in_array:field`
- `integer`, `ip`, `ipv4`, `ipv6`
- `json`, `lt:field`, `lte:field`
- `max:value`, `mimetypes`, `mimes`
- `min:value`, `not_in:value1,value2`
- `not_regex:pattern`, `nullable`, `numeric`
- `present`, `regex:pattern`, `required`
- `required_if:field,value`, `required_unless:field,value`
- `required_with:field1,field2`, `required_with_all:field1,field2`
- `required_without:field1,field2`, `required_without_all:field1,field2`
- `same:field`, `size:value`, `string`
- `timezone`, `unique:table,column`, `url`, `uuid`

### Framework Custom Rules

The framework registers the following custom validation methods that extend validatorjs:

- `unique:Model,column` - Database uniqueness validation
- `nullable` - Allows null/empty values (field is optional)
- `sometimes` - Only validates the field if it is present in the request
- `file` - Validates that a file was uploaded
- `image` - Validates that an image file was uploaded

These custom rules are automatically registered and available for use in your validation rules.

### Basic Rules

- `required` - The field must be present and not empty

### String Rules

- `string` - The field must be a string
- `min:value` - The field must have a minimum length/value
- `max:value` - The field must have a maximum length/value
- `alpha` - The field must contain only alphabetic characters
- `alphaNum` - The field must contain only alphanumeric characters
- `slug` - The field must be a valid slug

### Numeric Rules

- `numeric` or `num` - The field must be numeric
- `integer` or `int` - The field must be an integer
- `float` - The field must be a float
- `decimal` - The field must be a decimal number

### Email & URL Rules

- `email` - The field must be a valid email address
- `url` - The field must be a valid URL

### Comparison Rules

- `same:field` - The field must match another field (e.g., password confirmation)
- `confirmed` - The field must have a matching `{field}_confirmation` field

### Database Rules

- `unique:Model,column` or `unique:table,column` - The field must be unique in the database
  - Example: `unique:User,email` - Checks if email is unique in User model
  - Example: `unique:users,email` - Checks if email is unique in users table
  - Example: `unique:users` - Checks if the field value is unique in users table (uses field name as column)
  - You can use either model class name (e.g., `User`) or table name (e.g., `users`)
  - If column is not specified, it defaults to the field name being validated

### Array & Object Rules

- `array` - The field must be an array
- `object` - The field must be an object

### Boolean Rules

- `boolean` or `bool` - The field must be a boolean value

### Special Format Rules

- `json` - The field must be valid JSON
- `jwt` - The field must be a valid JWT token
- `creditCard` - The field must be a valid credit card number
- `phone` - The field must be a valid phone number
- `postal:countryCode` - The field must be a valid postal code for the given country
- `mongoId` - The field must be a valid MongoDB ObjectId

### File Rules

- `file` - The field must be an uploaded file (validates file presence)
- `image` - The field must be an uploaded image file (validates image file presence)

**Note:** The framework automatically normalizes file and image fields during validation. When using `file` or `image` rules, the validator checks for file presence using `req.hasFile(field)`.

### Complete Rules Example

```typescript
await req.validate({
  // Basic
  name: "required|string|max:255",
  
  // Email with uniqueness check (can use table name or model name)
  email: "required|email|unique:users,email",
  
  // Password with confirmation
  password: "required|string|min:8",
  password_confirmation: "required|same:password",
  
  // Numeric
  age: "required|integer|min:18|max:100",
  price: "required|decimal|min:0",
  
  // Optional fields (nullable allows field to be empty)
  bio: "nullable|string|max:1000",
  
  // Conditional validation (only validates if field is present)
  phone: "sometimes|phone",
  
  // Arrays and objects
  tags: "required|array",
  metadata: "nullable|object",
  
  // Special formats
  website: "nullable|url",
  phone_number: "nullable|phone",
  postal_code: "nullable|postal:US",
  
  // File uploads
  document: "required|file",        // Required file upload
  avatar: "nullable|image",        // Optional image upload
  resume: "sometimes|file",        // Only validate if file is provided
});
```

### File Validation Example

Here's a complete example of validating file uploads:

```typescript
// In route closures, TypeScript automatically infers types - no imports needed
Route.post("/profile", async (req, res) => {
  await req.validate({
    name: "required|string|max:255",
    avatar: "nullable|image",        // Optional profile image
    resume: "required|file",         // Required resume file
  });

  const validated = await req.validated();

  // Handle file uploads
  if (req.hasFile("avatar")) {
    const avatarPath = req.file("avatar").store("avatars");
    // Save avatar path to database
  }

  if (req.hasFile("resume")) {
    const resumePath = req.file("resume").store("resumes");
    // Save resume path to database
  }

  return res.json({ message: "Profile updated" });
});
```

### Custom Validation Messages

You can customize the error messages used by the validator:

```typescript
// Inline validation
await req.validate(
  {
    email: "required|email",
    password: "required|min:8",
  },
  {
    "email.required": "We need your email address!",
    "email.email": "That doesn't look like an email address.",
    "password.min": "Password must be at least 8 characters.",
  }
);

// In FormRequest
export class StoreUserRequest extends FormRequest {
  async rules() {
    await this.validate({
      email: "required|email",
      password: "required|min:8",
    });
  }

  messages() {
    return {
      "email.required": "We need your email address!",
      "email.email": "That doesn't look like an email address.",
      "password.min": "Password must be at least 8 characters.",
    };
  }
}
```

## Custom Validation Methods

The framework registers custom validation methods that extend validatorjs. These are automatically available and handle framework-specific validation needs.

### Custom Rules

The framework provides the following custom validation rules:

#### `unique:Model,column` or `unique:table,column`

Validates that a field value is unique in the database.

```typescript
await req.validate({
  // Using model class name
  email: "required|email|unique:User,email",
  
  // Using table name
  username: "required|string|unique:users,username",
  
  // Column optional - uses field name as column
  email: "required|email|unique:users", // Checks users.email
  username: "required|string|unique:users", // Checks users.username
});
```

- **Model/Table**: Can be either the model class name (e.g., `User`) or the table name (e.g., `users`)
- **column**: The database column to check (optional, defaults to the field name being validated)

#### `nullable`

Allows the field to be null, undefined, or empty. When combined with other rules, those rules only apply if the field has a value.

```typescript
await req.validate({
  bio: "nullable|string|max:1000", // bio is optional, but if provided, must be string and max 1000 chars
});
```

**Normalization:** If the field is not present in the request, it's normalized to an empty string.

#### `sometimes`

Only validates the field if it is present in the request. Useful for partial updates.

```typescript
await req.validate({
  name: "sometimes|string|max:255", // Only validates if name is provided
});
```

**Normalization:** If the field is not present and `sometimes` is used, the field is skipped during validation.

#### `file`

Validates that a file was uploaded for the field.

```typescript
await req.validate({
  document: "required|file",
});
```

**Normalization:** The field is normalized to a boolean (`true` if file exists, `false` otherwise) using `req.hasFile(field)`.

#### `image`

Validates that an image file was uploaded for the field.

```typescript
await req.validate({
  avatar: "required|image",
  thumbnail: "nullable|image", // Optional image
});
```

**Normalization:** The field is normalized to a boolean (`true` if image file exists, `false` otherwise) using `req.hasFile(field)`.

### Request Body Normalization

The framework automatically normalizes the request body before validation to handle special cases:

- **`sometimes`**: Fields with this rule are skipped if not present
- **`nullable`**: Fields with this rule are set to empty string if not present
- **`file`**: Fields are normalized to boolean based on `req.hasFile(field)`
- **`image`**: Fields are normalized to boolean based on `req.hasFile(field)`

This normalization ensures consistent validation behavior across different request types.

## Validation Error Handling

When validation fails, a `ValidationException` is thrown. The framework automatically:

1. Flashes old input to the session (accessible via `flash.old`)
2. Flashes validation errors to the session (accessible via `flash.validation_error`)
3. For web requests: Errors are available in flash messages
4. For API requests: Returns JSON error response with 422 status code

### Accessing Validation Errors in Views

```html
<!-- In jsBlade templates -->
@if(flash.validation_error)
  <div class="errors">
    @foreach(flash.validation_error as field => errors)
      <div class="error">
        <strong>{{ field }}:</strong>
        @if(Array.isArray(errors))
          {{ errors[0] }}
        @else
          {{ errors }}
        @endif
      </div>
    @endforeach
  </div>
@endif

<!-- Access old input -->
<input type="text" name="email" value="{{ flash.old.email }}" />
```

### Handling Validation Errors in Controllers

**By default, you don't need try-catch blocks.** The framework automatically handles validation errors:

```typescript
// In route closures, TypeScript automatically infers types - no imports needed
Route.post("/users", async (req, res) => {
  // No try-catch needed - framework handles errors automatically
  await req.validate({
    email: "required|email",
    password: "required|min:8",
  });

  // Validation passed - this code only runs if validation succeeds
  const user = await User.create(await req.validated());
  return res.json({ user });
});
```

The framework automatically:
- Returns a 422 JSON response for API requests with validation errors
- Redirects back with flash errors for web requests

**Only use try-catch if you need custom error handling:**

```typescript
import { ValidationException } from "jcc-express-mvc/lib/Error/ValidationException-v2";

Route.post("/users", async (req, res) => {
  try {
    await req.validate({
      email: "required|email",
      password: "required|min:8",
    });

    const user = await User.create(await req.validated());
    return res.json({ user });
  } catch (error) {
    // When try-catch is defined, you must manually handle errors
    if (error instanceof ValidationException) {
      // Custom error handling logic here
      if (req.expectsJson()) {
        return res.status(422).json({
          message: "Validation failed",
          errors: error.errors,
        });
      }
      return res.redirectBack();
    }
    throw error; // Re-throw other errors
  }
});
```

**Note:** If you define try-catch in your controller, the framework won't automatically handle validation errors - you must handle them manually.

### Error Response Format

When validation fails for API requests, the response format is:

```json
{
  "message": "Validation failed",
  "errors": {
    "email": ["The email field is required."],
    "password": ["The password must be at least 8 characters."]
  }
}
```

### Getting Validated Data

After successful validation, you can access the validated data:

```typescript
// Using req.validated()
await req.validate({ name: "required|string" });
const validated = await req.validated();

// In FormRequest
const validated = await request.validated();
```

---

# Database Getting Started

JCC Express MVC makes interacting with databases extremely simple across a variety of database backends using either raw SQL, the fluent query builder, or the Eloquent ORM. Currently, JCC Express MVC supports MySQL, PostgreSQL, and SQLite.

## Introduction

Most web applications interact with a database. JCC Express MVC makes connecting to databases and running queries extremely simple across a variety of supported databases using either raw SQL, a fluent query builder, or the Eloquent ORM.

## Configuration

The database configuration for your application is located in your `.env` file and `app/Config/` directory. You may define all of your database connections in these configuration files, as well as specify which connection should be used by default.

### Environment Configuration

Configure your database connection in the `.env` file:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=jcc_express
DB_USERNAME=root
DB_PASSWORD=
```

### Supported Databases

JCC Express MVC supports the following database systems:

- **MySQL** 5.7+ / MariaDB 10.3+
- **PostgreSQL** 10.0+
- **SQLite** 3.8.8+

### Running Raw SQL Queries

Once you have configured your database connection, you may run queries using the `DB` facade. The `DB` facade provides methods for each type of query: `select`, `update`, `delete`, `insert`, and `statement`.

```typescript
import { DB } from "jcc-eloquent/lib/DB";

const users = await DB.select("SELECT * FROM users WHERE active = ?", [1]);
```

### Using Multiple Database Connections

When using multiple connections, you may access each connection via the `DB` facade's `connection` method:

```typescript
const users = await DB.connection("mysql").table("users").get();
```

---

# Query Builder

The database query builder provides a convenient, fluent interface to creating and running database queries. It can be used to perform most database operations in your application and works on all supported database systems.

## Introduction

The JCC Express MVC query builder provides a convenient, fluent interface to creating and running database queries. It can be used to perform most database operations in your application and works on all supported database systems.

## Retrieving Results

### Retrieving All Rows From A Table

You may use the `table` method on the `DB` facade to begin a query. The `table` method returns a fluent query builder instance for the given table, allowing you to chain more constraints onto the query and then finally retrieve the results of the query using the `get` method:

```typescript
import { DB } from "jcc-eloquent/lib/DB";

const users = await DB.table("users").get();
```

### Retrieving A Single Row / Column From A Table

If you just need to retrieve a single row from a database table, you may use the `first` method:

```typescript
const user = await DB.table("users").where("name", "John").first();
```

If you don't even need an entire row, you may extract a single value from a record using the `value` method:

```typescript
const email = await DB.table("users").where("name", "John").value("email");
```

### Chunking Results

If you need to work with thousands of database records, consider using the `chunk` method. This method retrieves a small chunk of results at a time and feeds each chunk into a closure for processing:

```typescript
await DB.table("users").orderBy("id").chunk(100, (users) => {
  for (const user of users) {
    // Process each chunk of 100 users
  }
});
```

## Select Statements

### Specifying A Select Clause

You may not always want to select all columns from a database table. Using the `select` method, you can specify a custom select clause for the query:

```typescript
const users = await DB.table("users")
  .select("name", "email as user_email")
  .get();
```

## Where Clauses

### Where Clauses

You may use the query builder's `where` method to add "where" clauses to the query. The most basic call to `where` requires three arguments: the column, an operator, and the value:

```typescript
const users = await DB.table("users")
  .where("votes", "=", 100)
  .get();
```

For convenience, if you want to verify that a column is equal to a given value, you may pass the value directly as the second argument to the `where` method:

```typescript
const users = await DB.table("users").where("votes", 100).get();
```

### Or Where Clauses

When chaining together calls to the query builder's `where` method, the "where" clauses will be joined together using the `AND` operator. However, you may use the `orWhere` method to join a clause to the query using the `OR` operator:

```typescript
const users = await DB.table("users")
  .where("votes", ">", 100)
  .orWhere("name", "John")
  .get();
```

## Inserts

The query builder also provides an `insert` method that may be used to insert records into the database table. The `insert` method accepts an object or array of objects:

```typescript
await DB.table("users").insert({
  email: "john@example.com",
  votes: 0,
});

// Insert multiple records
await DB.table("users").insert([
  { email: "john@example.com", votes: 0 },
  { email: "jane@example.com", votes: 0 },
]);
```

### Auto-Incrementing IDs

If the table has an auto-incrementing id, use the `insertGetId` method to insert a record and then retrieve the ID:

```typescript
const id = await DB.table("users").insertGetId({
  email: "john@example.com",
  votes: 0,
});
```

## Updates

In addition to inserting records into the database, the query builder can also update existing records using the `update` method. The `update` method, like the `insert` method, accepts an object containing the columns and values which should be updated:

```typescript
await DB.table("users")
  .where("id", 1)
  .update({ votes: 1 });
```

## Deletes

The query builder may also be used to delete records from the table via the `delete` method:

```typescript
await DB.table("users").where("votes", "<", 100).delete();
```

---

# Migrations

Migrations are like version control for your database, allowing your team to define and share the application's database schema definition.

## Generating Migrations

To create a migration, use the `make:migration` Artisan command:

```bash
bun artisanNode make:migration create_users_table
```

## Migration Structure

A migration class contains two methods: `up` and `down`. The `up` method is used to add new tables, columns, or indexes to your database, while the `down` method should reverse the operations performed by the `up` method.

```typescript
import { Schema } from "jcc-eloquent";

Schema.create("users", (table) => {
  table.id();
  table.string("name");
  table.string("email").unique();
  table.timestamps();
});
```

## Running Migrations

To run your outstanding migrations, execute the `migrate` Artisan command:

```bash
bun artisanNode migrate
```

## Schema Builder Methods

The Schema builder provides a fluent interface for defining database tables and columns. All methods are chainable.

### Schema Methods

```typescript
import { Schema } from "jcc-eloquent";

// Create a table
Schema.create("users", (table) => {
  // Define columns
});

// Modify an existing table
Schema.table("users", (table) => {
  // Add/modify columns
});

// Drop a table
Schema.dropTable("users");

// Drop table (without IF EXISTS)
Schema.drop("users");

// Rename a table
Schema.rename("old_users", "new_users");

// Check if table exists
const exists = await Schema.hasTable("users");

// Check if column exists
const hasColumn = await Schema.hasColumn("users", "email");

// Get column listing
const columns = await Schema.getColumnListing("users");
```

### Column Types

#### String Types

```typescript
// String (VARCHAR)
table.string("name");
table.string("name", 100); // With length

// Char
table.char("code", 5);

// Text types
table.text("description");
table.mediumText("content");
table.longText("article");
table.tinyText("excerpt");
```

#### Integer Types

```typescript
// Integer
table.integer("age");

// Big integer
table.bigInteger("user_id");

// Small integer
table.smallInteger("status");

// Medium integer
table.mediumInteger("views");

// Tiny integer
table.tinyInteger("flag", 4);

// Unsigned integers
table.unsignedInteger("count");
table.unsignedBigInteger("id");
table.unsignedSmallInteger("status");
table.unsignedMediumInteger("views");
table.unsignedTinyInteger("flag");

// Auto-incrementing
table.increments("id"); // INT UNSIGNED AUTO_INCREMENT
table.bigIncrements("id"); // BIGINT UNSIGNED AUTO_INCREMENT
```

#### Floating Point Types

```typescript
// Float
table.float("price", 8, 2); // total, places

// Double
table.double("amount", 15, 8);

// Decimal
table.decimal("total", 8, 2);
```

#### Date & Time Types

```typescript
// Date
table.date("birthday");

// DateTime
table.dateTime("created_at");

// Timestamp
table.timestamp("published_at");

// Time
table.time("start_time");

// Year
table.year("graduation_year");

// Timestamps (created_at, updated_at)
table.timestamps();
table.timestamps("created_at", "updated_at"); // Custom names

// Nullable timestamps
table.nullableTimestamps();

// Soft deletes (deleted_at)
table.softDeletes();
table.softDeletes("deleted_at"); // Custom name
```

#### Boolean & Enum

```typescript
// Boolean
table.boolean("is_active");
table.boolean("is_active", true); // With default

// Enum
table.enum("status", ["pending", "active", "inactive"]);

// Set
table.set("tags", ["red", "green", "blue"]);
```

#### JSON Types

```typescript
// JSON
table.json("metadata");

// JSONB (PostgreSQL)
table.jsonb("data");
```

#### Binary Types

```typescript
// Binary
table.binary("avatar");
table.binary("avatar", 255); // With size (VARBINARY)

// Blob types
table.blob("image");
table.tinyBlob("thumbnail");
table.mediumBlob("photo");
table.longBlob("video");
```

#### UUID & ULID

```typescript
// UUID
table.uuid("id");

// UUID primary key
table.uuidPrimaryKey("id");

// ULID
table.ulid("id");

// ULID primary key
table.ulidPrimaryKey("id");
```

#### Special Types

```typescript
// IP Address
table.ipAddress("ip");

// MAC Address
table.macAddress("mac");

// Remember token
table.rememberToken();

// Morphs (polymorphic)
table.morphs("commentable"); // Creates commentable_id and commentable_type
table.nullableMorphs("commentable");
table.uuidMorphs("commentable");
table.nullableUuidMorphs("commentable");
```

#### Spatial Types

```typescript
// Geometry
table.geometry("location");

// Point
table.point("coordinates");

// Polygon
table.polygon("area");

// LineString
table.lineString("path");
```

### Column Modifiers

```typescript
// Nullable
table.string("email").nullable();

// Default value
table.string("status").default("pending");
table.integer("count").default(0);
table.boolean("active").default(true);

// Unique
table.string("email").unique();

// Index
table.string("name").index();
table.string("name").index("idx_name"); // With name

// Composite index
table.compositeIndex(["user_id", "post_id"]);
table.compositeIndex(["user_id", "post_id"], "idx_user_post");

// Composite unique
table.compositeUnique(["email", "domain"]);

// Fulltext index
table.fulltext(["title", "content"]);

// Spatial index
table.spatialIndex(["location"]);

// After (position column)
table.string("middle_name").after("first_name");

// First (position first)
table.string("priority").first();

// Change (modify column)
table.string("name", 100).change();

// Auto increment
table.integer("id").autoIncrement();

// Unsigned
table.integer("count").unsigned();

// Use current timestamp
table.timestamp("created_at").useCurrent();

// Use current on update
table.timestamp("updated_at").useCurrentOnUpdate();

// Stored as (computed)
table.string("full_name").storedAs("CONCAT(first_name, ' ', last_name)");

// Virtual as (virtual computed)
table.string("initials").virtualAs("CONCAT(LEFT(first_name, 1), LEFT(last_name, 1))");

// Charset
table.string("name").charset("utf8mb4");

// Collation
table.string("name").collation("utf8mb4_unicode_ci");

// Check constraint
table.integer("age").check("age >= 18");
```

### Foreign Keys

```typescript
// Foreign key
table.foreign("user_id").references("id").on("users");

// Foreign key with actions
table
  .foreign("user_id")
  .references("id")
  .on("users")
  .onDelete("CASCADE")
  .onUpdate("CASCADE");

// Cascade shortcuts
table.foreign("user_id").references("id").on("users").cascade();
table.foreign("user_id").references("id").on("users").cascadeOnDelete();
table.foreign("user_id").references("id").on("users").cascadeOnUpdate();

// Foreign ID (convenience method)
table.foreignId("user_id");
table.foreignId("user_id").constrained("users");
table.foreignIdFor(User); // Auto-detects table and column
table.foreignIdFor(User, "author_id", "users"); // Custom column and table
```

### Table Modifiers

```typescript
// Engine (MySQL)
table.engine("InnoDB");

// Charset
table.tableCharset("utf8mb4");

// Collation
table.tableCollation("utf8mb4_unicode_ci");

// Comment
table.comment("User accounts table");

// Temporary table
table.temporary();
```

### Dropping Columns & Constraints

```typescript
// Drop columns
table.dropColumns("email", "phone");

// Rename column
table.renameColumn("old_name", "new_name");

// Drop foreign key
table.dropForeign("users_user_id_foreign");

// Drop primary key
table.dropPrimary();

// Drop unique
table.dropUnique("users_email_unique");

// Drop index
table.dropIndex("users_name_index");

// Drop timestamps
table.dropTimestamps();

// Drop soft deletes
table.dropSoftDeletes();

// Drop remember token
table.dropRememberToken();

// Drop morphs
table.dropMorphs("commentable");
```

---

# Seeding

JCC Express includes the ability to seed your database with data using seed classes. All seed classes are stored in the `database/seeders` directory.

## Writing Seeders

```typescript
import { Seeder } from "jcc-express-mvc";
import { User } from "@/Models/User";

export class UserSeeder extends Seeder {
  async run() {
    await User.create({
      name: "Test User",
      email: "test@example.com",
    });
  }
}
```

## DatabaseSeeder

The `DatabaseSeeder` class is the main seeder that orchestrates all your seeders. It should have a `run()` method that returns an array of seeder classes:

```typescript
// database/seeders/DatabaseSeeder.ts
import { UserSeeder } from "./UserSeeder";
import { PostSeeder } from "./PostSeeder";

export class DatabaseSeeder {
  async run() {
    return [
      UserSeeder,
      PostSeeder,
      // Add more seeders here
    ];
  }
}
```

## Running Seeders

### Running All Seeders

When you run `bun artisanNode db:seed`, the framework will look for the `DatabaseSeeder` class and execute all seeders returned by its `run()` method:

```bash
bun artisanNode db:seed
```

This command will:
1. Find the `DatabaseSeeder` class in `database/seeders`
2. Call its `run()` method
3. Execute all seeders in the returned array

### Running a Single Seeder

To run a specific seeder class, use the `class` parameter:

```bash
bun artisanNode db:seed class=UserSeeder
```

This will run only the `UserSeeder` class, bypassing the `DatabaseSeeder`.

---

# Eloquent ORM

The Eloquent ORM included with JCC Express provides a beautiful, simple ActiveRecord implementation for working with your database. Each database table has a corresponding "Model" that is used to interact with that table. Models allow you to query for data in your tables, as well as insert new records into the table.

## Defining Models

All Eloquent models extend the `Model` class.

```typescript
import { Model } from "jcc-eloquent";

export class User extends Model {
  /**
   * The attributes that are mass assignable.
   */
  protected fillable = ["name", "email", "password"];

  /**
   * The attributes that should be hidden for arrays.
   */
  protected hidden = ["password"];

  /**
   * The casts to apply to the attributes.
   */
  protected static casts = {};
}
```

## Retrieving Models

Once you have created a model and its associated database table, you are ready to start retrieving data from your database.

```typescript
const users = await User.all();

const activeUsers = await User.where("active", 1)
  .orderBy("name", "desc")
  .take(10)
  .get();
```

## Eloquent Model Methods

### Static Query Methods

#### Retrieving Records

```typescript
// Get all records
const users = await User.all();

// Find a record by ID
const user = await User.find(1);

// Get first record
const firstUser = await User.first();

// Get all records matching conditions
const activeUsers = await User.where("active", 1).get();

// Get single record matching conditions
const user = await User.where("email", "user@example.com").first();

// Get a single column value
const email = await User.where("id", 1).value("email");

// Check if record exists
const exists = await User.where("email", "user@example.com").exists();

// Check if record doesn't exist
const doesntExist = await User.where("email", "user@example.com").doesntExist();
```

#### Creating Records

```typescript
// Create a new record
const user = await User.create({
  name: "John Doe",
  email: "john@example.com",
  password: "hashed_password",
});

// Create multiple records
const users = await User.insert([
  { name: "John", email: "john@example.com" },
  { name: "Jane", email: "jane@example.com" },
]);
```

#### Updating Records

```typescript
// Update by ID
await User.where("id", 1).update({ name: "Updated Name" });

// Update multiple records
await User.where("active", 0).update({ status: "inactive" });

// Update using model instance
const user = await User.find(1);
user.name = "New Name";
await user.save();

// Update quietly (without events)
await User.where("id", 1).updateQuietly({ name: "Quiet Update" });
```

#### Deleting Records

```typescript
// Delete by ID
await User.delete(1);

// Delete multiple records
await User.where("active", 0).delete();

// Delete using model instance
const user = await User.find(1);
await user.delete();

// Delete quietly (without events)
await User.where("id", 1).deleteQuietly();
```

#### Pagination

```typescript
// Paginate results
const users = await User.paginate(req, 15);

// Result structure:
// {
//   data: [...], // Array of models
//   meta: {
//     current_page: 1,
//     per_page: 15,
//     total: 100,
//     total_pages: 7,
//     has_more: true,
//     links: [...]
//   },
//   links: {
//     first: "...",
//     last: "..."
//   }
// }
```

### Instance Methods

#### Saving Models

```typescript
// Save a model instance
const user = new User({ name: "John", email: "john@example.com" });
await user.save();

// Update and save
await user.update({ name: "Updated Name" });

// Save quietly (without events)
await user.saveQuietly();

// Update quietly (without events)
await user.updateQuietly({ name: "Quiet Update" });
```

#### Soft Deletes

```typescript
// Delete (soft delete if softDeletes is enabled)
await user.delete();

// Restore soft deleted record
await user.restore();

// Query with trashed records
const allUsers = await User.withTrashed().get();

// Query only trashed records
const deletedUsers = await User.onlyTrashed().get();
```

#### Attributes & Accessors

```typescript
// Get attribute
const name = user.getAttribute("name");

// Set attribute
user.setAttribute("name", "New Name");

// Get all attributes
const attributes = user.getAttributes();

// Fill attributes (respects fillable/guarded)
user.fill({ name: "John", email: "john@example.com" });

// Check if attribute is dirty
const isDirty = user.isDirty("name");

// Check if attribute is clean
const isClean = user.isClean("name");

// Get dirty attributes
const dirty = user.getDirty();

// Sync original attributes
user.syncOriginal();
```

#### JSON & Serialization

```typescript
// Convert to JSON
const json = user.toJSON();

// Apply casts
user.applyCasts();

// Make hidden attributes visible
user.makeHidden(); // Returns new object with hidden attributes removed
```

#### Relationships (Instance Methods)

```typescript
// Load relationships
await user.load(["posts", "comments"]);

// Load single relationship
await user.load("posts");

// Set relation
user.setRelation("posts", posts);

// Get relation
const posts = user.getRelation("posts");
```

### Query Builder Methods

All query builder methods are available on models. Here are the most commonly used:

#### Where Clauses

```typescript
// Basic where
User.where("column", "value");
User.where("column", "operator", "value");

// Where with object
User.where({ name: "John", active: 1 });

// Where with array
User.where([
  ["name", "John"],
  ["email", "=", "john@example.com"],
]);

// Where with callback
User.where((q) => {
  q.where("name", "John").orWhere("name", "Jane");
});

// Or where
User.orWhere("column", "value");

// Where null
User.whereNull("deleted_at");

// Where not null
User.whereNotNull("deleted_at");

// Where in
User.whereIn("id", [1, 2, 3]);

// Where between
User.whereBetween("age", [18, 65]);

// Where not between
User.whereNotBetween("age", [18, 65]);

// Where exists
User.whereExists((q) => {
  q.select("*").from("posts").whereColumn("posts.user_id", "users.id");
});

// Where date
User.whereDate("created_at", "2024-01-01");
User.whereDate("created_at", ">", "2024-01-01");

// Where month
User.whereMonth("created_at", 12);

// Where year
User.whereYear("created_at", 2024);

// Where day
User.whereDay("created_at", 15);

// Where time
User.whereTime("created_at", "14:30:00");

// Where like
User.whereLike("name", "John");

// Where JSON
User.whereJson("metadata.status", "active");
```

#### Joins

```typescript
// Inner join
User.join("posts", "users.id", "=", "posts.user_id");

// Left join
User.leftJoin("posts", "users.id", "=", "posts.user_id");

// Right join
User.rightJoin("posts", "users.id", "=", "posts.user_id");

// Join with callback
User.join("posts", (join) => {
  join.on("users.id", "=", "posts.user_id").orOn("users.id", "=", "posts.author_id");
});

// Join subquery
User.joinSub(subQuery, "posts", (join) => {
  join.on("users.id", "=", "posts.user_id");
});
```

#### Ordering & Grouping

```typescript
// Order by
User.orderBy("name", "asc");
User.orderBy("created_at", "desc");

// Latest (order by desc)
User.latest("created_at");

// Older (order by asc)
User.older("created_at");

// Order by raw
User.orderByRaw("name ASC, email DESC");

// Group by
User.groupBy("status");

// Group by raw
User.groupByRaw("YEAR(created_at)");
```

#### Aggregates

```typescript
// Count
const count = await User.count();
const count = await User.where("active", 1).count();

// Max
const maxAge = await User.max("age");

// Min
const minAge = await User.min("age");

// Sum
const total = await User.sum("amount");

// Average
const avg = await User.avg("age");
```

#### Select & Distinct

```typescript
// Select specific columns
User.select("name", "email");

// Select all
User.select("*");

// Clear select
User.clearSelect();

// Distinct
User.distinct();
```

#### Limits & Offsets

```typescript
// Limit
User.limit(10);

// Offset
User.offset(20);

// Take (alias for limit)
User.take(10);
```

#### Advanced Queries

```typescript
// Raw SQL
User.raw("SELECT * FROM users WHERE id = ?", [1]);

// Where raw
User.whereRaw("name LIKE ?", ["%John%"]);

// Having
User.having("count", ">", 5);

// Having in
User.havingIn("status", ["active", "pending"]);

// Union
User.union(otherQuery);

// Union all
User.unionAll(otherQuery);

// Clone query
const clonedQuery = User.clone();
```

#### Relationship Queries

```typescript
// Has relationship
User.has("posts");

// Has relationship with count
User.has("posts", ">=", 3);

// Where has
User.whereHas("posts", (q) => {
  q.where("published", 1);
});

// Or where has
User.orWhereHas("posts", (q) => {
  q.where("published", 1);
});
```

#### Eager Loading

```typescript
// Eager load relationships
User.with("posts").get();
User.with(["posts", "comments"]).get();

// Eager load with constraints
User.with({
  posts: (q) => q.where("published", 1),
}).get();
```

#### Increment & Decrement

```typescript
// Increment
User.where("id", 1).increment("views");
User.where("id", 1).increment("views", 5);
User.where("id", 1).increment({ views: 1, clicks: 2 });

// Decrement
User.where("id", 1).decrement("views");
User.where("id", 1).decrement("views", 5);
User.where("id", 1).decrement({ views: 1, clicks: 2 });
```

#### Pluck & Value

```typescript
// Pluck single column
const names = await User.pluck("name");

// Get single value
const email = await User.where("id", 1).value("email");
```

#### Chunking

```typescript
// Process in chunks
await User.orderBy("id").chunk(100, (users) => {
  for (const user of users) {
    // Process each chunk
  }
});
```

#### Without Events

```typescript
// Execute without firing events
await User.executeWithoutEvents(async () => {
  await User.create({ name: "John" });
});
```

---

# Relationships

Database tables are often related to one another. For example, a blog post may have many comments, or an order could be related to the user who placed it. Eloquent makes managing and working with these relationships easy.

## Introduction

Eloquent relationships are defined as methods on your Eloquent model classes. Since relationships also serve as powerful query builders, defining relationships as methods provides powerful method chaining and querying capabilities.

## One To One

A one-to-one relationship is a very basic type of database relationship. For example, a `User` model might be associated with one `Phone` model.

### Defining One To One Relationships

To define this relationship, we will place a `phone` method on the `User` model. The `phone` method should call the `hasOne` method and return its result:

```typescript
import { Model } from "jcc-eloquent";

class User extends Model {
  phone() {
    return this.hasOne(Phone);
  }
}
```

The first argument passed to the `hasOne` method is the name of the related model class.

### Accessing One To One Relationships

Once the relationship is defined, you may access the related record using Eloquent's dynamic relationship properties:

```typescript
const phone = await user.phone();
```

## One To Many

A one-to-many relationship is used to define relationships where a single model is the parent to one or more child models. For example, a blog post may have an infinite number of comments.

### Defining One To Many Relationships

Like all other Eloquent relationships, one-to-many relationships are defined by placing a function on your Eloquent model:

```typescript
class Post extends Model {
  comments() {
    return this.hasMany(Comment);
  }
}
```

### Accessing One To Many Relationships

Once the relationship has been defined, you can access the collection of related comments by accessing the `comments` property:

```typescript
const post = await Post.find(1);
const comments = await post.comments();
```

## Belongs To

A "belongs to" relationship is used when you want to declare that a model belongs to another model. For example, a `Comment` may belong to a `Post`.

### Defining Belongs To Relationships

To define this relationship, we will place a `post` method on the `Comment` model. The `post` method should call the `belongsTo` method and return its result:

```typescript
class Comment extends Model {
  post() {
    return this.belongsTo(Post);
  }
}
```

### Accessing Belongs To Relationships

Once the relationship is defined, you may access the related model using Eloquent's dynamic relationship properties:

```typescript
const comment = await Comment.find(1);
const post = await comment.post();
```

## Many To Many

Many-to-many relationships are slightly more complicated than `hasOne` and `hasMany` relationships. An example of a many-to-many relationship is a user that has many roles and those roles are also shared by other users.

### Defining Many To Many Relationships

Many-to-many relationships are defined by writing a method that returns the result of the `belongsToMany` method:

```typescript
class User extends Model {
  roles() {
    return this.belongsToMany(Role);
  }
}
```

### Accessing Many To Many Relationships

Once the relationship is defined, you may access the user's roles using the `roles` dynamic relationship property:

```typescript
const user = await User.find(1);
const roles = await user.roles();
```

### Working With Pivot Tables

As you have learned, when working with a many-to-many relationship, Eloquent will automatically use the appropriate pivot table. However, you are free to customize the name of this table:

```typescript
return this.belongsToMany(Role, "role_user", "user_id", "role_id");
```

## Eager Loading

When accessing Eloquent relationships as properties, the relationship data is "lazy loaded". This means the relationship data is not actually loaded until you first access the property. However, Eloquent can "eager load" relationships at the time you query the parent model:

```typescript
const users = await User.with("phone").get();
```

### Eager Loading Multiple Relationships

Sometimes you may need to eager load several different relationships in a single operation:

```typescript
const users = await User.with(["phone", "posts"]).get();
```

### Eager Loading with Constraints

You can apply constraints to eager loaded relationships:

```typescript
const users = await User.with({
  posts: (q) => q.where("published", 1).orderBy("created_at", "desc"),
}).get();
```

---

# Model Events & Observers

Eloquent models fire several events, allowing you to hook into various points in the model's lifecycle. You can use these events to perform actions when models are created, updated, deleted, etc.

## Model Events

Eloquent models fire the following events:

- `creating` - Before a new record is created
- `created` - After a new record is created
- `updating` - Before an existing record is updated
- `updated` - After an existing record is updated
- `saving` - Before a record is saved (created or updated)
- `saved` - After a record is saved (created or updated)
- `deleting` - Before a record is deleted
- `deleted` - After a record is deleted
- `restoring` - Before a soft-deleted record is restored
- `restored` - After a soft-deleted record is restored

### Registering Event Listeners

You can register event listeners directly on your model class:

```typescript
import { Model } from "jcc-eloquent";

export class User extends Model {
  protected fillable = ["name", "email"];

  // Register event listeners
  static boot() {
    super.boot();

    // Creating event
    this.creating((user) => {
      console.log("User is being created:", user);
    });

    // Created event
    this.created((user) => {
      console.log("User was created:", user);
    });

    // Saving event
    this.saving((user) => {
      console.log("User is being saved:", user);
    });

    // Saved event
    this.saved((user) => {
      console.log("User was saved:", user);
    });

    // Updating event
    this.updating((user) => {
      console.log("User is being updated:", user);
    });

    // Updated event
    this.updated((user) => {
      console.log("User was updated:", user);
    });

    // Deleting event
    this.deleting((user) => {
      console.log("User is being deleted:", user);
    });

    // Deleted event
    this.deleted((user) => {
      console.log("User was deleted:", user);
    });

    // Restoring event
    this.restoring((user) => {
      console.log("User is being restored:", user);
    });

    // Restored event
    this.restored((user) => {
      console.log("User was restored:", user);
    });
  }
}
```

### Example: Auto-hashing Passwords

```typescript
export class User extends Model {
  protected fillable = ["name", "email", "password"];

  static boot() {
    super.boot();

    // Hash password before saving
    this.saving(async (user) => {
      if (user.isDirty("password")) {
        user.password = await bcrypt(user.password);
      }
    });
  }
}
```

### Example: Generating Slugs

```typescript
export class Post extends Model {
  protected fillable = ["title", "slug", "content"];

  static boot() {
    super.boot();

    // Generate slug before creating
    this.creating((post) => {
      if (!post.slug) {
        post.slug = str().slug(post.title);
      }
    });
  }
}
```

### Disabling Events

You can disable events for specific operations:

```typescript
// Disable events for a single operation
await User.executeWithoutEvents(async () => {
  await User.create({ name: "John" });
});

// Save without events (instance method)
const user = new User({ name: "John" });
await user.saveQuietly();

// Update without events (instance method)
await user.updateQuietly({ name: "Jane" });

// Delete without events (instance method)
await user.deleteQuietly();

// Update without events (query builder)
await User.where("id", 1).updateQuietly({ name: "Jane" });

// Delete without events (query builder)
await User.where("id", 1).deleteQuietly();
```

## Model Observers

Observers allow you to group all of your event listeners for a model into a single class. Observers have method names that correspond to the Eloquent events you wish to listen for.

### Creating Observers

Create an observer class in `app/Observer`:

```typescript
// app/Observer/UserObserver.ts
import { Model } from "jcc-eloquent";

export class UserObserver {
  /**
   * Handle the User "creating" event.
   */
  async creating(user: Model) {
    // Hash password before creating
    if (user.isDirty("password")) {
      user.password = await bcrypt(user.password);
    }
  }

  /**
   * Handle the User "created" event.
   */
  async created(user: Model) {
    // Send welcome email
    await Mail.to(user.email).send(new WelcomeEmail(user));
  }

  /**
   * Handle the User "updating" event.
   */
  async updating(user: Model) {
    // Log update
    console.log(`User ${user.id} is being updated`);
  }

  /**
   * Handle the User "updated" event.
   */
  async updated(user: Model) {
    // Invalidate cache
    await Cache.forget(`user:${user.id}`);
  }

  /**
   * Handle the User "deleting" event.
   */
  async deleting(user: Model) {
    // Delete related records
    await user.posts().delete();
  }

  /**
   * Handle the User "deleted" event.
   */
  async deleted(user: Model) {
    // Clean up related data
    await Cache.forget(`user:${user.id}`);
  }

  /**
   * Handle the User "saving" event.
   */
  async saving(user: Model) {
    // General save logic
  }

  /**
   * Handle the User "saved" event.
   */
  async saved(user: Model) {
    // General saved logic
  }

  /**
   * Handle the User "restoring" event.
   */
  async restoring(user: Model) {
    // Before restore logic
  }

  /**
   * Handle the User "restored" event.
   */
  async restored(user: Model) {
    // After restore logic
  }
}
```

### Registering Observers

Register observers using the `@Observer` decorator on your model:

```typescript
import { Model } from "jcc-eloquent";
import { Observer } from "jcc-eloquent";
import { UserObserver } from "@/Observer/UserObserver";

@Observer(UserObserver)
export class User extends Model {
  protected fillable = ["name", "email", "password"];
}
```

### Observer Methods

Observers can implement any of the following methods:

- `creating(model)` - Before creating
- `created(model)` - After creating
- `updating(model)` - Before updating
- `updated(model)` - After updating
- `saving(model)` - Before saving (create or update)
- `saved(model)` - After saving (create or update)
- `deleting(model)` - Before deleting
- `deleted(model)` - After deleting
- `restoring(model)` - Before restoring
- `restored(model)` - After restoring

### Example: Complete User Observer

```typescript
// app/Observer/UserObserver.ts
import { Model } from "jcc-eloquent";
import { Mail } from "jcc-express-mvc/lib/Mail";
import { Cache } from "jcc-express-mvc/lib/Cache";
import { WelcomeEmail } from "@/Mail/WelcomeEmail";

export class UserObserver {
  async creating(user: Model) {
    // Hash password
    if (user.isDirty("password")) {
      user.password = await bcrypt(user.password);
    }
  }

  async created(user: Model) {
    // Send welcome email
    await Mail.to(user.email).send(new WelcomeEmail(user));
    
    // Create default profile
    await user.profile().create({
      bio: "",
      avatar: null,
    });
  }

  async updating(user: Model) {
    // Re-hash password if changed
    if (user.isDirty("password")) {
      user.password = await bcrypt(user.password);
    }
  }

  async updated(user: Model) {
    // Invalidate cache
    await Cache.forget(`user:${user.id}`);
    await Cache.forget(`users:list`);
  }

  async deleting(user: Model) {
    // Delete related records
    await user.posts().delete();
    await user.comments().delete();
    await user.profile().delete();
  }

  async deleted(user: Model) {
    // Clean up cache
    await Cache.forget(`user:${user.id}`);
    await Cache.forget(`users:list`);
  }
}
```

---

# Collections

## Introduction

Eloquent returns all multi-result sets as instances of standard JavaScript arrays, which you can work with using native array methods. However, JCC Express MVC also provides enhanced methods where applicable, and you can always use standard JavaScript array methods like `.map()`, `.filter()`, `.reduce()`, and more.

## Working With Collections

### Basic Usage

When Eloquent returns multiple results, they are returned as a standard JavaScript array:

```typescript
const users = await User.all();

// Use native array methods
const activeUsers = users.filter((user) => user.active);
const names = users.map((user) => user.name);
```

### Collection Methods

While you can use native JavaScript array methods, JCC Express MVC provides some additional helper methods for common operations:

```typescript
// Filter collection
const activeUsers = users.filter((user) => user.active);

// Map collection
const emails = users.map((user) => user.email);

// Reduce collection
const total = users.reduce((sum, user) => sum + user.votes, 0);
```

## Pagination

The framework includes a sophisticated pagination system that works seamlessly with the query builder and Eloquent ORM.

### Basic Pagination

The simplest way to paginate items is using the `paginate` method on the query builder or an Eloquent query. The `paginate` method automatically takes care of setting the query's "limit" and "offset" based on the current page being viewed by the user:

```typescript
const users = await User.paginate(req, 15);
```

The first argument passed to `paginate` is the request object, and the second is the number of items you would like displayed "per page".

### Pagination Result Structure

The pagination result includes:

- `data`: Your records
- `meta`: Pagination metadata (current_page, total, per_page, etc.)
- `links`: Navigation links (first, last, prev, next)

### Displaying Pagination Results

When calling the `paginate` method, you will receive an instance of a paginator. When rendered to JSON, the paginator will include the pagination metadata and the paginated results:

```typescript
Route.get("/users", async (req, res) => {
  const users = await User.paginate(req, 15);
  return res.json(users);
});
```

### Cursor Pagination

While `paginate` creates pagination based on page numbers, `cursorPaginate` provides a more efficient pagination method that works well for large datasets:

```typescript
const users = await User.cursorPaginate(req, 15);
```

### Simple Pagination

If you only need to display simple "Next" and "Previous" links in your pagination view, you may use the `simplePaginate` method to perform a more efficient query:

```typescript
const users = await User.simplePaginate(req, 15);
```

---

# Views & Templating

JCC Express MVC provides powerful templating capabilities with support for both traditional server-side rendering using jsBlade and modern single-page application patterns using Inertia.js.

## Introduction

JCC Express MVC provides two primary ways to handle views:

1. **jsBlade** - A Blade-like templating engine for server-side rendering
2. **Inertia.js** - For building modern single-page apps with React, Vue, or Svelte

Both approaches use Express's native `res.render()` method for jsBlade and `res.inertia()` method for Inertia.js.

## jsBlade Templating

jsBlade is a powerful templating engine that provides a clean, intuitive syntax similar to Laravel's Blade templating engine. It supports layouts, components, conditionals, loops, and more.

### View File Structure

Views are stored in the `resources/views` directory and must have a `.blade.html` extension:

```
resources/
└── views/
    ├── layouts/
    │   └── app.blade.html
    ├── components/
    │   └── header.blade.html
    └── welcome.blade.html
```

### Rendering Views

Use Express's `res.render()` method to render jsBlade views:

```typescript
import { Route } from "jcc-express-mvc/Core";

Route.get("/", (req, res) => {
  return res.render("welcome", {
    title: "Welcome",
    name: "John",
  });
});
```

The view path should be relative to `resources/views` and without the `.blade.html` extension. The framework will automatically resolve the file.

### Displaying Variables

Use double curly braces to display variables:

```html
<!-- resources/views/welcome.blade.html -->
<h1>Welcome, {{ name }}!</h1>
<p>Title: {{ title }}</p>
```

You can also access nested properties using dot notation:

```html
<p>User Email: {{ user.email }}</p>
<p>Profile Bio: {{ user.profile.bio }}</p>
```

### Comments

Use `{{-- --}}` for comments that won't appear in the rendered HTML:

```html
{{-- This is a comment --}}
<h1>Welcome</h1>
```

### Layouts & Sections

#### Extending Layouts

Use `@extends()` to extend a layout:

```html
<!-- resources/views/pages/home.blade.html -->
@extends('layouts.app')

@section('content')
    <h1>Home Page</h1>
@endsection
```

#### Defining Sections

Use `@section()` and `@endsection` to define content sections:

```html
@section('title')
    Page Title
@endsection

@section('content')
    <div class="content">
        <!-- Your content here -->
    </div>
@endsection
```

#### Layout Template

In your layout file, use `@yield()` to output section content:

```html
<!-- resources/views/layouts/app.blade.html -->
<!DOCTYPE html>
<html>
<head>
    <title>@yield('title')</title>
</head>
<body>
    <header>
        <!-- Header content -->
    </header>
    
    <main>
        @yield('content')
    </main>
    
    <footer>
        <!-- Footer content -->
    </footer>
</body>
</html>
```

#### Yield with Default

You can provide a default value for `@yield()`:

```html
@yield('title', 'Default Title')
```

### Including Views

Use `@include()` to include other view files:

```html
@include('components.header')

<div class="content">
    <!-- Main content -->
</div>

@include('components.footer')
```

### Conditionals

#### If Statements

```html
@if(user.isAdmin)
    <p>You are an admin</p>
@else
    <p>You are a regular user</p>
@endif
```

#### Ternary Operator

```html
@ternary(user.isActive ? 'Active' : 'Inactive')
```

### Loops

#### Foreach Loop

```html
@foreach(users as user)
    <div class="user">
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
        <p>Index: {{ user.loopIndex }}</p>
    </div>
@endforeach
```

The `loopIndex` property is automatically available inside the loop, starting from 0.

### Authentication Directives

#### Auth Directive

Display content only for authenticated users:

```html
@auth
    <p>Welcome, {{ Auth.name }}!</p>
    <a href="/logout">Logout</a>
@endauth
```

Check for specific roles:

```html
@auth('admin')
    <p>Admin Panel</p>
@endauth
```

#### Guest Directive

Display content only for guests (unauthenticated users):

```html
@guest
    <a href="/login">Login</a>
    <a href="/register">Register</a>
@endguest
```

### Assets

Use the `assets()` helper to include CSS and JavaScript files:

```html
{{ assets('css/app') }}
{{ assets('js/app') }}
```

This will automatically generate the correct `<link>` or `<script>` tags.

### Vite Integration

#### Vite Directive

Use `@vite()` to include Vite-compiled assets:

```html
@vite(['resources/js/app.js', 'resources/css/app.css'])
```

In development, this will include the Vite dev server client. In production, it will use the built assets from the manifest.

#### Vite React Refresh

For React development, include the refresh script:

```html
@viteReactRefresh
```

### Inertia Directive

Use `@inertia` in your root layout to output the Inertia app container:

```html
<!-- resources/views/app.blade.html -->
<!DOCTYPE html>
<html>
<head>
    <title>My App</title>
    @vite(['resources/js/app.js', 'resources/css/app.css'])
</head>
<body>
    @inertia
</body>
</html>
```

This will output: `<div id="app" data-page='...'></div>` with the Inertia page data.

### Complete Example

```html
<!-- resources/views/layouts/app.blade.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'My App')</title>
    @vite(['resources/css/app.css'])
</head>
<body>
    <header>
        @include('components.navbar')
    </header>

    <main>
        @yield('content')
    </main>

    <footer>
        @include('components.footer')
    </footer>

    @vite(['resources/js/app.js'])
</body>
</html>
```

```html
<!-- resources/views/pages/dashboard.blade.html -->
@extends('layouts.app')

@section('title')
    Dashboard
@endsection

@section('content')
    @auth
        <h1>Welcome, {{ Auth.name }}!</h1>
        
        @if(Auth.role === 'admin')
            <div class="admin-panel">
                <h2>Admin Panel</h2>
            </div>
        @endif

        <h2>Users</h2>
        @foreach(users as user)
            <div class="user-card">
                <h3>{{ user.name }}</h3>
                <p>{{ user.email }}</p>
            </div>
        @endforeach
    @endauth

    @guest
        <p>Please login to view the dashboard.</p>
    @endguest
@endsection
```

## Inertia.js Integration

Inertia.js allows you to build modern single-page applications using your existing server-side routing and controllers, without the complexity of building a separate API.

### Setting Up Inertia Middleware

Register the Inertia middleware in your HTTP kernel's `middlewares` array:

```typescript
// app/Http/kernel.ts
import { inertia } from "jcc-express-mvc/Core/Inertia";

export class Kernel {
  public middlewares = [
    // ... other middlewares
    inertia({
      rootView: "app", // Root view file (resources/views/app.blade.html)
      version: "1.0.0", // Asset version for cache busting (optional)
      ssr: true, // Enable SSR (optional, boolean or object)
      sharedProps(req) {
        // Shared props available to all Inertia pages
        return {
          auth: req.user || null,
          flash: req.flash(),
        };
      },
    }),
  ];

  public middlewareAliases: Record<string, any> = {
    // ... your middleware aliases
  };
}
```

#### Inertia Options

- `rootView` (required): The root view file path relative to `resources/views` (without `.blade.html` extension)
- `version` (optional): Asset version for cache busting. Can be a string or function that returns a string
- `ssr` (optional): Enable server-side rendering. Can be `true`/`false` or an object with SSR configuration
- `sharedProps` (optional): Function that returns shared props for all Inertia pages. Receives `req` as parameter

### Rendering Inertia Pages

Use `res.inertia()` to render Inertia pages:

```typescript
import { Route } from "jcc-express-mvc/Core";

Route.get("/users", async (req, res) => {
  const users = await User.all();
  
  return res.inertia("Users/Index", {
    users: users,
  });
});
```

### Inertia Redirects

Use `res.inertiaRedirect()` for redirects that work with Inertia:

```typescript
Route.post("/users", async (req, res) => {
  const user = await User.create(req.body);
  
  return res.inertiaRedirect("/users");
});
```

### Shared Props

Props can be shared across all Inertia pages via the middleware configuration in your kernel:

```typescript
// app/Http/kernel.ts
inertia({
  rootView: "app",
  sharedProps(req) {
    return {
      auth: req.user || null,
      flash: {
        message: req.flash("success")[0] || null,
        type: "success",
      },
    };
  },
})
```

These props are automatically merged with page-specific props when you call `res.inertia()`.

### Partial Reloads

Inertia supports partial reloads. The client can request only specific props:

```typescript
// Client sends X-Inertia-Partial-Data header with: "users,count"
// Only those props will be returned
Route.get("/users", async (req, res) => {
  const users = await User.all();
  const count = await User.count();
  
  return res.inertia("Users/Index", {
    users: users,
    count: count,
    filters: req.query,
  });
});
```

### Server-Side Rendering (SSR)

If SSR is enabled, Inertia will attempt to server-side render your React/Vue components on the initial page load. Enable it in your kernel:

```typescript
// app/Http/kernel.ts
inertia({
  rootView: "app",
  ssr: true, // Simple boolean
  // or
  ssr: {
    enabled: true,
    // SSR server URL (default: http://localhost:13714)
  },
})
```

The SSR server should be running separately and will receive render requests at `http://localhost:13714/render` by default.

### Complete Example

```typescript
// app/Http/kernel.ts
import session from "express-session";
import cookieParser from "cookie-parser";
import flash from "connect-flash";
import { inertia } from "jcc-express-mvc/Core/Inertia";

export class Kernel {
  public middlewares = [
    cookieParser(),
    session({
      secret: process.env.SESSION_SECRET || "your_secret",
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
    }),
    flash(),
    inertia({
      rootView: "app", // resources/views/app.blade.html
      version: "1.0.0",
      ssr: true,
      sharedProps(req) {
        return {
          auth: req.user || null,
          flash: req.flash(),
        };
      },
    }),
  ];

  public middlewareAliases: Record<string, any> = {
    // ... your middleware aliases
  };
}
```

```typescript
// routes/web.ts
import { Route } from "jcc-express-mvc/Core";
import { UserController } from "@/Http/Controllers/UserController";

// Routes
Route.get("/", (req, res) => {
  return res.inertia("Home", {
    message: "Welcome!",
  });
});

Route.get("/users", [UserController, "index"]);
Route.post("/users", [UserController, "store"]);
```

```typescript
// app/Http/Controllers/UserController.ts
import { Inject, Method } from "jcc-express-mvc";
import { User } from "@/Models/User";

@Inject()
export class UserController {
  @Method()
  async index(req: any, res: any) {
    const users = await User.all();
    
    return res.inertia("Users/Index", {
      users: users,
    });
  }

  @Method()
  async store(req: any, res: any) {
    const user = await User.create(req.body);
    
    req.flash("success", "User created successfully!");
    
    return res.inertiaRedirect("/users");
  }
}
```

### Client-Side Setup

On the client side, set up Inertia with your frontend framework:

```typescript
// resources/js/app.jsx
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
    return pages[`./Pages/${name}.jsx`];
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});
```

The root view should contain the `@inertia` directive:

```html
<!-- resources/views/app.blade.html -->
<!DOCTYPE html>
<html>
<head>
    <title>My App</title>
    @vite(['resources/css/app.css'])
</head>
<body>
    @inertia
    @vite(['resources/js/app.js'])
</body>
</html>
```

---

# Authentication

JCC Express MVC provides a built-in authentication system that is simple, flexible, and secure. The authentication configuration file is located at `app/Config/auth.ts`, which contains several well-documented options for tweaking the behavior of the authentication services.

## Introduction

JCC Express MVC makes implementing authentication very simple. In fact, almost everything is configured for you out of the box. The authentication configuration file is located at `app/Config/auth.ts`, which contains several well-documented options for tweaking the behavior of the authentication services.

## Authentication Quickstart

JCC Express MVC ships with several pre-built authentication controllers, which are located in the `jcc-express-mvc` package. However, you're welcome to use these as a starting point for your own implementation.

### Routing

The framework provides authentication middleware and helpers to make it easy to protect routes. To get started, attach the `auth` middleware to your routes:

```typescript
import { Route } from "jcc-express-mvc/Core";

// Web routes (session-based)
Route.middleware(["auth"]).get("/profile", (req, res) => {
  return res.json({ user: req.user });
});

// API routes (JWT-based)
Route.middleware(["apiAuth"]).get("/api/profile", (req, res) => {
  return res.json({ user: req.user });
});
```

### Authenticating Users

You can authenticate users using the `Auth` class:

```typescript
import { Auth } from "jcc-express-mvc";

// In your login controller
Route.post("/login", async (req, res, next) => {
  await Auth.attempt(req, res, next, "/dashboard");
});
```

The `attempt` method accepts the request, response, next function, and an optional redirect path. It will:

1. Verify the user's credentials
2. Set authentication tokens (JWT for API, session for web)
3. Redirect or return JSON response based on request type

### Accessing The Authenticated User

You may access the authenticated user via the `req.user` property:

```typescript
Route.middleware(["auth"]).get("/profile", (req, res) => {
  const user = req.user;
  return res.json({ user });
});
```

### Protecting Routes

Route middleware can be used to only allow authenticated users to access a given route. JCC Express MVC ships with `auth` middleware, which is defined in `app/Http/kernel.ts`:

```typescript
// app/Http/kernel.ts
export class Kernel {
  static middlewareAliases = {
    auth: AuthMiddleware.auth,
    apiAuth: AuthMiddleware.apiAuth,
    guest: AuthMiddleware.guest,
  };
}
```

### Logging Out

To log users out of your application, you may use the `logout` method:

```typescript
import { Auth } from "jcc-express-mvc/lib/Auth";

Route.post("/logout", (req, res) => {
  Auth.logout(req, res);
  return res.redirect("/");
});
```

## API Authentication

For APIs, JCC Express MVC uses JWT (JSON Web Tokens) for authentication. The `apiAuth` middleware automatically validates JWT tokens from either the `Authorization` header or cookies.

### Using API Authentication

```typescript
Route.middleware(["apiAuth"]).get("/api/user", (req, res) => {
  return res.json({ user: req.user });
});
```

The middleware will look for the token in:
1. `Authorization: Bearer {token}` header
2. `auth_token` cookie

## Password Hashing

JCC Express MVC uses `bcrypt` for password hashing. When storing passwords, always hash them:

```typescript
// Using the global bcrypt helper (recommended)
const hashedPassword = await bcrypt("plain-text-password");

// Or import directly if needed
import { bcrypt } from "jcc-express-mvc";
const hashedPassword = await bcrypt("plain-text-password");
```

---

# Events & Listeners

JCC Express MVC's event system provides a simple observer implementation, allowing you to subscribe and listen for various events that occur in your application.

## Introduction

JCC Express MVC's event system provides a simple observer implementation, allowing you to subscribe and listen for various events that occur in your application. Events serve as a great way to decouple various aspects of your application, since a single event can have multiple listeners that do not depend on each other.

## Registering Events & Listeners

The `EventServiceProvider` included with your JCC Express MVC application provides a convenient place to register all of your application's event listeners. The `listen` property contains an array of all events (keys) and their listeners (values).

### Generating Events & Listeners

Of course, manually creating the files for each event and listener is cumbersome. Instead, add listeners and events to your `EventServiceProvider` and use the event:generate command:

```bash
bun artisanNode event:generate
```

### Manually Registering Events

Typically, events should be registered in the `app/Providers/EventServiceProvider` using the `$listen` property:

```typescript
import { EventServiceProvider as ServiceProvider } from "jcc-express-mvc";
import { UserRegistered } from "@/Events/UserRegistered";
import { SendWelcomeEmail } from "@/Listeners/SendWelcomeEmail";

export class EventServiceProvider extends ServiceProvider {
  protected listen: Record<any, Function[]> = {
    UserRegistered: [SendWelcomeEmail],
  };

  protected subscribe: any[] = [];

  register(): void {}
}
```

## Defining Events

An event class is a data container which holds the information related to the event. For example, let's assume an `OrderShipped` event receives an `Order` object:

```typescript
// app/Events/OrderShipped.ts
export class OrderShipped {
  constructor(public order: Order) {}
}
```

## Defining Listeners

Event listeners receive the event instance in their `handle` method. The `event:generate` command will automatically import the proper event class and type-hint the event in the `handle` method:

```typescript
// app/Listeners/SendShipmentNotification.ts
import { OrderShipped } from "@/Events/OrderShipped";

export class SendShipmentNotification {
  async handle(event: OrderShipped) {
    // Access the order using event.order
    // Send notification...
  }
}
```

## Dispatching Events

To dispatch an event, you may use the global `emit()` helper function. This is the recommended way to dispatch events:

```typescript
import { OrderShipped } from "@/Events/OrderShipped";

// Dispatch the event using the global emit() helper
await emit(new OrderShipped(order));
```

You can use `emit()` anywhere in your application - in controllers, services, jobs, or any other class:

```typescript
// In a controller
@Method()
async shipOrder(orderId: number) {
  const order = await Order.find(orderId);
  // ... shipping logic ...
  
  // Dispatch event
  await emit(new OrderShipped(order));
  
  return { message: "Order shipped" };
}
```

## Event Subscribers

Event subscribers are classes that may subscribe to multiple events from within the class itself, allowing you to define several event handlers within a single class. Subscribers should define a `subscribe` method, which will be passed an event dispatcher instance:

```typescript
// app/Listeners/UserEventSubscriber.ts
import { UserRegistered } from "@/Events/UserRegistered";
import { UserUpdated } from "@/Events/UserUpdated";

export class UserEventSubscriber {
  async handleUserRegistered(event: UserRegistered) {
    // Handle user registered event
  }

  async handleUserUpdated(event: UserUpdated) {
    // Handle user updated event
  }

  subscribe(emitter: any) {
    emitter.listen("UserRegistered", this.handleUserRegistered);
    emitter.listen("UserUpdated", this.handleUserUpdated);
  }
}
```

After writing the subscriber, you may register it with the event dispatcher in the `EventServiceProvider`:

```typescript
protected subscribe: any[] = [UserEventSubscriber];
```

---

# Queues

JCC Express MVC queues provide a unified API across a variety of different queue backends, allowing you to defer the processing of a time consuming task, such as sending an email, until a later time, which drastically speeds up web requests to your application.

## Introduction

While building your web application, you may have some tasks, such as parsing and storing an uploaded CSV file, that take too long to perform during a typical web request. JCC Express MVC makes it easy to create queued jobs that may be processed in the background. By moving time intensive tasks to a queue, your application can respond to web requests with blazing speed and provide a better user experience to your customers.

## Creating Jobs

### Generating Job Classes

By default, all of the queueable jobs for your application are stored in the `app/Jobs` directory. You may generate a new queued job using the Artisan `make:job` command:

```bash
bun artisanNode make:job ProcessPodcast
```

The newly generated class will implement the `Job` interface, allowing the job to be pushed to the queue:

```typescript
// app/Jobs/ProcessPodcast.ts
import { Job } from "jcc-express-mvc/lib/Queue/Job";

export class ProcessPodcast extends Job {
  constructor(public podcast: Podcast) {
    super();
  }

  async handle() {
    // Process the podcast...
  }
}
```

## Dispatching Jobs

Once you have written a job class, you may dispatch it using the `dispatch` method on the job itself:

```typescript
import { app } from "@/bootstrap/app";
import { ProcessPodcast } from "@/Jobs/ProcessPodcast";

const queue = app.resolve("Queue");

// Dispatch the job to the queue
await queue.push(new ProcessPodcast(podcast));
```

### Delayed Jobs

If you would like to delay the execution of a queued job, you may use the `delay` method when dispatching the job:

```typescript
await queue.push(new ProcessPodcast(podcast), { delay: 5000 }); // 5 seconds
```

### Job Chaining

Job chaining allows you to specify a list of queued jobs that should be run in sequence. If one job in the sequence fails, the rest of the jobs will not be run:

```typescript
await queue
  .push(new ProcessPodcast(podcast))
  .then(() => queue.push(new OptimizePodcast(podcast)))
  .then(() => queue.push(new PublishPodcast(podcast)));
```

## Running The Queue Worker

### Processing Jobs

JCC Express MVC includes a queue worker that will process new jobs as they are pushed to the queue. You may run the worker using the `queue:work` Artisan command:

```bash
bun artisanNode queue:work
```

### Queue Priorities

Sometimes you may wish to prioritize how your queues are processed. For example, in your `app/Config/queue.ts` file you may set the default queue for your connection. To push jobs to a specific queue, use the `onQueue` method when dispatching the job:

```typescript
await queue.push(new ProcessPodcast(podcast), { queue: "high" });
```

## Failed Jobs

Sometimes your queued jobs will fail. Don't worry, things don't always go as planned! JCC Express MVC includes a convenient way to specify the maximum number of times a job should be attempted. After a job has exceeded this number of attempts, it will be inserted into the `failed_jobs` database table.

---

# Cache

JCC Express MVC provides an expressive, unified API for various caching backends. Caching configuration is located at `app/Config/cache.ts`. The cache configuration allows you to specify which cache driver you would like to use as the default cache driver for your application.

## Introduction

While JCC Express MVC includes support for several popular caching backends out of the box, a cache abstraction layer provides a consistent API for accessing these various cache systems. The cache configuration is located at `app/Config/cache.ts`.

## Cache Drivers

JCC Express MVC supports popular caching backends like Memcached and Redis out of the box. In addition, a file based cache driver is available, while array and "null" cache drivers provide convenient cache backends for your automated tests.

### Driver Prerequisites

- **Memory**: No additional setup required
- **Redis**: Requires Redis server
- **File**: No additional setup required

## Cache Usage

### Obtaining A Cache Instance

To obtain a cache store instance, you may use the `Cache` facade, which is what we will use throughout this documentation:

```typescript
import { Cache } from "jcc-express-mvc/lib/Cache";

const value = await Cache.get("key");
```

### Retrieving Items From The Cache

The `get` method on the `Cache` facade is used to retrieve items from the cache. If the item does not exist in the cache, `null` will be returned:

```typescript
const value = await Cache.get("key");
```

If you wish, you may pass a second argument to the `get` method specifying the default value that should be returned if the item doesn't exist:

```typescript
const value = await Cache.get("key", "default");
```

### Storing Items In The Cache

You may use the `put` method on the `Cache` facade to store items in the cache:

```typescript
await Cache.put("key", "value", 600); // Store for 10 minutes
```

If the storage time is not passed to the `put` method, the item will be stored indefinitely:

```typescript
await Cache.put("key", "value");
```

### Checking For Item Existence

The `has` method may be used to determine if an item exists in the cache:

```typescript
if (await Cache.has("key")) {
  // ...
}
```

### Incrementing / Decrementing Values

The `increment` and `decrement` methods may be used to adjust the value of integer items in the cache:

```typescript
await Cache.increment("key");
await Cache.increment("key", 5);

await Cache.decrement("key");
await Cache.decrement("key", 5);
```

### Storing Items Forever

The `forever` method may be used to store an item in the cache permanently:

```typescript
await Cache.forever("key", "value");
```

### Removing Items From The Cache

You may remove items from the cache using the `forget` method:

```typescript
await Cache.forget("key");
```

You may also clear the entire cache using the `flush` method:

```typescript
await Cache.flush();
```

## Cache Tags

> **Note**: Cache tags are not supported by all cache drivers. Memcached and Redis support cache tags.

Cache tags allow you to tag related items in the cache and then flush all cached values that have been assigned a given tag. You may access a tagged cache by passing in an ordered array of tag names.

---

# File Storage

JCC Express MVC provides a powerful filesystem abstraction thanks to the Storage facade, which provides a simple, unified interface for working with local filesystems and cloud-based storage systems.

## Introduction

JCC Express MVC provides a powerful filesystem abstraction thanks to the Storage facade, which provides a simple, unified interface for working with local filesystems and cloud-based storage systems like Amazon S3, Google Cloud Storage, and more.

## Configuration

The filesystem configuration file is located at `app/Config/storage.ts`. Within this file you may configure all of your filesystem "disks". Each disk represents a particular storage driver and storage location.

### The Public Disk

The `public` disk is intended for files that are going to be publicly accessible. By default, the `public` disk uses the `local` driver and stores these files in `storage/app/public`.

## Obtaining Disk Instances

The `Storage` facade may be used to interact with any of your configured disks. For example, you may use the `put` method on the facade to store a file on the default disk:

```typescript
import { Storage } from "jcc-express-mvc/lib/Storage";

await Storage.put("avatars/1.jpg", fileContents);
```

### Storing Files

The `put` method may be used to store file contents on a disk:

```typescript
await Storage.put("file.jpg", contents);
```

You may also use the `putFile` method to store an uploaded file:

```typescript
const path = await Storage.putFile("avatars", req.file);
```

### Retrieving Files

The `get` method may be used to retrieve the contents of a file:

```typescript
const contents = await Storage.get("file.jpg");
```

### Downloading Files

The `download` method may be used to generate a response that forces the user's browser to download the file at the given path:

```typescript
return Storage.download("file.jpg");
```

### File URLs

You may use the `url` method to get the URL for a given file:

```typescript
const url = Storage.url("file.jpg");
```

### File Existence

The `exists` method may be used to determine if a file exists on the disk:

```typescript
if (await Storage.exists("file.jpg")) {
  // ...
}
```

### Deleting Files

The `delete` method accepts a single filename or an array of files to remove from the disk:

```typescript
await Storage.delete("file.jpg");
await Storage.delete(["file1.jpg", "file2.jpg"]);
```

### Directories

#### Get All Files Within A Directory

The `files` method returns an array of all of the files in a given directory:

```typescript
const files = await Storage.files("directory");
```

#### Get All Directories Within A Directory

The `directories` method returns an array of all the directories within a given directory:

```typescript
const directories = await Storage.directories("directory");
```

#### Create A Directory

The `makeDirectory` method will create the given directory, including any needed subdirectories:

```typescript
await Storage.makeDirectory("directory");
```

#### Delete A Directory

Finally, the `deleteDirectory` method may be used to remove a directory and all of its files:

```typescript
await Storage.deleteDirectory("directory");
```

---

# Mail

JCC Express MVC provides a clean, simple API over the popular Nodemailer library, allowing you to quickly send emails through SMTP or other mail services.

## Introduction

JCC Express MVC provides a simple API for sending emails using Nodemailer. The Mail class supports SMTP configuration and allows you to send HTML emails using jsBlade templates.

## Configuration

Mail configuration is done through environment variables in your `.env` file:

```env
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password
MAIL_FROM_ADDRESS=noreply@example.com
```

## Sending Mail

The `Mail` class provides a fluent API for sending emails. Use the `to()` method to specify the recipient, then call `send()` with a mailer object.

### Basic Email

```typescript
import { Mail } from "jcc-express-mvc/Core/Mail";

await Mail.to("user@example.com").send({
  sender: "Your App Name",
  email: "noreply@example.com", // Optional, defaults to MAIL_FROM_ADDRESS
  subject: "Welcome to Our App",
  message: "Thank you for joining us!",
  content: "emails/welcome", // Path to jsBlade template (without .blade.html)
});
```

### Email with CC and BCC

```typescript
await Mail.to("user@example.com")
  .cc("manager@example.com", "admin@example.com")
  .bbc("archive@example.com")
  .send({
    sender: "Your App Name",
    subject: "Important Update",
    message: "Please review the attached document.",
    content: "emails/update",
  });
```

### Email with Attachments

```typescript
await Mail.to("user@example.com").send({
  sender: "Your App Name",
  subject: "Invoice",
  message: "Please find your invoice attached.",
  content: "emails/invoice",
  attachments: [
    {
      filename: "invoice.pdf",
      path: "/path/to/invoice.pdf",
    },
    {
      filename: "report.xlsx",
      content: Buffer.from("..."), // Or use content for in-memory files
      contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
  ],
});
```

### Using jsBlade Templates

The `content` field should point to a jsBlade template file (without the `.blade.html` extension). The template will receive the `message`, `subject`, and other data you pass:

```html
<!-- resources/views/emails/welcome.blade.html -->
<!DOCTYPE html>
<html>
<head>
  <title>{{ subject }}</title>
</head>
<body>
  <h1>Welcome!</h1>
  <p>{{ message }}</p>
  <p>Thank you for joining us.</p>
</body>
</html>
```

### Complete Example

```typescript
import { Mail } from "jcc-express-mvc/Core/Mail";

// In route closures, TypeScript automatically infers types - no imports needed
Route.post("/send-welcome-email", async (req, res) => {
  const { email, name } = req.body;

  await Mail.to(email).send({
    sender: "My App",
    subject: `Welcome, ${name}!`,
    message: `Hello ${name}, welcome to our platform!`,
    content: "emails/welcome",
  });

  return res.json({ message: "Welcome email sent!" });
});
```

## Mailer Interface

The `send()` method accepts a `Mailer` object with the following structure:

```typescript
interface Mailer {
  sender: string;           // Sender name
  email?: string;           // Sender email (optional, uses MAIL_FROM_ADDRESS if not provided)
  subject: string;          // Email subject
  message: string;          // Email message/content
  content: string;          // Path to jsBlade template (without .blade.html)
  attachments?: Array<{     // Optional attachments
    filename: string;
    path?: string;          // File path
    content?: string | Buffer; // File content (for in-memory files)
    contentType?: string;   // MIME type
  }>;
}
```

## Queueing Mail

To queue emails for background processing, you can dispatch a job that sends the email:

```typescript
import { dispatch } from "jcc-express-mvc";
import { SendWelcomeEmail } from "@/Jobs/SendWelcomeEmail";

// In your controller
await dispatch(new SendWelcomeEmail(user.email, user.name));
```

Then in your job:

```typescript
import { Job } from "jcc-express-mvc";
import { Mail } from "jcc-express-mvc/Core/Mail";

export class SendWelcomeEmail extends Job<{ email: string; name: string }> {
  async handle() {
    await Mail.to(this.data.email).send({
      sender: "My App",
      subject: `Welcome, ${this.data.name}!`,
      message: `Hello ${this.data.name}, welcome to our platform!`,
      content: "emails/welcome",
    });
  }
}
```

---

# Real-time Communication

JCC Express MVC includes integrated WebSocket support through Socket.IO, allowing you to build real-time applications with ease. Broadcasting your events allows you to share the same event names between your server-side code and your client-side JavaScript application.

## Introduction

Many modern web applications require real-time updates. JCC Express MVC makes it easy to "broadcast" your events over a WebSocket connection. Broadcasting your events allows you to share the same event names between your server-side code and your client-side JavaScript application.

## Configuration

All of your event broadcasting configuration is stored in the `app/Config/broadcasting.ts` configuration file. JCC Express MVC supports several broadcast drivers out of the box: Socket.IO, Redis, and a log driver for local development and debugging.

## Creating Socket.IO Service Providers

To handle Socket.IO connections and events, you need to create a service provider that extends the `SocketProvider` class. This provider gives you access to the Socket.IO server instance through the `this.io` property.

### Basic Socket.IO Provider

Create a new service provider in `app/Providers`:

```typescript
// app/Providers/SocketIOServiceProvider.ts
import { Application } from "jcc-express-mvc/Core";
import { SocketProvider } from "jcc-express-mvc/Core/Provider";

export class SocketIOServiceProvider extends SocketProvider {
  constructor(protected app: Application) {
    super(app);
  }

  register(): void {
    // Register any services here
  }

  boot(): void {
    // Access the Socket.IO server instance via this.io
    this.io.on("connection", (socket) => {
      console.log("New user connected:", socket.id);

      // Handle custom events
      socket.on("message", (data) => {
        console.log("Message received:", data);
        // Broadcast to all clients
        this.io.emit("message", data);
      });

      // Handle disconnect
      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });
  }
}
```

### Registering the Provider

Register your Socket.IO service provider in `bootstrap/providers.ts`:

```typescript
import { SocketIOServiceProvider } from "@/Providers/SocketIOServiceProvider";

export const providers = [
  AppServiceProvider,
  SocketIOServiceProvider, // Add your Socket.IO provider
  EventServiceProvider,
  // ... other providers
];
```

### Advanced Example: Room Management

Here's a more advanced example that handles room joining, WebRTC signaling, and user presence:

```typescript
// app/Providers/SocketIOServiceProvider.ts
import { Application } from "jcc-express-mvc/Core";
import { SocketProvider } from "jcc-express-mvc/Core/Provider";

export class SocketIOServiceProvider extends SocketProvider {
  constructor(protected app: Application) {
    super(app);
  }

  register(): void {}

  boot(): void {
    this.io.on("connection", (socket) => {
      console.log("New user connected:", socket.id);

      // Join a room
      socket.on("join-room", ({ roomId }) => {
        console.log(`User ${socket.id} joining room ${roomId}`);

        // Get users already in the room
        const usersInRoom = Array.from(
          this.io.sockets.adapter.rooms.get(roomId) || []
        );

        // Notify existing users that a new user joined
        this.io.to(roomId).emit("user-joined", { userId: socket.id });

        // Notify the new user about existing users
        usersInRoom.forEach((userId) => {
          if (userId !== socket.id) {
            socket.emit("user-joined", { userId });
          }
        });

        socket.join(roomId);
      });

      // WebRTC signaling: Offer
      socket.on("offer", ({ to, offer }) => {
        console.log(`Offer from ${socket.id} to ${to}`);
        this.io.to(to).emit("offer", { from: socket.id, offer });
      });

      // WebRTC signaling: Answer
      socket.on("answer", ({ to, answer }) => {
        console.log(`Answer from ${socket.id} to ${to}`);
        this.io.to(to).emit("answer", { from: socket.id, answer });
      });

      // WebRTC signaling: ICE candidate
      socket.on("ice-candidate", ({ to, candidate, sdpMLineIndex, sdpMid }) => {
        this.io.to(to).emit("ice-candidate", {
          from: socket.id,
          candidate: {
            candidate,
            sdpMLineIndex,
            sdpMid,
          },
        });
      });

      // Leave a room
      socket.on("leave-room", ({ roomId }) => {
        console.log(`User ${socket.id} leaving room ${roomId}`);
        socket.leave(roomId);
        this.io.to(roomId).emit("user-left", { userId: socket.id });
      });

      // Handle disconnect
      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        // Notify all rooms that this user disconnected
        socket.rooms.forEach((room) => {
          this.io.to(room).emit("user-left", { userId: socket.id });
        });
      });
    });
  }
}
```

### Available Socket.IO Methods

The `this.io` property provides access to all Socket.IO server methods:

```typescript
// Emit to all connected clients
this.io.emit("event-name", data);

// Emit to a specific room
this.io.to("room-id").emit("event-name", data);

// Emit to all clients except the sender
socket.broadcast.emit("event-name", data);

// Emit to a specific socket
this.io.to(socketId).emit("event-name", data);

// Get all sockets in a room
const socketsInRoom = Array.from(
  this.io.sockets.adapter.rooms.get("room-id") || []
);
```

## Broadcasting Events

### Defining Broadcast Events

To get started, let's create an event that implements the `ShouldBroadcast` interface. This interface tells JCC Express MVC that the event should be broadcast:

```typescript
// app/Events/OrderStatusChanged.ts
import { ShouldBroadcast } from "jcc-express-mvc/lib/Event";

export class OrderStatusChanged implements ShouldBroadcast {
  constructor(public order: Order) {}

  broadcastOn() {
    return "orders"; // Channel name
  }

  broadcastAs() {
    return "status-changed"; // Event name
  }

  broadcastWith() {
    return {
      orderId: this.order.id,
      status: this.order.status,
    };
  }
}
```

### Broadcasting Events

Once you have defined an event and marked it with the `ShouldBroadcast` interface, you can dispatch it using the global `emit()` helper. You can use `emit()` anywhere in your application, including in controllers:

```typescript
import { OrderStatusChanged } from "@/Events/OrderStatusChanged";

// Using the global emit() helper
await emit(new OrderStatusChanged(order));
```

#### Using emit() in Controllers

You can use `emit()` directly in your controller methods or constructor:

```typescript
import { Inject, Method } from "jcc-express-mvc";
import { Event } from "jcc-express-mvc/lib/Event/Event";
import { OrderStatusChanged } from "@/Events/OrderStatusChanged";
import { Order } from "@/Models/Order";

@Inject()
class OrderController {

   constructor(private event:Event){

   }

  @Method()
  async updateStatus(order: Order, status: string) {
    order.status = status;
    await order.save();

   this.event.dispatch(new OrderStatusChanged(order))

   //OR

   // Dispatch broadcast event using global emit()
    await emit(new OrderStatusChanged(order));


    return { message: "Order status updated" };
  }
}
```

## Receiving Broadcasts

### Listening For Events

Socket.IO client is included with the framework, so you can directly use it in your client-side code. When using the same framework, you don't need to specify the host URL - the framework handles the connection automatically:

```typescript
import { io } from "socket.io-client";

// No need to specify the host when using the same framework
const socket = io();

socket.on("status-changed", (data) => {
  console.log("Order status changed:", data);
});
```

If you need to connect to a different server, you can still specify the URL:

```typescript
// Only needed when connecting to a different server
const socket = io("http://other-server.com:5500");
```

## Broadcasting To Presence Channels

Presence channels build on the security of private channels while exposing the additional feature of awareness of who is subscribed to the channel. This makes it easy to build collaborative features, such as showing which users are viewing a given page.

### Authorizing Presence Channels

All presence channels are also private channels; therefore, users must be authorized to access them. However, when defining authorization callbacks for presence channels, you should not return `true` if the user is authorized. Instead, you should return an array of data about the user:

```typescript
// In your Socket.IO service provider
boot(): void {
  this.io.on("connection", (socket) => {
    socket.on("join-presence", (channel, callback) => {
      // Authorize and return user data
      // You can access the authenticated user from socket.data or req
      const user = socket.data.user; // Assuming user is set during authentication
      
      if (user) {
        callback(null, {
          id: user.id,
          name: user.name,
        });
      } else {
        callback(new Error("Unauthorized"));
      }
    });
  });
}
```

---

# Artisan Console Introduction

ArtisanNode is the command-line interface included with JCC Express MVC. It provides a number of helpful commands that can assist you while building your application.

## Introduction

ArtisanNode is the command-line interface included with JCC Express MVC. It provides a number of helpful commands that can assist you while building your application.


## Available Commands

### Making Things

ArtisanNode provides a number of commands to help you generate boilerplate code for your application:

```bash
# Create a new controller
bun artisanNode make:controller UsersController

# Create a new model
bun artisanNode make:model User

# Create a new migration
bun artisanNode make:migration create_users_table

# Create a new seeder
bun artisanNode make:seeder UserSeeder

# Create a new middleware
bun artisanNode make:middleware AuthMiddleware

# Create a new request class
bun artisanNode make:request StoreUserRequest

# Create a new job
bun artisanNode make:job ProcessPodcast

# Create a new event
bun artisanNode make:event OrderShipped

# Create a new listener
bun artisanNode make:listener SendShipmentNotification
```

### Database Commands

```bash
# Run migrations
bun artisanNode migrate

# Rollback migrations
bun artisanNode migrate:rollback

# Seed the database
bun artisanNode db:seed

# Create a migration and run it
bun artisanNode migrate:fresh
```

### Queue Commands

```bash
# Process queue jobs
bun artisanNode queue:work

# Clear failed jobs
bun artisanNode queue:flush
```

### Cache Commands

```bash
# Clear application cache
bun artisanNode cache:clear
```

## Writing Commands

In addition to the commands provided by ArtisanNode, you may also build your own custom commands. Commands are typically stored in the `app/Console/Commands` directory; however, you are free to choose your own storage location as long as your commands can be autoloaded.

### Generating Commands

To create a new command, you may use the `make:command` ArtisanNode command:

```bash
bun artisanNode make:command SendEmails
```

# Testing Getting Started

JCC Express MVC provides a comprehensive Laravel-style testing infrastructure using Bun's native test runner. In fact, support for testing is baked into the framework and ready to use out of the box.

## Introduction

JCC Express MVC is built with testing in mind. In fact, support for testing is baked into the framework and ready to use out of the box. The framework ships with convenient helper methods that allow you to expressively test your applications.

## Environment

When running tests, JCC Express MVC will automatically set the configuration environment to `testing` automatically. JCC Express MVC also automatically configures the session and cache to the `array` driver while testing, meaning no session or cache data will be persisted while testing.

## Creating Tests

To create a new test case, use the `make:test` ArtisanNode command:

```bash
bun artisanNode make:test UserTest
```

This command will place a fresh test class in your `tests` directory.

### Test Structure

Every test class extends the `TestCase` class. The `TestCase` class provides several helper methods that make it easier to test your application:

```typescript
import { describe, it, expect } from "bun:test";
import { TestCase } from "jcc-express-mvc/lib/Testing/TestCase";

class UserTest extends TestCase {
  it("can create a user", async () => {
    const response = await this.post("/users", {
      name: "John Doe",
      email: "john@example.com",
    });

    expect(response.status).toBe(201);
    expect(response.body.user).toBeDefined();
  });
}
```

## Feature Tests

Feature tests test your application's HTTP endpoints and user flows. JCC Express MVC provides a fluent API for making HTTP requests to your application, examining the output, and even filling out forms:

```typescript
import { describe, it, expect } from "bun:test";
import { TestCase } from "jcc-express-mvc/lib/Testing/TestCase";

class UserApiTest extends TestCase {
  it("can retrieve users", async () => {
    const response = await this.get("/api/users");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("can create a user", async () => {
    const response = await this.post("/api/users", {
      name: "Jane Doe",
      email: "jane@example.com",
    });

    expect(response.status).toBe(201);
    expect(response.body.user.name).toBe("Jane Doe");
  });
}
```

### Available Assertions

JCC Express MVC provides a variety of custom assertion methods that you may utilize when testing your application:

```typescript
// Assert response status
this.assertStatus(200);

// Assert JSON structure
this.assertJson({ name: "John" });

// Assert response contains
this.assertSee("Welcome");
```

## Database Testing

JCC Express MVC provides a variety of helpful tools to make it easier to test your database driven applications. By default, your test database is refreshed between test classes using database migrations.

### Resetting The Database After Each Test

After each test, you may want to reset your database so that data from a previous test does not interfere with subsequent tests. The `RefreshDatabase` trait takes care of this for you:

```typescript
import { RefreshDatabase } from "jcc-express-mvc/lib/Testing/Concerns/RefreshDatabase";

class UserTest extends TestCase {
  use RefreshDatabase;

  // Your tests...
}
```

---

# Framework Architecture

Understanding how JCC Express MVC works under the hood will help you better understand the framework and write more effective applications.

## Request Lifecycle

As mentioned in the Getting Started guide, the request lifecycle controls how a request flows through the framework. Understanding this lifecycle is crucial for building effective applications and extending the framework.

### Application Bootstrap

When a request enters your JCC Express MVC application, it goes through several stages:

1. **Entry Point**: The request enters through `server.ts`
2. **Application Creation**: The application instance is created via `bootstrap/app.ts`
3. **Service Provider Registration**: All service providers are registered
4. **Service Provider Boot**: All service providers are booted
5. **Route Loading**: Route files are loaded and registered
6. **Request Handling**: The request is matched to a route and handled

### HTTP Kernel

The HTTP kernel (`app/Http/kernel.ts`) is responsible for:

- Applying global middleware
- Matching requests to routes
- Applying route-specific middleware
- Handling exceptions

### Response Flow

After a route handler processes the request:

1. The response is generated
2. Response middleware is executed (in reverse order)
3. The response is sent to the client

## Service Providers

Service providers are the primary mechanism for booting the JCC Express MVC framework. They are responsible for:

- Binding services into the service container
- Registering event listeners
- Registering routes
- Performing application initialization

### Provider Lifecycle

Service providers have a well-defined lifecycle:

1. **Registration Phase**: The `register` method is called on all providers
2. **Boot Phase**: The `boot` method is called on all providers
3. **Application Ready**: The application is ready to handle requests

## Service Container

The service container is the heart of the JCC Express MVC framework. It manages class dependencies and performs dependency injection. The container is used throughout the framework to resolve classes and their dependencies.

### Automatic Dependency Resolution

The container can automatically resolve classes by examining their constructor type hints:

```typescript
@Inject()
class UserController {
  constructor(private userService: UserService) {}
  // UserService is automatically resolved
}
```

## Routing System

JCC Express MVC's routing system is responsible for matching incoming requests to route handlers. The router:

1. Matches the request method and URI
2. Applies route middleware
3. Resolves route parameters
4. Executes the route handler

### Route Model Binding

The framework provides automatic route model binding, which automatically resolves Eloquent models from route parameters. Both `:param` and `{param}` syntaxes work:

```typescript
// Both syntaxes work for route model binding
Route.get("/users/:user", [UserController, "show"]);
// or
Route.get("/users/{user}", [UserController, "show"]);

// Controller
async show(user: User) {
  // User model is automatically resolved from the route parameter
}
```

#### Binding by Specific Column

You can specify which column to use for model binding using the `{column$param}` or `:column$param` syntax:

```typescript
// Find user by slug instead of ID
Route.get("/users/{slug$user}", [UserController, "show"]);
// or with Express-style syntax
Route.get("/users/:slug$user", [UserController, "show"]);

// Controller - the model will be resolved using the 'slug' column
async show(user: User) {
  // User found by slug column instead of primary key
  return user;
}
```

**Note:** The `{column$param}` syntax tells the framework to find the model using the specified column (e.g., `slug`) instead of the default primary key.

## Eloquent ORM

JCC Express MVC includes the Eloquent ORM, which provides an ActiveRecord implementation for working with your database. Each database table has a corresponding "Model" that is used to interact with that table.

### Model Lifecycle

Eloquent models have several lifecycle hooks:

- `creating` / `created`
- `updating` / `updated`
- `saving` / `saved`
- `deleting` / `deleted`

These hooks allow you to perform actions at various points in a model's lifecycle.

## Event System

JCC Express MVC's event system provides a simple observer implementation. Events are dispatched throughout the framework, allowing you to hook into various points of the application lifecycle.

### Event Flow

1. Event is dispatched
2. Event listeners are resolved
3. Listeners are executed
4. Results are returned (if applicable)

## Queue System

The queue system allows you to defer the processing of time-consuming tasks. Jobs are pushed to queues and processed by queue workers in the background.

### Job Lifecycle

1. Job is pushed to queue
2. Queue worker picks up job
3. Job's `handle` method is executed
4. Job is marked as complete or failed

---

# Production Deployment

This guide covers deploying your JCC Express MVC application to a production environment. The framework is optimized for Bun runtime and includes specific build and deployment processes.

## Prerequisites

Before deploying to production, ensure you have:

- **Bun runtime** installed on your production server
- **Database** configured and accessible
- **Environment variables** properly set
- **Node.js** (v18+) for npm package management (if using Inertia.js with Vite)

## Building for Production

### Step 1: Build Frontend Assets (If Using Inertia.js)

If your application uses Inertia.js with React/Vue, you must build frontend assets first:

```bash
npm run vite-build
```

This command:
- Bundles your React/Vue components
- Creates optimized production assets
- Generates SSR assets if server-side rendering is enabled

### Step 2: Build the Application

Build your TypeScript application:

```bash
bun artisanNode build
```

This command:
- Compiles TypeScript to JavaScript using `tsc`
- Prepares all assets for production
- Outputs compiled code to the `./build` directory

**Note:** The build command runs both TypeScript compilation and asset preparation.

### Step 3: Run Database Migrations

Before starting the server, ensure your database is up to date:

```bash
bun artisanNode migrate
```

Or if you need to reset and migrate:

```bash
bun artisanNode migrate:fresh
bun artisanNode db:seed  # If you have seeders
```

## Starting the Production Server

### Standard Server

Start your compiled server:

```bash
bun ./build/server.js
```

The server will run from the compiled `./build/server.js` file using Bun runtime.

### Server-Side Rendering (SSR) with Inertia.js

If you're using Inertia.js with SSR enabled, you need to configure and start the SSR server:

#### 1. Configure SSR in Kernel

Update `app/Http/kernel.ts` to enable SSR:

```typescript
import { inertia } from "../../jcc-express-mvc/Core/Inertia";

export class Kernel {
  public middlewares = [
    // ... other middlewares
    inertia({ 
      rootView: "index",  // Your root view for SSR
      ssr: true           // Enable SSR
    }),
  ];
}
```

#### 2. Build the Application

```bash
npm run vite-build  # Build frontend assets
bun artisanNode build  # Build TypeScript
```

#### 3. Start SSR Server

```bash
bun artisanNode inertia:start-ssr
```

This starts the Inertia.js SSR server alongside your main application server.

## Environment Configuration

Ensure your production `.env` file is properly configured:

```env
APP_NAME="Your App Name"
APP_ENV=production
APP_KEY=your-secret-key
APP_DEBUG=false
APP_URL=https://yourdomain.com

DB_CONNECTION=mysql
DB_HOST=your-db-host
DB_PORT=3306
DB_DATABASE=your-database
DB_USERNAME=your-username
DB_PASSWORD=your-password

MAIL_HOST=smtp.your-provider.com
MAIL_PORT=587
MAIL_USERNAME=your-mail-username
MAIL_PASSWORD=your-mail-password
MAIL_FROM_ADDRESS=noreply@yourdomain.com

SESSION_SECRET=your-session-secret
```

**Important:** Never commit your `.env` file to version control. Use environment variables or secure configuration management in production.

## Quick Deployment Command Chain

For a complete deployment, run these commands in order:

```bash
# 1. Build frontend assets (if using Inertia.js)
npm run vite-build

# 2. Build the application
bun artisanNode build

# 3. Run migrations
bun artisanNode migrate

# 4. Start the server
bun ./build/server.js

# 5. (Optional) Start SSR server if using Inertia.js SSR
bun artisanNode inertia:start-ssr
```

## Production Checklist

Before going live, ensure:

- [ ] `APP_ENV=production` in `.env`
- [ ] `APP_DEBUG=false` in `.env`
- [ ] Database migrations are up to date
- [ ] Environment variables are properly configured
- [ ] Frontend assets are built (if using Inertia.js)
- [ ] Application is built (`bun artisanNode build`)
- [ ] Server is running from `./build/server.js`
- [ ] SSR server is started (if using Inertia.js SSR)
- [ ] Queue workers are running (if using queues)
- [ ] Logs are properly configured
- [ ] Error tracking is set up
- [ ] SSL/TLS certificates are configured
- [ ] Database backups are scheduled

## Running Queue Workers in Production

If your application uses queues, start queue workers:

```bash
bun artisanNode queue:work
```

For production, consider using a process manager like PM2 to keep workers running:

```bash
pm2 start "bun artisanNode queue:work" --name queue-worker
```

## Process Management

For production deployments, use a process manager to keep your application running:

### Using PM2

```bash
# Install PM2
npm install -g pm2

# Start your application
pm2 start ./build/server.js --name jcc-express-app

# Start SSR server (if using Inertia.js SSR)
pm2 start "bun artisanNode inertia:start-ssr" --name inertia-ssr

# Start queue worker
pm2 start "bun artisanNode queue:work" --name queue-worker

# Save PM2 configuration
pm2 save
pm2 startup
```

### Using systemd

Create a systemd service file `/etc/systemd/system/jcc-express.service`:

```ini
[Unit]
Description=JCC Express MVC Application
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/your-app
Environment="NODE_ENV=production"
ExecStart=/usr/local/bin/bun ./build/server.js
Restart=always

[Install]
WantedBy=multi-user.target
```

Then enable and start:

```bash
sudo systemctl enable jcc-express
sudo systemctl start jcc-express
```

## Asset Serving

In production, assets are served from the `build` directory. Ensure:

- Static assets are properly built and included in the build directory
- Public assets (CSS, JS, images) are accessible
- Vite assets (if using Inertia.js) are properly built and referenced

## Performance Optimization

### Database

- Use connection pooling
- Enable query caching where appropriate
- Optimize database indexes
- Use eager loading to prevent N+1 queries

### Caching

- Enable Redis for session and cache storage
- Cache frequently accessed data
- Use HTTP caching headers where appropriate

### Application

- Run in production mode (`APP_ENV=production`)
- Disable debug mode (`APP_DEBUG=false`)
- Use compiled JavaScript (from `build` directory)
- Enable gzip compression
- Use a reverse proxy (nginx/Apache) for static assets

## Monitoring and Logging

Set up proper monitoring and logging:

- Application logs: Check `storage/logs` directory
- Error tracking: Integrate with services like Sentry
- Performance monitoring: Use APM tools
- Server monitoring: Monitor CPU, memory, and disk usage

## Security Considerations

- Use HTTPS/SSL certificates
- Keep dependencies updated
- Use strong session secrets
- Implement rate limiting
- Use environment variables for sensitive data
- Enable CORS properly
- Sanitize user input
- Use prepared statements for database queries

## Troubleshooting Production Issues

### Application Won't Start

1. Check Bun is installed: `bun --version`
2. Verify build completed: Check `./build` directory exists
3. Check environment variables: Ensure `.env` is configured
4. Check logs: Review `storage/logs` for errors

### SSR Not Working

1. Verify SSR is enabled in `app/Http/kernel.ts`
2. Ensure `npm run vite-build` completed successfully
3. Check SSR server is running: `bun artisanNode inertia:start-ssr`
4. Verify `rootView` matches your actual view file

### Database Connection Issues

1. Verify database credentials in `.env`
2. Check database server is accessible
3. Ensure migrations are run: `bun artisanNode migrate`
4. Check database user has proper permissions

### Assets Not Loading

1. Verify `npm run vite-build` completed
2. Check assets exist in `build` directory
3. Verify public directory permissions
4. Check reverse proxy configuration (if using)

---