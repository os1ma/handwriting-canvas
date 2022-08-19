import { hello } from '../src'

describe('hello', () => {
  it('print hello', () => {
    const log = jest.spyOn(console, 'log').mockReturnValue()

    hello()

    expect(log).toHaveBeenNthCalledWith(1, 'hello')

    log.mockRestore()
  })
})
