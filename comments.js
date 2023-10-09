// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;
const commentFilePath = 'comments.json';

// Parse JSON body
app.use(bodyParser.json());

// Read comments from file
// If the file does not exist, create it with an empty array
let comments = [];
try {
  comments = JSON.parse(fs.readFileSync(commentFilePath, 'utf8'));
} catch (err) {
  if (err.code === 'ENOENT') {
    fs.writeFileSync(commentFilePath, '[]', 'utf8');
  } else {
    throw err;
  }
}

// Write comments to file
function writeComments(comments) {
  fs.writeFileSync(commentFilePath, JSON.stringify(comments), 'utf8');
}

// Serve static files
app.use(express.static('public'));

// Get comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Add comment
app.post('/comments', (req, res) => {
  const { name, comment } = req.body;
  if (!name || !comment) {
    res.status(400).send('Missing name or comment');
  } else {
    const newComment = { name, comment };
    comments.push(newComment);
    writeComments(comments);
    res.json(newComment);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});