/* 
    Set environment variables using the .env file.
*/
const dotenv = require('dotenv');
dotenv.config(); // does not override previously set ENV variable (values set from outside are more important)