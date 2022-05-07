//----------------------------------------------
//      IMPORTS
//----------------------------------------------

import dotenv from "dotenv";
import mysql from "mysql";
import { IAddUser } from "./interfaces";

//----------------------------------------------
//      SETUP DOTENV
//----------------------------------------------

dotenv.config();


//----------------------------------------------
//      QUERY ENUMS
//----------------------------------------------

export enum QUERY_PROCS {
    ADD_USER = "call sp_addUser",
    GET_ALL_JOBS = "call sp_getAllJobs"
}

//----------------------------------------------
//      QUERY ENUMS
//----------------------------------------------
export function buildQry(qProc: QUERY_PROCS, data: any): string {
    switch (qProc) {

        //---------------------
        //      ADD USER
        //---------------------
        case QUERY_PROCS.ADD_USER:
            let uAddData = (data as IAddUser);
            return `${QUERY_PROCS.ADD_USER}('${uAddData.username}', '${uAddData.password}');`;

        case QUERY_PROCS.GET_ALL_JOBS:
            return `${QUERY_PROCS.GET_ALL_JOBS}();`;
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
