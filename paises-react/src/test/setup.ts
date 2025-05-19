import { TextEncoder, TextDecoder } from "util";
;(global as any).TextEncoder = TextEncoder;
;(global as any).TextDecoder = TextDecoder;

import "@testing-library/jest-dom";

// Mock completo para evitar erros com userEvent e clipboard
if (typeof window !== "undefined") {
  Object.defineProperty(window, "navigator", {
    value: {
      clipboard: {
        writeText: jest.fn(),
        readText: jest.fn(),
      },
      userAgent: "node.js",
    },
    writable: true,
  });
}

