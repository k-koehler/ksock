# Protocol

TODO base64 encode topic

1. Connect
   - Connecting to the server adds you as a client
2. Keep alive
   - Server will kill your connection in (default) 1 minute without a "KEEP_ALIVE" signal being sent.
3. Subscribe
   - Subscribe to an event "EVENT_NAME", any events emitted to the topic "EVENT_NAME" will be pushed to you, the client. Here the client would send "SUBSCRIBE EVENT_NAME".
   - Subscribe to an event in a channel "\<base64-encoded topic\>:\<base64-encoded channel id\>". Here the client would send "SUBSCRIBE EVENT_NAME:\<base64-encoded channel id\>".
   - Subscribe to an event in a secure channel: "EVENT_NAME:\<encyphered channel id\>". Here the client would send "SUBSCRIBE EVENT_NAME:\<encyphered channel id\>".
4. Unsubscribe
   - Same as Subscribe except send the signal "UNSUBSCRIBE"
5. Emit
   - Emit an event "EVENT_NAME", all subscribers will be notified. Client would send "EMIT EVENT_NAME".
   - Emit an event "EVENT_NAME" with data, all subscribers will be notified and receive the data. Client would send "EMIT EVENT_NAME \<transport format\>:\<transport encoded data\>". Allows transport formats are json, xml, and binary.
   - Emit an event "EVENT_NAME" in a channel (secure or unsecure, we will use the term "hashed channel id" to refer to either) without data. Client would send "EMIT EVENT_NAME:\<hashed channel id\>".
   - Emit an event "EVENT_NAME" in a channel (secure or unsecure, we will use the term "hashed channel id" to refer to either) with data. Client would send "EMIT EVENT_NAME:\<hashed channel id\> \<transport format\>:\<transport encoded data\>".
6. Disconnect
   - Send signal "BYE", server disconnects you as a client.
