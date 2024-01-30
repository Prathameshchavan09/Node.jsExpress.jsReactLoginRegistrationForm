const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const port = 8081;


const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'nodeLoginRegistration'
});

app.post('/register', (req, res) => {
  console.log(req.body);
  const sql = "INSERT INTO users (`name`, `country`, `password`) VALUES (?, ?, ?)";
  const values = [
    req.body.name,
    req.body.country,
    req.body.password
  ];

 
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    console.log(result);
    return res.status(200).json({ message: 'Registration Successful' });
    
  });
});


app.post('/login', (req, res) => {
  console.log(req.body);
  const sql = "SELECT * FROM users WHERE `name` = ? AND `password` = ?"; 
  const values = [
    req.body.name,
    req.body.password
  ];

 db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (result.length === 0) {
      console.error("User not found");
      return res.status(404).json({ error: 'User not found' });
    }
    console.log("Logged In");
    return res.status(200).json({ message: 'Login Successful' });
  });
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
