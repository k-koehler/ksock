import Queue from "./queue";

describe("Queue", () => {
  describe("enqueue & dequeue", () => {
    test("basic functionality", () => {
      const queue = new Queue();
      queue.enqueue(1);
      expect(queue.dequeue()).toBe(1);
    });

    test("more advanced functionality", () => {
      const queue = new Queue();
      for (let i = 0; i < 100; ++i) {
        queue.enqueue(i);
      }
      let cur,
        counter = 0;
      while ((cur = queue.dequeue()) !== undefined) {
        expect(cur).toBe(counter++);
      }
      expect(counter).toBe(100);
    });
  });
});
