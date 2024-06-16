const express = require('express')
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.urlencoded()); 

app.listen(8080, () => {
    console.log('Running on http://localhost:8080')
})

let issues = [
    { id: 1, title: "Issue 1", description: "Description 1" },
    { id: 2, title: "Issue 2", description: "Description 2" },
];

// Create
app.post('/createIssue', (req, res) => {
    const issue = req.body;
    issue.id = Math.random();
    issues.push(issue);
    console.log('Created ::: ', issue);
    res.redirect('http://localhost:3000/');
});

//Read
app.get('/', (요청, 응답) => {
  응답.send(issues)
}) 

// Update
app.put('/issues/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedIssue = req.body;
    issues = issues.map(issue => (issue.id === id ? updatedIssue : issue));
    console.log('Updated:', updatedIssue);
    res.send(updatedIssue);
});

// Delete
app.get('/deleteIssue/:id', (req, res) => {
    const id = parseInt(req.params.id);
    issues = issues.filter(issue => issue.id !== id);
    //console.log('Deleted issue ID:', id);
    res.redirect('http://localhost:3000/');
});