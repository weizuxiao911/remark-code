/**
 * @typedef {import('mdast').Root} Root
 */

import { code } from './syntax/syntax.js'
import { codeFromMarkdown, codeToMarkdown } from './lib/util.js'

/**
 * Create an extension to use in `unified`.
 * @this {any}
 */
export default function remarkCode() {
  const data = this.data()

  add('micromarkExtensions', code())
  add('fromMarkdownExtensions', codeFromMarkdown())
  add('toMarkdownExtensions', codeToMarkdown())

  /**
   * @param {string} field
   * @param {unknown} value
   */
  function add(field, value) {
    const list = /** @type {unknown[]} */ (
      // Other extensions
      /* c8 ignore next 2 */
      data[field] ? data[field] : (data[field] = [])
    )

    list.push(value)
  }
}
