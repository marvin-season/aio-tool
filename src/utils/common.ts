export async function sleep(timeout: number) {
    return new Promise((resolve) => setTimeout(resolve, timeout));
}

export function sum(a: number, b: number) {
    return a + b;
}

export function createIntersectionObserver({
    options,
    onIntersecting,
    targets = [],
    callback
}: {
    options: IntersectionObserverInit;
    targets: HTMLElement[];
    onIntersecting: (entries: IntersectionObserverEntry[]) => void;
    callback?: IntersectionObserverCallback
}) {
    const observer = new IntersectionObserver((entries) => {
        const intersectionObserverEntries = entries.filter(
            (item) => item.isIntersecting,
        );
        if (intersectionObserverEntries.length > 0) {
            onIntersecting(intersectionObserverEntries);
        }
        callback && callback(entries, observer);
    }, options);

    targets.forEach((target) => {
        observer.observe(target);
    });

    return observer;
}