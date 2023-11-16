# @imarkjs/remark-code

## Ready

- [unifiedjs](https://github.com/unifiedjs/unified)

## How to create a plugin?

#### Install

```bash npm 
npm i -S unified@10.1.2 remark-parse@10.0.1 remark-stringify@10.0.3 remark-frontmatter@5.0.0 remark-gfm@3.0.1 katex@0.15.2 remark-math@5.1.1 remark-html@15.0.2 unist-util-visit@4.1.2 
```

#### Coding

1. index.js

```javascript
/**
 * Create an extension for `unified` to enable using in unified.
 * 
 * @param {*} options 
 */
export default function remarkCode(options = {}) {
  const data = this.data()
  /** tokenize */
  add('micromarkExtensions', code(options))
  /** extension of `fromMarkdown` */
  add('fromMarkdownExtensions', codeFromMarkdown())
  /** extension of `toMarkdown` */
  add('toMarkdownExtensions', codeToMarkdown(options))

  function add(field, value) {
    const list = (
      data[field] ? data[field] : (data[field] = [])
    )
    list.push(value)
  }

}
```

1. syntax.js

```javascript
/**
 * Create an extension for `micromark` to enable code block syntax.
 *
 * @returns {Extension}
 *   Extension for `micromark` that can be passed in `extensions`, to
 *   enable code block syntax.
 */
export function code() {
    return {
        flow: { [96]: codeText() }
    }
}

export function codeText() {

    return {
        tokenize: tokenizeCodeText,
    }

    /**
     * others...
     */

}
```

1. utils.js 

```javascript
/**
 * 
 * Create an extension for `mdast-util-from-markdown`.
 *
 * @returns {FromMarkdownExtension}
 * Extension for `mdast-util-from-markdown`.
 */
export function codeFromMarkdown() {
    return {
        enter: {
            codeBlock: enterCodeBlcok,
            codeMeta: enterCodeMeta,
            codeData: enterCodeData,
        },
        exit: {
            codeBlock: exitCodeBlcok,
            codeMeta: exitCodeMeta,
            codeData: existCodeData,
            codeContent: exitCodeContent,
            codeMetadata: exitCodeMetadata,
            codeProperties: exitCodeProperties
        }
    }

    /**
     * others...
     */
}

/**
 * 
 * Create an extension for `mdast-util-to-markdown`.
 *
 * @returns {ToMarkdownExtension}
 * Extension for `mdast-util-to-markdown`.
 */
export function codeToMarkdown(options) {

    return {
        handlers: { code }
    }

    /**
     * others...
     */
}
```

#### Using

###### parse

```javascript
const processor = unified()
    .use(remarkParse)
    .use(remarkFrontmatter, { type: 'yaml', fence: '---' })
    .use(remarkGfm)
    .use(remarkHtml, {})
    .use(remarkMath)
    .use(remarkCode)
const tree = processor.parse(md.trim())
return processor.runSync(tree)
```

###### stringify

```javascript
const processor = unified()
    .use(remarkParse)
    .use(remarkFrontmatter, { type: 'yaml', fence: '---' })
    .use(remarkGfm)
    .use(remarkHtml, {})
    .use(remarkMath)
    .use(remarkCode)
    .use(remarkStringify)
return processor.stringify(mdast)
```
