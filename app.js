const properties = require('./config/properties')
const express = require('express')
const app = express()
const port = properties.PORT

// Enable JSON parsing and output in requests
const jsonParser = express.json()
app.use(jsonParser)

// Set up low, a flat file database
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(properties.DB_FILE)
const db = low(adapter)
db.defaults({ requests: [], maxRequestId: 0 })
  .write()

app.get('/', (req, res) => {
  res.send('Welcome to the library.')
})

app.post('/request', (req, res) => {
  const { email, title } = req.body;
  
  // Handle missing input
  if (typeof title !== 'string' || title.length < 1) {
    res.status(400).send('Expected a title')
    return
  }

  if (typeof email !== 'string' || email.length < 1) {
    res.status(400).send('Expected an email')
    return
  }

  // Increment ID -- lowdb doesn't handle auto-increment
  const newId = db.get('maxRequestId').value() + 1

  db.update('maxRequestId', n => n + 1)
    .write()

  // It seems strange to ignore the email address at this point, but I'm coding this to spec.
  const newRecord = { 
    id: newId,
    available: properties.BOOKS.includes(title),
    title,
    timestamp: new Date().toISOString()
  }

  db.get('requests')
    .push(newRecord)
    .write()

  res.json(newRecord)
})

app.get('/request/:id', (req, res) => {
  const record = db.get('requests')
    .find({ id: parseInt(req.params.id) })
    .value()

  if (typeof record !== 'undefined') {
    res.json(record)
  } else {
    res.sendStatus(404)
  }
});

app.get('/request', (req, res) => {
  res.json(db.get('requests').value())
});

app.delete('/request/:id', (req, res) => {
  const record = db.get('requests')
    .find({ id: parseInt(req.params.id) })
    .value();

  db.get('requests')
    .remove({ id: parseInt(req.params.id) })
    .write();

  if (typeof record !== 'undefined') {
    res.sendStatus(204)
  } else {
    res.sendStatus(404)
  }
})

app.listen(port, () => {
  console.log(`Library-skills-test listening at http://localhost:${port}`)
})

// TODO: write integration tests
// TODO: move DAO and endpoints into separate files
// TODO: move DB code into its own file
// TODO: some of lowdb's operations are non-atomic

