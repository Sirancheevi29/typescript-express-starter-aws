"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _spmgtinblocksServices = require("../services/SPMGTINBlocks.services");
const _logger = require("../utils/logger");
let SPMGTINBlocksController = class SPMGTINBlocksController {
    constructor(){
        this.SPMTGTINBlocksService = new _spmgtinblocksServices.SPMGTINBlocksServices();
        this.getAll = async (req, res, next)=>{
            try {
                const findAllData = await this.SPMTGTINBlocksService.finaAllSPMGTINBlcoks();
                res.status(200).json(findAllData["content"]);
            } catch (error) {
                next(error);
            }
        };
        this.getById = async (req, res, next)=>{
            try {
                const objectId = req.params.id;
                const findBlocks = await this.SPMTGTINBlocksService.findGTINBlocksById(objectId);
                res.status(200).json(findBlocks);
            } catch (err) {
                next(err);
                _logger.logger.error(err);
            }
        };
        this.create = async (req, res, next)=>{
            try {
                const userData = req.body;
                const createUserData = await this.SPMTGTINBlocksService.create(userData);
                if (createUserData.success) {
                    const findAllData = await this.SPMTGTINBlocksService.finaAllSPMGTINBlcoks();
                    res.status(201).json({
                        success: "post call succeed!",
                        data: findAllData.data,
                        message: 'block updated'
                    });
                } else {
                    res.status(500).json({
                        error: "Could not load items"
                    });
                }
            } catch (error) {
                next(error);
            }
        };
        this.update = async (req, res, next)=>{
            try {
                const blocks = req.body;
                const updateBlocks = await this.SPMTGTINBlocksService.update(blocks);
                if (updateBlocks.success) {
                    const findAllData = await this.SPMTGTINBlocksService.finaAllSPMGTINBlcoks();
                    res.status(201).json({
                        success: "post call succeed!",
                        data: findAllData.data,
                        message: 'block updated'
                    });
                } else {
                    res.status(500).json({
                        error: "Could not load items"
                    });
                }
            } catch (error) {
                next(error);
            }
        };
        this.delete = async (req, res, next)=>{
            try {
                const blockId = req.params.id;
                const deleteBlocks = await this.SPMTGTINBlocksService.delete(blockId);
                res.status(200).json({
                    data: deleteBlocks,
                    message: "block deleted"
                });
            } catch (error) {
                next(error);
            }
        };
    }
};
const _default = SPMGTINBlocksController;

//# sourceMappingURL=SPMGTINBlcoks.controller.js.map