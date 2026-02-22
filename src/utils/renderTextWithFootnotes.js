import parse from 'html-react-parser';

/**
 * Parses text containing footnote references like [1] and wraps them in
 * interactive spans. The caller provides spanProps(footnoteNum) which returns
 * the props (className, event handlers) for each span.
 */
export function renderTextWithFootnotes(text, footnotes = [], spanProps) {
  if (!footnotes || footnotes.length === 0) {
    return parse(text);
  }

  const processedText = text.replace(/\[(\d+)\]/g, (match, num) =>
    `<span data-footnote="${parseInt(num)}">${match}</span>`
  );

  return parse(processedText, {
    replace: (domNode) => {
      if (domNode.type === 'tag' && domNode.name === 'span' && domNode.attribs['data-footnote']) {
        const footnoteNum = parseInt(domNode.attribs['data-footnote']);
        return (
          <span {...spanProps(footnoteNum)}>
            {domNode.children[0]?.data || `[${footnoteNum}]`}
          </span>
        );
      }
    },
  });
}
