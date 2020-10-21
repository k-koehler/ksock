import Connection from "./connection";
import ConnectionPool from "./connection-pool";

describe("ConnectionPool", () => {
  describe("acceptConnection & removeConnection", () => {
    it("should add/remove the connection to/from the list of connections", () => {
      const connectionPool = new ConnectionPool();
      for (let i = 0; i < 10; ++i) {
        connectionPool.acceptConnection(new Connection({} as any));
      }
      expect(connectionPool.connections).toHaveLength(10);
      for (let i = 0; i < 10; ++i) {
        connectionPool.removeConnection(connectionPool.connections[i]!);
      }
      for (const maybeConnection of connectionPool.connections) {
        expect(maybeConnection).toBeUndefined();
      }
    });
  });
});
