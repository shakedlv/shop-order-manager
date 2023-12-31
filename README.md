# Overview

Food market web application with a shop website and a admin order managements 
User can login or use the site as guest and purchase food from the store,
Admin can view orders and pickup time , add and change products.
# Client (front-end)

- [React](https://reactjs.org/docs/getting-started.html) with [Redux](https://redux.js.org/introduction/getting-started) 
- [Tailwind CSS](https://tailwindcss.com/) with [Flowbite](https://flowbite.com/)

# Service (back-end)

- [.NET 6.0](https://dotnet.microsoft.com/learn/dotnet/hello-world-tutorial/intro)
- [Swagger UI](https://github.com/swagger-api/swagger-ui)

# How to run locally

1. [Download and install the .NET Core SDK](https://dotnet.microsoft.com/download)
    * If you don't have `localdb` available on your system, [Download and install SQL Server Express](https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/sql-server-express-localdb)
2. Open a terminal such as **PowerShell**, **Command Prompt**, or **bash** 
3. Run the following `dotnet` commands:
```sh
dotnet build
dotnet run --project api
```
3. Open your browser to: `https://localhost:44345/swagger`.
4. In another terminal, navigate to the `client` folder and run the following `npm` commands:
```sh
npm install
npm start
```
5. The webpack dev server hosts the front-end and your browser will open to: `http://localhost:3000`

# Adding an Entity Framework Core migration

1. Open a command prompt in the **api** folder.
2. `dotnet tool install --global dotnet-ef`
3. `dotnet ef migrations add <NAME OF MIGRATION>`

# Removing the latest Entity Framework Core migration

1. Open a command prompt in the **api** folder.
2. `dotnet ef migrations remove`

# To-Do
### Client
### API




