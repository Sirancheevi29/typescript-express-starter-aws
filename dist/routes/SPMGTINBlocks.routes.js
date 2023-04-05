"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _express = require("express");
const _spmgtinblcoksController = _interopRequireDefault(require("../controllers/SPMGTINBlcoks.controller"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let SPMGTINBlocksRoute = class SPMGTINBlocksRoute {
    initializeRoutes() {
        this.router.get(`${this.path}/blockId`, this.SPMGTINBlocksController.getAll);
        this.router.get(`${this.path}/Object/:id(\\d+)`, this.SPMGTINBlocksController.getById);
        this.router.post(`${this.path}/blockId`, this.SPMGTINBlocksController.create);
        this.router.put(`${this.path}/blockId`, this.SPMGTINBlocksController.update);
        this.router.delete(`${this.path}/Object/:id(\\d+)`, this.SPMGTINBlocksController.delete);
    }
    constructor(){
        this.path = '/gtinreact';
        this.router = (0, _express.Router)();
        this.SPMGTINBlocksController = new _spmgtinblcoksController.default();
        this.initializeRoutes();
    }
};
const _default = SPMGTINBlocksRoute;

//# sourceMappingURL=SPMGTINBlocks.routes.js.map