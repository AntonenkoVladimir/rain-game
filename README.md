## Description

The game starts with empty cells.
- An empty cell becomes black on click. A black cell is a soil.
- A black cell becomes empty on click.
- The player can’t create black cells if there is no black cell below.
- The player can’t remove the black cell if there is a black cell above.
- The “Reset” button clears the playing area.
- The “Run” button starts the “rain”: empty cells that are between black cells
   become blue (imitating filling them with water). Right and left boundaries of the
   playing area don’t restrain water flow, thus the cells with water can only appear
   between the soil (black cells).
- After the “rain”, all blue cells will become empty if the player clicks on any empty
   or black cell (the opposite to “run” command).

## Stack:
* ReactJS
* SCSS

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ npm start
```
