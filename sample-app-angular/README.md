# Sample App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.




## Server side code
The server side code can be cloned from:  https://github.com/inov8design-3813ict/observables-demo-server.git

clone the repo and run "npm install" to grab the required dependencies.
The server will run on http://localhost:3000

## Mongo Database (Server Side)

The app connects to a local instance of a mongo database at mongodb://170.0.0.1:27017. Installation of mongo is required. Checkout the mongo website for instructions to install mongo locally for your platform.
Mongo should contain a database called "demo-app" and a collections called "cars" and "users"

By changing the connection string in the server.js file,  you could host the database on Mongo Atlas.

### Sample structure for collections
Car
{id:1,make:"Ford",model:"Raptor", year:2022,color:"Black"}

User
{id:1,username:"Fred", email:"fred@blogs.com",pwd:123,avatar:"fredblogs.jpg"}

## Features of Observables Demo
- Login Page - username/password (Check server code route->api-login.js for valid values)

- Homepage  - contains two sub components (List and Details)

- Homepage is protected from view via a Guard on the route that prevents the component from loadng unless there is a "currentuser" stored in session Storage. (This will change once we start using MongoDB)
- Observables used to update data in Master/Detail pattern.
- Upload image for avatar
- Data stored using Mongo database. Examples of read and update queries.

