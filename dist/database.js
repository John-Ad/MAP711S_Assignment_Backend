"use strict";
//----------------------------------------------
//      IMPORTS
//----------------------------------------------
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildQry = exports.QUERY_PROCS = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mysql_1 = __importDefault(require("mysql"));
//----------------------------------------------
//      SETUP DOTENV
//----------------------------------------------
dotenv_1.default.config();
//----------------------------------------------
//      QUERY ENUMS
//----------------------------------------------
var QUERY_PROCS;
(function (QUERY_PROCS) {
    QUERY_PROCS["ADD_USER"] = "call sp_addUser";
    QUERY_PROCS["GET_ALL_JOBS"] = "call sp_getAllJobs";
})(QUERY_PROCS = exports.QUERY_PROCS || (exports.QUERY_PROCS = {}));
//----------------------------------------------
//      QUERY ENUMS
//----------------------------------------------
function buildQry(qProc, data) {
    switch (qProc) {
        //---------------------
        //      ADD USER
        //---------------------
        case QUERY_PROCS.ADD_USER:
            let uAddData = data;
            return `${QUERY_PROCS.ADD_USER}('${uAddData.username}', '${uAddData.email}', '${uAddData.password}');`;
    }
}
exports.buildQry = buildQry;
//--------------------------------------------
//      DB CONNECTION CLASS DEFINITION
//--------------------------------------------
class DB_Connection {
    constructor() {
        //##########    SETUP CONNECTION POOL   ############
        this.connectionPool = mysql_1.default.createPool({
            connectionLimit: 20,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: "Valentines_Garage"
        });
    }
    //##########    HANDLE DB QUERIES   ############
    query(qry, callback) {
        this.connectionPool.query(qry, callback);
    }
}
exports.default = DB_Connection;
//# sourceMappingURL=database.js.map