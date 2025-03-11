export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number = 300
): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(null, args);
        }, wait);
    };
}
