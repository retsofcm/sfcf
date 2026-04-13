// This file exists purely to safelist dynamically constructed tailwind classnames from the CMS
// so that the v4 compiler doesn't strip them during optimization.
export const safelist = [
  'pb-4',
  'grid-cols-1',
  'grid-cols-2',
  'grid-cols-3',
  'grid-cols-4',
  'md:grid-cols-1',
  'md:grid-cols-2',
  'md:grid-cols-3',
  'md:grid-cols-4',
];
