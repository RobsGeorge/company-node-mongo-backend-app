# Company Database Backend Application

A company database backend application built using NodeJs (Express Js framework) and MongoDB (Mongoose DOM)

## Installation:
1. You should have Node and MongoDB installed on your computer.
2. FORK the project.
3. Go to the project directory and run `npm install nodemon express mongoose body-parser` to install packages (nodemon, mongoose, body-parser, express)
4. Open another terminal and run `mongod`, You should have MongoDB installed on your computer to run this application
5. Open a third terminal and run `mongo`, Database runs locally on port `27017`
6. Return to the first terminal to run the server and run `nodemon server.js`

Open http://localhost:3000 to view it in the browser.


## APIs used:

* To show welcome message page: get("localhost:3000/")
* To Create a new company: post("localhost:3000/companies/")--> sending data in request body
* To Retrieve all companies: get("localhost:3000/companies")
* To delete all companies: (empty the companies collection): delete("localhost:3000/companies")

* To Retrieve a single company with company code: get("localhost:3000/companies/:code")
* To Update a single company with company code: put("localhost:3000/companies/:code")--> sending data to be updated in request body
* To Delete a single company with company code: delete("localhost:3000/companies/:code")


### Author: Robeir Samir George (August 2020)
