import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkCode from '../index.js'

import remarkStringify from 'remark-stringify'

import * as fs from 'fs'

// const str = fs.readFileSync('./index.md', 'utf-8')

const str = `
\`\`\`lang\r\n
123\r\n
\`\`\`{{hell}}
`

const processor1 = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkCode)
const ast = processor1.parse(str)
console.log('ast ->', ast)

// const processor2 = unified()
//     .use(remarkParse)
//     .use(remarkGfm)
//     .use(remarkCode)
//     .use(remarkStringify)
// const md = processor2.stringify(ast)
// console.log('markdown ->', md)