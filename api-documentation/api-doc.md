Decimal number to roman number converter
========================================

This server takes in a number and outputs a roman numeral. 
Extension 1: Expand the set of numbers to 1-3999. 
Extension 2: Expand the set of numbers to include the Vinculum addition using UTF-8 to roman numerals greater than 3999 and handle all numbers up to 2,200,000,000.

Version: 1.0.0


Routes
-------

\[ Jump to [Models](#__Models) \]

### Table of Contents

#### [Monitoring](#Monitoring)

*   [`get /heartbeat`](#heartbeat)
*   [`get /version`](#version)

#### [Romannumeral](#Romannumeral)

*   [`get /romannumeral`](#convertNumToRoman)

Monitoring
==========

[Up](#__Methods)

    get /heartbeat

Server heartbeat (heartbeat)

Ask for a heartbeat of the server (respond 200 if up and running)

### Responses

#### 200

Server is healthy[](#)

* * *

[Up](#__Methods)

    get /version

API version

Gets the API version

### Return type

[APIInfo](#APIInfo)

### Example data

Content-Type: application/json

    {
      "version" : "version"
    }

### Produces

*   `application/json`

### Responses

#### 200

Server is healthy [APIInfo](#APIInfo)

* * *

Romannumeral
============

[Up](#__Methods)

    get /romannumeral

Convert a integer to a roman numeral (convertNumToRoman)

### Query parameters

query (required)

Query Parameter — (Decimal) number to convert to roman number

### Return type

[RomanNumber](#RomanNumber)

### Example data

Content-Type: application/json

    {
      "roman" : "roman"
    }

### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

*   `application/json`

### Responses

#### 200

Converted roman number [RomanNumber](#RomanNumber)

#### 422

Invalid input - The request was well-formed but was unable to be followed due to semantic errors. [ConversionError](#ConversionError)

* * *

Models
------

\[ Jump to [Methods](#__Methods) \]

### Table of Contents

1.  [`APIInfo`](#APIInfo)
2.  [`ConversionError`](#ConversionError)
3.  [`RomanNumber`](#RomanNumber)

### `APIInfo` - [Up](#__Models)

#### version (optional)

[String](#string) semantic version number of the API

### `ConversionError` - [Up](#__Models)

#### error (optional)

[String](#string) error code

#### message (optional)

[String](#string) error message

#### apiVersion (optional)

[String](#string) api version

#### details (optional)

[Object](#object) details about the error/exception that occurred

### `RomanNumber` - [Up](#__Models)

#### roman (optional)

[String](#string) roman number (in UTF-8 format)