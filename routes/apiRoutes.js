const express = require('express'); //pull in express
const router = express.Router(); //instantiate express router
const environment = process.env.NODE_ENV || 'development'; //set environement variable or use development by default
const confirguration = require('../knexfile')[environment]; //specify the environment to the knexfile
const database = require('knex')(confirguration); //instantiate database variable passing it the knex config

router.get('/projects', (request, response) => { //creates the projects endpoints 
  database('projects') //access the projects table in the database
    .select() //select all
    .then(projects => response.status(200).json(projects)) //responds with projects data
    .catch(error => response.status(500).json({ error })); //responds with error
});

router.get('/projects/:id', (request, response) => { //creates endpoint for getting a specific project
  const { id } = request.params; //destructure id from request parameters

  database('projects') //acces database table projects
    .where('id', id) //where the requested id matches an id from the table
    .select() //select all
    .then(project => {
      if (!project[0]) { //if no project with that id exists
        return response
          .status(404)
          .json({ error: `could not find project with id: ${id}` }); //respond with an error specifying what went wrong
      }
      response.status(200).json(project[0]); //respond with the project data
    })
    .catch(error => response.status(500).json({ error })); //response with server error
});

router.post('/projects', (request, response) => { //create post endpoint for projects table
  const project = request.body; //the project to add will be the request body
  for (let requiredParameter of ['name']) { //setting required param of name
    if (!project[requiredParameter]) { //if no name property exists in the request body
      return response.status(422).send({
        error: `Expected format: { name: <String> }. Missing ${requiredParameter} property.`
      }); //send back an error specifying what went wrong
    }
  }

  database('projects') //access the projects table in the database
    .insert(project, 'id') //insert the new project, respond with it's id
    .then(project => response.status(201).json({ id: project[0] })) //respond with the project's id
    .catch(error => response.status(500).json({ error })); //respond with server error
});

router.get('/palettes', (request, response) => { //set endpoint to get all palettes
  database('palettes') //acces the database table palettes
    .select() //select all
    .then(palettes => response.status(200).json(palettes)) //respond with all palettes
    .catch(error => response.status(500).json({ error })); //responsd with error
});

router.get('/palettes/:id', (request, response) => { //set endpoint to get a specific palettte
  const { id } = request.params; //destructure the id from the request parameters
  database('palettes') //acces the palettes table in the db
    .where('id', id) //where the requested id matches the db palette id
    .select() // select all
    .then(palette => {
      if (!palette[0]) { //if no palette matches the requested id
        return response
          .status(404)
          .json({ error: `Could not find palette with id: ${id}` }); //respond with an error specifying what went wrong 
      }
      response.status(200).json(palette[0]); // respond with palette data
    })
    .catch(error => response.status(500).json(error)); //respond with server error
});

router.post('/palettes', (request, response) => { //creates post endpoint for palettes
  const palette = request.body; //save request body as palette
  for (let requiredParameter of ['name', 'project_id', 'palette']) { //set required params
    if (!palette[requiredParameter]) { //if the new palette is missing required params
      return response.status(422).send({
        error: `Expected format: { name: <String>, project_id: <Number>, palette: <String> }. You're missing a ${requiredParameter} property`
      }); //respond with error specifying what went wrong
    }
  }

  database('palettes') //access the palettes table in the database
    .insert(palette, 'id') //add the new palette, return the id
    .then(palette => response.status(201).json({ id: palette[0] })) //respond with the id
    .catch(error => response.status(500).json(error)); //responsd with server error
});

router.delete('/palettes/:id', (request, response) => { //creates endpoint to delete a specified palette
  const { id } = request.params; //destructure id

  database('palettes') //access palettes table in the database
    .where('id', id) //where the requested id matches an id in the table
    .del() //delete that palette
    .then(deleted => {
      if (!deleted) { //if no palette with that id exists in the table
        return response
          .status(404)
          .json({ error: 'Could not find palette to delete' }); //respond with error specifying what went wrong
      }
      response.status(204).json(deleted); //respond with 204 status
    })
    .catch(error => response.status(500).json({ error })); //respond with server error
});

module.exports = router; //export routes
