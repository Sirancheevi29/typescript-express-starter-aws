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
    AWSDBClient: ()=>AWSDBClient,
    AWSTables: ()=>AWSTables,
    AWSdbDocClient: ()=>AWSdbDocClient
});
const _awsSdk = _interopRequireDefault(require("aws-sdk"));
const _config = require("../config");
const _clientDynamodb = require("@aws-sdk/client-dynamodb");
const _libDynamodb = require("@aws-sdk/lib-dynamodb");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
_awsSdk.default.config.update({
    accessKeyId: _config.AWS_ACCESS_KEY,
    secretAccessKey: _config.AWS_ACCESS_KEY
});
const marshallOptions = {
    convertEmptyValues: false,
    removeUndefinedValues: false,
    convertClassInstanceToMap: false
};
const unmarshallOptions = {
    wrapNumbers: false
};
const translateConfig = {
    marshallOptions,
    unmarshallOptions
};
var AWSTables;
(function(AWSTables) {
    AWSTables["SPMGTINBlocks"] = "SPMGTINBlocks-dev";
    AWSTables["spm_gtin_block_information"] = "spm_gtin_block_information";
    AWSTables["groupmodelnumber"] = "groupmodelnumber-dev";
    AWSTables["grouparticlenumber"] = 'grouparticlenumber-dev';
})(AWSTables || (AWSTables = {}));
const AWSDBClient = new _clientDynamodb.DynamoDBClient({
    region: _config.AWS_REGION
});
const AWSdbDocClient = _libDynamodb.DynamoDBDocumentClient.from(AWSDBClient, translateConfig);

//# sourceMappingURL=index.js.map