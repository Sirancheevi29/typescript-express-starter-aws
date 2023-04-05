"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _logger = require("../utils/logger");
const _modelgroupServices = require("../services/modelgroup.services");
const _aws = require("../aws");
const _clientDynamodb = require("@aws-sdk/client-dynamodb");
const _utilDynamodb = require("@aws-sdk/util-dynamodb");
const _modelgroupModel = require("../models/modelgroup.model");
let ModelGroupController = class ModelGroupController {
    constructor(){
        this.ModelGroupService = new _modelgroupServices.ModelGroupServices();
        this.getall = async (req, res, next)=>{
            try {
                const findAllData = await this.ModelGroupService.findAllModelGroup();
                res.status(200).json(findAllData["content"]);
            } catch (error) {
                next(error);
            }
        };
        this.getById = async (req, res, next)=>{
            try {
                const objectId = req.params.id;
                const findBlocks = await this.ModelGroupService.findModelGroupByAsGrp(objectId);
                res.status(200).json(findBlocks);
            } catch (err) {
                next(err);
                _logger.logger.error(err);
            }
        };
        this.create = async (req, res, next)=>{
            try {
                const userData = req.body;
                const createUserData = await this.ModelGroupService.createModelGroup(userData);
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
                const updateBlocks = await this.ModelGroupService.update(blocks);
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
                const deleteBlocks = await this.ModelGroupService.delete(blockId);
                res.status(200).json({
                    data: deleteBlocks,
                    message: "block deleted"
                });
            } catch (error) {
                next(error);
            }
        };
        this.assign = async (req, res, next)=>{
            var model = new _modelgroupModel.ModelGroupModel();
            let queryParams = {
                TableName: _aws.AWSTables.groupmodelnumber,
                FilterExpression: "mn_status = :mn_status",
                ExpressionAttributeValues: {
                    ":mn_status": {
                        S: "5"
                    }
                }
            };
            const data = await _aws.AWSDBClient.send(new _clientDynamodb.ScanCommand(queryParams));
            const unassignedModels = [];
            data.Items.forEach((element)=>{
                unassignedModels.push((0, _utilDynamodb.unmarshall)(element));
            });
            const dataRes = unassignedModels.sort((a, b)=>a.mn_group - b.mn_group);
            const dte = new Date();
            if (dataRes.length < req.body.assignCount) {
                res.statusCode = 500;
                res.json({
                    error: "There is no sufficient group for assignment. Please contact administrator."
                });
            } else {
                let respItems = [];
                let respitem = {};
                for(let i = 0; i < req.body.assignCount; i++){
                    let modelitem = dataRes[i];
                    modelitem.mn_status = "1";
                    modelitem.mn_source_system = req.body.sourceSystem;
                    modelitem.mn_distribution_comment = req.body.assignComment;
                    modelitem.mn_initial_assignment_date = dte.toString();
                    const updateRes = await model.updateModelGroup(modelitem);
                    if (updateRes.data.httpStatusCode == 200) {
                        respItems.push(modelitem);
                    }
                }
                res.json({
                    success: "put call succeed!",
                    url: req.url,
                    data: respItems
                });
            }
        };
        this.republish = async (req, res, next)=>{
            var model = new _modelgroupModel.ModelGroupModel();
            let respItems = [];
            for(let i = 0; i < req.body.filteredGroup.length; i++){
                const modelitem = {
                    mn_group: req.body.filteredGroup[i].mn_group,
                    mn_status: req.body.status,
                    mn_source_system: req.body.sourceSystem,
                    mn_distribution_comment: req.body.assignComment,
                    mn_initial_assignment_date: req.body.filteredGroup[i].mn_initial_assignment_date,
                    mn_distribution_date: req.body.filteredGroup[i].mn_distribution_date
                };
                const data = await model.updateModelGroup(modelitem);
                if (data.data.httpStatusCode == 200) {
                    respItems.push(modelitem);
                }
            }
            res.json({
                success: "update call succeed!",
                url: req.url,
                data: respItems
            });
        };
    }
};
const _default = ModelGroupController;

//# sourceMappingURL=modelGroup.controller.js.map