"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ModelGroupModel", {
    enumerable: true,
    get: ()=>ModelGroupModel
});
const _clientDynamodb = require("@aws-sdk/client-dynamodb");
const _aws = require("../aws");
const _logger = require("../utils/logger");
const _utilDynamodb = require("@aws-sdk/util-dynamodb");
const _libDynamodb = require("@aws-sdk/lib-dynamodb");
let ModelGroupModel = class ModelGroupModel {
    constructor(){
        this.readAllModelGroup = async ()=>{
            const params = {
                TableName: _aws.AWSTables.groupmodelnumber,
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
            } catch (er) {
                _logger.logger.error(er);
                return {
                    success: false,
                    message: 'failed'
                };
            }
        };
        this.readModelGroupbyId = async (asgrp)=>{
            const params = {
                TableName: _aws.AWSTables.groupmodelnumber,
                Key: {
                    as_group: {
                        S: `${asgrp}`
                    }
                }
            };
            try {
                const data = await _aws.AWSDBClient.send(new _clientDynamodb.GetItemCommand(params));
                const content = (0, _utilDynamodb.unmarshall)(data.Item);
                return content;
            } catch (err) {
                _logger.logger.error(err);
                return {
                    success: false,
                    data: null
                };
            }
        };
        this.createModelGroup = async (modelgrup)=>{
            const modelGroupMarshalled = (0, _utilDynamodb.marshall)(modelgrup);
            const params = {
                TableName: _aws.AWSTables.groupmodelnumber,
                Item: modelGroupMarshalled
            };
            try {
                const data = await _aws.AWSDBClient.send(new _clientDynamodb.PutItemCommand(params));
                return data.$metadata;
            } catch (err) {
                _logger.logger.error(err);
                return {
                    success: false,
                    data: null
                };
            }
        };
        this.updateModelGroup = async (modelgrup)=>{
            const modelGroupMarshalled = (0, _utilDynamodb.marshall)(modelgrup);
            const key = {
                an_group: {
                    S: modelgrup.mn_group
                }
            };
            const updateExpression = `SET #mn_distribution_comment = :mn_distribution_comment,
        #mn_status = :mn_status,
        #mn_distribution_date = :mn_distribution_date,
        #mn_source_system = :mn_source_system,
        #mn_initial_assignment_date = :mn_initial_assignment_date`;
            const expressionAttributeNames = {
                "#mn_distribution_comment": "mn_distribution_comment",
                "#mn_status": "mn_status",
                "#mn_distribution_date": "mn_distribution_date",
                "#mn_source_system": "mn_source_system",
                "#mn_initial_assignment_date": "mn_initial_assignment_date"
            };
            const expressionAttributeValues = {
                ":mn_distribution_comment": modelgrup.mn_distribution_comment,
                ":mn_status": modelgrup.mn_status,
                ":mn_distribution_date": modelgrup.mn_distribution_date,
                ":mn_source_system": modelgrup.mn_source_system,
                ":mn_initial_assignment_date": modelgrup.mn_initial_assignment_date
            };
            const params = {
                TableName: _aws.AWSTables.groupmodelnumber,
                Key: {
                    an_group: modelgrup.mn_group
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
            } catch (err) {
                _logger.logger.error(err);
                return {
                    success: false,
                    data: null
                };
            }
        };
        this.deleteArticle = async (asgrp)=>{
            const params = {
                TableName: _aws.AWSTables.groupmodelnumber,
                Key: {
                    an_group: {
                        S: asgrp
                    }
                }
            };
            try {
                const restdata = await _aws.AWSDBClient.send(new _clientDynamodb.DeleteItemCommand(params));
                return restdata.$metadata;
            } catch (err) {
                _logger.logger.error(err);
                return {
                    success: false,
                    data: null
                };
            }
        };
    }
};

//# sourceMappingURL=modelgroup.model.js.map