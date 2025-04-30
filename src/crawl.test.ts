import { expect, test } from 'vitest'
import { normalizeURL } from './crawl'

test('test the url https://blog.boot.dev/path/', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('https://blog.boot.dev/path');
});