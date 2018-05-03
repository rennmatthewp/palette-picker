const express = require('express');
const router = express.Router();
const environment = process.env.NODE_ENV || 'development';
const confirguration = require('../knexfile')[environment];
const database = require('knex')(confirguration);

router.post('/projects', (request, response) => {
  const project = request.body;
  for (let requiredParameter of ['name']) {
    if (!project[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format: { name: <String> }. Missing ${requiredParameter} property.`
      });
    }
  }

  database('projects')
    .insert(project, 'id')
    .then(project => response.status(201).json({ id: project[0] }))
    .catch(error => response.status(500).json({ error }));
});

router.get('/projects', (request, response) => {
  database('projects')
    .select()
    .then(projects => response.status(200).json(projects))
    .catch(error => response.status(500).json({ error }));
});

router.get('/projects/:id', (request, response) => {
  const { id } = request.params;

  database('projects')
    .where('id', id)
    .select()
    .then(project => {
      if (!project[0]) {
        return response.status(404).json({ error: `could not find project with id: ${id}` });
      }
      response.status(200).json(project[0]);
    })
    .catch(error => response.status(500).json({ error }));
});

module.exports = router;
