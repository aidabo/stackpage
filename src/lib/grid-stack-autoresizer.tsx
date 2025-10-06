import { useEffect, useRef } from "react";

export function GridStackAutoResizer({ widgetId, children }: {
  widgetId: string;
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const el = container.closest(".grid-stack-item");
    if (!el || !(el as any).gridstackNode?.grid) return;

    const resize = () => {
      const content = el.querySelector(".grid-stack-item-content");
      if (content?.firstElementChild && (el as any).gridstackNode && (el as any).gridstackNode.grid) {
        (el as any).gridstackNode?.grid?.resizeToContent(el);
      }
    };

    const observer = new ResizeObserver(() => resize());
    observer.observe(container);
    resize(); // Initial call

    return () => observer.disconnect();
  }, [widgetId]);

  return (
    <div
      ref={containerRef}
      className="gridstack-measured-container"
      style={{ width: "100%" }}
    >
      {children}
    </div>
  );
}
