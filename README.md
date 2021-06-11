# be-arinze-umunnah 
A RESTful API that mimick a simple clone of Stackoverflow. To limit 
scope, there are 3 modules implemented:
1. Authentication
2. Questions (asking and replying)
3. Rating (upvoting/downvoting)
4. Subscription (A user can subscribe to a question and get a 
notification when the question is answered)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them.

```
Node Js(Typescript)
Code Editor (This app was built on VSCode)
Git
Postgres
```

**Postgres**
To create a postgress database read this documentation and follow the steps [Postgres-Docs](https://www.postgresql.org/docs/13/tutorial-install.html).
After installation, create a database and update the ``.env`` file with database credentials

### Installing

To get this project on your local machine, you first need to clone it using the `git clone` command.

```
git clone https://github.com/umunnah/nodeJs-Typescript-template.git
```

Running this on your terminal will ensure you receive the latest version with all it's changes.

Once you've cloned it, install all dependencies using:

```
npm install
```

This should retrieve all the necessary dependencies named in the [package.json](https://github.com/umunnah/nodeJs-Typescript-template/-/blob/main/package.json) file.

### How To Use:

Once dependencies are installed, be sure to include a ```.env``` or update of ```.env.example``` to ```.env``` file with the necessary environment variable:

```
NODE_ENV=development
PORT=3000

DB_HOST=127.0.0.1
DB_PORT=<the database port number>
DB_NAME=<the name of the database created>
DB_USER=<database user name>
DB_PASS=<database password>
DB_CLIENT=postgres
JWT_SECRET=<any random string you want to use as secret key...>
JWT_EXPIRE=<number of days before token expires eg 6000...>

SMTP_HOST=<your email provider host...>
SMTP_PORT=<your email provider host...>
SMTP_EMAIL=<your email address...>
SMTP_PASSWORD=<your email password...>
FROM_EMAIL=<your email address...>
FROM_NAME=<the email name to be used eg TalentQl...>

```

When everything is in place, the application can be run locally using:

```
npm run dev
```
To build for production environment
```
npm run build
```

## Migrations:
Note: In development, serving the application would automatically run migrations for you.
To run migrations
```
npx sequelize-cli db:migrate
```
To rollback migrations
```
npx sequelize db:migrate:undo:all
```

## Running tests 🧪

The testing framework utilized are Jest and Supertest. Tests can be run by using the command:

```
npm run test
```

To run tests and see the code coverage. Run using the command:
```
npm run test:coverage
```

To view api documentation on postman 👉 [click here](https://documenter.getpostman.com/view/8365237/TzRX95Uh). Note  the domain is http://localhost:3000 because it has not be hosted on a server.


[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
