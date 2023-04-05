import { Article } from "@/interfaces/article.interface";
import { ScanCommand, GetItemCommand, PutItemCommand, UpdateItemCommand, AttributeValue, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { AWSDBClient, AWSTables, AWSdbDocClient } from '@/aws';
import { logger } from '@utils/logger';
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { LOG_DIR } from '@config';
import { query } from "express";

export class ArticleModel {

    readAllArticleModel =async () => {
        
        const params = {
            TableName: AWSTables.grouparticlenumber,
            Key: marshall({
                HashKey: "hashKey",
            }),
        }

        try {
            const data = await AWSDBClient.send(new ScanCommand(params));
            let content = [];
            data.Items.forEach( i => {
                content.push(unmarshall(i));
            });

            return { content};
        }
        catch(er) {
            logger.error(er);
            return ({ success: false, message: 'failed' });
        }

    };

    readArticlebyId = async (asgrp: string) =>  {
        
        const params = {
            TableName: AWSTables.grouparticlenumber,
            Key: {
                as_group: {S: `${asgrp}`}
            }
        }

        try{
            const data = await AWSDBClient.send(new GetItemCommand(params));

            const content = unmarshall(data.Item);

            return content;
        }
        catch(err){
            logger.error(err);
            return { success: false, data:null }
        }
    }

    unassignedArticle =async () => {
        try {
            let queryParams = {
                TableName: AWSTables.grouparticlenumber,
                Key: {
                    an_status: {S: "5"}
                }
              };

              const data = await AWSDBClient.send(new GetItemCommand(queryParams));
              const content = unmarshall(data.Item);
  
              return content;

        }
        catch(err) {
            logger.error(err);
            return { success: false, data:null};
        }
    };

    createArticle = async (article: Article) => {

        const articleMarshalled: Record<string, AttributeValue> = marshall(article);

        const params = {
            TableName: AWSTables.grouparticlenumber,
            Item: articleMarshalled
        }

        try {
            const data = await AWSDBClient.send(new PutItemCommand(params));
            return data.$metadata;
        }
        catch(err) {
            logger.error(err);
            return {success: false, data:null}
        }
    }

    updateArticle = async (article: Article) => {

        const articleMarshalled: Record<string, AttributeValue> = marshall(article);

        const key = {
            an_group: {S: article.an_group}
        };

        const updateExpression = `SET #an_initial_assignment_date = :an_initial_assignment_date,
        #an_status = :an_status,
        #an_source_system = :an_source_system,
        #an_distribution_comment = :an_distribution_comment,
        #an_distribution_date = :an_distribution_date`;

        const expressionAttributeNames = {
            "#an_initial_assignment_date" : "an_initial_assignment_date",
            "#an_status" : "an_status",
            "#an_source_system" : "an_source_system",
            "#an_distribution_comment" : "an_distribution_comment",
            "#an_distribution_date" : "an_distribution_date"
        };

        const expressionAttributeValues = {
            ":an_initial_assignment_date" : article.an_initial_assignment_date,
            ":an_status" : article.an_status,
            ":an_source_system" : article.an_source_system,
            ":an_distribution_comment" : article.an_distribution_comment,
            ":an_distribution_date" : article.an_distribution_date
        }

        const params  = {
            TableName: AWSTables.grouparticlenumber,
            Key: {
                an_group: article.an_group
            },
            ExpressionAttributeNames: expressionAttributeNames,
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: "UPDATED_NEW"
        };

        try {
            const data = await AWSDBClient.send(new UpdateCommand(params));
            
            return { success: true, data: data.$metadata };
        }
        catch(err) {
            logger.error(err);
            return {success: false, data:null}
        }

    };

    deleteArticle = async (asgrp: string) => {
        const params = {
            TableName: AWSTables.grouparticlenumber,
            Key:{
                an_group: {S: asgrp}
            }
        };

        try {
            const restdata = await AWSDBClient.send(new DeleteItemCommand(params));
            return restdata.$metadata;
        }
        catch(err) {
            logger.error(err);
            return {success: false, data:null}
        }
    }
}