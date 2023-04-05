"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _express = require("express");
const _modelGroupController = _interopRequireDefault(require("../controllers/modelGroup.controller"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let ModelGroupRoutes = class ModelGroupRoutes {
    initializeRoutes() {
        this.router.get(`${this.path}/mn_group`, this.ModelGroupController.getall);
        this.router.get(`${this.path}/Object/:id(\\d+)`, this.ModelGroupController.getById);
        this.router.post(`${this.path}`, this.ModelGroupController.create);
        this.router.put(`${this.path}`, this.ModelGroupController.update);
        this.router.put(`${this.path}`, this.ModelGroupController.republish);
        this.router.delete(`${this.path}/Object/:id(\\d+)`, this.ModelGroupController.delete);
    }
    constructor(){
        this.path = '/model';
        this.router = (0, _express.Router)();
        this.ModelGroupController = new _modelGroupController.default();
        this.initializeRoutes();
    }
};
const _default = ModelGroupRoutes;

//# sourceMappingURL=modelGroup.routes.js.map