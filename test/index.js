import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import remarkCode from '@imarkjs/remark-code'

const str = `# Example
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