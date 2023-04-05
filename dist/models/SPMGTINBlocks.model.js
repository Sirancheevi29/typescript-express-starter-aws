"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SPMTGTINBlocksModel", {
    enumerable: true,
    get: ()=>SPMTGTINBlocksModel
});
const _clientDynamodb = require("@aws-sdk/client-dynamodb");
const _aws = require("../aws");
const _logger = require("../utils/logger");
const _utilDynamodb = require("@aws-sdk/util-dynamodb");
const _libDynamodb = require("@aws-sdk/lib-dynamodb");
let SPMTGTINBlocksModel = class SPMTGTINBlocksModel {
    constructor(){
        this.readAllSPMTGTINBlocksModel = async ()=>{
            const params = {
                TableName: _aws.AWSTables.SPMGTINBlocks,
                Key: (0, _utilDynamodb.marshall)({
                    HashKey: "hashKey"
                })
            };
            try {
                const data = await _aws.AWSDBClient.send(new _clientDynamodb.ScanCommand(params));
                let content = [];
                data.Items.forEach((i)=>{
                    content.push((0, _utilDynamodb.unmarshall)(i));
                });
                return {
                    content
                };
            } catch (error) {
                _logger.logger.error(error);
                return {
                    success: false,
                    data: null
                };
            }
        };
        this.readSPMGTINBlocksById = async (BlockId)=>{
            const params = {
                TableName: _aws.AWSTables.SPMGTINBlocks,
                Key: {
                    blockId: {
                        S: `${BlockId}`
                    }
                }
            };
            try {
                const data = await _aws.AWSDBClient.send(new _clientDynamodb.GetItemCommand(params));
                console.log(data.Item);
                const content = (0, _utilDynamodb.unmarshall)(data.Item);
                console.log(content);
                return content;
            } catch (error) {
                _logger.logger.error(error);
                return {
                    success: false,
                    data: null
                };
            }
        };
        this.createSPMGTINBlock = async (blocks)=>{
            const dbBlocks = (0, _utilDynamodb.marshall)(blocks);
            const params = {
                TableName: _aws.AWSTables.SPMGTINBlocks.toString(),
                Item: dbBlocks
            };
            try {
                const data = await _aws.AWSDBClient.send(new _clientDynamodb.PutItemCommand(params));
                return {
                    success: true,
                    data: data.$metadata
                };
            } catch (error) {
                _logger.logger.error(error);
                return {
                    success: false,
                    data: null
                };
            }
        };
        this.updateSPMGTINBlock = async (block)=>{
            const dbBlocks = (0, _utilDynamodb.marshall)(block);
            const key = {
                blockId: {
                    S: block.blockId
                }
            };
            const updateExpression = `SET #blockExplosion = :blockExplosion,
        #relatedGS1Organization = :relatedGS1Organization,
        #updateDate = :updateDate,
        #barcodeAssignee = :barcodeAssignee,
        #blockExplosionDate = :blockExplosionDate,
        #countryCode = :countryCode,
        #ean128Receiver = :ean128Receiver,
        #blockUsedForEAN128Assignment = :blockUsedForEAN128Assignment,
        #gtinBlock = :gtinBlock, 
        #blockUsedForGLNAssignment  = :blockUsedForGLNAssignment,
        #gs1ContactEmailAddress = :gs1ContactEmailAddress,
        #parentGLN  = :parentGLN,
        #createDate = :createDate,
        #iamBarcodePoolId = :iamBarcodePoolId,
        #comment = :comment,
        #adidasGroupContact = :adidasGroupContact,
        #ean128Contact = :ean128Contact,
        #blockPurchaseDate = :blockPurchaseDate,
        #gtinType = :gtinType`;
            const expressionAttributeNames = {
                "#blockExplosion": "blockExplosion",
                "#relatedGS1Organization": "relatedGS1Organization",
                "#updateDate": "updateDate",
                "#barcodeAssignee": "barcodeAssignee",
                "#blockExplosionDate": "blockExplosionDate",
                "#countryCode": "countryCode",
                "#ean128Receiver": "ean128Receiver",
                "#blockUsedForEAN128Assignment": "blockUsedForEAN128Assignment",
                "#gtinBlock": "gtinBlock",
                "#blockUsedForGLNAssignment": "blockUsedForGLNAssignment",
                "#gs1ContactEmailAddress": "gs1ContactEmailAddress",
                "#parentGLN": "parentGLN",
                "#createDate": "createDate",
                "#iamBarcodePoolId": "iamBarcodePoolId",
                "#comment": "comment",
                "#adidasGroupContact": "adidasGroupContact",
                "#ean128Contact": "ean128Contact",
                "#blockPurchaseDate": "blockPurchaseDate",
                "#gtinType": "gtinType"
            };
            const expressionAttributeValues = {
                ":blockExplosion": block.blockExplosion,
                ":relatedGS1Organization": block.relatedGS1Organization,
                ":updateDate": block.updateDate,
                ":barcodeAssignee": block.barcodeAssignee,
                ":blockExplosionDate": block.blockExplosionDate,
                ":countryCode": block.countryCode,
                ":ean128Receiver": block.ean128Receiver,
                ":blockUsedForEAN128Assignment": block.blockUsedForEAN128Assignment,
                ":gtinBlock": block.gtinBlock,
                ":blockUsedForGLNAssignment": block.blockUsedForGLNAssignment,
                ":gs1ContactEmailAddress": block.gs1ContactEmailAddress,
                ":parentGLN": block.parentGLN,
                ":createDate": block.createDate,
                ":iamBarcodePoolId": block.iamBarcodePoolId,
                ":comment": block.comment,
                ":adidasGroupContact": block.adidasGroupContact,
                ":ean128Contact": block.ean128Contact,
                ":blockPurchaseDate": block.blockPurchaseDate,
                ":gtinType": block.gtinType
            };
            const params = {
                TableName: _aws.AWSTables.SPMGTINBlocks,
                Key: {
                    blockId: block.blockId
                },
                ExpressionAttributeNames: expressionAttributeNames,
                UpdateExpression: updateExpression,
                ExpressionAttributeValues: expressionAttributeValues,
                ReturnValues: "UPDATED_NEW"
            };
            try {
                const data = await _aws.AWSDBClient.send(new _libDynamodb.UpdateCommand(params));
                return {
                    success: true,
                    data: data.$metadata
                };
            } catch (error) {
                _logger.logger.error(error);
                return {
                    success: false,
                    data: null
                };
            }
        };
        this.deleteSPMGTINBlock = async (blockId)=>{
            const params = {
                TableName: _aws.AWSTables.SPMGTINBlocks,
                Key: {
                    blockId: {
                        "S": blockId
                    }
                }
            };
            try {
                const resData = await _aws.AWSDBClient.send(new _clientDynamodb.DeleteItemCommand(params));
                return resData.$metadata;
            } catch (error) {
                _logger.logger.error(error);
                return {
                    success: false,
                    data: null
                };
            }
        };
    }
};

//# sourceMappingURL=SPMGTINBlocks.model.js.map