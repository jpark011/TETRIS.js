const tetrisManager = new TetrisManager(document);
const tetrisLocal = tetrisManager.createPlayer();
tetrisLocal.element.classList.add('local');
tetrisLocal.run();

const connectionManager = new ConnectionManager(tetrisManager, window.parent);

window.addEventListener('message', (msg) => {
    if (msg.data.type === 'open') {
        connectionManager.initSession();
        connectionManager.watchEvents();
    } else {
        connectionManager.receive(msg.data);
    }
});

const keyListener = (event) => {
    [
        [65, 68, 69, 87, 83, 32],
    ].forEach((key, index) => {
        const player = tetrisLocal.player;
        if (event.type === 'keydown') {
            if (event.keyCode === key[0]) {
                player.move(-1);
            } else if (event.keyCode === key[1]) {
                player.move(1);
            } else if (event.keyCode === key[2]) {
                player.rotate(-1);
            } else if (event.keyCode === key[3]) {
                player.rotate(1);
            } else if (event.keyCode === key[5]) {
                player.instantDrop();
            }
        }

        if (event.keyCode === key[4]) {
            if (event.type === 'keydown') {
                if (player.dropInterval !== player.DROP_FAST) {
                    player.drop();
                    player.dropInterval = player.DROP_FAST;
                }
            } else {
                player.dropInterval = player.DROP_SLOW;
            }
        }
    });
};

document.addEventListener('keydown', keyListener);
document.addEventListener('keyup', keyListener);
