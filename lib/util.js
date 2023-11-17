/**
 * @typedef {import('mdast-util-from-markdown').CompileContext} CompileContext
 * @typedef {import('mdast-util-from-markdown').Extension} FromMarkdownExtension
 * @typedef {import('mdast-util-from-markdown').Handle} FromMarkdownHandle
 * @typedef {import('mdast-util-to-markdown').Options} ToMarkdownExtension
 * @typedef {import('mdast-util-to-markdown').Handle} ToMarkdownHandle
 * /

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
            // codeMeta: enterCodeMeta,
            // codeData: enterCodeData,
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
     * start markup
     * 
     * @this {CompileContext}
     * @type {FromMarkdownHandle}
     */
    function enterCodeBlcok(token) {
        this.enter({
            type: 'code',
            lang: '',
            meta: '',
            props: '',
            value: '',
        }, token)
        this.buffer()
    }

    /**
     * markup metadata ranges
     * 
     * @this {CompileContext}
     * @type {FromMarkdownHandle}
     */
    function enterCodeMeta(token) {
        this.buffer()
    }

    /**
     * markup code block ranges
     * 
     * @this {CompileContext}
     * @type {FromMarkdownHandle}
     */
    function enterCodeData(token) {
        this.buffer()
    }

    /**
     * get metadata, lang and meta 
     * 
     * @this {CompileContext}
     * @type {FromMarkdownHandle}
     */
    function exitCodeMeta(token) {
        console.log(`'1-1':`, JSON.stringify(this.stack))
        const data = this.resume()
        const node = this.stack[this.stack.length - 1]
        const g = data.split(/\s/g)
        if (!g.length) return
        /**@ts-ignore */
        node.lang = g[0]
        g.splice(0, 1)
        /**@ts-ignore */
        node.meta = g.length ? [...g].join(' ') : ''
        this.buffer()
    }

    /**
     * get code block
     * 
     * @this {CompileContext}
     * @type {FromMarkdownHandle}
     */
    function existCodeData(token) {
        const data = this.resume()
        let node = this.stack[this.stack.length - 1]
        /**@ts-ignore */
        node.value = data
        this.buffer()
    }

    /**
     * get properties
     * 
     * @this {CompileContext}
     * @type {FromMarkdownHandle}
     */
    function exitCodeBlcok(token) {
        const data = this.resume()
        const node = this.stack[this.stack.length - 1]
        this.exit(token)
        // const node = /** @type {Code} */ this.exit(token)
        /**@ts-ignore */
        node.props = data
    }

    /**
     * collect code block
     * 
     * @this {CompileContext}
     * @type {FromMarkdownHandle}
     */
    function exitCodeContent(token) {
        this.config.enter.data.call(this, token)
        this.config.exit.data.call(this, token)
    }

    /**
     * collect metadata
     * 
     * @this {CompileContext}
     * @type {FromMarkdownHandle}
     */
    function exitCodeMetadata(token) {
        this.config.enter.data.call(this, token)
        this.config.exit.data.call(this, token)
    }

    /**
     * collect properties
     * 
     * @this {CompileContext}
     * @type {FromMarkdownHandle}
     */
    function exitCodeProperties(token) {
        this.config.enter.data.call(this, token)
        this.config.exit.data.call(this, token)
    }

}

/**
 * 
 * Create an extension for `mdast-util-to-markdown`.
 *
 * @returns {ToMarkdownExtension}
 * Extension for `mdast-util-to-markdown`.
 */
export function codeToMarkdown() {

    return {
        unsafe: [],
        handlers: { code }
    }

    /**
     * tranform
     * @type {ToMarkdownHandle}
     */
    function code(node, _, context, safeOptions) {
        const meta = !node?.meta ? '' : node?.meta
        const lang = !node?.lang ? (!meta ? '' : ' ') : [node?.lang, ' '].join('')
        const props = !node?.props ? '' : `{{${node?.props}}}`
        const args = [
            ['```', lang, meta, '\n'].join(''),
            node.value,
            ['```', props].join('')
        ]
        return args.join('')
    }
}
