
# Roman numeral conversion
## Goal
Provide an API server that can convert decimal integers (e.g. 10, 100, 200, ...) into the roman numeral equivalent. The server offers a route of type http://localhost:8080/romannumeral?query=10 to do so.

## References
Two resources helped during development of that server. They describe the rules the server will follow for conversions to roman numbers:

 - For roman numerals: [Roman Numerals on mathisfun](https://www.mathsisfun.com/roman-numerals.html)
 - For syntax additions to handle large roman numbers: [Roman Numerals for large numbers](http://roman-numerals.20m.com/)

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
To do so, from the root of the project,  you **first need to build** the Docker image:

    docker build . --tag localhost:romannumeral

Ten, to run a container based on that image in **background** with the server listening on port 8080:

    docker run -d -p 8080:8080 localhost:romannumeral

Or to run a container based on that image in **foreground** with the server listening on port 8080:

    docker run -p 8080:8080 localhost:romannumeral

## Run on your machine (no container)
*Prerequisite: Needs NodeJS version 10.16.0 or higher installed.*

You will need to **install the dependencies** first. From the root of the folder:

 - For usage in a dev/test environment: `npm i` 
 - For production use: `npm i --production --only=production`

Then, from the root of this project, **run**:    `npm start`

## Routes
*Detailed route documentation can be found in the swagger/openapi file in the project folder api-documentation.* 

### Number to roman conversion
#### Conversion to roman values
The route http://host/romannumeral?query={integer}.
Example when running on localhost: http://localhosthost/romannumeral?query=50
This route takes a decimal integer as parameter. If the query parameter is within convertible ranges, the server responds with **HTTP status code 200 and a json object** containing the roman number equivalent (value is in UTF-8 for large numbers):

    { "roman" : "your_converted_value"}

*Note: Setting query parameter to 0 will return an error, since there is no 0 in the roman counting system. The subsequent handling of that case is left to the entity that made the request to the server.*

#### Error cases
##### Query value is 0
Setting query parameter to 0 will return an error, since there is no 0 in the roman counting system. The subsequent handling of that case is left to the entity that made the request to the server.

The server will return a **HTTP status code 422 and a json object** describing the error:

    { 
	    error:  "VALUE_IS_ZERO",
	    message:  "Parameter value is 0, roman numbers do not have a 0",
	    apiVersion:  "apiVersion" 
    }

##### Query value is out of range
The server will return a **HTTP status code 422 and a json object** describing the error:

    { 
	    "error":  "OUT_OF_RANGE",
	    "message":  "Parameter is not within range",
	    "details": { "lowerLimit": min_accepted_value, "upperLimit": max_accepted_value}
	    "apiVersion":  "apiVersion" 
    }

*Note: An out of range error will be returned for negative values, since roman numbers do not have negative values.*
    
##### Query value is not an integer
The server will return a **HTTP status code 422 and a json object** describing the error:

    { 
	    "error":  "NOT_AN_INTEGER",
	    "message":  "Parameter is not an integer",
	    "apiVersion":  "apiVersion" 
    }

### Server monitoring
#### Server is busy
In case the server is busy and cannot respond to more request, it will start sending back **HTTP status codes 503**.

#### Heartbeat
If the server is up and running, a request sent to http://your_host/heartbeat will make the server respond with a **HTTP status code 200**. There is **no response body**.
No response/timeout means that the server is not running or is in a crashed state.

#### Version
If the server is up and running, a request sent to http://your_host/version will make the server respond with a **status 200 and a json object containing the version of the romannumeral API** currently used: 

    { apiVersion:  apiVersion }

### URL not found
If a request is made to the server using an unknown route, **HTTP status code 404** is returned.

## Package layout
Folders at root of this project:
- **api-documentation**: contains the swagger file describing the API. Also contains an API documentation in HTML that was automatically generated by swagger-editor using the swagger file of the project.
- **code-documentation**: contains HTML version of the code documentation for the romanNumberHandlers.
- **monitoring**: contains code to handle logging.
- **romanNumberHandlers**: contains the code files necessary to do the roman conversion (also error handling code).
- **routes**: contains the routes defined and used by the API server.
- **test**: contains tests (unit tests and integration tests).

Files at root of the romannumeral API server project:
- **settings.env**: default values for some environment values. 
- **config.js** : reads and sets environment value defined in settings.env.
- **docker-compose.yml**: file to build and run the API server in a Docker container.
- **Dockerfile**: file to build a Docker image for this project.
- **package.json**: lists informations about the project and dependencies.
- **server.js**: file containing code for the server.

At runtime, and additional folder "logs" is added to hold log files.

## Development methodology
The development of this server is incremental: functionalities are added, improved and refactored over time in iterations. 
The first focus was to get a base working version, then to extend and improve business functionalities and finally monitoring and deployment capabilities.

All functionalities must be unit tested, especially those used to do the roman numeral conversion (since they are of critical value for this server). Also, integration tests need to be written for added routes and functionalities, to verify that the server is capable of responding to requests.

To finish, routes need to be documented in the project's swagger file. Code should also be documented.

## Tests
Tests are available in the **test folder**. 
There are two kind of tests:
 - some testing the conversion functionality without the server capabilities (unit tests).
 - some testing the API server and its routes (integration tests).
 
To **run all the tests**, from the root of the project, run:

    npm test
    
*Troubleshooting: You may need to install mocha globally to run the tests (npm i mocha -g).*
Tests also run automatically during the build of a Docker image for this project.

## Dependencies
### First level dependencies
The web server is an express.js webserver ([Express website]([https://expressjs.com/](https://expressjs.com/)), [Express Github]([https://github.com/expressjs/express](https://github.com/expressjs/express))).

The server uses some middlewares for an enhanced experience:

 - [cors](https://www.npmjs.com/package/cors), to enable [Cross-origin_resource_sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing),
 - [node-toobusy](https://www.npmjs.com/package/node-toobusy), to notify clients if the server is busy,
 - [express-slow-down](https://www.npmjs.com/package/express-slow-down), a rate-limiter,
 - [helmet](https://www.npmjs.com/package/helmet), to add security by setting some HTTP headers,
 - [hpp](https://www.npmjs.com/package/hpp), to avoid query parameter pollution.

To read environment files and configure the server using them, there is a dependency to [dotenv](https://www.npmjs.com/package/dotenv).

Finally, for logging the server uses the express [morgan](https://www.npmjs.com/package/morgan) middleware for console logging and [winston](https://www.npmjs.com/package/winston) to save logs into files.

### First level dev-dependencies
The project has test dependencies, libraries required for testing: [chai](https://www.npmjs.com/package/chai), [mocha](https://www.npmjs.com/package/mocha) and [supertest](https://www.npmjs.com/package/supertest).
Also, a lot of test cases where inspired by the [big-list-of-naughty-strings](https://github.com/minimaxir/big-list-of-naughty-strings).