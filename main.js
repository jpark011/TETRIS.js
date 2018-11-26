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

const tetri = [];

const playerElements = document.querySelectorAll('.player');
[...playerElements].forEach( element => {
    const tetris = new Tetris(element.querySelector('canvas'));
    tetri.push(tetris);
});


document.addEventListener('keydown', event => {
    switch (event.keyCode) {
        case 37:
            tetri[0].player.move(-1);
            break;
        case 39:
            tetri[0].player.move(1);
            break;
        case 40:
            tetri[0].player.drop();
            break;
        case 38:
            tetri[0].player.rotate(1);
            break;
        case 81:
            tetri[0].player.rotate(-1);
            break;
        case 32:
            tetri[0].player.instantDrop();
            console.log("drop");
            break;
    }
});
