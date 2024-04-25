const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
  readFromFile('./db/diagnostics.json').then((data) => res.json(JSON.parse(data)))
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
  const { username, tip, topic} = req.body.errors;

  if (tip || topic || username) {
  const newDiagnostic = {
      date: Date.now(),
      error_id: uuidv4(),
      error: {
        tip,
        topic,
        username,
      }
    }

    readAndAppend(newDiagnostic, './db/diagnostics.json');
    let response = ''

    if (tip) {
        response = {
        status: tip,
        body: newDiagnostic,
      }
    } else if (topic) {
        response = {
        status: topic,
        body: newDiagnostic,
      }
    } else {
        response = {
        status: username,
        body: newDiagnostic,
      }
    }

    res.json(response) 
  } else {
    res.json('Error in posting diagnostic')
  }
});

module.exports = diagnostics;
