/**
 * Typography — Reusable text component with variant-based styling.
 *
 * Usage:
 *   <Typography variant="h1" weight="bold">Page Title</Typography>
 *   <Typography variant="body" color="muted">Description text</Typography>
 *   <Typography variant="overline" className="uppercase">CATEGORY</Typography>
 */

const variantConfig = {
  h1: {
    element: 'h1',
    className: 'font-display text-headline-lg',
  },
  h2: {
    element: 'h2',
    className: 'font-display text-headline-md',
  },
  h3: {
    element: 'h3',
    className: 'font-display text-title',
  },
  h4: {
    element: 'h4',
    className: 'font-display text-body-lg font-medium',
  },
  body: {
    element: 'p',
    className: 'font-body text-body-md',
  },
  'body-sm': {
    element: 'p',
    className: 'font-body text-body-sm',
  },
  'body-lg': {
    element: 'p',
    className: 'font-body text-body-lg',
  },
  caption: {
    element: 'span',
    className: 'font-body text-caption',
  },
  overline: {
    element: 'span',
    className: 'font-body text-overline uppercase tracking-wider',
  },
  label: {
    element: 'span',
    className: 'font-body text-label-md',
  },
};

const weightMap = {
  light: 'font-light',
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const colorMap = {
  default: 'text-neutral-900',
  muted: 'text-neutral-500',
  secondary: 'text-neutral-600',
  primary: 'text-primary-600',
  accent: 'text-accent-600',
  highlight: 'text-highlight-600',
  white: 'text-white',
  inherit: 'text-inherit',
};

const Typography = ({
  variant = 'body',
  weight,
  color = 'default',
  as,
  className = '',
  children,
  ...props
}) => {
  const config = variantConfig[variant] || variantConfig.body;
  const Tag = as || config.element;

  const classes = [
    config.className,
    weight ? weightMap[weight] : '',
    colorMap[color] || '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
};

export default Typography;
