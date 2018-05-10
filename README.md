# [mr-palette-picker](https://mr-palette-picker.herokuapp.com/)

[![Build Status](https://travis-ci.org/rennmatthewp/palette-picker.svg?branch=master)](https://travis-ci.org/rennmatthewp/palette-picker)

### Generate a palette with 5 distinct colors
- The colors should be randomly generated
- A user can "lock" a color in the palette

### Create a project folder as a place to save palettes
- User can create multiple project folders
- Folder names must be unique
- A folder can hold many saved palettes (a one-to-many relationship)
- The saved folder persists a database

### Save a generated palette to a project folder
- The saved palette appears in the folder with the name of the palette (specified by the user) and the saved palette colors
- When a user clicks on the name or colors in the saved palette, the palette generator shows the colors of that saved palette
- The saved palette persists in your backend database

### User can delete a palette from a project folder, which removes it from the page and database

### Never need to refresh the page to see new information
