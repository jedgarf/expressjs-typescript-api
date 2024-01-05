import apicache from 'apicache';
import config from "../config";

//configure apicache 
const cache = apicache.middleware;
export default cache(`${config.api.apicache_min} minutes`);