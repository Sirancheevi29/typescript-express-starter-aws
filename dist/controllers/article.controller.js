"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _logger = require("../utils/logger");
const _articleServices = require("../services/article.services");
const _aws = require("../aws");
const _clientDynamodb = require("@aws-sdk/client-dynamodb");
const _utilDynamodb = require("@aws-sdk/util-dynamodb");
const _articleModel = require("../models/article.model");
let ArticleController = class ArticleController {
    constructor(){
        this.ArticleService = new _articleServices.ArticleServices();
        this.getall = async (req, res, next)=>{
            try {
                const findAllData = await this.ArticleService.findAllArticle();
                res.status(200).json(findAllData["content"]);
            } catch (error) {
                next(error);
            }
        };
        this.getById = async (req, res, next)=>{
            try {
                const objectId = req.params.id;
                const findBlocks = await this.ArticleService.findArticleByAsGrp(objectId);
                res.status(200).json(findBlocks);
            } catch (err) {
                next(err);
                _logger.logger.error(err);
            }
        };
        this.create = async (req, res, next)=>{
            try {
                const userData = req.body;
                const createUserData = await this.ArticleService.createArticle(userData);
                res.status(201).json({
                    data: createUserData,
                    message: 'created'
                });
            } catch (error) {
                next(error);
            }
        };
        this.update = async (req, res, next)=>{
            try {
                const blocks = req.body;
                const updateBlocks = await this.ArticleService.update(blocks);
                res.status(201).json({
                    data: updateBlocks,
                    message: 'block updated'
                });
            } catch (error) {
                next(error);
            }
        };
        this.delete = async (req, res, next)=>{
            try {
                const blockId = req.params.id;
                const deleteBlocks = await this.ArticleService.delete(blockId);
                res.status(200).json({
                    data: deleteBlocks,
                    message: "block deleted"
                });
            } catch (error) {
                next(error);
            }
        };
        this.assign = async (req, res, next)=>{
            try {
                var model = new _articleModel.ArticleModel();
                let queryParams = {
                    TableName: _aws.AWSTables.grouparticlenumber,
                    FilterExpression: "an_status = :an_status",
                    ExpressionAttributeValues: {
                        ":an_status": {
                            S: "5"
                        }
                    }
                };
                const data = await _aws.AWSDBClient.send(new _clientDynamodb.ScanCommand(queryParams));
                const unassignedData = [];
                data.Items.forEach((x)=>{
                    unassignedData.push((0, _utilDynamodb.unmarshall)(x));
                });
                const artdata = unassignedData.sort((a, b)=>a.an_group - b.an_group);
                const dte = new Date();
                if (artdata.length < req.body.assignCount) {
                    res.statusCode = 500;
                    res.json({
                        error: "There is no sufficient group for assignment. Please contact administrator."
                    });
                } else {
                    let respItems = [];
                    let respitem = {};
                    for(let i = 0; i < req.body.assignCount; i++){
                        let artitem = artdata[i];
                        artitem.an_group = artdata[i].an_group;
                        artitem.an_status = "1";
                        artitem.an_source_system = req.body.sourceSystem;
                        artitem.an_distribution_comment = req.body.assignComment;
                        artitem.an_initial_assignment_date = dte.toString();
                        const metadata = model.updateArticle(artitem);
                        if ((await metadata).data.httpStatusCode == 200) {
                            respItems.push(artitem);
                        }
                    }
                    res.json({
                        success: "put call succeed!",
                        url: req.url,
                        data: respItems
                    });
                }
            } catch (err) {
                _logger.logger.error(err);
                next(err);
            }
        };
        this.repblish = async (req, res, next)=>{
            console.log('article republish controller called');
            try {
                var model = new _articleModel.ArticleModel();
                let respItems = [];
                let respitem = {};
                for(let i = 0; i < req.body.filteredGroup.length; i++){
                    const artitem = {
                        an_group: req.body.filteredGroup[i].an_group,
                        an_status: req.body.status,
                        an_source_system: req.body.sourceSystem,
                        an_distribution_comment: req.body.assignComment,
                        an_initial_assignment_date: req.body.filteredGroup[i].an_initial_assignment_date,
                        an_distribution_date: req.body.filteredGroup[i].an_distribution_date
                    };
                    const metadata = model.updateArticle(artitem);
                    if ((await metadata).data.httpStatusCode == 200) {
                        respItems.push(artitem);
                    }
                }
                res.json({
                    success: "update call succeed!",
                    url: req.url,
                    data: respItems
                });
            } catch (err) {
                _logger.logger.error(err);
                next(err);
            }
        };
    }
};
const _default = ArticleController;

//# sourceMappingURL=article.controller.js.map