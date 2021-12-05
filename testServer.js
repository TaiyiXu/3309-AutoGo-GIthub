
const newConnection = require('./DBConnector');
const conn = newConnection();
conn.connect();

// conn.query(`SELECT * FROM clients WHERE name='Henry'`,
//             (error,rows,fields)=>{
//             if(error)
//                 console.log(error);

//             for(r of rows)
//                 console.log(r);
//             })

let date = '2021-10-10 13:00:00';
let branchNo=1;
let clientNo=1;
let licensePlate='ADPU092'

conn.query("INSERT INTO appointments VALUES (?,?,?,?,?)", ['NULL', date, branchNo, clientNo, licensePlate]
            ,
    (error, rows, fields) => {
        if (error) { console.log(error); }
        else {
            console.log('INSERT SUCCESS')
        }

        // for (r of rows) {
        //     console.log(r);
        // }

    })


conn.end();