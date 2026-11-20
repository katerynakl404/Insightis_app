CodeBlock from @devart/ui-react. Use via `window.DevartUI.CodeBlock` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

A block of code with Copy built in. `code` is the text shown and the text
copied — one source, so the two cannot drift.

```jsx
<CodeBlock code={config} />
```

`size="sm"` is the inline rung — a one-line command inside a card or a step.
Copy needs a `TooltipProvider` above it, like every tooltip in the package.

## Anatomy

| Slot | `data-slot` | What it is |
|---|---|---|
| Frame | `code-block` | border, Surface/Page, mono type; clips its parts to the radius |
| Header | `code-block-header` | optional bar on Surface/Card, with Copy at its end |
| Body | `code-block-body` | the `<pre>`: padding, scrolling, wrapping |
| Gutter | `code-block-gutter` | optional line numbers, Ink/Inactive |

## Header

`header` takes whatever the caller wants said about the code — a language
glyph and a label, a file name, a status `Badge`. Pass the parts as siblings:
a direct `<svg>` child is sized to 14px, and the items sit 6px apart. Copy
moves into the bar and is pushed to its end; it stays where it was without a
header, 8px from the top and the end of the block.

```jsx
<CodeBlock
  code={output}
  header={
    <>
      Output
      <Badge variant="green" size="sm">Done</Badge>
    </>
  }
/>
```

The header is not where Copy is relabelled — `copyLabel` / `copiedLabel` do
that ("Copy code", "Copy output" when two blocks stand together).

## Long code

| Prop | For | Does |
|---|---|---|
| `lineNumbers` | source | a gutter numbering the lines of `code`, out of the selection (`select-none`) and the accessibility tree (`aria-hidden`) |
| `maxHeight` | anything long | any CSS length (`'14rem'`) or a number of pixels; the body scrolls inside it and the header stays put |
| `wrap` | output read as prose — a log, a traceback | `pre-wrap` with long words broken, instead of scrolling sideways |

`lineNumbers` and `wrap` are not meant together: the gutter counts lines of
`code`, and a wrapped line takes two rows, so the numbers fall out of step.
Source keeps its lines and scrolls; output wraps and is not numbered.

A trailing newline does not add a number — a `<pre>` does not draw it either.

## Error

`variant="error"` tints the body with Feedback/Red-text at the 8% tint step,
laid over the block's own Surface/Page. The border and the header stay as
they are: the header is where the caller names the failure (an `error`
Badge), and the output under it is what failed.

```jsx
<CodeBlock
  variant="error"
  wrap
  code={traceback}
  header={
    <>
      Output
      <Badge variant="error" size="sm">Error</Badge>
    </>
  }
/>
```

## Syntax colours

The package ships the palette, **never a parser**. Which word is a keyword is
the caller's knowledge of the language; the colour it takes is the system's.

| Role | Class | Token | Light | Dark |
|---|---|---|---|---|
| keyword | `text-code-keyword` | `--code-keyword` | Violet-600 `#7C3AED` | Violet-400 `#A78BFA` |
| string | `text-code-string` | `--code-string` | Green-700 `#047857` | Green-500 `#10B981` |
| number | `text-code-number` | `--code-number` | Blue-600 `#2563EB` | Blue-400 `#60A5FA` |
| comment | `text-code-comment italic` | `--code-comment` | Ink/Secondary | Ink/Secondary |

Every pair clears AA on Surface/Page, the block's own fill (light 4.9–5.5:1,
dark 7.1–7.6:1). A comment is Ink/Secondary, not Ink/Inactive: it is
supporting text, not disabled text, and Inactive is 3.3:1. It is italic as
well, so it still reads as a comment without its colour.

### Passing highlighted code

Tokenise `code` however suits, wrap each token in a span with
`codeSyntaxVariants`, and pass the result as `children`. Text between tokens
stays Ink/Body from the block.

```jsx
import { CodeBlock, codeSyntaxVariants } from '@devart/ui-react/CodeBlock';

const tok = (variant, text) => (
  <span className={codeSyntaxVariants({ variant })}>{text}</span>
);

<CodeBlock code={source} lineNumbers header={<>Python</>}>
  {highlight(source) /* your tokens, rendered with tok() */}
</CodeBlock>
```

Two rules hold the contract:

- **`children` renders exactly the text of `code`.** Copy copies `code` and
  the gutter counts its lines; markup that adds or drops a line puts the
  numbers out of step with what is shown.
- **Only the four roles.** Everything else — names, operators, punctuation —
  is plain text in Ink/Body. A fifth colour is a token added here, not a hex
  in the highlighter.

## A run of code

Source and output are two blocks, not one with a divider: each has its own
Copy and its own height.

```jsx
<CodeBlock code={source} lineNumbers maxHeight="14rem" copyLabel="Copy code"
  header={<><PythonIcon />Python</>}>
  {highlighted}
</CodeBlock>
<CodeBlock code={output} wrap maxHeight="12rem" copyLabel="Copy output"
  variant={failed ? 'error' : 'default'}
  header={<>Output<Badge variant={failed ? 'error' : 'green'} size="sm">
    {failed ? 'Error' : 'Done'}</Badge></>}
/>
```
