const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Initialize SQLite database
const db = new sqlite3.Database('flowstate.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the flowstate database.');
});

// Create tasks table
db.run(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    dueDate TEXT,
    priority TEXT
  )
`, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Tasks table created or already exists.');
});

// API endpoints
app.get('/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    }
    res.json(rows);
  });
});

app.post('/tasks', (req, res) => {
  const { title, description, dueDate, priority } = req.body;
  db.run(`INSERT INTO tasks (title, description, dueDate, priority) VALUES (?, ?, ?, ?)`,
    [title, description, dueDate, priority],
    function(err) {
      if (err) {
        res.status(500).send(err.message);
      }
      res.json({ id: this.lastID });
    });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
