import AWS from 'aws-sdk';
import {AWS_ACCESS_KEY,AWS_SECRET_KEY,AWS_REGION} from '@config';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient} from "@aws-sdk/lib-dynamodb";


AWS.config.update({
    accessKeyId : AWS_ACCESS_KEY,
    secretAccessKey : AWS_ACCESS_KEY
});


const marshallOptions = {
    // Whether to automatically convert empty strings, blobs, and sets to `null`.
    convertEmptyValues: false, // false, by default.
    // Whether to remove undefined values while marshalling.
    removeUndefinedValues: false, // false, by default.
    // Whether to convert typeof object to map attribute.
    convertClassInstanceToMap: false, // false, by default.
};

const unmarshallOptions = {
    // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
    wrapNumbers: false, // false, by default.
    
};

const translateConfig = { marshallOptions, unmarshallOptions };

enum AWSTables {
    SPMGTINBlocks = "SPMGTINBlocks-dev",
    spm_gtin_block_information = "spm_gtin_block_information",
    groupmodelnumber = "groupmodelnumber-dev",
    grouparticlenumber = 'grouparticlenumber-dev'
};

const AWSDBClient = new DynamoDBClient({ region: AWS_REGION });

// Create the DynamoDB Document client.
const AWSdbDocClient = DynamoDBDocumentClient.from(AWSDBClient, translateConfig);


export { AWSDBClient, AWSTables,AWSdbDocClient};
