import { PageProps } from "@/lib/components/stackoptions";

const webApiUrl = "/api";

const apiJsonHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const dataUrl = `${webApiUrl}/pages`;

export default function layoutStore() {

  async function getPageList(): Promise<PageProps[]> {
    console.log("useSimpleLayoutStore...");
    try {
      const response = await fetch(`${dataUrl}`, {
        method: "GET",
        headers: apiJsonHeaders,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = (await response.json()) as PageProps[];
      return data;
    } catch {
      //console.error("fetchPageList error:", error);
      return [];
    }
  }

  async function getPageById(pageId: string): Promise<PageProps | boolean> {
    try {
      console.log("getPageById............");
      const response = await fetch(`${dataUrl}/${pageId}`, {
        method: "GET",
        headers: apiJsonHeaders,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = (await response.json()) as PageProps;
      return data;
    } catch (error) {
      console.error("getPageById error:", error);
      return false;
    }
  }

  async function exists(pageId: string): Promise<boolean> {
    const result = await getPageById(pageId);
    return result != null && result !== false;
  }

  async function savePage(data: PageProps): Promise<PageProps | boolean> {
    if (!(await exists(data.id))) {
      return await insertPage(data);
    } else {
      return await updatePage(data);
    }
  }

  async function insertPage(data: PageProps): Promise<PageProps | boolean> {
    try {
      const response = await fetch(`${dataUrl}`, {
        method: "POST",
        headers: apiJsonHeaders,
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return (await response.json()) as PageProps;
    } catch (error) {
      console.error("insertPage error:", error);
      return false;
    }
  }

  async function updatePage(data: PageProps): Promise<PageProps | boolean> {
    try {
      const response = await fetch(`${dataUrl}/${data.id}`, {
        method: "PUT",
        headers: apiJsonHeaders,
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return (await response.json()) as PageProps;
    } catch (error) {
      console.error("updatePage error:", error);
      return false;
    }
  }

  async function deletePage(pageId: string): Promise<PageProps | boolean> {
    try {
      const response = await fetch(`${dataUrl}/${pageId}`, {
        method: "DELETE",
        headers: apiJsonHeaders,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return (await response.json()) as PageProps;
    } catch (error) {
      console.error("deletePage error:", error);
      return false;
    }
  }

  return { getPageList, getPageById, savePage, updatePage, insertPage, deletePage}

}
