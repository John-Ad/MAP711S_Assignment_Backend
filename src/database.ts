//----------------------------------------------
//      IMPORTS
//----------------------------------------------

import dotenv from "dotenv";
import mysql from "mysql";
import { IAddJob, IAddTask, IAddUser, IGetAllForEmployee, IGetTasksForJob, ILogin, IMarkTask, IMarkTaskAsComplete } from "./interfaces";

//----------------------------------------------
//      SETUP DOTENV
//----------------------------------------------

dotenv.config();


//----------------------------------------------
//      QUERY ENUMS
//----------------------------------------------

export enum QUERY_PROCS {
    LOGIN = "call sp_login",

    ADD_USER = "call sp_addUser",
    ADD_TASK = "call sp_addTask",
    ADD_JOB = "call sp_addJob",

    DELETE_JOB = "call sp_deleteJob",
    DELETE_TASK = "call sp_deleteTask",

    MARK_TASK_AS_COMPLETE = "call sp_markTaskAsComplete",
    MARK_TASK_AS_INCOMPLETE = "call sp_markTaskAsIncomplete",

    GET_ALL_JOBS = "call sp_getAllJobs",
    GET_INCOMPLETE_TASKS_FOR_JOB = "call sp_getIncompleteTasksForJob",
    GET_COMPLETED_TASKS_FOR_JOB = "call sp_getCompleteDTasksForJob",
    GET_ALL_JOBS_FOR_EMPLOYEE = "call sp_getAllJobsForEmployee",

    GET_INCOMPLETE_TASKS_FOR_EMPLOYEE = "call sp_getAllIncompleteTasksForEmployee",
    GET_COMPLETED_TASKS_FOR_EMPLOYEE_BY_DAY = "call sp_getAllCompletedTasksForEmployeeByDay",
    GET_COMPLETED_TASKS_FOR_EMPLOYEE_BY_MONTH = "call sp_getAllCompletedTasksForEmployeeByMonth",

    GET_TASKS_REPORT_FOR_EMPLOYEE_BY_DAY = "call sp_getTasksReportForEmployeeByDay",
    GET_TASKS_REPORT_FOR_EMPLOYEE_BY_MONTH = "call sp_getTasksReportForEmployeeByMonth",

    GET_ALL_CLIENT_DETAILS = "call sp_getAllClientDetails",
    GET_ALL_EMPLOYEE_NAMES = "call sp_getAllEmployeeNames",
}

//----------------------------------------------
//      BUILD QUERY FUNCTION
//----------------------------------------------

export function newBuildQry(qProc: QUERY_PROCS, data: any): string {
    let qry: string = qProc + "(";


    let values = Object.values(data);

    for (let i = 0; i < values.length; i++) {
        if (typeof values[i] == "number") {
            qry += `${values[i]}`;
        } else {
            qry += `'${values[i]}'`;
        }

        if (i < values.length - 1) {
            qry += ",";
        }
    }
    qry += ");";

    return qry;
}

export function buildQry(qProc: QUERY_PROCS, data: any): string {
    switch (qProc) {

        //---- LOGIN ----
        case QUERY_PROCS.LOGIN:
            let uLogin = (data as ILogin);
            return `${QUERY_PROCS.LOGIN}('${uLogin.username}', '${uLogin.password}');`;

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



        //---- DELETE JOB ----
        case QUERY_PROCS.DELETE_JOB:
            let delJob = (data as IGetTasksForJob);
            return `${QUERY_PROCS.DELETE_JOB}(${delJob.jobID});`;

        //---- DELETE TASK ----
        case QUERY_PROCS.DELETE_TASK:
            let delTask = (data as IMarkTask);
            return `${QUERY_PROCS.DELETE_TASK}(${delTask.taskID});`;



        //---- MARK TASK AS COMPLETE ----
        case QUERY_PROCS.MARK_TASK_AS_COMPLETE:
            let mTaskAsComp = (data as IMarkTaskAsComplete);
            return `${QUERY_PROCS.MARK_TASK_AS_COMPLETE}(${mTaskAsComp.taskID}, '${mTaskAsComp.comments}');`;

        //---- MARK TASK AS INCOMPLETE ----
        case QUERY_PROCS.MARK_TASK_AS_INCOMPLETE:
            let mTaskAsIncomp = (data as IMarkTask);
            return `${QUERY_PROCS.MARK_TASK_AS_INCOMPLETE}(${mTaskAsIncomp.taskID});`;

        //---- GET ALL JOBS ----
        case QUERY_PROCS.GET_ALL_JOBS:
            return `${QUERY_PROCS.GET_ALL_JOBS}();`;

        //---- GET INCOMPLETE TASKS FOR JOBS ----
        case QUERY_PROCS.GET_INCOMPLETE_TASKS_FOR_JOB:
            let getTasksData = (data as IGetTasksForJob);
            return `${QUERY_PROCS.GET_INCOMPLETE_TASKS_FOR_JOB}(${getTasksData.jobID});`;

        //---- GET COMPLETED TASKS FOR JOBS ----
        case QUERY_PROCS.GET_COMPLETED_TASKS_FOR_JOB:
            let gTasksData = (data as IGetTasksForJob);
            return `${QUERY_PROCS.GET_COMPLETED_TASKS_FOR_JOB}(${gTasksData.jobID});`;



        //---- GET INCOMPLETED TASKS FOR EMPLOYEE ----
        case QUERY_PROCS.GET_INCOMPLETE_TASKS_FOR_EMPLOYEE:
            let ite = (data as IGetAllForEmployee);
            return `${QUERY_PROCS.GET_INCOMPLETE_TASKS_FOR_EMPLOYEE}('${ite.username}');`;

        //---- GET COMPLETED TASKS FOR EMPLOYEE BY DAY ----
        case QUERY_PROCS.GET_COMPLETED_TASKS_FOR_EMPLOYEE_BY_DAY:
            let cted = (data as IGetAllForEmployee);
            return `${QUERY_PROCS.GET_COMPLETED_TASKS_FOR_EMPLOYEE_BY_DAY}('${cted.username}');`;

        //---- GET COMPLETED TASKS FOR EMPLOYEE BY MONTH ----
        case QUERY_PROCS.GET_COMPLETED_TASKS_FOR_EMPLOYEE_BY_MONTH:
            let ctem = (data as IGetAllForEmployee);
            return `${QUERY_PROCS.GET_COMPLETED_TASKS_FOR_EMPLOYEE_BY_MONTH}('${ctem.username}');`;



        //---- GET TASKS REPORT FOR EMPLOYEE BY DAY ----
        case QUERY_PROCS.GET_TASKS_REPORT_FOR_EMPLOYEE_BY_DAY:
            let treb = (data as IGetAllForEmployee);
            return `${QUERY_PROCS.GET_TASKS_REPORT_FOR_EMPLOYEE_BY_DAY}('${treb.username}');`;

        //---- GET TASKS REPORT FOR EMPLOYEE BY MONTH ----
        case QUERY_PROCS.GET_TASKS_REPORT_FOR_EMPLOYEE_BY_MONTH:
            let trem = (data as IGetAllForEmployee);
            return `${QUERY_PROCS.GET_TASKS_REPORT_FOR_EMPLOYEE_BY_MONTH}('${trem.username}');`;



        //---- GET ALL JOBS FOR EMPLOYEE ----
        case QUERY_PROCS.GET_ALL_JOBS_FOR_EMPLOYEE:
            let allJobsForEmp = (data as IGetAllForEmployee);
            return `${QUERY_PROCS.GET_ALL_JOBS_FOR_EMPLOYEE}('${allJobsForEmp.username}');`;

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
