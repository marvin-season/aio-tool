export async function sleep(timeout: number) {
    return new Promise((resolve) => setTimeout(resolve, timeout));
}

export function sum(a: number, b: number) {
    return a + b;
}