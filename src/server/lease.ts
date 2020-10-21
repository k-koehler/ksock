export const KEEP_ALIVE_FOR_MS = 30_000; // 30s

export default class Lease {
  private lastRenewedAt: number;

  public constructor() {
    this.lastRenewedAt = Date.now();
  }

  public isExpired() {
    return Date.now() - KEEP_ALIVE_FOR_MS > this.lastRenewedAt;
  }

  public renew() {
    this.lastRenewedAt = Date.now();
  }
}
