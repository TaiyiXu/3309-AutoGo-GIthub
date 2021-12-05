const express = require('express');
const app = express();
const newConnection = require('./DBConnector');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const path = require('path')

// Fix some strange bugs
app.use(express.urlencoded({
    extended: true
}))
app.use(cors())
app.use(express.json())
app.use(express.static('build'))// @lil explain!
// Not used
app.use(cookieParser("D7C84966-88F9-4BF7-8805-9FBADDFAAA9F"))


<<<<<<< HEAD
app.post('/api/staff_view_BRevenue', function (req, res) {
    conn = newConnection();
    conn.connect();

    const username = req.body.userName
    const password = req.body.password
    const dateFrom = req.body.dateFrom
    const dateTo = req.body.dateTo
    //2021-08-20 10:00:00
    conn.query(`SELECT b.branchNo, b.location, SUM(ser.price) as totalPayment
    FROM services ser, client c, appointments a, branches b, serciveAppointment sa
    WHERE ser.serviceType=sa.serviceType AND a.appointmentNo = sa.appointmentNo
    AND a.clientNo = c.clientNo AND a.branchNo = b.branchNo
    AND date >= '2021-08-01 00:00:00' AND date <= '2021-08-31 00:00:00'
    GROUP BY b.branchNo
    ORDER BY a.appointmentNo
    `
    ,
=======
app.post('/api/add_appointment', function (req, res) {
    conn = newConnection();
    conn.connect();

    const date = req.body.date;
    const branchNo= parseInt(req.body.branchNo);
    const clientNo = req.body.clientNo;
    const licensePlate = req.body.licensePlate;

    conn.query("INSERT INTO appointments VALUES (?,?,?,?,?)", ['NULL', date, branchNo , clientNo, licensePlate],
>>>>>>> 6d9dbf456d3a9c9393bc690732e969b5da191d03
        (error, rows, fields) => {
            if (error) {
                console.log(error);
            }
            else {
<<<<<<< HEAD
                res.send(rows)
            }
        })
=======
                res.send('INSERT Appointment Success');
            }
        })

>>>>>>> 6d9dbf456d3a9c9393bc690732e969b5da191d03
})

app.post('/api/staff_view_appointment', function (req, res) {
    conn = newConnection();
    conn.connect();

    const userName = req.body.userName
    const password = req.body.password

    conn.query(`SELECT a.appointmentNo, c.licensePlate ,c.model, c.make, ser.serviceType, ser.serviceDescription, a.date
                    FROM appointments a, cars c, services ser,  serciveAppointment sa,  appointmentStaff astf
                    WHERE c.licensePlate = a.licensePlate  AND a.appointmentNo = sa.appointmentNo AND ser.serviceType = sa.serviceType 
                    AND a.appointmentNo = astf.appointmentNo AND astf.staffNo=(SELECT staffNo FROM staffs WHERE name = '${userName}' AND password = '${password}')
                    ORDER BY a.appointmentNo`,
        (error, rows, fields) => {
            if (error) {
                console.log(error);
            }
            else {
                res.send(rows);
            }
        })

})

app.post('/api/guest_view_appointment', function (req, res) {
    conn = newConnection();
    conn.connect();

    const userName = req.body.userName
    const password = req.body.password

    conn.query(`SELECT a.appointmentNo, ser.serviceType, ser.serviceDescription, a.date, b.location
                FROM services ser, clients c, appointments a, branches b, serciveAppointment sa
                WHERE ser.serviceType=sa.serviceType AND a.appointmentNo = sa.appointmentNo  AND a.clientNo = c.clientNo   AND a.clientNo = (SELECT clientNo FROM clients WHERE name='${userName}' AND password='${password}')   AND a.branchNo = b.branchNo
                ORDER BY a.date;`,
        (error, rows, fields) => {
            if (error) {
                console.log(error);
            }
            else {
                res.send(rows);
            }

        })
})


app.post('/api/guest_view_receipt', function (req, res) {
    conn = newConnection();
    conn.connect();

    const appointmentNo = req.body.appointmentNo

    conn.query(`SELECT a.appointmentNo, c.name as clientName,  a.date, b.location, SUM(ser.price) as totalPayment
                FROM  services ser, client c, appointments a, branches b, serciveAppointment sa
                WHERE ser.serviceType=sa.serviceType AND a.appointmentNo = sa.appointmentNo AND a.appointmentNo = ${appointmentNo}  AND a.clientNo = c.clientNo AND a.branchNo = b.branchNo
                GROUP BY a.appointmentNo 
                ORDER BY a.appointmentNo;`,
        (error, rows, fields) => {
            if (error) {
                console.log(error);
            }
            else {
                res.send(rows);
            }

        })
})

app.post('/api/staff_signup', function (req, res) {
    conn = newConnection();
    conn.connect();

    //TODO
    if (req.body.signupType == 'staff') {
        const username = req.body.username
        const password = req.body.password
        const position = req.body.position
        const branchNo = req.body.branchNo

        //NULL is for the PK in clients table
        conn.query("INSERT INTO staffs VALUES (?,?,?,?,?)", ['NULL', username, password, position, branchNo]
            , (error, rows, fields) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log(req.body.username + ' ' + req.body.password + ' ' + req.body.position + ' ')
                    res.send("200 OK");
                }
            })
    }
})

app.post('/api/guest_signup', function (req, res) {
    conn = newConnection();
    conn.connect();

    //TODO
    if (req.body.signupType == 'guest') {
        const username = req.body.username
        const password = req.body.password
        const address = req.body.address
        const phone = req.body.phone

        //NULL is for the PK in clients table
        conn.query("INSERT INTO clients VALUES (?,?,?,?,?)", ['NULL', username, password, address, phone]
            , (error, rows, fields) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log(req.body.username + ' ' + req.body.password)
                    res.send("200 OK");
                }
            })
    }
})

app.post('/api/staff_login', function (req, res) {
    conn = newConnection();
    conn.connect();

    if (req.body.loginType == 'staff') {
        const userName = req.body.usr
        const password = req.body.pwd
        //check if the staff is in our DB
        if (userName && password) {
            conn.query('SELECT * FROM staffs WHERE name = ? AND password = ?', [userName, password], (error, results) => {
                // console.log(results[0].name)
                if (results.length > 0) {
                    res.cookie('user', userName);
                    res.cookie('password', password, { signed: true, maxAge: 10 * 60 * 1000 });
                    // Send the logged in staff data
                    res.send(results);
                } else {
                    res.send('Incorrect Username and/or Password!');
                }
                res.end();
            })
        } else {
            res.send('Please enter Username and Password!');
            res.end();
        }
    }
})


app.post('/api/guest_login', function (req, res) {

    conn = newConnection();
    conn.connect();

    if (req.body.loginType == 'guest') {
        const userName = req.body.usr
        const password = req.body.pwd
        //check if the guest is in our DB
        if (userName && password) {
            conn.query('SELECT * FROM clients WHERE name = ? AND password = ?', [userName, password], (error, results) => {
                if (results.length > 0) {
                    res.cookie('user', userName);
                    res.cookie('password', password, { signed: true, maxAge: 10 * 60 * 1000 });
                    // Send our auth token
                    res.send(results);
                } else {
                    res.send('Incorrect Username and/or Password!');
                }
                res.end();
            });
        } else {
            res.send('Please enter Username and Password!');
            res.end();
        }
    }
})


// It is safe to remove this I believe
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/build/index.html');
})

app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

app.listen(8081, (req, res) => {
    console.log('server is listening on port 8081');
});