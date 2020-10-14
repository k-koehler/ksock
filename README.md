# ksock

Real-time events are complicated to setup. `ksock` provides a simple server and client which enables real-time programming with little configuration.

# example

*server*
```bash
npx ksock-server --serve 8080
```

*client*
```typescript
import { Event, configure } from 'ksock/client';
configure({ hostname: "localhost", port: 1337 })

const helloEvent = new Event("hello");
helloEvent.subscribe((payload: string) => {
  console.log(payload);
});
helloEvent.publish("hello world");
```

# features

## channels

```typescript
const restaurantId = 123;
const receivedOrderEvent = new Event("received-order");
event.channel(new Channel(`restaurant-${restaurantId}`));
event.subscribe((order: Order) => {
  console.log("received order with id: " + order.id);
  processOrder(order);
});
```

## messages

```typescript
import { talk, listen } from 'ksock-client';
const bob = new User("bob");
talk("hello").to(bob.id);
listen(bob.id, message => {
  console.log(message);
});
```


