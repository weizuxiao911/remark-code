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
export function codeFromMarkdown(): FromMarkdownExtension;
/**
 *
 * Create an extension for `mdast-util-to-markdown`.
 *
 * @returns {ToMarkdownExtension}
 * Extension for `mdast-util-to-markdown`.
 */
export function codeToMarkdown(): ToMarkdownExtension;
export type CompileContext = import('mdast-util-from-markdown').CompileContext;
export type FromMarkdownExtension = import('mdast-util-from-markdown').Extension;
export type FromMarkdownHandle = import('mdast-util-from-markdown').Handle;
export type ToMarkdownExtension = import('mdast-util-to-markdown').Options;
/**
 * /
 *
 * /**
 *
 * Create an extension for `mdast-util-from-markdown`.
 */
export type ToMarkdownHandle = import('mdast-util-to-markdown').Handle;
