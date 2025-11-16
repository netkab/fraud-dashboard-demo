export function Card({ className = "", ...props }) {
  return (
    <div
      className={`rounded-xl border bg-white text-slate-900 shadow-sm ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className = "", ...props }) {
  return <div className={`p-4 pb-2 ${className}`} {...props} />;
}

export function CardTitle({ className = "", ...props }) {
  return (
    <h3
      className={`text-sm font-semibold leading-none tracking-tight ${className}`}
      {...props}
    />
  );
}

export function CardContent({ className = "", ...props }) {
  return <div className={`p-4 pt-0 ${className}`} {...props} />;
}
