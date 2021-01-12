# markdown-it-block
A [markdown-it](https://github.com/markdown-it/markdown-it) plugin
to write block tag.

Still work in progress.

## Syntax
```markdown
::: tag
inline or block
:::
```
will become
```html
<tag>
inline or block
</tag>
```

Note that the first `p` is hidden.

If you want the first `p` present, you should use plain html instead.
```markdown
<tag>

inline or block
</tag>
```

## Usage
```js
const md = require('markdown-it')();
const mbt = require('@sup39/markdown-it-block-tag');

console.log(md.use(mbt).render(`
::: div
- a
- b
:::
`));
```
Expected output:
```html
<div>
<ul>
<li>a</li>
<li>b</li>
</ul>
</div>
```

## TODO
### nested / contiguous block tag
```markdown
:: ul
::: li
item1
::: li
item2
::: li
item3
::
```
should become
```html
<ul>
<li>
item1
</li>
<li>
item2
</li>
<li>
item3
</li>
</ul>
```
