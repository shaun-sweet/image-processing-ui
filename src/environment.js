require('dotenv').config()
const CONSTANTS = require('config/constants');
const endPointUrl = process.env.APP_ENV === "dev" ? CONSTANTS.endPointUrls.dev : CONSTANTS.endPointUrls.prod;
export default endPointUrl;
