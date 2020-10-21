export default class Queue<T> {
  private wrappedArray: T[] = [];

  public enqueue(t: T) {
    this.wrappedArray.push(t);
  }

  public dequeue() {
    return this.wrappedArray.shift();
  }
}
