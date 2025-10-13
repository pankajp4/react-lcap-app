import { vi } from "vitest";
import "@testing-library/jest-dom";

// Mock CSS modules
vi.mock("*.module.css", () => ({
  default: new Proxy(
    {},
    {
      get: (_, prop) => prop,
    }
  ),
}));

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Set up custom matchers
expect.extend({
  toHaveStyleRule(received: any, property: string, value: string) {
    const style = window.getComputedStyle(received);
    const pass = style[property as any] === value;
    return {
      pass,
      message: () =>
        `expected ${received} to have CSS property "${property}: ${value}"`,
    };
  },
});
