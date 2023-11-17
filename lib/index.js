/**
 * @typedef {import('mdast').Root} Root
 */

import { code } from './syntax.js'
import { codeFromMarkdown, codeToMarkdown } from './util.js'

/**
 *  Create an extension to use in `unified`.
 */
export default function remarkCode() {
  // @ts-expect-error: TS is wrong about `this`.
  const self = /** @type {Processor} */ (this)
  // const settings = options
  const data = self.data()

  const micromarkExtensions =
    data.micromarkExtensions || (data.micromarkExtensions = [])
  const fromMarkdownExtensions =
    data.fromMarkdownExtensions || (data.fromMarkdownExtensions = [])
  const toMarkdownExtensions =
    data.toMarkdownExtensions || (data.toMarkdownExtensions = [])

  micromarkExtensions.push(code())
  fromMarkdownExtensions.push(codeFromMarkdown())
  toMarkdownExtensions.push(codeToMarkdown())

}
