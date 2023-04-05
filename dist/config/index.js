"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    CREDENTIALS: ()=>CREDENTIALS,
    NODE_ENV: ()=>NODE_ENV,
    PORT: ()=>PORT,
    SECRET_KEY: ()=>SECRET_KEY,
    LOG_FORMAT: ()=>LOG_FORMAT,
    LOG_DIR: ()=>LOG_DIR,
    ORIGIN: ()=>ORIGIN,
    AWS_ACCESS_KEY: ()=>AWS_ACCESS_KEY,
    AWS_SECRET_KEY: ()=>AWS_SECRET_KEY,
    AWS_REGION: ()=>AWS_REGION
});
const _dotenv = require("dotenv");
(0, _dotenv.config)({
    path: `.env.${process.env.NODE_ENV || 'development'}.local`
});
const CREDENTIALS = process.env.CREDENTIALS === 'true';
const { NODE_ENV , PORT , SECRET_KEY , LOG_FORMAT , LOG_DIR , ORIGIN , AWS_ACCESS_KEY , AWS_SECRET_KEY , AWS_REGION  } = process.env;

//# sourceMappingURL=index.js.map