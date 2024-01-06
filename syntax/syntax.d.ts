
export { code } from './syntax.js'

declare module 'remark-code' {
  interface TokenTypeMap {
    codeBlock: 'codeBlock'
    codeMeta: 'codeMeta'
    codeMetadata: 'codeMetadata'
    codeData: 'codeData'
    codeContent: 'codeContent'
    codeClose: 'codeClose'
    codeLeft: 'codeLeft'
    codeProperties: 'codeProperties'
    codeRight: 'codeRight'
  }

}