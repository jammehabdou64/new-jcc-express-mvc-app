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

## Project Structure

- project-root/
- |--app
- ||--Config/
- |||--cors/
- ||||--cors.js
- ||||--socket.js
- |||--egine.js
- ||--Controllers/
- |||--UsersController.js
- ||--Models/
- |||--User.js
- ||--Middlewares/
- |||--app.js
- ||--Request/
- |||--UserRequest.js
- |--public/
- ||--css/
- |||--app.css
- ||--js/
- |||--app.js
- |--resources/
- ||--views/
- |||--partials/
- ||||--header.js
- |||--layout.hbs
- |||--index.hbs
- |--routes/
- ||--index.js

- `Config/`:Configuration files for the application.
- `Controllers/`:Controllers handling the application logic.
- `Models/`:Mongoose for database interactions.
- `public/`:Static assets like CSS and JavaScript files.
- `routes/`: Single route file (index.js) where all routes are registered.
- `views/`: Handlebars templates for rendering views.
- `server.js`: Main application file.

## Configuration

Explain any configuration options or environment variables that can be set for customization.
