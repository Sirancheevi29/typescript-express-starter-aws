"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _express = require("express");
const _articleController = _interopRequireDefault(require("../controllers/article.controller"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let ArticleRoutes = class ArticleRoutes {
    initializeRoutes() {
        this.router.get(`${this.path}/an_group`, this.ArticleController.getall);
        this.router.get(`${this.path}/Object/:id(\\d+)`, this.ArticleController.getById);
        this.router.post(`${this.path}/blockId`, this.ArticleController.create);
        this.router.put(`${this.path}/blockId`, this.ArticleController.update);
        this.router.delete(`${this.path}/Object/:id(\\d+)`, this.ArticleController.delete);
        this.router.put(`${this.path}/assign`, this.ArticleController.assign);
        this.router.put(`${this.path}/update`, this.ArticleController.repblish);
    }
    constructor(){
        this.path = '/article';
        this.router = (0, _express.Router)();
        this.ArticleController = new _articleController.default();
        this.initializeRoutes();
    }
};
const _default = ArticleRoutes;

//# sourceMappingURL=article.routes.js.map