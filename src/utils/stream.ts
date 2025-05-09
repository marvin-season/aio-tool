import { sleep } from "@/utils/common";

export const textDecoder = new TextDecoder();
export const textEncoder = new TextEncoder();

export async function* SSEMessageGenerator<T extends ArrayBuffer = ArrayBuffer>(stream: ReadableStream<T>) {
    if (!stream) {
        return;
    }
    let rest_str = "";
    const reader = stream.getReader();
    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        }

        const sse_chunk = textDecoder.decode(value);
        for (const line of sse_chunk.split(/\n+/)) {
            const json_str = line.replace(/data:\s*/, "").trim();
            if (json_str.length > 0) {
                try {
                    const message = JSON.parse(rest_str + json_str);
                    rest_str = "";
                    yield message as T; // 在生成器内yield消息
                } catch (e) {
                    rest_str += json_str;
                    console.warn(e);
                }
            }
        }
    }
}

// 创建一个符合 SSE 格式的 ReadableStream
export function createMockStream<R = { id: number, text: string }>(input: string, regx = /\s+/) {
    if (!input) {
        throw new Error("input is empty");
    }
    const id = Date.now();
    return new ReadableStream<R>({
        async start(controller) {
            for (const chunk of input.split(regx)) {
                controller.enqueue({
                    id,
                    text: chunk + " ",
                } as R);
            }
            controller.close(); // 结束流
        },
    });
}


export function logger(...value: any) {
    console.log(value);
}

/**
 * @beta
 */
export function parseThinkContent(input: string): { content: string, think_content: string } {
    // Check if there is a closed <think> tag
    const closedPattern = /<think>([\s\S]*?)<\/think>/;
    const closedMatch = input.match(closedPattern);
    if (closedMatch) {
        // Extract think content and remove the <think> block from input to get remaining content.
        const thinkContent = closedMatch[1];
        const content = input.replace(closedPattern, '').trim();
        return {
            content: content,
            think_content: thinkContent
        };
    } else {
        // If not a properly closed tag, check for an opening <think> tag
        const openPattern = /<think>([\s\S]*)/;
        const openMatch = input.match(openPattern);
        if (openMatch) {
            return {
                content: "",
                think_content: openMatch[1].trim()
            };
        }
        // When no <think> tag is present, return the whole string as content.
        return {
            content: input.trim(),
            think_content: ""
        };
    }
}