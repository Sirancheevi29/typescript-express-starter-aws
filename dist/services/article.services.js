"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ArticleServices", {
    enumerable: true,
    get: ()=>ArticleServices
});
const _httpException = require("../exceptions/HttpException");
const _articleModel = require("../models/article.model");
let ArticleServices = class ArticleServices {
    async findAllArticle() {
        var model = new _articleModel.ArticleModel();
        var items = model.readAllArticleModel();
        if (!items) throw new _httpException.HttpException(409, "content not found");
        return items;
    }
    async findArticleByAsGrp(asGrp) {
        var model = new _articleModel.ArticleModel();
        var items = model.readArticlebyId(asGrp);
        if (!items) throw new _httpException.HttpException(409, "content not found");
        return items;
    }
    async createArticle(article) {
        var model = new _articleModel.ArticleModel();
        var items = model.createArticle(article);
        if (!items) throw new _httpException.HttpException(409, "content not found");
        return items;
    }
    async update(article) {
        var model = new _articleModel.ArticleModel();
        var items = model.updateArticle(article);
        if (!items) throw new _httpException.HttpException(409, "content not found");
        return items;
    }
    async delete(asGrp) {
        var model = new _articleModel.ArticleModel();
        var items = model.deleteArticle(asGrp);
        if (!items) throw new _httpException.HttpException(409, "content not found");
        return items;
    }
};

//# sourceMappingURL=article.services.js.map