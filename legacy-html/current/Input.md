# Input — current (prod)

Container = `InputGroup`: `border border-border`, `bg-card`/`bg-background`, radius `md`, height per size (md `h-9`/36px), `transition-[border,color,box-shadow]`.
Inner `Input`: `h-full w-full px-1.5 bg-transparent outline-none`, placeholder `content-secondary`.
- Focus: `has-[input:focus-visible]:border-content-primary`.
- Invalid: `border-red/20`, `bg-red/5`, `ring-red/20`, icon `red/60`.
- Disabled: `pointer-events-none cursor-not-allowed` (opacity).
- 04.06: InputGroup added size→text mapping (xs/sm `text-xs`, md+ `text-sm`).
