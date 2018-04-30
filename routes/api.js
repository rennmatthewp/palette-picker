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
        error: `Expected format: { name: <String> }. Missgin ${requiredParameter} property.`
      });
    }
  }

  database('projects')
    .insert(project, 'id')
    .then(project => response.status(201).json({ id: project[0] }))
    .catch(error => response.status(500).json({ error }));
});

router.get('/projects', (request, response) => {
  database
    .select()
    .table('projects')
    .then(projects => response.status(200).json(projects))
    .catch(error => response.status(500).json({ error }));
});

module.exports = router;
