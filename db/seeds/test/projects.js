exports.seed = function(knex, Promise) {
  return knex('palettes')
    .del()
    .then(() => {
      return Promise.all([
        knex('projects')
          .insert({ name: 'lil project' }, 'id')
          .then(project => {
            return knex('palettes').insert([
              {
                name: 'go blue',
                project_id: project[0],
                palette: ['#000ff', '#000ff', '#000ff', '#000ff', '#000ff']
              },
              {
                name: 'go green',
                project_id: project[0],
                palette: ['#008000', '#008000', '#008000', '#008000', '#008000']
              }
            ]);
          }),
        knex('projects')
          .insert({ name: 'big Proj' }, 'id')
          .then(project => {
            return knex('palettes').insert([
              {
                name: 'the whites',
                project_id: project[0],
                palette: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']
              }
            ]);
          })
      ]).catch(error => console.log(`Error seeding data: ${error}`));
    });
};
