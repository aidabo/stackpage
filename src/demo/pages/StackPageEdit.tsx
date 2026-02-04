import StackPage from "@/lib/components/stackpage";
import { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import {
  componentMapProvider,
  componentPropsProvider,
} from "@/demo/components/MyComponents";
import {
  PageProps,
  SaveLayoutFn,
  LoadLayoutFn,
  GoBackListFn,
} from "@/lib/components/stackoptions";

import useLayoutStore from "@/demo/api";

function StackPageEdit() {
  const { pageid } = useParams<{ pageid: string }>();
  const [currentPageid, setCurrentPageid] = useState(pageid || "");
  const [searchParams, setSearchParams] = useSearchParams();
  const [mode, setMode] = useState<"edit" | "preview" | "view">(
    (searchParams.get("mode") as any) || "edit",
  );
  const { savePage, getPageById } = useLayoutStore();
  const navigate = useNavigate();

  /**
   * save layout
   * @param pageid
   * @param pageProps
   */
  const saveLayout: SaveLayoutFn = async (pageProps: PageProps) => {
    await savePage(pageProps);
  };

  /**
   * load layout
   * @param pageid
   * @returns
   */
  const loadLayout: LoadLayoutFn = async (
    pageid: string,
  ): Promise<PageProps> => {
    setCurrentPageid(pageid);
    const page: any = await getPageById(pageid);
    if (page === false) {
      console.log("new page created: " + pageid);
    }
    return page;
  };

  /**
   * go back to list
   */
  const gobackList: GoBackListFn = () => {
    navigate("/");
  };

  // API Call handler
  const handleApiCall = async (
    endpoint: string,
    method = "GET",
    data?: any,
  ) => {
    try {
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: data ? JSON.stringify(data) : undefined,
      });

      if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API call error:", error);
      throw error;
    }
  };

  // Custom action handler
  const handleCustomAction = async (action: string, data: any) => {
    switch (action) {
      case "generateId":
        return `id-${Math.random().toString(36).substr(2, 9)}`;

      case "currentTimestamp":
        return new Date().toISOString();

      case "uppercase":
        return typeof data === "string" ? data.toUpperCase() : data;

      case "lowercase":
        return typeof data === "string" ? data.toLowerCase() : data;

      default:
        throw new Error(`Unknown action: ${action}`);
    }
  };

  // Dynamic select options handler
  const handleGetSelectOptions = async (
    propertyName: string,
    componentType: string,
  ): Promise<string[]> => {
    // You can customize this based on your component types and properties
    const optionsMap: Record<string, Record<string, string[]>> = {
      Text: {
        alignment: ["left", "center", "right", "justify"],
        fontSize: ["small", "medium", "large", "x-large"],
        fontWeight: ["normal", "bold", "lighter", "bolder"],
        textTransform: ["none", "capitalize", "uppercase", "lowercase"],
      },
      Button: {
        variant: [
          "primary",
          "secondary",
          "danger",
          "success",
          "warning",
          "info",
        ],
        size: ["small", "medium", "large"],
        type: ["button", "submit", "reset"],
      },
      Card: {
        type: ["standard", "featured", "highlighted", "bordered", "shadow"],
        shadow: ["none", "small", "medium", "large"],
        padding: ["none", "small", "medium", "large"],
      },
      Image: {
        objectFit: ["contain", "cover", "fill", "none", "scale-down"],
        layout: ["responsive", "fixed", "intrinsic", "fill"],
      },
    };

    // Return options from the map or default options
    return (
      optionsMap[componentType]?.[propertyName] || [
        "option1",
        "option2",
        "option3",
      ]
    );
  };

  // const componentProps = {
  //   Event: {
  //     title: "Conference",
  //     date: "2024-12-25", // Will show as date-only
  //     startTime: "2024-12-25T09:00:00Z", // Will show as datetime
  //     endTime: "2024-12-25T17:00:00Z", // Will show as datetime
  //   },
  //   Article: {
  //     title: "Breaking News",
  //     publishedDate: "2024-06-15", // Will show as date-only
  //     createdAt: "2024-06-15T14:30:00Z", // Will show as datetime
  //     updatedAt: "2024-06-16T10:15:00Z", // Will show as datetime
  //   },
  //   Task: {
  //     name: "Complete project",
  //     dueDate: "2024-07-01", // Will show as date-only
  //     reminder: "2024-06-30T09:00:00Z", // Will show as datetime
  //   },
  // };

  return (
    <StackPage
      pageid={currentPageid as string}
      pageMode={mode as any}
      onSaveLayout={saveLayout}
      onLoadLayout={loadLayout}
      componentMapProvider={componentMapProvider}
      componentPropsProvider={componentPropsProvider}
      gobackList={gobackList}
      onCustomAction={handleCustomAction as any}
    >
      {/* Additional custom content can go here */}
      {(mode as any) === "edit" && (
        <div className="mb-6 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2 text-center">
            Created by 60-think.com
          </h3>
        </div>
      )}
    </StackPage>
  );
}

export default StackPageEdit;
