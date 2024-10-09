"use client";

class ClientDims {
  static get width() {
    return typeof window !== "undefined" ? document.documentElement.clientWidth : null;
  }

  static get height() {
    return typeof window !== "undefined" ? document.documentElement.clientHeight : null;
  }
}

export { ClientDims };
