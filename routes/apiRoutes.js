const express = require('express');
const router = express.Router();
const environment = process.env.NODE_ENV || 'development';
const confirguration = require('../knexfile')[environment];
const database = require('knex')(confirguration);

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
        return response
          .status(404)
          .json({ error: `could not find project with id: ${id}` });
      }
      response.status(200).json(project[0]);
    })
    .catch(error => response.status(500).json({ error }));
});

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

router.get('/palettes', (request, response) => {
  database('palettes')
    .select()
    .then(palettes => response.status(200).json(palettes))
    .catch(error => response.status(500).json({ error }));
});

router.get('/palettes/:id', (request, response) => {
  const { id } = request.params;
  database('palettes')
    .where('id', id)
    .then(palette => {
      if (!palette[0]) {
        return response
          .status(404)
          .json({ error: `Could not find palette with id: ${id}` });
      }
      response.status(200).json(palette[0]);
    })
    .catch(error => response.status(500).json(error));
});

router.post('/palettes', (request, response) => {
  const palette = request.body;
  for (let requiredParameter of ['name', 'project_id', 'palette']) {
    if (!palette[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format: { name: <String>, project_id: <Number>, palette: <String> }. You're missing a ${requiredParameter} property`
      });
    }
  }

  database('palettes')
    .insert(palette, 'id')
    .then(palette => response.status(201).json({ id: palette[0] }))
    .catch(error => response.status(500).json(error));
});

router.delete('/palettes/:id', (request, response) => {
  const { id } = request.params;

  database('palettes')
    .where('id', id)
    .del()
    .then(deleted => {
      if (!deleted) {
        return response
          .status(404)
          .json({ error: 'Could not find palette to delete' });
      }
      response.status(204).json(deleted);
    })
    .catch(error => response.status(500).json({ error }));
});

module.exports = router;
