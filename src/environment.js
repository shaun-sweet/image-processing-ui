const CONSTANTS = require('config/constants');
const endPointUrl = process.env.REACT_APP_ENV === "dev" ? CONSTANTS.endPointUrls.dev : CONSTANTS.endPointUrls.prod;
export default endPointUrl;
