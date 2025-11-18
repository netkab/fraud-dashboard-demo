import { createContext, useContext, useState } from "react";

const TabsContext = createContext(null);

export function Tabs({
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
  className = "",
}) {
  const initialValue = controlledValue ?? defaultValue;
  const [uncontrolledValue, setUncontrolledValue] = useState(initialValue);
  const isControlled = controlledValue !== undefined;
  const value = controlledValue ?? uncontrolledValue ?? defaultValue;

  const setValue = (next) => {
    if (!isControlled) {
      setUncontrolledValue(next);
    }
    onValueChange?.(next);
  };

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

export function TabsTrigger({ value, children, className = "" }) {
  const ctx = useContext(TabsContext);
  const isActive = ctx.value === value;

  return (
    <button
      onClick={() => ctx.setValue(value)}
      data-state={isActive ? "active" : "inactive"}
      className={className}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className = "" }) {
  const ctx = useContext(TabsContext);
  if (ctx.value !== value) return null;
  return <div className={className}>{children}</div>;
}
