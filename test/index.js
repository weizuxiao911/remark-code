import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkCode from '../index.js'

import remarkStringify from 'remark-stringify'

import * as fs from 'fs'

// const str = fs.readFileSync('./index.md', 'utf-8')

let str = `
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

**cuti**

***下划线***
<span></span>

![图片描述](https://statics.oscollege.net/466e0be4-9777-46ee-9142-2a4fda3741f6.png "图片描述")

[](https://www.baidu.com/ "连**接标**题")


**cuti**

*xieti*


zheng**粗*xie~~YY~~UUU*体***斜体*

~~删除线~~

// markdown的JSON数据转为editor的JSON数据
export const toEditorJSON = (value: any) => {
  const obj: any = {}
  obj.type = "document"
  if (value?.children?.length) {
    obj.content = value?.children?.map((v: any) => toNodeObj(v))
  }
  return obj
}

> 音

- 列表1
  - 列表1-1
    - 列表1-1-1
      - 列表1-1-1-1
        - 列表1-1-1-1-1
          - 列表1-1-1-1-1-
- 列表1
  - 列表1-1
    - 列表1-1-1
      - 列表1-1-1-1
        - 列表1-1-1-1-1
          - 列表1-1-1-1-1-1

1. 列表1
2. 列表2
3. 列表3
4. 列表4

---

| 列1标题 | 列2标题 | 列3标题 |
| :-----: | :-----: | :-----: |
| 单元格1 | 单元格2 | 单元格3 |
| 单元格4 | 单元格5 | 单元格6 |

\`行内代码\`

\`\`\`ts
type shareDataType = {
    editor: Instance | undefined | null
    [key: string]: any
}

\r\n\
\`\`\`

\`\`\`js
zhix
\`\`\`{{exec}}

\`\`\`js
fuz\r\n\r\n
\`\`\`{{copy}}




`

str = `

\`\`\`lang
\r\n\r
\`\`\`\{{prop}}\r\n\n
`

const decode = (str) => {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''))
}

const data = {
  "encoding": "base64",
  "data": "IyDkuIDnuqfmoIfpopgNCiMjIOS6jOe6p+agh+mimA0KIyMjIOS4iee6p+agh+mimA0KIyMjIyDlm5vnuqfmoIfpopgNCiMjIyMjIOS6lOe6p+agh+mimA0KIyMjIyMjIOWFree6p+agh+mimA0KDQoqKmN1dGkqKg0KDQoqKirkuIvliJLnur8qKioNCjxzcGFuPjwvc3Bhbj4NCg0KIVvlm77niYfmj4/ov7BdKGh0dHBzOi8vc3RhdGljcy5vc2NvbGxlZ2UubmV0LzQ2NmUwYmU0LTk3NzctNDZlZS05MTQyLTJhNGZkYTM3NDFmNi5wbmcgIuWbvueJh+aPj+i/sCIpDQoNCltdKGh0dHBzOi8vd3d3LmJhaWR1LmNvbS8gIui/nioq5o6l5qCHKirpopgiKQ0KDQoNCioqY3V0aSoqDQoNCip4aWV0aSoNCg0KDQp6aGVuZyoq57KXKnhpZX5+WVl+flVVVSrkvZMqKirmlpzkvZMqDQoNCn5+5Yig6Zmk57q/fn4NCg0KLy8gbWFya2Rvd27nmoRKU09O5pWw5o2u6L2s5Li6ZWRpdG9y55qESlNPTuaVsOaNrg0KZXhwb3J0IGNvbnN0IHRvRWRpdG9ySlNPTiA9ICh2YWx1ZTogYW55KSA9PiB7DQogIGNvbnN0IG9iajogYW55ID0ge30NCiAgb2JqLnR5cGUgPSAiZG9jdW1lbnQiDQogIGlmICh2YWx1ZT8uY2hpbGRyZW4/Lmxlbmd0aCkgew0KICAgIG9iai5jb250ZW50ID0gdmFsdWU/LmNoaWxkcmVuPy5tYXAoKHY6IGFueSkgPT4gdG9Ob2RlT2JqKHYpKQ0KICB9DQogIHJldHVybiBvYmoNCn0NCg0KPiDpn7MNCg0KLSDliJfooagxDQogIC0g5YiX6KGoMS0xDQogICAgLSDliJfooagxLTEtMQ0KICAgICAgLSDliJfooagxLTEtMS0xDQogICAgICAgIC0g5YiX6KGoMS0xLTEtMS0xDQogICAgICAgICAgLSDliJfooagxLTEtMS0xLTEtDQotIOWIl+ihqDENCiAgLSDliJfooagxLTENCiAgICAtIOWIl+ihqDEtMS0xDQogICAgICAtIOWIl+ihqDEtMS0xLTENCiAgICAgICAgLSDliJfooagxLTEtMS0xLTENCiAgICAgICAgICAtIOWIl+ihqDEtMS0xLTEtMS0xDQoNCjEuIOWIl+ihqDENCjIuIOWIl+ihqDINCjMuIOWIl+ihqDMNCjQuIOWIl+ihqDQNCg0KLS0tDQoNCnwg5YiXMeagh+mimCB8IOWIlzLmoIfpopggfCDliJcz5qCH6aKYIHwNCnwgOi0tLTogfCA6LS0tOiB8IDotLS06IHwgDQp8IOWNleWFg+agvDEgfCDljZXlhYPmoLwyIHwg5Y2V5YWD5qC8MyB8DQp8IOWNleWFg+agvDQgfCDljZXlhYPmoLw1IHwg5Y2V5YWD5qC8NiB8DQoNCmDooYzlhoXku6PnoIFgDQoNCmBgYHRzDQp0eXBlIHNoYXJlRGF0YVR5cGUgPSB7DQogICAgZWRpdG9yOiBJbnN0YW5jZSB8IHVuZGVmaW5lZCB8IG51bGwNCiAgICBba2V5OiBzdHJpbmddOiBhbnkNCn0NCmBgYA0KDQpgYGBqcw0KemhpeA0KYGBge3tleGVjfX0NCg0KYGBganMNCmZ1eg0KYGBge3tjb3B5fX0NCg0KDQoNCg==",
  "type": "read"
}
str = decode(data?.data)
// str = str?.replace(/\r\n/g, '\n')
// console.log(str)
// str = fs.readFileSync('./index.md', 'utf-8')
const processor1 = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkCode)
const ast = processor1.parse(str)
console.log('ast ->', ast)

const processor2 = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkCode)
    .use(remarkStringify)
const md = processor2.stringify(ast)
// console.log('markdown ->', md)