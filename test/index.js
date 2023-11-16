import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkCode from '@imarkjs/remark-code'

const str = `# Example
\`\`\`lang meta
let s = 'hi'
console.log(s)
\`\`\`{{properties}}
`

const processor = unified()
    .use(remarkParse)
    .use(remarkCode)
const tree = processor.parse(str)
const s = processor.runSync(tree)
console.log(s)