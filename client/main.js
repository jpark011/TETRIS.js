const tetrisManager = new TetrisManager(document);
const localTetris = tetrisManager.createPlayer();

const connectionManager = new ConnectionManager();
connectionManager.connect('ws://localhost:9000');

document.addEventListener('keydown', event => {
    const player = localTetris.player;
    switch (event.keyCode) {
        case 37:
            player.move(-1);
            break;
        case 39:
            player.move(1);
            break;
        case 40:
            player.drop();
            break;
        case 38:
            player.rotate(1);
            break;
        case 81:
            player.rotate(-1);
            break;
        case 32:
            player.instantDrop();
            break;
    }
});
