# StatusView — current (prod, 04.06)

Centered status / empty-state block. `flex flex-col items-center justify-center text-center`,
radius `lg`, `border` + `bg-card`.
- Icon circle: `size-10` ([&_svg]:size-5) or `size-14` ([&_svg]:size-7), rounded-full.
- Variants: info `bg-primary/10 text-primary`, success `bg-green/10 text-green`,
  error `bg-red/10 text-red`, neutral `bg-accent/40 text-secondary`.
- Sizes: sm `gap-3 px-4 py-6`, md `gap-4 px-4 py-8`, lg `gap-5 px-6 py-12`.
- Layout: column (default) or row.
