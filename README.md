[![Build Status](https://travis-ci.org/rennmatthewp/palette-picker.svg?branch=master)](https://travis-ci.org/rennmatthewp/palette-picker)

# palette-picker

### Generate a palette with 5 distinct colors
- You should be able to hold or “freeze” one color and generate a new palette while the frozen color remains the same (similar to the Lock functionality on Coolors)
- The colors should be randomly generated (do not use predefined lists of color palettes)

### Create a project folder as a place to save palettes
- You should be able to create multiple folders
- Folder names must be unique (you should not be able to create two folders with the same name)
- A folder can hold many saved palettes (a one-to-many relationship)
- The saved folder should persist in your backend database

### Save a generated palette to a project folder
- The saved palette should appear in the folder with the name of the palette (specified by the user) and the saved palette colors
- When you click on the name or colors in the saved palette, the palette generator should show the colors of that saved palette
- The saved palette should persist in your backend database

### Delete a palette from a project folder, which removes it from the page and database

### Never need to refresh the page to see new information

In addition to the functional requirement, on a separate dedicated git branch, go through each line of the server file and put a comment on each line that explains what that line of code is doing. Be as explicit as you can.
