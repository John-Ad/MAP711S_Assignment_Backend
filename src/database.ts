//----------------------------------------------
//      IMPORTS
//----------------------------------------------

import dotenv from "dotenv";
import mysql from "mysql";
import { IAddJob, IAddTask, IAddUser, IGetTasksForJob } from "./interfaces";

//----------------------------------------------
//      SETUP DOTENV
//----------------------------------------------

dotenv.config();


//----------------------------------------------
//      QUERY ENUMS
//----------------------------------------------

export enum QUERY_PROCS {
    ADD_USER = "call sp_addUser",
    ADD_TASK = "call sp_addTask",
    ADD_JOB = "call sp_addJob",

    GET_ALL_JOBS = "call sp_getAllJobs",
    GET_TASKS_FOR_JOB = "call sp_getTasksForJob",

    GET_ALL_CLIENT_DETAILS = "call sp_getAllClientDetails",
    GET_ALL_EMPLOYEE_NAMES = "call sp_getAllEmployeeNames",
}

//----------------------------------------------
//      QUERY ENUMS
//----------------------------------------------
export function buildQry(qProc: QUERY_PROCS, data: any): string {
    switch (qProc) {

        //---- ADD USER ----
        case QUERY_PROCS.ADD_USER:
            let uAddData = (data as IAddUser);
            return `${QUERY_PROCS.ADD_USER}('${uAddData.username}', '${uAddData.password}');`;

        //---- ADD JOB ----
        case QUERY_PROCS.ADD_JOB:
            let addJob = (data as IAddJob);
            return `${QUERY_PROCS.ADD_JOB}('${addJob.VIN}','${addJob.Name}','${addJob.Description}','${addJob.Completion_Date}');`;

        //---- ADD TASK ----
        case QUERY_PROCS.ADD_TASK:
            let addTask = (data as IAddTask);
            return `${QUERY_PROCS.ADD_TASK}(${addTask.Job_ID},'${addTask.Name}','${addTask.Description}','${addTask.Username}');`;

        //---- GET ALL JOBS ----
        case QUERY_PROCS.GET_ALL_JOBS:
            return `${QUERY_PROCS.GET_ALL_JOBS}();`;

        //---- GET TASKS FOR JOBS ----
        case QUERY_PROCS.GET_TASKS_FOR_JOB:
            let getTasksData = (data as IGetTasksForJob);
            return `${QUERY_PROCS.GET_TASKS_FOR_JOB}(${getTasksData.jobID});`;

        //---- GET ALL CLIENT DETAILS ----
        case QUERY_PROCS.GET_ALL_CLIENT_DETAILS:
            return `${QUERY_PROCS.GET_ALL_CLIENT_DETAILS}();`;

        //---- GET ALL EMPLOYEE NAMES ----
        case QUERY_PROCS.GET_ALL_EMPLOYEE_NAMES:
            return `${QUERY_PROCS.GET_ALL_EMPLOYEE_NAMES}();`;

    }
}

//--------------------------------------------
//      DB CONNECTION CLASS DEFINITION
//--------------------------------------------

class DB_Connection {
    private connectionPool: mysql.Pool;     // stores connection pool

    constructor() {

        //##########    SETUP CONNECTION POOL   ############

        this.connectionPool = mysql.createPool({
            connectionLimit: 20,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: "Valentines_Garage"
        });

    }

    //##########    HANDLE DB QUERIES   ############

    public query(qry: string, callback: (err: mysql.MysqlError, res: any) => void) {
        this.connectionPool.query(qry, callback);
    }

}


export default DB_Connection;
