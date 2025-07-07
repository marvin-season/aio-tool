import { expect, test } from "vitest";
import { sum } from "@/utils/common";
import { createMockStream, SSEMessageGenerator } from "./stream";

test("sum 1 + 2", () => {
  expect(sum(1, 2)).toBe(3);
});

test("createMockStream", async () => {
  const input = `## Title \n\n The *current* time in **China** is ~~2025~~ ${new Date().toLocaleTimeString()}.`;
  const stream = createMockStream(input, {
    regx: /\s/g,
    chunk_transform: (chunk, id) =>
      JSON.stringify({
        id,
        text: chunk + " ",
      }),
  });
  for await (const element of stream) {
    console.log(element);
  }
});

test("SSEMessageGenerator", async () => {
  const input = `## Title \n\n The *current* time in **China** is ~~2025~~ ${new Date().toLocaleTimeString()}.`;
  const stream = createMockStream(input, {
    regx: /\s/g,
    chunk_transform: (chunk, id) =>
      JSON.stringify({
        id,
        value: chunk + " ",
      }),
  });
  const generator = SSEMessageGenerator(stream);

  Array.fromAsync(generator, console.log);
});
