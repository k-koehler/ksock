export default class Queue<T> {
  private arr: T[] = [];

  public enqueue(t: T) {
    this.arr.push(t);
    return this;
  }

  public dequeue() {
    return this.arr.shift();
  }
}
