//-------------------------------
//      DEPENDECY IMPORTS
//-------------------------------

import path from 'path';
import express from 'express';
import { Express, Request, Response, NextFunction } from 'express';
import DB_Connection, { newBuildQry, newBuildQry, QUERY_PROCS } from "./database";
import { IAddJob, IJob, IPostResponse } from './interfaces';

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
            Description: "Service toyota prius",
            Completion_Date: "2022-12-21",
            Date_Added: "2022-04-22"
        },
        {
            VIN: "23456789",
            Name: "Service",
            Description: "Service honda accord",
            Completion_Date: "2022-12-21",
            Date_Added: "2022-04-22"
        }
    ];


    dbConnection.query(newBuildQry(QUERY_PROCS.GET_ALL_JOBS, null), (err, result) => {
        if (err) {
            console.log(err.sqlMessage);
            res.send(err.sqlMessage);
        } else {
            if (result[0].length > 0) {
                res.send(result[0]);
            } else {
                res.send("No records found");
            }
        }
    });

    //res.send(jobs);
});

//--------------------------------------
//      GET INCOMPLETE TASKS FOR JOB     
//--------------------------------------
app.get("/job/tasks/incomplete/:data", (req, res) => {

    let data = JSON.parse(req.params.data)

    dbConnection.query(newBuildQry(QUERY_PROCS.GET_INCOMPLETE_TASKS_FOR_JOB, data), (err, result) => {
        if (err) {
            console.log(err.sqlMessage);
            res.send(err.sqlMessage);
        } else {
            if (result[0].length > 0) {
                res.send(result[0]);
            } else {
                res.send([]);
            }
        }
    });

});

//-------------------------------------
//      GET COMPLETED TASKS FOR JOB     
//-------------------------------------
app.get("/job/tasks/completed/:data", (req, res) => {

    let data = JSON.parse(req.params.data)

    dbConnection.query(newBuildQry(QUERY_PROCS.GET_COMPLETED_TASKS_FOR_JOB, data), (err, result) => {
        if (err) {
            console.log(err.sqlMessage);
            res.send(err.sqlMessage);
        } else {
            if (result[0].length > 0) {
                res.send(result[0]);
            } else {
                res.send([]);
            }
        }
    });

});




//---------------------------------------------
//      GET INCOMPLETE TASKS FOR EMPLOYEE     
//---------------------------------------------
app.get("/employee/tasks/incomplete/:data", (req, res) => {

    let data = JSON.parse(req.params.data)

    dbConnection.query(newBuildQry(QUERY_PROCS.GET_INCOMPLETE_TASKS_FOR_EMPLOYEE, data), (err, result) => {
        if (err) {
            console.log(err.sqlMessage);
            res.send(err.sqlMessage);
        } else {
            if (result[0].length > 0) {
                res.send(result[0]);
            } else {
                res.send([]);
            }
        }
    });

});

//--------------------------------------------------
//      GET COMPLETED TASKS FOR EMPLOYEE BY DAY     
//--------------------------------------------------
app.get("/employee/tasks/complete/day/:data", (req, res) => {

    let data = JSON.parse(req.params.data)

    dbConnection.query(newBuildQry(QUERY_PROCS.GET_COMPLETED_TASKS_FOR_EMPLOYEE_BY_DAY, data), (err, result) => {
        if (err) {
            console.log(err.sqlMessage);
            res.send(err.sqlMessage);
        } else {
            if (result[0].length > 0) {
                res.send(result[0]);
            } else {
                res.send([]);
            }
        }
    });

});

//--------------------------------------------------
//      GET COMPLETED TASKS FOR EMPLOYEE BY MONTH     
//--------------------------------------------------
app.get("/employee/tasks/complete/month/:data", (req, res) => {

    let data = JSON.parse(req.params.data)

    dbConnection.query(newBuildQry(QUERY_PROCS.GET_COMPLETED_TASKS_FOR_EMPLOYEE_BY_MONTH, data), (err, result) => {
        if (err) {
            console.log(err.sqlMessage);
            res.send(err.sqlMessage);
        } else {
            if (result[0].length > 0) {
                res.send(result[0]);
            } else {
                res.send([]);
            }
        }
    });

});



//--------------------------------------------------
//      GET TASKS REPORT FOR EMPLOYEE BY DAY     
//--------------------------------------------------
app.get("/reports/employee/day/:data", (req, res) => {

    let data = JSON.parse(req.params.data)

    dbConnection.query(newBuildQry(QUERY_PROCS.GET_TASKS_REPORT_FOR_EMPLOYEE_BY_DAY, data), (err, result) => {
        if (err) {
            console.log(err.sqlMessage);
            res.send(err.sqlMessage);
        } else {
            if (result[0].length > 0) {
                res.send(result[0][0]);
            } else {
                res.send([]);
            }
        }
    });

});

//--------------------------------------------------
//      GET TASKS REPORT FOR EMPLOYEE BY MONTH     
//--------------------------------------------------
app.get("/reports/employee/month/:data", (req, res) => {

    let data = JSON.parse(req.params.data)

    dbConnection.query(newBuildQry(QUERY_PROCS.GET_TASKS_REPORT_FOR_EMPLOYEE_BY_MONTH, data), (err, result) => {
        if (err) {
            console.log(err.sqlMessage);
            res.send(err.sqlMessage);
        } else {
            if (result[0].length > 0) {
                res.send(result[0][0]);
            } else {
                res.send([]);
            }
        }
    });

});




//-----------------------------------
//      GET ALL JOBS FOR EMPLOYEE     
//-----------------------------------
app.get("/jobs/employee/:data", (req, res) => {

    let data = JSON.parse(req.params.data)

    dbConnection.query(newBuildQry(QUERY_PROCS.GET_ALL_JOBS_FOR_EMPLOYEE, data), (err, result) => {
        if (err) {
            console.log(err.sqlMessage);
            res.send(err.sqlMessage);
        } else {
            if (result[0].length > 0) {
                res.send(result[0]);
            } else {
                res.send([]);
            }
        }
    });

});

//-------------------------------
//      GET ALL CLIENT DETAILS     
//-------------------------------
app.get("/clients/details", (req, res) => {

    dbConnection.query(newBuildQry(QUERY_PROCS.GET_ALL_CLIENT_DETAILS, null), (err, result) => {
        if (err) {
            console.log(err.sqlMessage);
            res.send(err.sqlMessage);
        } else {
            if (result[0].length > 0) {
                res.send(result[0]);
            } else {
                res.send([]);
            }
        }
    });

    //res.send(jobs);
});

//-------------------------------
//      GET ALL EMPLOYEE NAMES     
//-------------------------------
app.get("/employees/names", (req, res) => {

    dbConnection.query(newBuildQry(QUERY_PROCS.GET_ALL_EMPLOYEE_NAMES, null), (err, result) => {
        if (err) {
            console.log(err.sqlMessage);
            res.send(err.sqlMessage);
        } else {
            if (result[0].length > 0) {
                res.send(result[0]);
            } else {
                res.send([]);
            }
        }
    });

    //res.send(jobs);
});


//--------------------------------------------------------------
//--------------------------------------------------------------
//
//          POST ENDPOINTS
//      
//--------------------------------------------------------------
//--------------------------------------------------------------

//-------------------------------
//      LOGIN     
//-------------------------------
app.post("/login", (req, res) => {

    let data = req.body;

    dbConnection.query(newBuildQry(QUERY_PROCS.LOGIN, data), (err, result) => {
        if (err) {
            console.log(err.sqlMessage);
            res.send({ status: err.sqlMessage });
        } else {
            let resp: IPostResponse = {
                status: `${result[0][0].Role_ID}`
            }
            res.send(resp);
        }
    });

});


//-------------------------------
//      ADD JOB     
//-------------------------------
app.post("/jobs/add", (req, res) => {

    let data = req.body;

    dbConnection.query(newBuildQry(QUERY_PROCS.ADD_JOB, data), (err, result) => {
        if (err) {
            console.log(err.sqlMessage);
            res.send({ status: err.sqlMessage });
        } else {
            let resp: IPostResponse = {
                status: "success"
            }
            res.send(resp);
        }
    });

});

//-------------------------------
//      ADD TASK     
//-------------------------------
app.post("/job/tasks/add", (req, res) => {

    let data = req.body;

    dbConnection.query(newBuildQry(QUERY_PROCS.ADD_TASK, data), (err, result) => {
        if (err) {
            console.log(err.sqlMessage);
            res.send({ status: err.sqlMessage });
        } else {
            let resp: IPostResponse = {
                status: "success"
            }
            res.send(resp);
        }
    });

});

//-------------------------------
//      DELETE JOB     
//-------------------------------
app.post("/jobs/delete", (req, res) => {

    let data = req.body;

    dbConnection.query(newBuildQry(QUERY_PROCS.DELETE_JOB, data), (err, result) => {
        if (err) {
            console.log(err.sqlMessage);
            res.send({ status: err.sqlMessage });
        } else {
            let resp: IPostResponse = {
                status: "success"
            }
            res.send(resp);
        }
    });

});

//-------------------------------
//      DELETE TASK     
//-------------------------------
app.post("/job/tasks/delete", (req, res) => {

    let data = req.body;

    dbConnection.query(newBuildQry(QUERY_PROCS.DELETE_TASK, data), (err, result) => {
        if (err) {
            console.log(err.sqlMessage);
            res.send({ status: err.sqlMessage });
        } else {
            let resp: IPostResponse = {
                status: "success"
            }
            res.send(resp);
        }
    });

});


//-------------------------------
//      MARK TASK AS COMPLETE     
//-------------------------------
app.post("/job/task/mark-as-complete", (req, res) => {

    let data = req.body;

    dbConnection.query(newBuildQry(QUERY_PROCS.MARK_TASK_AS_COMPLETE, data), (err, result) => {
        if (err) {
            console.log(err.sqlMessage);
            res.send({ status: err.sqlMessage });
        } else {
            let resp: IPostResponse = {
                status: "success"
            }
            res.send(resp);
        }
    });

});

//-------------------------------
//      MARK TASK AS INCOMPLETE     
//-------------------------------
app.post("/job/task/mark-as-incomplete", (req, res) => {

    let data = req.body;

    dbConnection.query(newBuildQry(QUERY_PROCS.MARK_TASK_AS_INCOMPLETE, data), (err, result) => {
        if (err) {
            console.log(err.sqlMessage);
            res.send({ status: err.sqlMessage });
        } else {
            let resp: IPostResponse = {
                status: "success"
            }
            res.send(resp);
        }
    });

});


//-------------------------------
//      START SERVER     
//-------------------------------
app.listen(8081, 'localhost', () => {
    console.log("...server is running...");
});
