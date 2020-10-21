# Architecture

The package has the following main structure:

```
client/
lib/
server/
```

The package _client_ uses _isomorphic-ws_ so that it can run in the browser. The package _lib_ uses _isomorphic-ws_ because it is consumed by the client. The package _server_ uses _ws_ because _isomorphic-ws_ cannot be used as a server, hence code which uses websockets cannot be reused in _lib_.

## Connecting

### Client

Client simply connects to the remote server:

```
this.ws.onopen = () => (this.connected = true);
```

### Server

Server creates a _connection_ object for the incoming connection, and adds the connection to its _connection pool_.

```
ws.on("connection", (ws) => {
  connectionPool.acceptConnection(new Connection(ws));
});
```

Let's start by describing the connection object. The connection object represents a websocket connection and manages its own messages. The connection has a lease (default 30s), and upon expiry, will terminate itself and remove itself from the connection pool. The connection pool maintains a queue of messages and handles the messages one at a time.

```
class Connection {
  private messages: Queue<string> = new Queue();
  private lease: Lease = new Lease();
  private ws: WebSocket =  assigned from constructor;
```

## Expiry

### Server

The server maintains a global tick, which connections subscribe to. The tick rate can be variable, depending on the number of connections, and could in theory have a delay of 0. Ticks are timed, and the next tick delay is _sgn(tickDelay-tickTime)_.

On each tick, connections either process from their message queue, or check their lease. If their lease is expired, they terminate their connection.

On each tick, connection pools either process from their message queue, or cleanup their pool. On cleanup, the connection pool remove all entries of terminated connections.

Heres the chain of events that will happen upon connection lease expiry:

1 -- Connection checks its lease

```
checkLease(){
  if(lease.expired()){
    this.terminate();
  }
}
```

2 -- Connection Pool performs cleanup

```
cleanUpTerminatedConnections(){
  for(const connection of this.connections){
    if(connection.isTerminated()){
      this.removeConnection(connection.id);
    }
  }
}
```

## Keep Alive

### Client

The client simply sends "KEEP_ALIVE" to the server.

```
setInterval(() => {
  this.ws.send("KEEP_ALIVE");
}, 10_000);
```

### Server

The connection receives a new message "KEEP_ALIVE" and puts it in its queue.

```
this.ws.on("message", message => this.messages.enqueue(message.toString());
```

On a server tick, the connection processes its messages. It decodes the message and delegates to a handler which renews the connection's lease.

```
handleRawMessage(rawMessage: string){
  const message: Message = decodeMessage(rawMessage);
  if(message.type === MessageType.KeepAlive){
    return handleKeepAlive();
  }
}

handleKeepAlive(){
  this.lease.renew();
}
```
