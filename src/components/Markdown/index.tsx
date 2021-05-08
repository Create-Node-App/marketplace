import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { Components } from 'react-markdown/src/ast-to-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import gfm from 'remark-gfm';

export interface MarkdownProps {
  source?: string;
}

export const Markdown: FC<MarkdownProps> = ({ source = '' }) => {
  const components = {
    code({ inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter style={materialDark} language={match[1]} PreTag="div" {...props}>
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props} />
      );
    },
  } as Components;

  return (
    <ReactMarkdown components={components} remarkPlugins={[gfm]}>
      {source}
    </ReactMarkdown>
  );
};
