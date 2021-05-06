import React, { FC } from 'react';
import marked from 'marked';
import hljs from 'highlight.js';

export interface MarkdownProps {
  source?: string;
}

export const Markdown: FC<MarkdownProps> = ({ source = '' }) => {
  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: (code: string, language: string) => {
      const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
      return hljs.highlight(validLanguage, code).value;
    },
    pedantic: false,
    gfm: true,
    breaks: true,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
  });

  const html = marked(source);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};
