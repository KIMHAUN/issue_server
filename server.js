const express = require('express')
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.urlencoded()); 

app.use(express.json());

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
    //console.log('Created ::: ', issue);
    res.redirect('http://localhost:3000/');
});

//Read
app.get('/', (req,res) => {
  res.send(issues)
}) 

// Update
app.post('/updateIssue', (req, res) => {
    const updatedIssue = req.body;
   // console.log('Updated:', updatedIssue);
    issues = issues.map(issue => issue.id == updatedIssue.id ? updatedIssue : issue);
    
    res.redirect('http://localhost:3000/');
});

// Delete
app.get('/deleteIssue/:id', (req, res) => {
    const id = parseInt(req.params.id);
    issues = issues.filter(issue => issue.id !== id);
    console.log('Deleted issue ID:', id);
    res.redirect('http://localhost:3000/');
});