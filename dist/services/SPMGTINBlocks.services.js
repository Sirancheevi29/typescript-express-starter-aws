"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SPMGTINBlocksServices", {
    enumerable: true,
    get: ()=>SPMGTINBlocksServices
});
const _httpException = require("../exceptions/HttpException");
const _util = require("../utils/util");
const _spmgtinblocksModel = require("../models/SPMGTINBlocks.model");
let SPMGTINBlocksServices = class SPMGTINBlocksServices {
    async finaAllSPMGTINBlcoks() {
        var model = new _spmgtinblocksModel.SPMTGTINBlocksModel();
        var items = model.readAllSPMTGTINBlocksModel();
        return items;
    }
    async findGTINBlocksById(objectId) {
        var model = new _spmgtinblocksModel.SPMTGTINBlocksModel();
        var content = model.readSPMGTINBlocksById(objectId);
        if (!content) throw new _httpException.HttpException(409, "content not found");
        return content;
    }
    async create(Blocksdata) {
        if ((0, _util.isEmpty)(Blocksdata)) throw new _httpException.HttpException(400, "Blocks is empty");
        var model = new _spmgtinblocksModel.SPMTGTINBlocksModel();
        const findBlocks = model.createSPMGTINBlock(Blocksdata);
        return findBlocks;
    }
    async update(blocks) {
        if ((0, _util.isEmpty)(blocks)) throw new _httpException.HttpException(400, "Block is emptyp");
        var model = new _spmgtinblocksModel.SPMTGTINBlocksModel();
        const updatedBlocks = model.updateSPMGTINBlock(blocks);
        return updatedBlocks;
    }
    async delete(blockId) {
        if ((0, _util.isEmpty)(blockId)) throw new _httpException.HttpException(400, "blockId is empty");
        var model = new SPMGTINBlocksServices();
        const deletedBlocks = model.delete(blockId);
        return deletedBlocks;
    }
};

//# sourceMappingURL=SPMGTINBlocks.services.js.map