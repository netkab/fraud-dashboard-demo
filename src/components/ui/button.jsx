const base =
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-white dark:ring-offset-slate-950 dark:focus-visible:ring-slate-600";

const variants = {
  default:
    "bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200",
  outline:
    "border border-slate-300 bg-white hover:bg-slate-50 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800",
};

const sizes = {
  default: "h-9 px-4 py-2",
  sm: "h-8 px-3 text-xs",
};

export function Button({
  className = "",
  variant = "default",
  size = "default",
  ...props
}) {
  const v = variants[variant] || variants.default;
  const s = sizes[size] || sizes.default;
  return <button className={`${base} ${v} ${s} ${className}`} {...props} />;
}
