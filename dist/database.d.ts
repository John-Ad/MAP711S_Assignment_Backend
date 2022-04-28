import mysql from "mysql";
export declare enum QUERY_PROCS {
    ADD_USER = "call sp_addUser",
    GET_ALL_JOBS = "call sp_getAllJobs"
}
export declare function buildQry(qProc: QUERY_PROCS, data: any): string;
declare class DB_Connection {
    private connectionPool;
    constructor();
    query(qry: string, callback: (err: mysql.MysqlError, res: any) => void): void;
}
export default DB_Connection;
