import { expect, test } from 'vitest'
import { normalizeURL, getURLsFromHTML } from './crawl'

test('test the url https://blog.boot.dev/path/', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
});

test('test the url with http', () => {
    expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
});

test('test the url with https', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
});

test('getURLsFromHTML extracts absolute URLs', () => {
    const html = '<html><body><a href="https://blog.boot.dev">Boot.dev Blog></a></body></html>'
    const baseURL = "https://boot.dev"
    const expected = ['https://blog.boot.dev']
    const result = getURLsFromHTML(html, baseURL)
    expect(result).toEqual(expected)
});

test('getURLsFromHTML converts relative URLs to absolute', () => {
    const html = '<html><body><a href="/blog">Boot.dev Blog></a></body></html>'
    const baseURL = "https://boot.dev"
    const expected = ['https://blog.boot.dev/blog']
    const result = getURLsFromHTML(html, baseURL)
    expect(result).toEqual(expected)
});

test('getURLsFromHTML finds all anchor tags in HTML', () => {
    const html = `
      <html>
        <body>
          <a href="https://blog.boot.dev">Blog</a>
          <div>
            <a href="https://courses.boot.dev">Courses</a>
          </div>
          <div>
            <a href="/contacts">Contacts</a>
          </div>
          <p>
            Check out this <a href="https://discord.boot.dev">Discord</a> channel!
          </p>
        </body>
      </html>
    `
    const baseURL = "https://boot.dev"
    const expected = [
        'https://blog.boot.dev',
        'https://courses.boot.dev',
        'https://boot.dev/contacts',
        'https://discord.boot.dev'
    ]
    const result = getURLsFromHTML(html, baseURL)
    expect(result).toEqual(expected)
});

