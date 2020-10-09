# Protocol

1. Connect
   1a. Send "HELLO", server adds you as a client.
2. Keep alive
   2a. Server will kill your connection in (default) 1 minute without a "KEEP_ALIVE" signal being sent.
3. Subscribe
   3a. Subscribe to an event "EVENT_NAME", any events emitted to "EVENT_NAME" will be pushed to you, the client. Here the client would send "SUBSCRIBE EVENT_NAME".
   3b. Subscribe to an event in a channel "EVENT_NAME:<base64-encoded channel id>". Here the client would send "SUBSCRIBE EVENT_NAME:<base64-encoded channel id>".
   3c. Subscribe to an event in a secure channel: "EVENT_NAME:<encyphered channel id>". Here the client would send "SUBSCRIBE EVENT_NAME:<encyphered channel id>".
4. Unsubscribe
   4a. Same as Subscribe except send the signal "UNSUBSCRIBE"
5. Emit
   5a. Emit an event "EVENT_NAME", all subscribers will be notified. Client would send "EMIT EVENT_NAME".
   5b. Emit an event "EVENT_NAME" with data, all subscribers will be notified and receive the data. Client would send "EMIT EVENT_NAME <transport format>:<transport encoded data>". Allows transport formats are json, xml, and binary.
   5c. Emit an event "EVENT_NAME" in a channel (secure or unsecure, we will use the term "hashed channel id" to refer to either) without data. Client would send "EMIT EVENT_NAME:<hashed channel id>".
   5d. Emit an event "EVENT_NAME" in a channel (secure or unsecure, we will use the term "hashed channel id" to refer to either) with data. Client would send "EMIT EVENT_NAME:<hashed channel id> <transport format>:<transport encoded data>".
6. Disconnect
   6a. Send signal "BYE", server disconnects you as a client.
