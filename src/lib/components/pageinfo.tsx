import { useEffect, useState } from "react";
import { GridStackOptions, GridStackWidget } from "gridstack";

export function PageInfo(
  {pageInfo}: 
  {pageInfo: any
}) {
  const [layout, setLayout] = useState<
    GridStackOptions | GridStackWidget[] | undefined
  >(undefined);

  useEffect(() => {
    if (pageInfo) {
      setLayout(pageInfo);
    }
  }, [pageInfo]);

  return (
    <div>
      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(2, 1fr)",
        }}
      >
        <div id="pageinfo">
          <pre
            style={{
              backgroundColor: "#f3f4f6",
              padding: "1rem",
              borderRadius: "0.25rem",
              overflow: "auto",
            }}
          >
            {JSON.stringify(layout || {}, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
