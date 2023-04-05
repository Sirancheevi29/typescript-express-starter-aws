import { Router } from 'express';
import { CreateArtcile } from '@/dtos/Article.dto';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Routes } from '../interfaces/routes.interface';
import ArticleController from '@controllers/article.controller';


class ArticleRoutes implements Routes {
    public path = '/article';
    public router = Router();
    public ArticleController = new ArticleController();
    
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/an_group`, this.ArticleController.getall);
        this.router.get(`${this.path}/Object/:id(\\d+)`, this.ArticleController.getById)
        this.router.post(`${this.path}/blockId`, this.ArticleController.create);
        this.router.put(`${this.path}/blockId`, this.ArticleController.update);
        this.router.delete(`${this.path}/Object/:id(\\d+)`, this.ArticleController.delete);
        this.router.put(`${this.path}/assign`, this.ArticleController.assign);
        this.router.put(`${this.path}/update`, this.ArticleController.repblish)
      }
}

export default ArticleRoutes;