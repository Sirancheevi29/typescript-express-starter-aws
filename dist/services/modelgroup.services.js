"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ModelGroupServices", {
    enumerable: true,
    get: ()=>ModelGroupServices
});
const _httpException = require("../exceptions/HttpException");
const _modelgroupModel = require("../models/modelgroup.model");
let ModelGroupServices = class ModelGroupServices {
    async findAllModelGroup() {
        var model = new _modelgroupModel.ModelGroupModel();
        var items = model.readAllModelGroup();
        if (!items) throw new _httpException.HttpException(409, "content not found");
        return items;
    }
    async findModelGroupByAsGrp(mgGrp) {
        var model = new _modelgroupModel.ModelGroupModel();
        var items = model.readModelGroupbyId(mgGrp);
        if (!items) throw new _httpException.HttpException(409, "content not found");
        return items;
    }
    async createModelGroup(modelgroup) {
        var model = new _modelgroupModel.ModelGroupModel();
        var items = model.createModelGroup(modelgroup);
        if (!items) throw new _httpException.HttpException(409, "content not found");
        return items;
    }
    async update(modelgroup) {
        var model = new _modelgroupModel.ModelGroupModel();
        var items = model.updateModelGroup(modelgroup);
        if (!items) throw new _httpException.HttpException(409, "content not found");
        return items;
    }
    async delete(mgGrp) {
        var model = new _modelgroupModel.ModelGroupModel();
        var items = model.deleteArticle(mgGrp);
        if (!items) throw new _httpException.HttpException(409, "content not found");
        return items;
    }
};

//# sourceMappingURL=modelgroup.services.js.map