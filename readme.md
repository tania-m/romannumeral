
## Quickstart: Build and run
*Prerequisite: Needs to have Docker installed.*
You can start using the server immediately by running the docker-compose file at the root of the project. The server will be listening on port 8080.

From the root of the project, run:

    docker-compose up -d
Once it is running, you can try out the server by going to http://localhost:8080/romannumeral?query=42. 

To shutdown the server, from the root of the project run:

    docker-compose down

## Build a Docker image and run in container
*Prerequisite: Needs to have Docker installed.*
This project can be run inside a Docker container. 
To do so, you first need to build the Docker image:

    docker build etc

To run a container based on that image in **background**:

    docker run etc

To run a container based on that image in **foreground**:

    docker run etc

## Run directly ("barebone")
Prerequisite: Needs NodeJS installed.

You will need to **install the dependencies** first. From the root of the folder:

 - For usage in a dev/test environment: `npm i` 
 - For production use: `npm i --production`

Then, from the root of the project, **run**:

    node server.js
or

    npm start

## Routes
### Number to roman conversion
#### Conversion to roman values
The route http://Your_host/romannumeral?query={integer}.
This route takes a decimal integer as parameter. If the query parameter is within convertible ranges, it returns **HTTP status code 200 and a json object** containing the roman number equivalent:

    { "roman" : "your_converted_value"}
    
Note: Setting query parameter to 0 will return an error, since there is no 0 in the roman counting system.

#### Error cases
##### Query value is 0
The server will return a **HTTP status code 422 and a json object** describing the error:

    { 
	    error:  VALUE_IS_ZERO,
	    message:  Parameter value is 0, roman numbers do not have a 0,
	    apiVersion:  apiVersion 
    }

##### Query value is out of range
The server will return a **HTTP status code 422 and a json object** describing the error:

    { 
	    error:  OUT_OF_RANGE,
	    message:  Parameter is not within range,
	    details: { lowerLimit: lowerLimit, upperLimit: upperLimit}
	    apiVersion:  apiVersion 
    }
    
##### Query value is not an integer
The server will return a **HTTP status code 422 and a json object** describing the error:

    { 
	    error:  NOT_AN_INTEGER,
	    message:  Parameter is not an integer,
	    apiVersion:  apiVersion 
    }

### Server monitoring
#### Server is busy
In case the server is busy and cannot respond to more request, it will start sending back **HTTP status codes 503**.

#### Heartbeat
If the server is up and running, a request sent to http://Your_host/heartbeat will make the server respond with a **HTTP status code 200**. There is **no response body**.
No response/timeout means that the server is not running or is in a crashed state.

#### Version
If the server is up and running, a request sent to http://Your_host/version will make the server respond with a **status 200 and a json object containing the version of the romannumeral API** currently used: 

    { apiVersion:  apiVersion}

### URL not found
If a request is made to the server using an unknown route, **HTTP status code 404** is returned.

## Package layout

## Development methodology

## Tests
Tests are available in the **test folder**. 
There are two kind of tests:
 - some testing the conversion functionality.
 - some testing the server and its routes.
 
To **run all the tests**, from the root of the project, run:

    npm test
    
Tests are also automatically run when building a Docker image for this project.

## Dependencies
### First level dependencies
The web server is an express.js webserver (express documentation, express github).

The server uses some middlewares for an enhanced experience:

 - cors
 -  node-toobusy
 - express-slow-down
 - helmet
 - hpp 

To read environment files and configure the server using them, there is a dependency to dotenv.

Finally, for logging the server uses the express morgan middleware for console logging and winston to save logs into files.

### First level dev-dependencies
The project has test dependencies, libraries required for testing: chai, mocha and supertest.
Also, a lot of test cases where inspired by the big list of naughty strings.

