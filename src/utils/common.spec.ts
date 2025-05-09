import { expect, test } from 'vitest'
import { sum } from "@/utils/common";
import { createMockStream, SSEMessageGenerator } from './stream';

test('sum 1 + 2', () => {
    expect(sum(1, 2)).toBe(3)
})

test('createMockStream', async () => {
    const input = `## Title \n\n The *current* time in **China** is ~~2025~~ ${new Date().toLocaleTimeString()}.`;
    const stream = createMockStream(input, /\s/g);
    for await (const element of stream) {
        console.log(element);
    }
})