export interface IPostResponse {
    status: string
}

//---------------------------
//      LOGIN
//---------------------------
export interface ILogin {
    username: string,
    password: string
}


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

//---------------------------
//      ADD JOB
//---------------------------

export interface IAddJob {
    VIN: string,
    Name: string,
    Description: string,
    Completion_Date: string
}

//---------------------------
//      ADD TASK
//---------------------------

export interface IAddTask {
    Job_ID: string,
    Name: string,
    Description: string,
    Username: string
}
