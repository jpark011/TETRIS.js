const WebSocketServer = require('ws').Server;
const Session = require('./session');
const Client = require('./client');

const server = new WebSocketServer({
    port: 9000
});

console.log(server);

const sessions = new Map();

function createId(len = 6, chars = 'abcdefghjkmnopqrstwxyz1234567890') {
    let id = '';
    while (len--) {
        id += chars[Math.random() * chars.length | 0];
    }
    return id;
}

function createClient(conn, id = createId()) {

}

function createSession(id = createId()) {
    if (sessions.has(id)) {
        throw new Error('Session already exists');
    }
    const session = new Session(id);
    console.log('Creating session', session);

    sessions.set(id, session);
    return session;
}

function getSession(id) {
    return sessions.get(id);
}

server.on('connection', conn => {
    console.log('Connection established');
    const client = new Client(conn);

    conn.on('message', msg => {
        console.log(`Message received ${msg}`);
        const data = JSON.parse(msg);

        if ( data.type === 'create-session' ) {
            const session = createSession();
            session.join(client);
            sessions.set(session.id, session);
            client.send({
                type: session.id,
                id: session.id
            });
        } else if ( data.type === 'join-session' ) {
            const session = getSession(data.id) || createSession(data.id);
            session.join(client);
        }
    });

    conn.on('close', () => {
        console.log('Connection closed');
        const session = client.session;
        if (session) {
            session.leave(client);
            if (session.clients.size === 0) {
                sessions.delete(session.id);
            }
        }
    });
});