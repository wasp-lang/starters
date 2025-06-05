import React from "react";

export function usePortalContainer() {
  const [container, setContainer] = React.useState<HTMLElement | null>(null);
  const id = React.useId();

  React.useEffect(() => {
    const el = document.createElement("div");
    el.id = `portal-container-${id}`;

    document.body.appendChild(el);
    setContainer(el);

    return () => {
      document.body.removeChild(el);
    };
  }, []);

  return container;
}
