# @imarkjs/remark-code

## Introduction

an extension for `unified` to enable code syntax, support that parse `AST` from `markdown` and compile `AST` into `markdown`.

## Features

1. Compatible with standard code syntax.
    <br/>
    \`\`\`lang metadata <br/>
    code <br/>
    \`\`\`<br/>

2. Expending a new feature `props`.
    <br/>
    \`\`\`lang metadata <br/>
    code <br/>
    \`\`\`{{props}} <br/>

## Using

### Install

```bash
npm i unified remark-parse remark-stringify @imarkjs/remark-code -S
```

### Example

```javascript

import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import remarkCode from '@imarkjs/remark-code'

const str = `
# Example
\`\`\`lang meta
let s = 'hi'
console.log(s)
\`\`\`{{properties}}
`

const processor1 = unified()
    .use(remarkParse)
    .use(remarkCode)
const ast = processor1.parse(str)
console.log('ast ->', ast)

const processor2 = unified()
    .use(remarkParse)
    .use(remarkCode)
    .use(remarkStringify)
const md = processor2.stringify(ast)
console.log('markdown ->', md)

```

run it, you will get result as following:

```bash
ast -> {
  type: 'root',
  children: [
    {
      type: 'heading',
      depth: 1,
      children: [Array],
      position: [Object]
    },
    {
      type: 'code',
      lang: 'lang',
      meta: 'meta',
      props: 'properties',
      value: "\nlet s = 'hi'\nconsole.log(s)\n",
      position: [Object]
    }
  ],
  position: {
    start: { line: 1, column: 1, offset: 0 },
    end: { line: 6, column: 1, offset: 69 }
  }
}

# note: use ''' to beautify \`\`\`. 

markdown -> # Example

'''lang meta
let s = 'hi'
console.log(s)
'''{{properties}}
```

## How does it works ?

![How does it works?](./readme.png)

# 注意事项

在Micromark（一个Markdown解析器）的上下文中，concrete: true 是一个标志位，用于告诉Micromark在处理某个节点时，这个节点是一个不可分割的实体（即“具体的”或“连续的”）。这意味着在处理该节点时，解析器不应该尝试在节点内部进行更多的语法规则匹配，而是将整个区块视为单一实体。

在factory函数中，concrete属性主要应用于那些在Markdown文本中具有明显边界且不应被进一步拆分的结构，比如代码块、HTML块、链接引用等。对于代码块（code fence）而言，concrete: true意味着一旦进入代码块，解析器将完整地对待整个代码块，直到遇到结束标记为止，期间不会试图解析代码块内部的Markdown语法。

简而言之，concrete: true有助于确保解析器正确地区分和处理文档中那些具有封闭边界的独立结构。