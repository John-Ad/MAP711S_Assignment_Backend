drop database Valentines_Garage;

create database Valentines_Garage;

use Valentines_Garage;

/*------------------------*/
/*    TABLE DEFINITIONS   */
/*------------------------*/

create table UserRole(
    Role_ID int primary key auto_increment,
    Role_Name varchar(100) not null
);

create table User(
    Username varchar(100) primary key,
    Password varchar(200) not null,
    Role_ID int not null,   /* 1 --> admin, 2 --> employee*/

    foreign key (Role_ID) references UserRole(Role_ID)
);

create table Client(
    Client_ID int primary key auto_increment,
    Name varchar(200) not null
);

create table CarDetails(
    VIN varchar(100) primary key,
    Client_ID int not null,
    Color varchar(200) not null,
    Brand varchar(100) not null,
    Name varchar(100) not null,

    foreign key (Client_ID) references Client(Client_ID)
);

create table Job(
    Job_ID int primary key auto_increment,
    VIN varchar(100) not null,
    Name varchar(100) not null,
    Description varchar(3000) not null,
    Completion_Date date not null,
    Date_Added date not null,

    foreign key (VIN) references CarDetails(VIN)
);

create table Task(
    Task_ID int primary key auto_increment,
    Job_ID int not null,
    Name varchar(100) not null,
    Description varchar(2000) not null,
    Username varchar(100),

    Comments varchar(2000) not null,

    Completed int not null,
    Completion_Date date,

    foreign key (Job_ID) references Job(Job_ID),
    foreign key (Username) references User(Username)
);

insert into UserRole(Role_ID, Role_Name) values(1, "Owner");
insert into UserRole(Role_ID, Role_Name) values(2, "Mechanic");

insert into User(Username, Password, Role_ID) values("John","pw",1);
insert into User(Username, Password, Role_ID) values("Fritz","pw",2);
insert into User(Username, Password, Role_ID) values("Francis","pw",2);

insert into Client(Name) values("Erastus Matheus");
insert into Client(Name) values("Revaldo Gertze");

insert into CarDetails(VIN, Client_ID, Color, Brand, Name) values("12345678",1,"Red","Toyota","Prius");
insert into CarDetails(VIN, Client_ID, Color, Brand, Name) values("23456789",2,"Blue","Honda","Accord");

insert into Job(VIN, Name, Description, Completion_Date, Date_Added) values("12345678","Service prius","Service toyota prius","2022-12-20",now());
insert into Job(VIN, Name, Description, Completion_Date, Date_Added) values("23456789","Service accord","Service Honda Accord","2022-12-22",now());

insert into Task(Job_ID, Name, Description, Username, Comments, Completed, Completion_Date) values(1,"change oil","check oil and change it","Fritz",'',0,null);
insert into Task(Job_ID, Name, Description, Username, Comments, Completed, Completion_Date) values(1,"change tyres","check tyres and change them","Fritz",'',0,null);
insert into Task(Job_ID, Name, Description, Username, Comments, Completed, Completion_Date) values(1,"change wiper fluid","check wiper fluid and change it","Francis",'',0,null);
                                                      
insert into Task(Job_ID, Name, Description, Username, Comments, Completed, Completion_Date) values(2,"change oil","check oil and change it","Francis",'',0,null);
insert into Task(Job_ID, Name, Description, Username, Comments, Completed, Completion_Date) values(2,"change tyres","check tyres and change them","Francis",'',0,null);
insert into Task(Job_ID, Name, Description, Username, Comments, Completed, Completion_Date) values(2,"change wiper fluid","check wiper fluid and change it","Francis",'',0,null);


/*      LOGIN    */
delimiter //
create procedure sp_login(
    in uname varchar(100),
    in pword varchar(100)
)
begin
    if(pword = '' OR uname = '') then
        signal SQLSTATE '45000' set MESSAGE_TEXT='Please fill in all fields';
    end if;

    if(uname not in(select Username from User)) then
        signal SQLSTATE '45000' set MESSAGE_TEXT='User does not exist';
    end if;

    if(pword not in(select Password from User where Username=uname)) then
        signal SQLSTATE '45000' set MESSAGE_TEXT='Incorrect password';
    end if;

    select Role_ID from User where Username=uname;

end //
delimiter ;


/*      ADD USER    */
delimiter //
create procedure sp_addUser(
    in uname varchar(100),
    in role int,
    in password varchar(100)
)
begin
    if(uname in(select Username from User)) then
        signal SQLSTATE '45000' set MESSAGE_TEXT='User already exists';
    end if;

    if(password = '' OR uname = '') then
        signal SQLSTATE '45000' set MESSAGE_TEXT='Please fill in all fields';
    end if;

    if(role not in(select Role_ID from UserRole)) then
        signal SQLSTATE '45000' set MESSAGE_TEXT='Invalid role chosen';
    end if;

    insert into User(Username, Password, Role_ID) values(uname, password, role);
end //
delimiter ;


/*      GET ALL JOBS    */
delimiter //
create procedure sp_getAllJobs()
begin
    select 
        Job_ID,
        VIN,
        Name,
        Description,
        Completion_Date,
        Date_Added
    from Job;
end //
delimiter ;

/*      GET ALL JOBS FOR EMPLOYEE    */
delimiter //
create procedure sp_getAllJobsForEmployee(
    in username varchar(100)
)
begin
    select 
        Job_ID,
        VIN,
        Name,
        Description,
        Completion_Date,
        Date_Added
    from Job
    where username in(
        select Task.Username
        from Task
        where Task.Job_ID = Job.Job_ID
    );
end //
delimiter ;

/*      GET INCOMPLETE TASKS FOR JOB    */
delimiter //
create procedure sp_getIncompleteTasksForJob(
    in jobID int
)
begin
    select 
        Task_ID,    
        Name,
        Description,
        Username,
        Comments,
        Completed
    from Task
    where Job_ID=jobID AND Completed=0;
end //
delimiter ;

/*      GET COMPLETED TASKS FOR JOB    */
delimiter //
create procedure sp_getCompleteDTasksForJob(
    in jobID int
)
begin
    select 
        Task_ID,    
        Name,
        Description,
        Username,
        Comments,
        Completed
    from Task
    where Job_ID=jobID AND Completed=1;
end //
delimiter ;

/*      GET ALL INCOMPLETE TASKS FOR EMPLOYEE    */
delimiter //
create procedure sp_getAllIncompleteTasksForEmployee(
    in username varchar(100)
)
begin
    select 
        Job_ID
        Task_ID,    
        Name,
        Description,
        Comments,
        Username
    from Task
    where Username=username AND Completed=0;
end //
delimiter ;

/*      GET ALL COMPLETED TASKS FOR EMPLOYEE BY DAY    */
delimiter //
create procedure sp_getAllCompletedTasksForEmployeeByDay(
    in username varchar(100)
)
begin
    select 
        Job_ID
        Task_ID,    
        Name,
        Description,
        Comments,
        Username
    from Task
    where Username=username AND Completed=1 AND Completion_Date=date(now());
end //
delimiter ;

/*      GET ALL COMPLETED TASKS FOR EMPLOYEE BY MONTH    */
delimiter //
create procedure sp_getAllCompletedTasksForEmployeeByMonth(
    in username varchar(100)
)
begin
    select 
        Job_ID
        Task_ID,    
        Name,
        Description,
        Comments,
        Username
    from Task
    where Username=username AND Completed=1 AND year(Completion_Date)=year(date(now())) AND month(Completion_Date)=month(date(now()));
end //
delimiter ;

/*      ADD JOB    */
delimiter //
create procedure sp_addJob(
    in vin varchar(100),
    in name varchar(100),
    in description varchar(3000),
    in completionDate date
)
begin
    insert into Job(
        VIN,
        Name,
        Description,
        Completion_Date,
        Date_Added)
    values(vin, name, description, completionDate, now());
end //
delimiter ;

/*      ADD CLIENT    */
delimiter //
create procedure sp_addClient(
    in cname varchar(200)
)
begin
    insert into Client(
        Name
    )
    values(cname);
end //
delimiter ;

/*      ADD CAR    */
delimiter //
create procedure sp_addCar(
    in cvin varchar(100),
    in cID int,
    in ccolor varchar(200),
    in cbrand varchar(200),
    in cname varchar(200)
)
begin
    insert into CarDetails(
        VIN,
        Client_ID,
        Color,
        Brand,
        Name
    )
    values(
        cvin,
        cID,
        ccolor,
        cbrand,
        cname
    );
end //
delimiter ;


/*      ADD TASK    */
delimiter //
create procedure sp_addTask(
    in jobID int,
    in name varchar(100),
    in description varchar(3000),
    in uname varchar(100)
)
begin
    insert into Task(
        Job_ID,
        Name,
        Description,
        Username,
        Comments,
        Completed,
        Completion_Date
    )
    values(jobID, name, description, uname, '', 0, null);
end //
delimiter ;

/*      DELETE JOB    */
delimiter //
create procedure sp_deleteJob(
    in jobID int
)
begin
    delete from Task 
    where Job_ID=jobID;

    delete from Job 
    where Job_ID=jobID;
end //
delimiter ;

/*      DELETE TASK    */
delimiter //
create procedure sp_deleteTask(
    in taskID int
)
begin
    delete from Task 
    where Task_ID=taskID;
end //
delimiter ;

/*      MARK TASK AS COMPLETE TASK    */
delimiter //
create procedure sp_markTaskAsComplete(
    in taskID int,
    in cmmnts varchar(2000)
)
begin
    update Task
    set Completed=1, Completion_Date=now(), Comments=cmmnts
    where Task_ID=taskID;
end //
delimiter ;

/*      MARK TASK AS INCOMPLETE TASK    */
delimiter //
create procedure sp_markTaskAsIncomplete(
    in taskID int
)
begin
    update Task
    set Completed=0, Completion_Date=null
    where Task_ID=taskID;
end //
delimiter ;

/*      GET ALL CLIENTS    */
delimiter //
create procedure sp_getAllClients()
begin
    select 
        Client_ID,
        Name
    from Client;
end //
delimiter ;

/*      GET ALL CLIENT CARS    */
delimiter //
create procedure sp_getAllClientCars(
    in cID int
)
begin
    select 
        VIN, 
        Color,         
        Brand,       
        Name 
    from CarDetails
    where Client_ID=cID;
end //
delimiter ;


/*      GET ALL CLIENT DETAILS    */
delimiter //
create procedure sp_getAllClientDetails()
begin
    select 
        CarDetails.VIN,
        Client.Name as Client_Name,
        CarDetails.Name
    from CarDetails
    inner join Client
    where Client.Client_ID = CarDetails.Client_ID;
end //
delimiter ;

/*      GET ALL EMPLOYEE NAMES    */
delimiter //
create procedure sp_getAllEmployeeNames()
begin
    select 
        Username
    from User
    where Role_ID=2;
end //
delimiter ;

/*      GET TASKS REPORT FOR EMPLOYEE BY DAY    */
delimiter //
create procedure sp_getTasksReportForEmployeeByDay(
    in username varchar(100)
)
begin
    select  
        (
            select count(*)
            from Task
            where Username=username
            AND Completed=1
            AND Completion_Date=date(now())
        ) as Completed_Tasks,
        (
            select count(*)
            from Task
            where Username=username
            AND Completed=0
        ) as Incomplete_Tasks;
end //
delimiter ;

/*      GET TASKS REPORT FOR EMPLOYEE BY MONTH    */
delimiter //
create procedure sp_getTasksReportForEmployeeByMonth(
    in uname varchar(100)
)
begin
    select  
        (
            select count(*)
            from Task
            where Username=uname
            AND Completed=1
            AND year(Completion_Date)=year(date(now())) AND month(Completion_Date)=month(date(now()))
        ) as Completed_Tasks,
        (
            select count(*)
            from Task
            where Username=uname
            AND Completed=0
        ) as Incomplete_Tasks;
end //
delimiter ;


/*
    tasks completed  --done
    tasks incomplete  --done
    jobs completed  --done                    
    job with most tasks completed   --done
    job with most tasks incomplete  --done
    client with most tasks completed  --done

*/

/*jobs completed*/
select ifnull(
    (select count(*)
    from Job
    where ifnull((select count(*) from Task where Task.Job_ID=Job.Job_ID AND Task.Completed=0), 0) = 0
    )
    ,

    0
) as Jobs_Complete;

/*job with most completed tasks*/
select ifnull(
    (select Job.Name
    from Job
    inner join Task
    on Job.Job_ID=Task.Job_ID
    where Task.Completed=1 AND Task.Username='Francis'
    group by Job.Name
    order by count(Task.Task_ID) desc
    limit 1)
    ,

    'none'
) as Job_Most_Completed;

/*job with most incomplete tasks*/
select ifnull(
    (select Job.Name
    from Job
    inner join Task
    on Job.Job_ID=Task.Job_ID
    where Task.Completed=0 AND Task.Username='Francis'
    group by Job.Name
    order by count(Task.Task_ID) desc
    limit 1)
    ,

    'none'
) as Job_Most_Incomplete;


/*client with most complete tasks*/
select ifnull(

    (select Client.Name
    from ((Client
    inner join CarDetails on CarDetails.Client_ID=Client.Client_ID) 
    inner join Job on Job.VIN=CarDetails.VIN)
    inner join Task on Task.Job_ID=Job.Job_ID 
    where Task.Completed=1 AND Task.Username='Francis'
    group by Client.Name
    order by count(Task.Task_ID) desc
    limit 1)
    ,

    'none'
) as Client_Most_Complete;































