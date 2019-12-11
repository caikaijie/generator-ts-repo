function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export function sum(a: number, b: number): number {
    return a + b
}

export async function slowHello(message: string): Promise<void> {
    await sleep(1000)
    console.log(`hello, ${message}`)
    throw new Error('slow error')
}
