//-------------------------------
//      DEPENDECY IMPORTS
//-------------------------------

import path from 'path';
import express from 'express';
import { Express, Request, Response, NextFunction } from 'express';
import DB_Connection, { buildQry, QUERY_PROCS } from "./database";
import { IJob } from './interfaces';

const app: Express = express();


//-------------------------------
//      SETUP ACCESS CONTROL
//-------------------------------

app.use(function(inRequest: Request, inResponse: Response, inNext: NextFunction) {
    inResponse.header("Access-Control-Allow-Origin", "*");      //allows requests from any domain
    inResponse.header("Access-Control-Allow-Methods", "GET,POST");   //allows these methods
    inResponse.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization");   //allows these headers
    inNext();
});

app.use(express.json());
app.use(express.urlencoded());


//-------------------------------
//      SETUP DB
//-------------------------------

const dbConnection = new DB_Connection();



//--------------------------------------------------------------
//--------------------------------------------------------------
//
//          GET ENDPOINTS
//      
//--------------------------------------------------------------
//--------------------------------------------------------------


//-------------------------------
//      TEST ENDPOINT     
//-------------------------------
app.get("/test", (req, res) => {
    res.send("hello world");
});

//-------------------------------
//      GET ALL JOBS     
//-------------------------------
app.get("/jobs/all", (req, res) => {

    let jobs: IJob[] = [
        {
            VIN: "12345678",
            Name: "Service",
            Description: "Service toyota prius"
        },
        {
            VIN: "23456789",
            Name: "Service",
            Description: "Service honda accord"
        }
    ];

    res.send(jobs);
});



//-------------------------------
//      START SERVER     
//-------------------------------
app.listen(8081, 'localhost', () => {
    console.log("...server is running...");
});
