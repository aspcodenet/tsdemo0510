import dotenv from "dotenv";
import path from "path";
import * as fs from "fs";
import {parse} from 'csv-parse';
import { exit } from "process";
import * as database from "./database/database";

dotenv.config();


type ProductData = {
    ProductName: string,
    Description:string,
    Color:string
};


const csvFilePath = path.resolve(__dirname, '../imports/importfile.txt');

const headers = ['ProductName', 'Description', 'Color'];

const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

parse(fileContent, {
    delimiter: ',',
    columns: headers,
  }, async (error, result: ProductData[]) => {
    if (error) {
      console.error(error);
      exit();
    }
    console.log("STARTING")
    console.log(result[0])
    console.log("Result", result);
    for(const element of result){
        console.log("Start element ", element.ProductName);
        let product = await database.getProductId(element.ProductName)
        if (product == undefined){
            console.log(element.ProductName + " is missing")
        }else{
            await database.updateProduct(product.id,element.Description,element.Color)
        }
    };
    exit();
});













