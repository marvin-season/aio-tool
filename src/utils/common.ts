export async function sleep(timeout: number) {
    return new Promise((resolve) => setTimeout(resolve, timeout));
}

export function sum(a: number, b: number) {
    return a + b;
}

/**
 *
 * @param options {IntersectionObserverInit}
 * @param onIntersecting if some target is intersecting
 * @param onDisIntersecting if some target is hiding
 * @param targets target list
 * @param callback raw callback of IntersectionObserver
 */
export function createIntersectionObserver({
                                               options,
                                               onIntersecting,
                                               onDisIntersecting,
                                               targets = [],
                                               callback
                                           }: {
    options: IntersectionObserverInit;
    targets: HTMLElement[];
    onIntersecting?: (entries: IntersectionObserverEntry[]) => void;
    onDisIntersecting?: (entries: IntersectionObserverEntry[]) => void;
    callback?: IntersectionObserverCallback
}) {
    const observer = new IntersectionObserver((entries) => {
        const intersectionEntries: IntersectionObserverEntry[] = [];
        const disIntersectionEntries: IntersectionObserverEntry[] = [];
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                intersectionEntries.push(entry);
            } else {
                disIntersectionEntries.push(entry);
            }
        })
        
        onIntersecting?.(intersectionEntries);
        onDisIntersecting?.(disIntersectionEntries);
        callback && callback(entries, observer);
    }, options);

    targets.forEach((target) => {
        observer.observe(target);
    });

    return observer;
}