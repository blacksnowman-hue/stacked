// This component conditionally wraps its children with a wrapper component
export function ConditionalWrapper({ condition, wrapper, children }) {
  return condition ? wrapper(children) : children;
} 