import React from "react";

export function usePortalContainer() {
  const [container, setContainer] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    const el = document.createElement("div");
    document.body.appendChild(el);
    setContainer(el);

    return () => {
      document.body.removeChild(el);
    };
  }, []);

  return container;
}
