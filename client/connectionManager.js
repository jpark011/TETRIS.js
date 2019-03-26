class ConnectionManager
{
    constructor(tetrisManager, parent)
    {
        this.peers = new Map;
        
        this.tetrisManager = tetrisManager;
        this.localTetris = this.tetrisManager.instances[0];
        this.parent = parent;
    }

    initSession() {
        const state = this.localTetris.serialize();
        this.send({
            type: 'init-state',
            state,
        });
    }

    watchEvents()
    {
        const local = this.tetrisManager.instances[0];

        const player = local.player;
        ['pos', 'matrix', 'score'].forEach(key => {
            player.events.listen(key, () => {
                this.send({
                    type: 'state-update',
                    fragment: 'player',
                    state: [key, player[key]],
                });
            });
        });

        const arena = local.arena;
        ['matrix'].forEach(key => {
            arena.events.listen(key, () => {
                this.send({
                    type: 'state-update',
                    fragment: 'arena',
                    state: [key, arena[key]],
                });
            });
        });
    }

    updateManager(peers)
    {
        const me = peers.you;
        const clients = peers.clients.filter(client => me !== client.id);
        clients.forEach(client => {
            if (!this.peers.has(client.id)) {
                const tetris = this.tetrisManager.createPlayer();
                tetris.unserialize(client.state);
                this.peers.set(client.id, tetris);
            }
        });

        [...this.peers.entries()].forEach(([id, tetris]) => {
            if (!clients.some(client => client.id === id)) {
                this.tetrisManager.removePlayer(tetris);
                this.peers.delete(id);
            }
        });

        const local = this.tetrisManager.instances[0];
        const sorted = peers.clients.map(client => this.peers.get(client.id) || local);
        this.tetrisManager.sortPlayers(sorted);
    }

    updatePeer(id, fragment, [key, value])
    {
        if (!this.peers.has(id)) {
            throw new Error('Client does not exist', id);
        }

        const tetris = this.peers.get(id);
        tetris[fragment][key] = value;

        if (key === 'score') {
            tetris.updateScore(value);
        } else {
            tetris.draw();
        }
    }

    receive(data)
    {
        if (data.type === 'session-broadcast') {
            this.updateManager(data.peers);
        } else if (data.type === 'state-update') {
            this.updatePeer(data.clientId, data.fragment, data.state);
        }
    }

    send(data)
    {
        console.log('Sending message', data);
        this.parent.postMessage(data, '*');
    }
}
