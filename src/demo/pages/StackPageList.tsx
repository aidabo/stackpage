"use client";
import { gridOptions, PageProps } from "@/lib/components/stackoptions";
import { useState, useEffect } from "react";
import {
  PencilIcon,
  EyeIcon,
  PlusIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { PageInfoDialog } from "@/demo/components/PageInfoDialog";
import { useNavigate } from "react-router-dom";
import useLayoutStore from "@/demo/api";

export default function StackPageList() {
  const [pages, setPages] = useState<PageProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageProps | null>(null);
  const navigate = useNavigate();

  const { getPageList, updatePage, deletePage, insertPage } = useLayoutStore();

  //provides image upload function
  const uploadImage: any = null;

  const handleCreate = () => {
    setCurrentPage(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (pageid: string) => {
    const pageToEdit = pages.find((page) => page.id === pageid);
    if (pageToEdit) {
      setCurrentPage(pageToEdit);
      setIsDialogOpen(true);
    }
  };

  const handleOpen = (pageid: string) => {
    const pageToEdit = pages.find((page) => page.id === pageid);
    if (pageToEdit) {
      setCurrentPage(pageToEdit);
      navigate(`/edit/${pageToEdit.id}`);
    }
  };

  const handleDelete = async (pageid: string) => {
    if (window.confirm("Are you sure you want to delete this page?")) {
      try {
        await deletePage(pageid);
        setPages(pages.filter((page) => page.id !== pageid));
        setCurrentPage(null);
      } catch (error) {
        console.error("Failed to delete page:", error);
      }
    }
  };

  const handleView = (pageid: string) => {
    navigate(`/view/${pageid}`);
  };

  const handleImageUpload = async (file: File) => {
    try {
      if (uploadImage) {
        const imageUrl = await uploadImage(file);
        return imageUrl;
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      //throw error;
    }
  };

  // Change the handleDialogSubmit function
  const handleDialogSubmit = async (data: { title: string; image: string }) => {
    if (currentPage) {
      const updatedPage = {
        ...currentPage,
        title: data.title,
        image: data.image,
      };
      setCurrentPage(updatedPage);
      await updatePage(updatedPage);
    } else {
      await insertPage({
        type: "page",
        id: `page-${Date.now()}`,
        status: "draft",
        title: data.title,
        image: data.image,
        layout: gridOptions
      });
    }
    // close dialog
    setIsDialogOpen(false);
    // Refresh page list
    setPages(await getPageList());
  };

  useEffect(() => {
    const fetchPages = async () => {
      if (!getPageList) return;
      setLoading(true);
      try {
        const result: any = await getPageList();
        if (result !== false) {
          setPages(result);
        }
      } catch (error) {
        console.error("Failed to load pages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  return (
    <>
      <div className="w-full p-4">
        {/* Header Section */}
        <div className="flex justify-end items-center mb-6">
          <h2 className="text-xl font-semibold flex-grow">
            Pages ({pages.length})
          </h2>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Create New Page</span>
          </button>
        </div>

        <hr className="border-gray-300 mb-6" />

        {/* Page List */}
        <div className="bg-gray-50 p-4 rounded-lg">
          {pages.map((page: PageProps) => (
            <div key={page.id} className="mb-4 last:mb-0">
              <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 w-full">
                  <img
                    src={page.image || "/assets/page.svg"}
                    alt={page.title}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="text-sm text-gray-500 w-1/4 truncate">
                    {page.id}
                  </div>
                  <div className="font-medium truncate flex-grow">
                    <div className="flex flex-row items-center">
                      <div>{page.title}</div>
                      <div>
                        <button
                          onClick={() => handleEdit((page as any).id)}
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"
                          aria-label="Open"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpen((page as any).id)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"
                      aria-label="Edit"
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleView((page as any).id)}
                      className="p-2 text-green-500 hover:bg-green-50 rounded-full"
                      aria-label="View"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete((page as any).id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                      aria-label="Delete"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
              <hr className="border-gray-200 mt-4" />
            </div>
          ))}
        </div>
      </div>

      {isDialogOpen && (
        <PageInfoDialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSubmit={handleDialogSubmit}
          initialData={(currentPage || undefined) as any}
          onImageUpload={uploadImage ? handleImageUpload : undefined}
        />
      )}
    </>
  );
}
