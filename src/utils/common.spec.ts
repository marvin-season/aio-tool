import {expect, test} from 'vitest'
import {sum} from "@/utils/common";

test('sum 1 + 2', () => {
    expect(sum(1, 2)).toBe(3)
})