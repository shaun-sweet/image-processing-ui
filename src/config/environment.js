const CONSTANTS = require('config/constants');
const endPointUrl = process.env.NODE_ENV === 'development' ? CONSTANTS.endPointUrls.dev : CONSTANTS.endPointUrls.prod;
export default endPointUrl;
