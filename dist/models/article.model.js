"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ArticleModel", {
    enumerable: true,
    get: ()=>ArticleModel
});
const _clientDynamodb = require("@aws-sdk/client-dynamodb");
const _aws = require("../aws");
const _logger = require("../utils/logger");
const _utilDynamodb = require("@aws-sdk/util-dynamodb");
const _libDynamodb = require("@aws-sdk/lib-dynamodb");
let ArticleModel = class ArticleModel {
    constructor(){
        this.readAllArticleModel = async ()=>{
            const params = {
                TableName: _aws.AWSTables.grouparticlenumber,
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
        this.readArticlebyId = async (asgrp)=>{
            const params = {
                TableName: _aws.AWSTables.grouparticlenumber,
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
        this.unassignedArticle = async ()=>{
            try {
                let queryParams = {
                    TableName: _aws.AWSTables.grouparticlenumber,
                    Key: {
                        an_status: {
                            S: "5"
                        }
                    }
                };
                const data = await _aws.AWSDBClient.send(new _clientDynamodb.GetItemCommand(queryParams));
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
        this.createArticle = async (article)=>{
            const articleMarshalled = (0, _utilDynamodb.marshall)(article);
            const params = {
                TableName: _aws.AWSTables.grouparticlenumber,
                Item: articleMarshalled
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
        this.updateArticle = async (article)=>{
            const articleMarshalled = (0, _utilDynamodb.marshall)(article);
            const key = {
                an_group: {
                    S: article.an_group
                }
            };
            const updateExpression = `SET #an_initial_assignment_date = :an_initial_assignment_date,
        #an_status = :an_status,
        #an_source_system = :an_source_system,
        #an_distribution_comment = :an_distribution_comment,
        #an_distribution_date = :an_distribution_date`;
            const expressionAttributeNames = {
                "#an_initial_assignment_date": "an_initial_assignment_date",
                "#an_status": "an_status",
                "#an_source_system": "an_source_system",
                "#an_distribution_comment": "an_distribution_comment",
                "#an_distribution_date": "an_distribution_date"
            };
            const expressionAttributeValues = {
                ":an_initial_assignment_date": article.an_initial_assignment_date,
                ":an_status": article.an_status,
                ":an_source_system": article.an_source_system,
                ":an_distribution_comment": article.an_distribution_comment,
                ":an_distribution_date": article.an_distribution_date
            };
            const params = {
                TableName: _aws.AWSTables.grouparticlenumber,
                Key: {
                    an_group: article.an_group
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
                TableName: _aws.AWSTables.grouparticlenumber,
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

//# sourceMappingURL=article.model.js.map