
//---------------------------
//      ADD USER
//---------------------------

export interface IAddUser {
    username: string,
    role: number,
    password: string
}

//---------------------------
//      GET TASKS FOR JOB
//---------------------------
export interface IGetTasksForJob {
    jobID: string
}

//---------------------------
//       JOB
//---------------------------
export interface IJob {
    VIN: string,
    Name: string,
    Description: string,
    Completion_Date: string,
    Date_Added: string
}
