"use strict";
//-------------------------------
//      DEPENDECY IMPORTS
//-------------------------------
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./database"));
const app = (0, express_1.default)();
//-------------------------------
//      SETUP ACCESS CONTROL
//-------------------------------
app.use(function (inRequest, inResponse, inNext) {
    inResponse.header("Access-Control-Allow-Origin", "*"); //allows requests from any domain
    inResponse.header("Access-Control-Allow-Methods", "GET,POST"); //allows these methods
    inResponse.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization"); //allows these headers
    inNext();
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
//-------------------------------
//      SETUP DB
//-------------------------------
const dbConnection = new database_1.default();
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
//      START SERVER     
//-------------------------------
app.listen(8081, 'localhost', () => {
    console.log("...server is running...");
});
//# sourceMappingURL=server.js.map