
//---------------------------
//      ADD USER
//---------------------------

export interface IAddUser {
    username: string,
    role: number,
    password: string
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
