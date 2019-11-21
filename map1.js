// vår karta
const mapArray = [
    [5, 1, 9, 1, 1, 1, 1, 1, 1, 1, 6],
    [3, 0, 14, 0, 0, 0, 0, 0, 0, 0, 4],
    [3, 0, 14, 0, 16, 0, 26, 13, 13, 13, 12],
    [3, 0, 15, 0, 14, 0, 14, 0, 0, 0, 4],
    [3, 0, 0, 0, 14, 0, 15, 0, 18, 13, 12],
    [11, 13, 13, 13, 24, 0, 0, 0, 0, 0, 4],
    [3, 0, 0, 0, 0, 0, 26, 13, 25, 0, 4],
    [3, 0, 26, 13, 13, 13, 24, 0, 14, 0, 4],
    [3, 0, 15, 0, 0, 0, 0, 0, 23, 13, 12],
    [3, 0, 0, 0, 16, 0, 16, 0, 0, 0, 4],
    [11, 13, 13, 13, 21, 0, 23, 13, 13, 13, 12],
    [3, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0],
    [3, 0, 16, 0, 14, 0, 18, 13, 25, 0, 4],
    [3, 0, 14, 0, 15, 0, 0, 0, 14, 0, 4],
    [3, 0, 14, 0, 0, 0, 16, 0, 14, 0, 4],
    [3, 0, 23, 13, 13, 13, 20, 13, 24, 0, 4],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
    [8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7]
];
// fasta variabler som följer med den här kartan, spelarposition, monsterposition, monsterpathing, exitposition
// monstergånghastighet
const gameTiles = 32;
const playerStartX = 32;
const playerStartY = 23;
const monsterMoveSpeed = 0.5;
const monster2MoveSpeed = 0.6;
const monster3MoveSpeed = 0.7;
const monster1StartX = 5 * gameTiles;
const monster1EndX = (4 * gameTiles) + monster1StartX;
const monster1StartY = (5 * gameTiles) - 12;
const monster2StartX = 3 * gameTiles;
const monster2MidX = 7 * gameTiles;
const monster2EndX = 7 * gameTiles;
const monster2StartY = (8 * gameTiles) - 12;
const monster2MidY = (8 * gameTiles) - 12;
const monster2EndY = (9 * gameTiles) - 12;
const monster3StartX = 5 * gameTiles;
const monster3EndX = 9 * gameTiles;
const monster3StartY = (11 * gameTiles) - 12;
const exitLevelX = 10 * gameTiles;
const exitLevelY = 11 * gameTiles;