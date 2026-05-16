"use client";
import { gridOptions, PageProps } from "@/lib/components/stackoptions";
import { useState, useEffect } from "react";
import {
  PencilIcon,
  EyeIcon,
  PlusIcon,
  TrashIcon,
  PencilSquareIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { PageInfoDialog } from "@/demo/components/PageInfoDialog";
import { useNavigate } from "react-router-dom";
import useLayoutStore from "@/demo/api";
import { useT } from "@/lib/components/StackI18nProvider";

export default function StackPageList() {
  const t = useT();
  const [pages, setPages] = useState<PageProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageProps | null>(null);
  const navigate = useNavigate();
  const demoPages = [
    {
      id: "page-jsonserver-demo",
      title: "JSON Server datasource",
      description: "Simple API-backed page with bindings and runtime fixture data.",
      accent: "blue",
      tags: ["data-driven", "bindings"],
    },
    {
      id: "page-business-ops-demo",
      title: "Sales pipeline workspace",
      description: "CRM-style opportunity pipeline with filters, stage control, and review follow-up.",
      accent: "emerald",
      tags: ["workflow", "events"],
    },
    {
      id: "page-business-chain-demo",
      title: "Business chain scenario",
      description: "One deal flowing through stage, review, outcome, and receiver panels.",
      accent: "indigo",
      tags: ["chain", "receiver"],
    },
    {
      id: "page-fold-post-demo",
      title: "Content review workspace",
      description: "One-level accordion queue with shared-state selection, a receiver card, and a short history trail.",
      accent: "amber",
      tags: ["navigation", "receiver", "history"],
    },
    {
      id: "page-lifecycle-demo",
      title: "Lifecycle event demo",
      description: "Watch page and widget lifecycle events while the runtime mounts widgets.",
      accent: "violet",
      tags: ["lifecycle", "runtime"],
    },
    {
      id: "page-media-showcase-demo",
      title: "Media + location showcase",
      description: "Inquiry, list/detail, slider, and map cards in a polished business layout.",
      accent: "rose",
      tags: ["media", "location", "gallery"],
    },
    {
      id: "page-realestate-showcase-demo",
      title: t("Japan real-estate showcase"),
      description: t("Compare sale and rent properties in one calm hub."),
      accent: "orange",
      tags: ["real-estate", "compare", "hub"],
    },
    {
      id: "page-realestate-sale-demo",
      title: t("Japan property sale"),
      description: t("A buyer-focused entry with price, access, and showing guidance."),
      accent: "rose",
      tags: ["sale", "buyer", "showing"],
    },
    {
      id: "page-realestate-rent-demo",
      title: t("Japan property rent"),
      description: t("A renter-focused entry with budget, move-in timing, and station access."),
      accent: "blue",
      tags: ["rent", "tenant", "budget"],
    },
  ];
  const scenarioLinks = [
    {
      label: "Load data fixtures",
      description: "Open the API-backed datasource demo.",
      pageId: "page-jsonserver-demo",
      accent: "blue",
      mode: "data-driven",
    },
    {
      label: "Run workflow chain",
      description: "Open the chained business scenario demo.",
      pageId: "page-business-chain-demo",
      accent: "indigo",
      mode: "workflow-driven",
    },
    {
      label: "Check runtime lifecycle",
      description: "Open the lifecycle event demo.",
      pageId: "page-lifecycle-demo",
      accent: "violet",
      mode: "lifecycle-driven",
    },
    {
      label: "Open media showcase",
      description: "Open the polished media and location demo.",
      pageId: "page-media-showcase-demo",
      accent: "rose",
      mode: "media-driven",
    },
  ];

  const realEstateEntryPoints = [
    {
      title: t("Find a property to buy"),
      description: t("A buying entry focused on price, access, and showing details."),
      pageId: "page-realestate-sale-demo",
      accent: "rose",
      mode: "sale-driven",
      label: t("Sale entry"),
      chips: [t("Japanese-friendly"), t("Price"), t("Access")],
    },
    {
      title: t("Find a property to rent"),
      description: t("A renting entry focused on budget, move-in timing, and station access."),
      pageId: "page-realestate-rent-demo",
      accent: "blue",
      mode: "rent-driven",
      label: t("Rent entry"),
      chips: [t("Japanese-friendly"), t("Budget"), t("Move-in timing")],
    },
    {
      title: t("Compare the full showcase"),
      description: t("A guide page that compares sale and rent in one place."),
      pageId: "page-realestate-showcase-demo",
      accent: "orange",
      mode: "property-driven",
      label: t("Comparison hub"),
      chips: [t("Compare"), t("Overview"), t("Nearby")],
    },
  ];

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

  const fileToDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () =>
        reject(new Error(`Failed to read file for local preview: ${file.name}`));
      reader.readAsDataURL(file);
    });

  const resolveUploadedUrl = (value: any): string => {
    if (!value) return "";
    if (typeof value === "string") return value.trim();
    const direct = String(value?.remoteUrl || value?.url || "").trim();
    if (direct) return direct;
    const nested = String(value?.data?.remoteUrl || value?.data?.url || "").trim();
    return nested;
  };

  const handleImageUpload = async (file: File) => {
    try {
      if (uploadImage) {
        const uploadResult = await uploadImage(file);
        console.log("[StackPageList] uploadResult", uploadResult);
        const imageUrl = resolveUploadedUrl(uploadResult);
        console.log("[StackPageList] resolved remoteUrl", {
          fileName: file.name,
          remoteUrl: imageUrl,
        });
        if (imageUrl) return imageUrl;
        throw new Error("Upload returned empty URL");
      }
      console.warn("[StackPageList] uploadImage handler is not configured, fallback to local data URL");
      const localDataUrl = await fileToDataUrl(file);
      console.log("[StackPageList] local preview URL generated", {
        fileName: file.name,
        size: file.size,
      });
      return localDataUrl;
    } catch (error) {
      console.error("Image upload failed:", error);
      //throw error;
    }
    return "";
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
        {/* Demo Gallery */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                StackPage demo gallery
              </p>
              <h2 className="mt-1 text-2xl font-semibold text-slate-900">
                Click a card to open a demo page
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Use the cards below to jump straight into the created demos, then switch between edit and view to test runtime behavior.
              </p>
            </div>
            <div className="text-sm text-slate-500">
              {pages.length} saved page(s)
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              Data-driven
            </span>
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              Workflow-driven
            </span>
            <span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
              Lifecycle-driven
            </span>
          </div>

          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Scenario selector
                  </div>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Fast paths
                  </span>
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  Click a lane below to jump straight to the matching demo page.
                </div>
              </div>
              <div className="text-xs text-slate-500">
                Ready-made test paths
              </div>
            </div>
            <div className="mt-4 overflow-hidden rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 p-4 shadow-sm">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                      Direct chain flow
                    </div>
                    <span className="rounded-full border border-indigo-200 bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-700">
                      Featured
                    </span>
                  </div>
                  <div className="mt-1 text-lg font-semibold text-slate-900">
                    Open the business chain demo in view mode
                  </div>
                  <p className="mt-1 text-sm text-slate-600">
                    Jump directly into the live chain runbook without landing in edit mode first.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate("/view/page-business-chain-demo")}
                  className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                  Open chain view
                </button>
              </div>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {scenarioLinks.map((scenario) => (
                <div
                  key={scenario.pageId}
                  className={`rounded-xl border p-4 text-left transition hover:shadow-sm ${
                    scenario.accent === "indigo"
                      ? "border-indigo-200 bg-indigo-50"
                      : scenario.accent === "violet"
                        ? "border-violet-200 bg-violet-50"
                        : scenario.accent === "rose"
                          ? "border-rose-200 bg-rose-50"
                          : scenario.accent === "orange"
                            ? "border-orange-200 bg-orange-50"
                          : "border-blue-200 bg-blue-50"
                  }`}
                >
                  <div className="text-sm font-semibold text-slate-900">
                    {scenario.label}
                  </div>
                  <div
                    className={`mt-2 inline-flex items-center rounded-full px-2 py-1 text-[11px] font-medium ${
                      scenario.accent === "indigo"
                        ? "bg-indigo-100 text-indigo-700"
                        : scenario.accent === "violet"
                          ? "bg-violet-100 text-violet-700"
                          : scenario.accent === "rose"
                            ? "bg-rose-100 text-rose-700"
                            : scenario.accent === "orange"
                              ? "bg-orange-100 text-orange-700"
                          : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {scenario.mode}
                  </div>
                  <p className="mt-1 text-sm text-slate-600">
                    {scenario.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full bg-white/80 px-2 py-1 text-[11px] font-medium text-slate-600">
                      {scenario.pageId}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => navigate(`/edit/${scenario.pageId}`)}
                      className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white hover:bg-slate-800"
                    >
                      Open edit
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate(`/view/${scenario.pageId}`)}
                      className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Open view
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-rose-200 bg-gradient-to-br from-rose-50 via-white to-orange-50 p-4 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-600">
                    日本の不動産入口
                  </div>
                  <span className="rounded-full border border-rose-200 bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-rose-700">
                    売買 / 賃貸
                  </span>
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  日本語を基本に、売買・賃貸・比較の入口を先に選べるようにしています。中文のお客様にも流れが分かるよう、見出しはシンプルにしています。
                </div>
              </div>
              <div className="text-xs text-slate-500">
                売買・賃貸・比較の3ルート
              </div>
            </div>
            <div className="mt-4 grid gap-3 lg:grid-cols-3">
              {realEstateEntryPoints.map((entry) => (
                <div
                  key={entry.pageId}
                  className={`rounded-2xl border p-4 shadow-sm transition hover:shadow-md ${
                    entry.accent === "rose"
                      ? "border-rose-200 bg-white"
                      : entry.accent === "blue"
                        ? "border-blue-200 bg-white"
                        : "border-orange-200 bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        {entry.label}
                      </div>
                      <h3 className="mt-1 text-lg font-semibold text-slate-900">{entry.title}</h3>
                      <p className="mt-1 text-sm text-slate-600">{entry.description}</p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${
                        entry.accent === "rose"
                          ? "bg-rose-50 text-rose-700"
                          : entry.accent === "blue"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-orange-50 text-orange-700"
                      }`}
                    >
                      {entry.mode}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {entry.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-600"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => navigate(`/edit/${entry.pageId}`)}
                      className={`rounded-lg px-3 py-2 text-xs font-medium text-white transition ${
                        entry.accent === "rose"
                          ? "bg-rose-600 hover:bg-rose-700"
                          : entry.accent === "blue"
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-orange-600 hover:bg-orange-700"
                      }`}
                    >
                      Open edit
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate(`/view/${entry.pageId}`)}
                      className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Open view
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-blue-100 bg-white/80 p-4">
              <div className="text-xs uppercase tracking-wide text-blue-600">Data lane</div>
              <div className="mt-1 text-lg font-semibold text-slate-900">API + bindings</div>
              <p className="mt-1 text-sm text-slate-600">
                Verify json-server loading and datasource bindings with the simplest demo page.
              </p>
            </div>
            <div className="rounded-xl border border-emerald-100 bg-white/80 p-4">
              <div className="text-xs uppercase tracking-wide text-emerald-600">Workflow lane</div>
              <div className="mt-1 text-lg font-semibold text-slate-900">Events + outcomes</div>
              <p className="mt-1 text-sm text-slate-600">
                Test selection, stage transitions, review branches, and post-review outcomes.
              </p>
            </div>
            <div className="rounded-xl border border-violet-100 bg-white/80 p-4">
              <div className="text-xs uppercase tracking-wide text-violet-600">Lifecycle lane</div>
              <div className="mt-1 text-lg font-semibold text-slate-900">Runtime bootstrap</div>
              <p className="mt-1 text-sm text-slate-600">
                Watch page and widget lifecycle events while the page mounts and unmounts widgets.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {demoPages.map((demo) => {
              const matchedPage = pages.find((page) => page.id === demo.id);
              const available = Boolean(matchedPage);
              return (
                <div
                  key={demo.id}
                  className={`rounded-xl border p-4 transition ${
                    demo.accent === "emerald"
                      ? "border-emerald-200 bg-emerald-50"
                      : demo.accent === "indigo"
                        ? "border-indigo-200 bg-indigo-50"
                      : demo.accent === "violet"
                        ? "border-violet-200 bg-violet-50"
                        : "border-blue-200 bg-blue-50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        {available ? "Available" : "Missing"}
                      </div>
                      <h3 className="mt-1 text-lg font-semibold text-slate-900">
                        {demo.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-700">
                        {demo.description}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-[11px] font-medium ${
                        demo.accent === "emerald"
                          ? "bg-emerald-100 text-emerald-700"
                          : demo.accent === "indigo"
                            ? "bg-indigo-100 text-indigo-700"
                          : demo.accent === "violet"
                            ? "bg-violet-100 text-violet-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {demo.id}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {demo.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-full px-2 py-1 text-[11px] font-medium ${
                          demo.accent === "emerald"
                            ? "bg-emerald-100 text-emerald-700"
                            : demo.accent === "indigo"
                              ? "bg-indigo-100 text-indigo-700"
                            : demo.accent === "violet"
                              ? "bg-violet-100 text-violet-700"
                              : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => navigate(`/edit/${demo.id}`)}
                      disabled={!available}
                      className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <PencilSquareIcon className="h-4 w-4" />
                      Open edit
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate(`/view/${demo.id}`)}
                      disabled={!available}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <EyeIcon className="h-4 w-4" />
                      Open view
                    </button>
                    <span className="inline-flex items-center gap-2 rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-slate-500">
                      <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                      Demo shortcut
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

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
          onImageUpload={handleImageUpload}
        />
      )}
    </>
  );
}
