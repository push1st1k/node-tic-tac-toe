# Tic Tac Toe game

## Description

This CLI program should define the winner (X or O) in max. 2 moves 
based on board size (default is `3`) and the current game state (default is `data.json`).
It will print out the winner and move to win (e.g. `"X" (7) won!`) or throw an error if it's not possible.

Cells are numbered as:
<table>
    <tr>
        <td>0</td>
        <td>1</td>
        <td>2</td>
    </tr>
    <tr>
        <td>3</td>
        <td>4</td>
        <td>5</td>
    </tr>
    <tr>
        <td>6</td>
        <td>7</td>
        <td>8</td>
    </tr>
</table>

## Tests and Coverage

```bash
npm t
```

Detailed coverage report will be generated in `coverage` folder.

## Run

Please issue

```bash
npm start
```

and follow instructions.
