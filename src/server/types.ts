export type Awaitable<T> = T | Promise<T>;

export interface Tickable {
  performUnitOfWork(): Awaitable<void>;
}
