import { CreateArtcile } from "@/dtos/Article.dto";
import { HttpException } from "@/exceptions/HttpException";
import { Article } from "@/interfaces/article.interface";
import { isEmpty } from "@/utils/util";
import { ArticleModel } from "@/models/article.model";
import { logger } from "@/utils/logger";
import { BlockList } from "net";
import { json } from 'envalid';


export class ArticleServices {

    public async findAllArticle() {
        var model = new ArticleModel();
        var items = model.readAllArticleModel();
        if (!items) throw new HttpException(409, "content not found");
        return items;
    }

    public async findArticleByAsGrp(asGrp: string) {
        var model = new ArticleModel();

        var items = model.readArticlebyId(asGrp);
        if (!items) throw new HttpException(409, "content not found");
        return items;
    }

    public async createArticle(article: Article) {
        var model = new ArticleModel();

        var items = model.createArticle(article);
        if (!items) throw new HttpException(409, "content not found");
        return items;
    }

    public async update(article: Article) {
        var model = new ArticleModel();

        var items = model.updateArticle(article);
        if (!items) throw new HttpException(409, "content not found");
        return items;
    }

    public async delete(asGrp: string) {
        var model = new ArticleModel();

        var items = model.deleteArticle(asGrp);
        if (!items) throw new HttpException(409, "content not found");
        return items;
    }

}