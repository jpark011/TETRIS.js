class ConnectionManager {
    constructor() {
        this.peer = new Peer();
        this.conn = null;

        this.peer.on('open', id => {
            this.conn = peer.connect(id);

        });

        this.peer.on('connection', conn => {

        });
    }

    connect(address) {
        this.conn = new WebSocket(address);

        this.conn.addEventListener('open', () => {
            console.log('Connected');
            this.initSession();
        });

        this.conn.addEventListener('message', event => {
            console.log('Received message', event);
            this.receive(event.data);
        });
    }

    initSession() {
        const sessionId = window.location.hash.split('#')[1];
        if (sessionId) {
            this.send({
                type: 'join-session',
                id: sessionId
            });
        } else {
            this.send({
                type: 'create-session'
            });
        }
    }
    
    receive(msg) {
        const data = JSON.parse(msg);
        if (data.type === 'session-created') {
            window.location.hash = data.id;
        }
    }

    send(data) {
        const msg = JSON.stringify(data);
        console.log(`Sending message ${msg}`);
        this.conn.send(msg);
    }
}
