function createPiece(type) {
    switch (type) {
        case "T":
            return [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0],
            ];
        case "O":
            return [
                [2, 2],
                [2, 2],
            ];
        case "L":
            return [
                [0, 3, 0],
                [0, 3, 0],
                [0, 3, 3],
            ];
        case "J":
            return [
                [0, 4, 0],
                [0, 4, 0],
                [4, 4, 0],
            ];
        case "I":
            return [
                [0, 5, 0, 0],
                [0, 5, 0, 0],
                [0, 5, 0, 0],
                [0, 5, 0, 0]
            ];
        case "S":
            return [
                [0, 6, 6],
                [6, 6, 0],
                [0, 0, 0],
            ];
        case "Z":
            return [
                [7, 7, 0],
                [0, 7, 7],
                [0, 0, 0],
            ];
    }
}

function updateScore() {
    document.getElementById('score').innerText = tetris.player.score;
}

const colors = [
    null,
    'red',
    'blue',
    'violet',
    'green',
    'purple',
    'orange',
    'pink'
];

const tetris = new Tetris(document.getElementById('tetris'));

document.addEventListener('keydown', event => {
    switch (event.keyCode) {
        case 37:
            tetris.player.move(-1);
            break;
        case 39:
            tetris.player.move(1);
            break;
        case 40:
            tetris.player.drop();
            break;
        case 38:
            tetris.player.rotate(1);
            break;
        case 81:
            tetris.player.rotate(-1);
            break;
    }
});

updateScore();