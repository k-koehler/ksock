import WebSocket from "isomorphic-ws";

export default class Sock {
  private ws: WebSocket;
  public connected: boolean;
  public hasError: boolean;

  constructor(ws: WebSocket);
  constructor(url: string);
  constructor(wsOrUrl: WebSocket | string) {
    this.connected = this.hasError = false;
    this.ws = typeof wsOrUrl === "string" ? new WebSocket(wsOrUrl) : wsOrUrl;
    this.ws.onopen = () => (this.connected = true);
    this.ws.onerror = () => (this.hasError = true);
  }

  private errorConnecting() {
    return new Error("error connecting to websocket");
  }

  private checkOk() {
    if (this.hasError) {
      throw this.errorConnecting();
    }
    if (!this.connected) {
      throw new Error("websocket not connected yet");
    }
  }

  public async wait(
    ms: number = 5000 /* 5s */,
    tickDuration: number = 100 /* ms */
  ) {
    let currentTimeout = 0;
    while (currentTimeout <= ms) {
      if (this.hasError) {
        throw this.errorConnecting();
      }
      if (this.connected) {
        return this;
      }
      currentTimeout += tickDuration;
      await new Promise((resolve) => setTimeout(resolve, tickDuration));
    }
    throw new Error("could not establish connection within the given time");
  }

  public sendRaw(rawData: string) {
    this.checkOk();
    return new Promise<void>((resolve, reject) =>
      this.ws.send(rawData, (error) => (error ? reject(error) : resolve()))
    );
  }
}
