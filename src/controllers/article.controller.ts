import { NextFunction, Response, Request } from "express";
import { CreateArtcile } from "@/dtos/Article.dto";
import { Article } from "@/interfaces/article.interface";
import { logger } from "@/utils/logger";
import { ArticleServices } from '../services/article.services';
import { AWSDBClient, AWSTables, AWSdbDocClient } from '@/aws';
import { ScanCommand, GetItemCommand, PutItemCommand, UpdateItemCommand, AttributeValue, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall, marshall } from '@aws-sdk/util-dynamodb';
import { ArticleModel } from '../models/article.model';
import { MetadataService } from "aws-sdk";
import { umask } from "process";

class ArticleController {
  public ArticleService = new ArticleServices();

  public getall = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllData = await this.ArticleService.findAllArticle();

      res.status(200).json(findAllData["content"]);

    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

      const objectId = req.params.id;
      const findBlocks = await this.ArticleService.findArticleByAsGrp(objectId);

      res.status(200).json(findBlocks);

    } catch (err) {
      next(err);
      logger.error(err);
    };
  }

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: Article = req.body;
      const createUserData = await this.ArticleService.createArticle(userData);

      res.status(201).json({ data: createUserData, message: 'created' });

    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

      const blocks: Article = req.body;
      const updateBlocks = await this.ArticleService.update(blocks);

      res.status(201).json({ data: updateBlocks, message: 'block updated' });

    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const blockId: string = req.params.id;
      const deleteBlocks = await this.ArticleService.delete(blockId);

      res.status(200).json({ data: deleteBlocks, message: "block deleted" });

    } catch (error) {
      next(error);
    }

  };

  public assign = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      var model = new ArticleModel();

      let queryParams = {
        TableName: AWSTables.grouparticlenumber,
        FilterExpression: "an_status = :an_status",
        ExpressionAttributeValues: {
          ":an_status": { S: "5" }
        }
      };

      const data = await AWSDBClient.send(new ScanCommand(queryParams));

      const unassignedData = [];
      data.Items.forEach(x => {
        unassignedData.push(unmarshall(x));
      })

      const artdata = unassignedData.sort((a, b) => a.an_group - b.an_group);
      const dte = new Date();
      
      if (artdata.length < req.body.assignCount) {
        res.statusCode = 500;
        res.json({
          error:
            "There is no sufficient group for assignment. Please contact administrator.",
        });
      } else {
        let respItems = [];
        let respitem = {};

        for (let i = 0; i < req.body.assignCount; i++) {
          let artitem : Article = artdata[i];
          artitem.an_group = artdata[i].an_group;
          artitem.an_status = "1";
          artitem.an_source_system = req.body.sourceSystem;
          artitem.an_distribution_comment = req.body.assignComment;
          artitem.an_initial_assignment_date = dte.toString();
          
         const metadata = model.updateArticle(artitem);

          if((await metadata).data.httpStatusCode == 200){
            respItems.push(artitem);
          }
        }
        res.json({
          success: "put call succeed!",
          url: req.url,
          data: respItems,
        });
      }
    }
    catch (err) {
      logger.error(err);
      next(err);
    }
  };


  public repblish = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log('article republish controller called');
    try {
      var model = new ArticleModel();

      let respItems = [];
      let respitem = {};

      for (let i = 0; i < req.body.filteredGroup.length; i++) {
        const artitem : Article = {
          an_group: req.body.filteredGroup[i].an_group,
          an_status: req.body.status,
          an_source_system: req.body.sourceSystem,
          an_distribution_comment: req.body.assignComment,
          an_initial_assignment_date: req.body.filteredGroup[i].an_initial_assignment_date,
          an_distribution_date: req.body.filteredGroup[i].an_distribution_date
        };
          const metadata = model.updateArticle(artitem);

          if((await metadata).data.httpStatusCode == 200){
            respItems.push(artitem);
          }
      }

      res.json({
        success: "update call succeed!",
        url: req.url,
        data: respItems,
      });

    }
    catch (err) {
      logger.error(err);
      next(err);
    }
  };



}

export default ArticleController;