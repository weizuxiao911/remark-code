/**
 * @typedef {import('micromark-util-types').Construct} Construct
 * @typedef {import('micromark-util-types').TokenizeContext} TokenizeContext
 * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
 * @typedef {import('micromark-util-types').Previous} Previous
 * @typedef {import('micromark-util-types').Resolver} Resolver
 * @typedef {import('micromark-util-types').State} State
 * @typedef {import('micromark-util-types').Token} Token
 * @typedef {import('micromark-util-types').Extension} Extension
 */

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
     * tokenize code text
     * 
     * @this {TokenizeContext}
     * @type {Tokenizer}
     */
    function tokenizeCodeText(effects, ok, nok) {

        const self = this

        /** number of start symbols character '\`'  */
        let sizeOpen = 0
        /** number of code block character */
        let sizeData = 0
        /** is to match end symbols */
        let toColse = 0
        /** number of end symbols character '\`' */
        let sizeClose = 0
        /** number of character '\{' */
        let sizeLeft = 0
        /** number of character '\}' */
        let sizeRight = 0

        /** enter to code block */
        effects.enter('codeBlock')
        /** enter to metedata */
        effects.enter('codeMeta')

        return start

        /** match start symbols '\`\`\`' */
        function start(code) {
            /** 
             * the number 96 is ascii code of charcter '\`' 
             * 
             * to match start symbols 
             */
            if (96 === code) {
                sizeOpen++
                effects.consume(code)
                return start
            }
            /** 
             * unless starts with three charcter '\`' or has any more
             */
            if (sizeOpen !== 3 || null === code) {
                return nok(code)
            }
            /** to match metadata */
            return meta(code)
        }

        /** match metadata, in current line after start symbols '\`\`\`',  */
        function meta(code) {
            if (null === code) {
                return nok(code)
            }
            /** to match code block */
            if (0 > code) {
                effects.exit('codeMeta')
                return data(code)
            }
            /** collect metadata */
            effects.enter('codeMetadata')
            effects.consume(code)
            effects.exit('codeMetadata')
            return meta
        }

        /** match code block, from next line after start symbols '\`\`\`', util to match end sysmbols '`\`\`' */
        function data(code) {
            if (null === code) {
                return nok(code)
            }
            /** to match end symbols */
            if (96 === code && toColse) {
                sizeData && effects.exit('codeData')
                return end(code)
            }
            /** must types '\n' before matching end symbols */
            if (0 > code) {
                toColse = 1
            } else {
                toColse = 0
            }
            /** avoid empty code block */
            if (!sizeData) {
                effects.enter('codeData')
            }
            /** ignore first \n */
            if (!sizeData && 0 > code) {
                sizeData++
                effects.enter('codeContentIgnore')
                effects.consume(code)
                effects.exit('codeContentIgnore')
                return data
            }
            sizeData++
            /** collect codes */
            effects.enter('codeContent')
            effects.consume(code)
            effects.exit('codeContent')
            return data
        }

        /** match end symbols, supports standard format */
        function end(code) {
            if (96 === code) {
                sizeClose++
                effects.enter('codeClose')
                effects.consume(code)
                effects.exit('codeClose')
                return end
            }
            if (sizeClose !== 3) {
                return nok(code)
            }
            /** to match extension */
            if (123 == code) {
                return left(code)
            }
            if (null === code || 0 > code) {
                effects.exit('codeBlock')
                return ok(code)
            }
            return nok(code)
        }

        /** 
         * 
         * example 
         * 
         * ```lang metadata, single line text, except that start with character '`'
         * 
         * code block, multi-line text
         * 
         * ```{{properties, multi-line text, except that start with character '{' or end with character '}' }}
         * 
         */

        /** to match start symbols '\{\{', after last end symobols '\`\`\`' */
        function left(code) {
            if (123 === code) {
                sizeLeft++
                effects.enter('codeLeft')
                effects.consume(code)
                effects.exit('codeLeft')
                return left
            }
            if (sizeLeft !== 2) {
                return nok(code)
            }
            return props(code)
        }

        /** to match properties, after start symbols '\{\{', supports muti-line text */
        function props(code) {
            if (null === code) {
                return nok(code)
            }
            if (125 === code) {
                return right(code)
            }
            /** collect properties */
            effects.enter('codeProperties')
            effects.consume(code)
            effects.exit('codeProperties')
            return props
        }

        /** to match end symbols '\}\}' */
        function right(code) {
            if (125 === code) {
                sizeRight++
                effects.enter('codeRight')
                effects.consume(code)
                effects.exit('codeRight')
                return right
            }
            if (sizeRight != 2) {
                return nok(code)
            }
            console.log('right =>', code)
            if (null === code || 0 > code) {
                effects.exit('codeBlock')
                return ok(code)
            }
            return nok(code)
        }

    }

}