/**
 * @param {MarkdownIt} md
 */
function pluginBlockTag(md) {
  md.block.ruler.before('table', 'block-tag', (state, l0, l1, silent) => {
    const {bMarks, eMarks, src} = state;
    const testTag = l => {
      const line = src.slice(bMarks[l], eMarks[l]);
      if (!line.startsWith(':::')) return null; // TODO
      return line.substring(3).trim();
    };
    const openTag = testTag(l0);
    if (silent) return openTag != null;
    if (openTag == null) return false;

    const re = /[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9]?/;
    const openTagMatch = re.exec(openTag);
    if (!openTagMatch) return false;
    const {0: openTagName, index: openTagIndex0} = openTagMatch;
    const inline = openTag.substring(openTagIndex0+openTagName.length).trim();

    const tokenOpen = state.push('block_tag_open', openTagName, 1);
    tokenOpen.map = [l0, l0+1];
    if (inline) {
      const token = state.push('inline', '', 0);
      token.content = inline;
      token.children = [];
    }

    // inline
    let l = l0+1;
    for (; l<l1; l++) {
      const tag = testTag(l);
      if (tag == null) continue;
      state.md.block.tokenize(state, l0+1, l);
      state.push('block_tag_close', openTagName, -1); // TODO
      state.line = l+1;
      return true;
    }
    return false;
  }, {alt: ['paragraph']});

  md.core.ruler.after('block', 'remove-p', state => {
    state.tokens.forEach((token, i, tokens) => {
      if (token.type !== 'block_tag_open') return;
      const tpO = tokens[i+1];
      const tpC = tokens[i+3];
      if (
        tpO && tpC &&
        tpO.type==='paragraph_open' &&
        tpC.type==='paragraph_close'
      ) {
        tpO.hidden = true;
        tpC.hidden = true;
      }
    });
  });
};

module.exports = pluginBlockTag;
