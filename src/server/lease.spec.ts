import Lease, { KEEP_ALIVE_FOR_MS } from "./lease";

describe("Lease", () => {
  describe("isExpired", () => {
    it("should return false, not expired", () => {
      const lease = new Lease();
      expect(lease.isExpired()).toBe(false);
    });

    it("should return true, is expired", () => {
      const lease = new Lease();
      jest
        .spyOn(Date, "now")
        .mockImplementationOnce(() => Date.now() + KEEP_ALIVE_FOR_MS + 1);
      expect(lease.isExpired()).toBe(true);
    });
  });

  describe("renew", () => {
    it("should renew the lease", () => {
      const lease = new Lease();
      // @ts-ignore
      lease.lastRenewedAt = 0;
      expect(lease.isExpired()).toBe(true);
      lease.renew();
      expect(lease.isExpired()).toBe(false);
    });
  });
});
