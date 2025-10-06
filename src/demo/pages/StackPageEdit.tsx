import StackPage from "@/lib/components/stackpage";
import { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { componentMapProvider, componentPropsProvider } from "@/demo/components/MyComponents";
import {
  PageProps,
  SaveLayoutFn,
  LoadLayoutFn,
  GoBackListFn,
} from "../../lib/components/stackoptions";

import useLayoutStore from "@/demo/api"

function StackPageEdit(props: {mode: string}) {
  const { pageid } = useParams<{ pageid: string }>();
  const [currentPageid, setCurrentPageid] = useState(pageid || "");
 const [searchParams, setSearchParams] = useSearchParams();
  const [mode, setMode] = useState<"edit" | "preview" | "view">(searchParams.get('mode') as any || "edit");
  const { savePage, getPageById } = useLayoutStore();
  const navigate = useNavigate();

  const saveLayout: SaveLayoutFn = async (
    pageid: string,
    pageProps: PageProps
  ) => {
    await savePage(pageProps);
    if (pageid !== pageProps.id) {
      navigate(`/edit/${pageProps.id}`);
    }
  };

  const loadLayout: LoadLayoutFn = async (
    pageid: string
  ): Promise<PageProps> => {
    setCurrentPageid(pageid);
    const page: any = await getPageById(pageid);
    if (page === false) {
      console.log("new page created: " + pageid);
    }
    return page;
  };

  const gobackList: GoBackListFn = () => {
    navigate("/");
  };

  return (
    <StackPage
      pageid={currentPageid as string}
      pageMode={mode as any}
      onSaveLayout={saveLayout}
      onLoadLayout={loadLayout}
      componentMapProvider={componentMapProvider}
      componentPropsProvider={componentPropsProvider}
      gobackList={gobackList}
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
