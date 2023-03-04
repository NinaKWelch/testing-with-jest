// http://expressjs.com/en/starter/examples.html
const express = require('express');
const app = express();
const port = 3001;

// takes the JSON data of a request,
// transforms it into a JavaScript object
// and then attaches it to the body property
// of the request object before the route handler is called
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Testing With Jest');
});

app.get('/users', (req, res) => {
  res.json([
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
  ]);
});

app.post('/users', (req, res) => {
  // without the json-parser, the body property would be undefined
  const user = req.body;

  if (!user.name) {
    // calling return is crucial because otherwise
    // the code will execute to the very end
    // and the malformed user gets saved to the application
    return res.status(400).send('name is required');
  }

  user.id = Math.floor(Math.random() * 1000);
  res.json(user);
});

// must be last (in Express, 404 responses are not the result of an error,
// so the error-handler middleware will not capture them)
app.use((req, res) => {
  res.status(404).send('unknown endpoint');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
