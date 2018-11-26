class Client {
    constructor(conn) {
        this.conn = conn;
        this.session = null;
    }

    send(data) {
        const msg = JSON.stringify(data);
        console.log(`Sending message ${msg}`);
        
        this.conn.send(msg, err => {
            if (err) {
                console.error('Message failed', err);
            }
        });
    }
}

module.exports = Client;