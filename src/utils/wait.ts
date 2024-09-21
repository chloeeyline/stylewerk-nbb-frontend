/**
 * An async function that resolves after the given milliseconds.
 *
 * @deprecated ONLY USE THIS FOR TESTING. IF YOU USE THIS IN ACTUAL CODE YOU WILL BE FIRED!
 * @param ms Milliseconds until the Promise resolves
 * @returns A promises that resolves after the given milliseconds.
 */
export default function (ms: number = 0): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}
