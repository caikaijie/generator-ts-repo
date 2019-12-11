import { sum, slowHello } from './example'

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
})

test('another test case', async (): Promise<void> => {
    try {
        await slowHello('example')
    } catch(e) {
        expect(e).toMatchObject(new Error('slow error'))
    }
})
