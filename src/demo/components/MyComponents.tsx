// MyComponents.tsx
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useT } from "@/lib/components/StackI18nProvider";
import type {
  StackPageComponentProps,
  StackPageEventAction,
  StackPageEventSubscription,
} from "@/lib";

type StackPageRuntimeApi = NonNullable<StackPageComponentProps["__stackpage"]>;

const getByPath = (obj: any, path?: string) => {
  if (!path || path === "$") return obj;
  const normalized = path.startsWith("$.") ? path.slice(2) : path;
  return normalized
    .split(".")
    .reduce((acc: any, key: string) => (acc == null ? undefined : acc[key]), obj);
};

export function reconcileOptimisticSharedStringInputState({
  value,
  pendingValue,
  lastExternalValue,
  externalValue,
}: {
  value: string;
  pendingValue: string | null;
  lastExternalValue: string;
  externalValue: string;
}) {
  if (externalValue === lastExternalValue) {
    return {
      value,
      pendingValue,
      lastExternalValue,
      shouldSetValue: false,
    };
  }

  if (pendingValue !== null) {
    if (externalValue === pendingValue) {
      return {
        value: externalValue,
        pendingValue: null,
        lastExternalValue: externalValue,
        shouldSetValue: true,
      };
    }

    return {
      value,
      pendingValue,
      lastExternalValue: externalValue,
      shouldSetValue: false,
    };
  }

  return {
    value: externalValue,
    pendingValue: null,
    lastExternalValue: externalValue,
    shouldSetValue: externalValue !== value,
  };
}

function useOptimisticSharedStringInputState({
  stackpage,
  key,
  fallback,
}: {
  stackpage?: StackPageRuntimeApi;
  key: string;
  fallback: string;
}) {
  const externalValue = String(stackpage?.getPageState?.(key, fallback) || fallback);
  const [value, setValue] = useState(externalValue);
  const pendingValueRef = useRef<string | null>(null);
  const lastExternalValueRef = useRef(externalValue);

  useEffect(() => {
    const next = reconcileOptimisticSharedStringInputState({
      value,
      pendingValue: pendingValueRef.current,
      lastExternalValue: lastExternalValueRef.current,
      externalValue,
    });

    pendingValueRef.current = next.pendingValue;
    lastExternalValueRef.current = next.lastExternalValue;

    if (next.shouldSetValue) {
      setValue(next.value);
    }
  }, [externalValue, value]);

  const updateValue = useCallback((nextValue: string) => {
    pendingValueRef.current = nextValue;
    setValue(nextValue);
  }, []);

  return {
    value,
    setValue: updateValue,
    externalValue,
  };
}

const DEMO_POST_ITEMS = [
  {
    id: "post-1",
    title: "Building a calm page builder",
    excerpt: "Keep events local and shared state small.",
    body: "Widgets emit simple events. Page state carries only what multiple widgets need to share.",
    category: "Architecture",
  },
  {
    id: "post-2",
    title: "Designing searchable content",
    excerpt: "Search bars should update a shared keyword, not mutate results directly.",
    body: "The search UI updates page state and the result panel derives the list from the same source.",
    category: "Search",
  },
  {
    id: "post-3",
    title: "Form submission with confirmation",
    excerpt: "Ask first, send second, then show the receiver response.",
    body: "The form uses request/response so the sender can show a result after the receiver processes the payload.",
    category: "Form",
  },
];

const DEMO_REGISTRATION_ITEMS = [
  {
    id: "reg-1",
    title: "Alice",
    email: "alice@example.com",
    team: "Product",
  },
  {
    id: "reg-2",
    title: "Lin",
    email: "lin@example.com",
    team: "Design",
  },
];

const DEMO_MEDIA_ITEMS = [
  {
    id: "media-article-1",
    kind: "list",
    title: "Launch story card",
    summary: "A concise editorial card with a detail action for the content team.",
    body: "Use this card when a list item needs to open into a richer detail page.",
    category: "Editorial",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&h=800&fit=crop",
    locationLabel: "Shibuya, Tokyo",
    locationSpotId: "streetview-shibuya",
  },
  {
    id: "media-image-1",
    kind: "image",
    title: "Campaign image card",
    summary: "A crisp image tile with an explicit detail button and strong captioning.",
    body: "Design the card to feel premium and still let the user jump to the detail page.",
    category: "Image",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=800&fit=crop",
    locationLabel: "Meguro, Tokyo",
    locationSpotId: "map-shibuya",
  },
  {
    id: "media-video-1",
    kind: "video",
    title: "Trailer video card",
    summary: "A one-unit video card with a detail route and a built-in action button.",
    body: "Use the same layout language as image cards so the gallery feels coherent.",
    category: "Video",
    video: "https://dnicugzydez8x.cloudfront.net/60-think-prd/2025/09/IMG_2444.mov",
    poster:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=800&fit=crop",
    locationLabel: "Osaka, Japan",
    locationSpotId: "map-shibuya",
  },
  {
    id: "media-image-2",
    kind: "image",
    title: "Portrait detail card",
    summary: "A second image card so the slider and gallery have visual rhythm.",
    body: "Cards should stay clean and balanced even when the content source changes.",
    category: "Portrait",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=1200&h=800&fit=crop",
    locationLabel: "Yokohama, Japan",
    locationSpotId: "streetview-shibuya",
  },
];

const DEMO_LOCATION_SPOTS = [
  {
    id: "streetview-shibuya",
    kind: "streetview",
    title: "Street view snapshot",
    subtitle: "A postcard-style street view card that opens Google Maps panoramic view.",
    locationLabel: "Shibuya Crossing, Tokyo",
    viewpoint: "35.6595,139.7005",
    heading: 170,
    pitch: 8,
    fov: 75,
  },
  {
    id: "map-shibuya",
    kind: "map",
    title: "Map snapshot",
    subtitle: "A clean map card that launches Google Maps map view with the same location.",
    locationLabel: "Shibuya, Tokyo",
    center: "35.6595,139.7005",
    zoom: 16,
  },
] as const;

export const buildGoogleMapsStreetViewUrl = ({
  viewpoint,
  heading = 170,
  pitch = 8,
  fov = 75,
}: {
  viewpoint: string;
  heading?: number;
  pitch?: number;
  fov?: number;
}) =>
  `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${encodeURIComponent(
    viewpoint
  )}&heading=${heading}&pitch=${pitch}&fov=${fov}`;

export const buildGoogleMapsMapUrl = ({
  center,
  zoom = 16,
}: {
  center: string;
  zoom?: number;
}) =>
  `https://www.google.com/maps/@?api=1&map_action=map&center=${encodeURIComponent(
    center
  )}&zoom=${zoom}`;

export const buildMediaDetailPath = (pageId: string, itemId: string) =>
  `/view/${pageId}?item=${encodeURIComponent(itemId)}`;

const DEMO_REAL_ESTATE_ITEMS = [
  {
    id: "property-sale-1",
    kind: "sale",
    title: "Shibuya Residence",
    summary: "Premium condominium with city access, concierge service, and a calm interior.",
    body: "Best for buyers who want a polished urban home close to transit, dining, and office access.",
    category: "For Sale",
    price: "¥128,000,000",
    area: "78.4㎡",
    rooms: "3LDK",
    status: "Featured",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop",
    locationLabel: "Shibuya, Tokyo",
    locationSpotId: "realestate-shibuya",
  },
  {
    id: "property-rent-1",
    kind: "rent",
    title: "Nakameguro Loft",
    summary: "Bright rental loft with a strong work-from-home layout and river access.",
    body: "A rental option for teams or singles who want design, light, and a walkable neighborhood.",
    category: "For Rent",
    price: "¥390,000 / month",
    area: "56.2㎡",
    rooms: "1LDK",
    status: "New",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&h=800&fit=crop",
    locationLabel: "Nakameguro, Tokyo",
    locationSpotId: "realestate-nakameguro",
  },
  {
    id: "property-sale-2",
    kind: "sale",
    title: "Daikanyama Maisonette",
    summary: "A quiet maisonette with video-tour style presentation and boutique interiors.",
    body: "Ideal for buyers seeking a residential feel with a premium neighborhood address.",
    category: "For Sale",
    price: "¥92,000,000",
    area: "64.8㎡",
    rooms: "2LDK",
    status: "Open House",
    video: "https://dnicugzydez8x.cloudfront.net/60-think-prd/2025/09/IMG_2444.mov",
    poster:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&h=800&fit=crop",
    locationLabel: "Daikanyama, Tokyo",
    locationSpotId: "realestate-daikanyama",
  },
  {
    id: "property-rent-2",
    kind: "rent",
    title: "Yokohama Family House",
    summary: "Spacious rental home with parking, storage, and a practical floor plan.",
    body: "A rental home for families who want room to grow without losing location convenience.",
    category: "For Rent",
    price: "¥265,000 / month",
    area: "94.1㎡",
    rooms: "4LDK",
    status: "Popular",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=800&fit=crop",
    locationLabel: "Yokohama, Kanagawa",
    locationSpotId: "realestate-yokohama",
  },
] as const;

const DEMO_REAL_ESTATE_LOCATIONS = [
  {
    id: "realestate-shibuya",
    kind: "streetview",
    title: "Neighborhood Street View",
    subtitle: "Preview the surrounding streets for the selected property.",
    locationLabel: "Shibuya Crossing, Tokyo",
    viewpoint: "35.6595,139.7005",
    heading: 175,
    pitch: 8,
    fov: 75,
  },
  {
    id: "realestate-nakameguro",
    kind: "map",
    title: "Location Map",
    subtitle: "Check the neighborhood map before booking a showing.",
    locationLabel: "Nakameguro, Tokyo",
    center: "35.6412,139.6989",
    zoom: 16,
  },
  {
    id: "realestate-daikanyama",
    kind: "streetview",
    title: "Maisonette Street View",
    subtitle: "Street preview for premium residential streets.",
    locationLabel: "Daikanyama, Tokyo",
    viewpoint: "35.6493,139.7028",
    heading: 160,
    pitch: 6,
    fov: 70,
  },
  {
    id: "realestate-yokohama",
    kind: "map",
    title: "Family home map",
    subtitle: "Open a route-friendly map for family viewing.",
    locationLabel: "Yokohama, Kanagawa",
    center: "35.4437,139.6380",
    zoom: 15,
  },
] as const;

export const buildPropertyDetailPath = (pageId: string, itemId: string) =>
  `/view/${pageId}?item=${encodeURIComponent(itemId)}`;

export const buildRealEstateDetailTransitionPath = (
  pageId: string,
  itemId: string,
  source = "listing-grid"
) =>
  `/view/${pageId}?item=${encodeURIComponent(itemId)}&source=${encodeURIComponent(source)}`;

export const buildRealEstatePropertySelectionEvent = (
  item: {
    id: string;
    kind?: string;
    title?: string;
    locationLabel?: string;
  },
  source = "listing-grid"
) => ({
  id: item.id,
  kind: item.kind || "property",
  title: item.title || item.id,
  locationLabel: item.locationLabel || "",
  source,
});

export const resolveRealEstateDetailItem = (
  items: Array<any>,
  queryItem: string,
  selectedPropertyId?: string
) => {
  const byQuery = items.find((item) => item.id === queryItem) || null;
  if (byQuery) return byQuery;
  const bySelected = selectedPropertyId
    ? items.find((item) => item.id === selectedPropertyId) || null
    : null;
  return bySelected || items[0] || null;
};

export const buildRealEstateInquiryPayload = (
  form: {
    name: string;
    email: string;
    intent: string;
    budget: string;
    area: string;
    message: string;
    submittedAt: string;
  },
  selectedItem?: {
    id: string;
    kind?: string;
    title?: string;
    locationLabel?: string;
  } | null,
  selectedPropertyIdKey = "selectedPropertyId"
) => ({
  ...form,
  selectedPropertyIdKey,
  propertyId: selectedItem?.id || "",
  propertyKind: selectedItem?.kind || "",
  propertyTitle: selectedItem?.title || "",
  propertyLocationLabel: selectedItem?.locationLabel || "",
});

export const getRealEstateAreaProfile = (item?: {
  kind?: string;
  title?: string;
  locationLabel?: string;
  price?: string;
}) => {
  const label = String(item?.locationLabel || "Neighborhood");
  if (label.includes("Shibuya")) {
    return {
      commute: "JR / Metro access",
      walk: "5 min walk to station",
      nearby: ["Transit hub", "Dining", "Shopping"],
      vibe: "Urban and premium",
    };
  }
  if (label.includes("Nakameguro")) {
    return {
      commute: "Tens of cafes nearby",
      walk: "7 min walk to station",
      nearby: ["River walk", "Cafes", "Design studios"],
      vibe: "Creative and calm",
    };
  }
  if (label.includes("Daikanyama")) {
    return {
      commute: "Quiet residential streets",
      walk: "8 min walk to station",
      nearby: ["Boutiques", "Green pockets", "Fine dining"],
      vibe: "Boutique and refined",
    };
  }
  if (label.includes("Yokohama")) {
    return {
      commute: "Family-friendly access",
      walk: "12 min walk to station",
      nearby: ["Park", "Schools", "Supermarket"],
      vibe: "Spacious and practical",
    };
  }
  return {
    commute: "Convenient local access",
    walk: "10 min walk to station",
    nearby: ["Station", "Cafe", "Park"],
    vibe: "Well balanced",
  };
};

export const getRealEstateDetailGuidance = (item?: {
  kind?: string;
  title?: string;
  locationLabel?: string;
  price?: string;
}) => {
  const isRent = item?.kind === "rent";
  if (isRent) {
    return {
      label: "Rental focus",
      accent: "blue",
      title: "For renters",
      summary:
        "Prioritize move-in timing, recurring monthly cost, and the route to the station.",
      priorities: [
        "Monthly budget",
        "Move-in timing",
        "Lease term",
      ],
      checklist: [
        "Confirm monthly budget, deposit, and available move-in date.",
        "Check the walking route and nearby convenience spots.",
        "Use Street View to gauge the street atmosphere before booking a tour.",
      ],
      actionHint: "Renters usually want a quick compare-and-shortlist flow.",
    };
  }
  return {
    label: "Purchase focus",
    accent: "rose",
    title: "For buyers",
    summary:
      "Prioritize financing, renovation potential, and the long-term living fit.",
    priorities: [
      "Loan readiness",
      "Renovation range",
      "Resale fit",
    ],
    checklist: [
      "Confirm floor area, room count, and future renovation room.",
      "Check nearby schools, transit, and resale-friendly neighborhood context.",
      "Use Map and Street View to validate the area before a private showing.",
    ],
    actionHint: "Buyers usually want a calm compare-and-decide flow.",
  };
};

export const getFoldReceiverMetrics = ({
  selectedId,
  selectedItem,
  selectedIdKey,
  historyLength,
}: {
  selectedId: string;
  selectedItem?: any;
  selectedIdKey: string;
  historyLength: number;
}) => {
  const normalizedHistoryLength = Number.isFinite(historyLength)
    ? Math.max(0, historyLength)
    : 0;

  return {
    syncCount: normalizedHistoryLength,
    routeLabel: "fold-select → shared state → receiver",
    lastActionLabel: selectedItem ? `synced ${selectedItem.title}` : "waiting for selection",
    transitionLabel: selectedItem
      ? "fold-select → set-shared-state → emit-event"
      : "waiting for selection",
    selectedIdLabel: selectedId || "—",
    selectedCategoryLabel: selectedItem?.category || "—",
    selectedPathLabel: selectedIdKey,
  };
};

type EventPatternKind =
  | "select_detail"
  | "search_filter"
  | "submit_confirm"
  | "request_bridge";

const EVENT_PATTERN_META: Record<
  EventPatternKind,
  { label: string; description: string; color: string }
> = {
  select_detail: {
    label: "Select → Detail",
    description: "Click a card to update selection and show details.",
    color: "amber",
  },
  search_filter: {
    label: "Search → Results",
    description: "Typing updates the shared keyword and filters the list.",
    color: "blue",
  },
  submit_confirm: {
    label: "Submit → Confirm",
    description: "Confirm first, then send the registration payload.",
    color: "emerald",
  },
  request_bridge: {
    label: "Request → Reply",
    description: "A button sends a request and a receiver returns the result.",
    color: "indigo",
  },
};

const EventPatternBadge = ({
  kind,
}: {
  kind: EventPatternKind;
}): React.JSX.Element => {
  const meta = EVENT_PATTERN_META[kind];
  const classNames: Record<EventPatternKind, string> = {
    select_detail: "bg-amber-50 text-amber-700 border-amber-200",
    search_filter: "bg-blue-50 text-blue-700 border-blue-200",
    submit_confirm: "bg-emerald-50 text-emerald-700 border-emerald-200",
    request_bridge: "bg-indigo-50 text-indigo-700 border-indigo-200",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-1 text-[11px] font-medium ${classNames[kind]}`}
    >
      {meta.label}
    </span>
  );
};

const EventPatternGuide = ({
  title = "Event patterns",
  description = "These are the four demo patterns we use to keep event design simple and repeatable.",
}: {
  title?: string;
  description?: string;
}) => {
  const kinds: EventPatternKind[] = [
    "select_detail",
    "search_filter",
    "submit_confirm",
    "request_bridge",
  ];

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-600 mt-1">{description}</p>
        </div>
        <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          Demo-ready
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        {kinds.map((kind) => (
          <div key={kind} className="rounded border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-center gap-2">
              <EventPatternBadge kind={kind} />
            </div>
            <p className="mt-2 text-xs text-slate-600">
              {EVENT_PATTERN_META[kind].description}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
        <div className="text-xs font-semibold text-slate-700 mb-1">
          Walkthrough
        </div>
        <ol className="list-decimal pl-4 text-xs text-slate-600 space-y-1">
          <li>Select a card or input and watch shared page state change.</li>
          <li>Check the detail/result widget that reacts to the shared value.</li>
          <li>Open the event editor from the Properties tab to inspect rules.</li>
          <li>Use request/response only for asynchronous or confirmed flows.</li>
        </ol>
      </div>
    </div>
  );
};

const DemoFlowSection = ({
  index = "1",
  title = "Section",
  description = "",
  accent = "slate",
}: {
  index?: string;
  title?: string;
  description?: string;
  accent?: "slate" | "amber" | "blue" | "emerald" | "indigo" | "purple" | "rose" | "violet";
}) => {
  const palette: Record<
    NonNullable<typeof accent>,
    { border: string; bg: string; text: string }
  > = {
    slate: { border: "border-slate-200", bg: "bg-slate-50", text: "text-slate-700" },
    amber: { border: "border-amber-200", bg: "bg-amber-50", text: "text-amber-700" },
    blue: { border: "border-blue-200", bg: "bg-blue-50", text: "text-blue-700" },
    emerald: { border: "border-emerald-200", bg: "bg-emerald-50", text: "text-emerald-700" },
    indigo: { border: "border-indigo-200", bg: "bg-indigo-50", text: "text-indigo-700" },
    purple: { border: "border-purple-200", bg: "bg-purple-50", text: "text-purple-700" },
    rose: { border: "border-rose-200", bg: "bg-rose-50", text: "text-rose-700" },
    violet: { border: "border-violet-200", bg: "bg-violet-50", text: "text-violet-700" },
  };
  const p = palette[accent] ?? palette.slate;
  return (
    <div className={`rounded-lg border ${p.border} ${p.bg} px-4 py-3`}>
      <div className="flex items-center gap-3">
        <div className={`h-8 w-8 rounded-full bg-white border ${p.border} flex items-center justify-center text-sm font-semibold ${p.text}`}>
          {index}
        </div>
        <div>
          <div className={`text-sm font-semibold ${p.text}`}>{title}</div>
          {description && <div className="text-xs text-slate-600">{description}</div>}
        </div>
      </div>
    </div>
  );
};

export const LifecycleEventDashboard = ({
  title = "Page + widget lifecycle dashboard",
  description = "Watch page bootstrap and widget mount/unmount events while building the page.",
  watchWidgetId = "",
  maxEntries = 8,
  __stackpage,
}: StackPageComponentProps<{
  title?: string;
  description?: string;
  watchWidgetId?: string;
  maxEntries?: number;
}>) => {
  const [entries, setEntries] = useState<
    Array<{
      lifecycle:
        | "page:init"
        | "page:load"
        | "page:ready"
        | "widget:init"
        | "widget:load"
        | "widget:unmount";
      widgetId: string;
      componentName: string;
      pageId?: string;
      mode?: string;
      resolvedBindingCount?: number;
      totalBindingCount?: number;
      at: string;
    }>
  >([]);
  const [counts, setCounts] = useState<
    Record<
      string,
      {
        componentName: string;
        pageInit: number;
        pageLoad: number;
        pageReady: number;
        widgetInit: number;
        widgetLoad: number;
        widgetUnmount: number;
      }
    >
  >({});

  const createEmptyCounts = (componentName: string) => ({
    componentName,
    pageInit: 0,
    pageLoad: 0,
    pageReady: 0,
    widgetInit: 0,
    widgetLoad: 0,
    widgetUnmount: 0,
  });

  const incrementCounts = (
    widgetId: string,
    componentName: string,
    lifecycle:
      | "page:init"
      | "page:load"
      | "page:ready"
      | "widget:init"
      | "widget:load"
      | "widget:unmount",
  ) => {
    setCounts((prev) => {
      const current = prev[widgetId] || createEmptyCounts(componentName);
      const next = { ...current };

      if (lifecycle === "page:init") next.pageInit += 1;
      if (lifecycle === "page:load") next.pageLoad += 1;
      if (lifecycle === "page:ready") next.pageReady += 1;
      if (lifecycle === "widget:init") next.widgetInit += 1;
      if (lifecycle === "widget:load") next.widgetLoad += 1;
      if (lifecycle === "widget:unmount") next.widgetUnmount += 1;

      return {
        ...prev,
        [widgetId]: next,
      };
    });
  };

  useEffect(() => {
    if (!__stackpage?.subscribe) return;

    const subscribeLifecycle = (
      lifecycle:
        | "page:init"
        | "page:load"
        | "page:ready"
        | "widget:init"
        | "widget:load"
        | "widget:unmount",
    ) =>
      __stackpage.subscribe(lifecycle, (payload: any, meta: any) => {
        const widgetId = payload?.widgetId || meta.sourceWidgetId;
        if (watchWidgetId && widgetId !== watchWidgetId && widgetId !== "__page__") {
          return;
        }
        const componentName = payload?.componentName || widgetId;
        const at = payload?.sentAt || new Date().toISOString();

        setEntries((prev) => [
          {
            lifecycle,
            widgetId,
            componentName,
            pageId: payload?.pageId,
            mode: payload?.mode,
            resolvedBindingCount: payload?.resolvedBindingCount,
            totalBindingCount: payload?.totalBindingCount,
            at,
          },
          ...prev,
        ].slice(0, maxEntries));

        incrementCounts(widgetId, componentName, lifecycle);
      });

    const offPageInit = subscribeLifecycle("page:init");
    const offPageLoad = subscribeLifecycle("page:load");
    const offPageReady = subscribeLifecycle("page:ready");
    const offInit = subscribeLifecycle("widget:init");
    const offLoad = subscribeLifecycle("widget:load");
    const offUnmount = subscribeLifecycle("widget:unmount");

    return () => {
      __stackpage.unsubscribe(offPageInit);
      __stackpage.unsubscribe(offPageLoad);
      __stackpage.unsubscribe(offPageReady);
      __stackpage.unsubscribe(offInit);
      __stackpage.unsubscribe(offLoad);
      __stackpage.unsubscribe(offUnmount);
    };
  }, [__stackpage, maxEntries, watchWidgetId]);

  return (
    <div className="rounded-lg border border-violet-200 bg-violet-50 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-violet-900">{title}</h3>
          <p className="mt-1 text-xs text-violet-700">{description}</p>
        </div>
        <div className="rounded-full bg-white px-3 py-1 text-[11px] font-medium text-violet-700 border border-violet-200">
          Runtime monitor
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded border border-violet-200 bg-white p-3 md:col-span-2">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-violet-700">
            Event log
          </div>
          <div className="space-y-2">
            {entries.length === 0 ? (
              <div className="text-xs text-slate-500">
                Open the page, then add, remove, or refresh widgets to watch page and widget lifecycle events appear here.
              </div>
            ) : (
              entries.map((entry, index) => (
                <div
                  key={`${entry.lifecycle}-${entry.widgetId}-${entry.at}-${index}`}
                  className="rounded border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-white px-2 py-0.5 font-semibold text-slate-800 border border-slate-200">
                      {entry.lifecycle}
                    </span>
                    <span>{entry.componentName}</span>
                    <span className="text-slate-500">#{entry.widgetId}</span>
                    {entry.pageId && (
                      <span className="text-slate-500">page: {entry.pageId}</span>
                    )}
                    {entry.mode && <span className="text-slate-500">mode: {entry.mode}</span>}
                  </div>
                  <div className="mt-1 text-[11px] text-slate-500">{entry.at}</div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded border border-violet-200 bg-white p-3">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-violet-700">
            Counts
          </div>
          <div className="space-y-2">
            {Object.keys(counts).length === 0 ? (
              <div className="text-xs text-slate-500">No lifecycle events yet.</div>
            ) : (
              Object.entries(counts).map(([widgetId, value]) => (
                <div key={widgetId} className="rounded border border-slate-200 bg-slate-50 p-2 text-xs">
                  <div className="font-semibold text-slate-800">{value.componentName}</div>
                  <div className="text-slate-600">#{widgetId}</div>
                  <div className="mt-1 space-y-2 text-[11px] text-slate-700">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-white px-2 py-0.5 border border-slate-200">
                        page:init {value.pageInit}
                      </span>
                      <span className="rounded-full bg-white px-2 py-0.5 border border-slate-200">
                        page:load {value.pageLoad}
                      </span>
                      <span className="rounded-full bg-white px-2 py-0.5 border border-slate-200">
                        page:ready {value.pageReady}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-white px-2 py-0.5 border border-slate-200">
                        widget:init {value.widgetInit}
                      </span>
                      <span className="rounded-full bg-white px-2 py-0.5 border border-slate-200">
                        widget:load {value.widgetLoad}
                      </span>
                      <span className="rounded-full bg-white px-2 py-0.5 border border-slate-200">
                        widget:unmount {value.widgetUnmount}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded border border-violet-200 bg-white p-3 text-xs text-slate-600">
        <div className="font-semibold text-violet-900 mb-1">How page build uses lifecycle</div>
        <ol className="list-decimal pl-4 space-y-1">
          <li>Save stores schema, bindings, page state, and datasource config.</li>
          <li>Opening edit/view starts the page runtime and emits <code>page:init</code>.</li>
          <li>Once layout, page state, and data are restored, the runtime emits <code>page:load</code>.</li>
          <li>When the grid is interactive, the runtime emits <code>page:ready</code>.</li>
          <li>Each widget mount emits <code>widget:init</code>, then <code>widget:load</code> when bindings resolve.</li>
          <li>Removing a widget or leaving the page emits <code>widget:unmount</code>.</li>
        </ol>
      </div>
    </div>
  );
};

export const componentMapProvider = () => ({
  Button: ({
    text = "Click me",
    onClick = () => {},
    color = "blue",
    size = "md",
  }) => {
    const sizeClasses: Record<string, string> = {
      sm: "px-2 py-1 text-sm",
      md: "px-4 py-2",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <button
        onClick={onClick}
        className={`bg-${color}-500 hover:bg-${color}-600 text-white rounded transition ${sizeClasses[size]}`}
      >
        {text}
      </button>
    );
  },

  Card: ({
    title = "Card",
    content = "Card content",
    shadow = true,
    border = true,
  }) => (
    <div
      className={`rounded-lg p-4 ${border ? "border" : ""} ${
        shadow ? "shadow-sm" : ""
      }`}
    >
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-600">{content}</p>
    </div>
  ),

  CardList: ({
    items = [
      // Default: single card if no array is passed
      { title: "Card", content: "Card content", shadow: true, border: true },
    ],
  }) => {
    return (
      <div className="card-grid gap-4">
        {items.map((card, index) => (
          // Destructure card props with fallbacks
          <div
            key={`card-${index}`}
            className={`rounded-lg p-4 
            ${card.border ?? true ? "border" : ""} 
            ${card.shadow ?? true ? "shadow-sm" : ""}
          `}
          >
            <h3 className="font-bold text-lg mb-2">{card.title ?? "Card"}</h3>
            <p
              className="text-gray-600"
              onClick={() => alert(JSON.stringify(card))}
            >
              {card.content ?? "Card content"}
            </p>
          </div>
        ))}
      </div>
    );
  },

  Input: ({
    placeholder = "Enter text",
    value = "",
    type = "text",
    label = "",
    required = false,
  }) => (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={value}
        required={required}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  ),

  // ImageCard component
  ImageCard: ({
    src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop",
    alt = "Sample image",
    caption = "This is a beautiful sample image",
    width = "100%",
    height = "200px",
    rounded = true,
  }) => (
    <div
      className={`overflow-hidden ${
        rounded ? "rounded-lg" : ""
      } border border-gray-200 shadow-sm`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full object-cover"
        style={{ width, height }}
      />
      {caption && (
        <div className="p-3 bg-white">
          <p className="text-sm text-gray-600">{caption}</p>
        </div>
      )}
    </div>
  ),

  // VideoCard component
  VideoCard: ({
    src = "https://dnicugzydez8x.cloudfront.net/60-think-prd/2025/09/IMG_2444.mov",
    title = "Sample Video",
    description = "This is a sample video description",
    width = "100%",
    height = "200px",
    poster = "",
    autoPlay = false,
    controls = true,
  }) => (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div
        className="bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center relative"
        style={{ width, height }}
      >
        {/* Video thumbnail/placeholder */}
        <div className="text-center text-white">
          <div className="text-4xl mb-2">🎬</div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs mt-1 opacity-90">Click to play video</p>
        </div>

        {/* If we had a real video element, it would look like this: */}
        <video
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          controls={controls}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3 bg-white">
        <h4 className="font-medium text-gray-800 text-sm">{title}</h4>
        {description && (
          <p className="text-xs text-gray-600 mt-1">{description}</p>
        )}
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-500">Video Component</span>
          <button className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors">
            Play
          </button>
        </div>
      </div>
    </div>
  ),

  ImageBlurred: ({
    src,
    content,
    date,
    author,
    alt,
  }: {
    src: string;
    content?: string;
    date?: string;
    author?: string;
    alt?: string;
  }) => {
    return (
      <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-2 lg:overflow-visible">
        <figure className="relative w-full h-full min-h-[140px]">
          <img
            className="object-cover object-center w-full h-full rounded-xl"
            src={src}
            alt={alt ? alt : "Image"}
          />
          <figcaption
            className="absolute bottom-4 left-2/4 flex w-[calc(100%-2rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/50 py-2 px-3 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm text-sm
          sm:bottom-6 sm:w-[calc(100%-4rem)] sm:py-3 sm:px-4 sm:text-base
          md:bottom-8 md:py-4 md:px-6 md:text-xl"
          >
            <div>
              <h5 className="font-medium text-slate-800">{author}</h5>
              <p className="mt-1 text-slate-600">{date}</p>
            </div>
            <h5 className="font-medium text-slate-800">{content}</h5>
          </figcaption>
        </figure>
      </div>
    );
  },

  ImageCircle: ({ src, alt }: { src: string; alt?: string }) => {
    return (
      <div className="flex items-center justify-center min-h-[32px] w-full overflow-x-scroll rounded-lg p-2 lg:overflow-visible">
        <div className="relative min-w-[128px] w-full max-w-[384px] aspect-square">
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <img
              className="object-cover w-full h-full"
              src={src}
              alt={alt || "Image"}
            />
          </div>
        </div>
      </div>
    );
  },

  SimpleCard: ({
    src,
    content,
    caption,
    author,
    date,
  }: {
    src: string;
    content: string;
    caption?: string;
    author?: string;
    date?: string;
  }) => {
    return (
      <a
        href="#"
        className="resize overflow-auto min-w-[200px] min-h-[200px] max-w-full max-h-[90vh] border border-gray-200 rounded-lg shadow-sm bg-white hover:bg-gray-100 dark:border-gray-400 dark:bg-slate-200 dark:hover:bg-slate-400 flex flex-col md:flex-row items-center md:items-stretch"
        style={{ resize: "both" }}
      >
        {/* Image Section */}
        <div className="flex-shrink-0 flex items-center justify-center w-full md:w-48">
          <img
            src={src}
            alt=""
            className="object-cover w-full md:w-48 h-auto md:h-full rounded-t-lg md:rounded-t-none md:rounded-l-lg"
            style={{ objectFit: "cover", maxHeight: "100%" }}
          />
        </div>

        {/* Text Section */}
        <div className="flex flex-col justify-between p-4 w-full h-full overflow-auto">
          <div className="flex flex-col h-full">
            <blockquote className="flex-1 overflow-auto">
              <p className="text-sm sm:text-base font-medium break-words text-left">
                {content}
              </p>
            </blockquote>
            <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
              <div className="text-sky-500 dark:text-sky-400 font-medium text-sm sm:text-base truncate">
                {caption || "This is a simple card"}
              </div>
              <div className="text-slate-700 dark:text-slate-500 text-xs sm:text-sm truncate">
                {author} {date}
              </div>
            </div>
          </div>
        </div>
      </a>
    );
  },

  // New Custom Components
  CustomAlert: ({
    type = "success",
    title = "Alert Title",
    message = "This is an alert message",
  }) => {
    const typeStyles = {
      success: {
        container: "bg-green-50 border-green-200",
        title: "text-green-800",
        message: "text-green-700",
        icon: "✅",
      },
      error: {
        container: "bg-red-50 border-red-200",
        title: "text-red-800",
        message: "text-red-700",
        icon: "❌",
      },
      warning: {
        container: "bg-yellow-50 border-yellow-200",
        title: "text-yellow-800",
        message: "text-yellow-700",
        icon: "⚠️",
      },
      info: {
        container: "bg-blue-50 border-blue-200",
        title: "text-blue-800",
        message: "text-blue-700",
        icon: "ℹ️",
      },
    };

    const styles = (typeStyles as any)[type];

    return (
      <div className={`border rounded-lg p-4 ${styles.container}`}>
        <div className="flex items-start space-x-3">
          <span className="text-lg">{styles.icon}</span>
          <div>
            <h4 className={`font-semibold ${styles.title}`}>{title}</h4>
            <p className={`text-sm mt-1 ${styles.message}`}>{message}</p>
          </div>
        </div>
      </div>
    );
  },

  CustomBadge: ({ variant = "primary", children = "Badge" }) => {
    const variantStyles: any = {
      primary: "bg-blue-100 text-blue-800 border-blue-200",
      secondary: "bg-gray-100 text-gray-800 border-gray-200",
      success: "bg-green-100 text-green-800 border-green-200",
      warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
      error: "bg-red-100 text-red-800 border-red-200",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium border ${variantStyles[variant]}`}
      >
        {children}
      </span>
    );
  },

  CustomProgress: ({ value = 50, label = "Progress" }) => {
    return (
      <div className="space-y-2">
        {label && (
          <div className="flex justify-between text-sm text-gray-600">
            <span>{label}</span>
            <span>{value}%</span>
          </div>
        )}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${value}%` }}
          ></div>
        </div>
      </div>
    );
  },

  AvatarStack: ({
    users = [
      {
        name: "John Doe",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
      },
      {
        name: "Jane Smith",
        image:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=120&h=120&fit=crop&crop=face",
      },
      {
        name: "Mike Johnson",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face",
      },
      {
        name: "Sarah Wilson",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face",
      },
      {
        name: "David Brown",
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face",
      },
      {
        name: "Emily Davis",
        image:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=face",
      },
    ],
    maxDisplay = 6,
    shape = "circle", // "circle" or "rectangle"
    showNames = true,
  }) => {
    const displayUsers = users.slice(0, maxDisplay);

    return (
      <div className="flex items-center justify-center min-h-[32px] w-full overflow-x-scroll rounded-lg p-2 lg:overflow-visible">
        <div className="flex items-end space-x-3">
          {displayUsers.map((user, index) => (
            <div
              className={`relative min-w-[32px] w-full max-w-[384px] aspect-square group flex flex-col items-center ${
                shape === "circle" ? "rounded-full" : "rounded-lg"
              }`}
              key={index}
            >
              <div
                className={`w-full h-full overflow-hidden ${
                  shape === "circle" ? "rounded-full" : "rounded-lg"
                }`}
              >
                <img
                  src={user.image}
                  alt={user.name}
                  className="object-cover w-full h-full hover:scale-110 transition-transform"
                />
              </div>

              {/* Name below image */}
              {showNames && (
                <div className="mt-2 text-center">
                  <p className="text-xs font-medium text-gray-700 truncate max-w-[80px]">
                    {user.name}
                  </p>
                </div>
              )}

              {/* Hover tooltip (optional - can be removed if not needed) */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-lg">
                {user.name}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },

  StatsCard: ({
    title = "Stats Title",
    value = "0",
    change = 0,
    description = "Stats description",
  }) => {
    const isPositive = change >= 0;

    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
        <div className="flex items-baseline justify-between">
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          <span
            className={`text-sm font-medium ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPositive ? "+" : ""}
            {change}%
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-2">{description}</p>
      </div>
    );
  },

  PageStateBridge: ({
    title = "Page State Bridge",
    description = "Inspect and update shared page state without direct component coupling.",
    stateKey = "keyword",
    __stackpage,
  }: StackPageComponentProps<{
    title?: string;
    description?: string;
    stateKey?: string;
  }>) => {
    const [draftValue, setDraftValue] = useState(
      String(__stackpage?.getPageState?.(stateKey, "") || ""),
    );
    const [syncedDraftValue, setSyncedDraftValue] = useState(draftValue);
    const [selectedId, setSelectedId] = useState(
      String(__stackpage?.getPageState?.("selectedId", "") || ""),
    );
    const [syncedSelectedId, setSyncedSelectedId] = useState(selectedId);
    const [dialogOpen, setDialogOpen] = useState(
      Boolean(__stackpage?.getPageState?.("dialogOpen", false)),
    );
    const [syncedDialogOpen, setSyncedDialogOpen] = useState(dialogOpen);
    const syncTimerRef = useRef<Record<string, number>>({});

    useEffect(() => {
      return () => {
        Object.values(syncTimerRef.current).forEach((timer) => {
          window.clearTimeout(timer);
        });
      };
    }, []);

    useEffect(() => {
      const path = stateKey;
      const existingTimer = syncTimerRef.current[path];
      if (existingTimer) {
        window.clearTimeout(existingTimer);
      }
      syncTimerRef.current[path] = window.setTimeout(() => {
        __stackpage?.setPageState?.(path, draftValue);
        setSyncedDraftValue(draftValue);
      }, 180);
    }, [draftValue, stateKey, __stackpage]);

    useEffect(() => {
      const path = "selectedId";
      const existingTimer = syncTimerRef.current[path];
      if (existingTimer) {
        window.clearTimeout(existingTimer);
      }
      syncTimerRef.current[path] = window.setTimeout(() => {
        __stackpage?.setPageState?.(path, selectedId);
        setSyncedSelectedId(selectedId);
      }, 180);
    }, [selectedId, __stackpage]);

    useEffect(() => {
      const path = "dialogOpen";
      const existingTimer = syncTimerRef.current[path];
      if (existingTimer) {
        window.clearTimeout(existingTimer);
      }
      syncTimerRef.current[path] = window.setTimeout(() => {
        __stackpage?.setPageState?.(path, dialogOpen);
        setSyncedDialogOpen(dialogOpen);
      }, 180);
    }, [dialogOpen, __stackpage]);

    return (
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 space-y-3">
        <div>
          <h3 className="text-base font-semibold text-blue-900">{title}</h3>
          <p className="text-xs text-blue-700 mt-1">{description}</p>
        </div>

        <div className="grid grid-cols-1 gap-2 text-sm">
          <label className="space-y-1">
            <span className="text-blue-900 font-medium">keyword</span>
            <input
              className="w-full border border-blue-200 rounded px-3 py-2"
              value={draftValue}
              onChange={(e) => {
                setDraftValue(e.target.value);
              }}
              placeholder="shared keyword"
            />
          </label>

          <label className="space-y-1">
            <span className="text-blue-900 font-medium">selectedId</span>
            <input
              className="w-full border border-blue-200 rounded px-3 py-2"
              value={selectedId}
              onChange={(e) => {
                setSelectedId(e.target.value);
              }}
              placeholder="selected id"
            />
          </label>

          <label className="flex items-center gap-2 text-blue-900 font-medium">
            <input
              type="checkbox"
              checked={dialogOpen}
              onChange={(e) => {
                setDialogOpen(e.target.checked);
              }}
            />
            dialogOpen
          </label>
        </div>

        <div className="text-xs text-blue-800 bg-white border border-blue-100 rounded p-3 space-y-1">
          <div>keyword: {syncedDraftValue || "-"}</div>
          <div>selectedId: {syncedSelectedId || "-"}</div>
          <div>dialogOpen: {String(syncedDialogOpen)}</div>
          <div className="text-blue-600">
            Synced state updates after a short debounce so typing stays smooth.
          </div>
        </div>
      </div>
    );
  },

  FormControlSampler: ({
    title = "Form control sampler",
    description = "A demo widget with common form controls so you can test typing and interactions safely.",
    submitLabel = "Save draft",
  }: StackPageComponentProps<{
    title?: string;
    description?: string;
    submitLabel?: string;
  }>) => {
    const [text, setText] = useState("Hello");
    const [email, setEmail] = useState("hello@example.com");
    const [password, setPassword] = useState("secret123");
    const [notes, setNotes] = useState("This widget keeps focus while typing.");
    const [category, setCategory] = useState("design");
    const [priority, setPriority] = useState("medium");
    const [agree, setAgree] = useState(true);
    const [status, setStatus] = useState("draft");
    const [rating, setRating] = useState(3);
    const [themeColor, setThemeColor] = useState("#2563eb");
    const [dueDate, setDueDate] = useState("2026-04-26");
    const [avatarName, setAvatarName] = useState("No file chosen");

    return (
      <form
        className="rounded-lg border border-slate-200 bg-white p-4 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          alert(
            JSON.stringify(
              {
                text,
                email,
                password,
                notes,
                category,
                priority,
                agree,
                status,
                rating,
                themeColor,
                dueDate,
                avatarName,
              },
              null,
              2,
            ),
          );
        }}
      >
        <div>
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base font-semibold text-slate-900">{title}</h3>
            <span className="text-[11px] rounded-full bg-slate-100 px-2 py-1 text-slate-600">
              All form controls
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-600">{description}</p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <label className="space-y-1">
            <span className="text-sm font-medium text-slate-700">Text</span>
            <input
              className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Text input"
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input
              className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium text-slate-700">Date</span>
            <input
              className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </label>

          <label className="space-y-1 md:col-span-2">
            <span className="text-sm font-medium text-slate-700">Notes</span>
            <textarea
              className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Long text area"
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium text-slate-700">Category</span>
            <select
              className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="design">Design</option>
              <option value="product">Product</option>
              <option value="engineering">Engineering</option>
            </select>
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium text-slate-700">Priority</span>
            <div className="flex gap-3 pt-1">
              {["low", "medium", "high"].map((value) => (
                <label key={value} className="flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="radio"
                    name="priority"
                    value={value}
                    checked={priority === value}
                    onChange={() => setPriority(value)}
                  />
                  {value}
                </label>
              ))}
            </div>
          </label>

          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            Agree to terms
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium text-slate-700">Status</span>
            <select
              className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="draft">Draft</option>
              <option value="review">Review</option>
              <option value="published">Published</option>
            </select>
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium text-slate-700">Rating</span>
            <input
              className="w-full"
              type="range"
              min={1}
              max={5}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            />
            <div className="text-xs text-slate-500">Selected: {rating}</div>
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium text-slate-700">Color</span>
            <input
              className="h-10 w-full rounded border border-slate-300 bg-white px-1 py-1"
              type="color"
              value={themeColor}
              onChange={(e) => setThemeColor(e.target.value)}
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium text-slate-700">File</span>
            <input
              className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
              type="file"
              onChange={(e) =>
                setAvatarName(e.target.files?.[0]?.name || "No file chosen")
              }
            />
            <div className="text-xs text-slate-500">{avatarName}</div>
          </label>
        </div>

        <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700 space-y-1">
          <div>Text: {text}</div>
          <div>Email: {email}</div>
          <div>Status: {status}</div>
          <div>Priority: {priority}</div>
          <div>Rating: {rating}</div>
          <div>Color: {themeColor}</div>
        </div>

        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          {submitLabel}
        </button>
      </form>
    );
  },

  ContactFormBridge: ({
    title = "Contact Form",
    actions = [],
    successText = "Sent (no response required).",
    waitingText = "Waiting for receiver response...",
    ruleEcho = "",
    __stackpage,
  }: StackPageComponentProps<{
    title?: string;
    actions?: StackPageEventAction[];
    successText?: string;
    waitingText?: string;
    ruleEcho?: string;
  }>) => {
    const [name, setName] = useState("Alice");
    const [email, setEmail] = useState("alice@example.com");
    const [message, setMessage] = useState("Hello from StackPage demo.");
    const [status, setStatus] = useState("Ready");
    const [receiverResponse, setReceiverResponse] = useState("");

    const payload = useMemo(
      () => ({
        name,
        email,
        message,
        sentAt: new Date().toISOString(),
      }),
      [name, email, message]
    );

    const handleAction = async (action: StackPageEventAction) => {
      if (!action?.enabled || !__stackpage) return;
      const actionPayload = getByPath(payload, action.payloadPath) ?? payload;

      if (action.mode === "emit") {
        __stackpage.emit(action.event, actionPayload);
        setStatus(`${successText} (${action.label})`);
        return;
      }

      if (action.mode === "request" && __stackpage.emitWithAck) {
        setStatus(`${waitingText} (${action.label})`);
        try {
          const result = await __stackpage.emitWithAck(action.event, actionPayload, {
            responseEvent: action.responseEvent || `${action.event}:completed`,
            timeoutMs: 8000,
          });
          setReceiverResponse(
            typeof result === "string" ? result : JSON.stringify(result)
          );
          setStatus(`Completed with receiver response. (${action.label})`);
        } catch (error: any) {
          setStatus(`Failed (${action.label}): ${error?.message || "unknown error"}`);
        }
      }
    };

    return (
      <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-3">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        <div className="grid grid-cols-1 gap-2">
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm min-h-[88px]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {(actions || [])
            .filter((a) => a?.enabled !== false)
            .map((action) => (
              <button
                key={action.id}
                type="button"
                onClick={() => handleAction(action)}
                className={`px-3 py-2 rounded text-white text-sm ${
                  action.mode === "request"
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {action.label}
              </button>
            ))}
        </div>

        <div className="text-xs text-gray-600">
          <div>Status: {status}</div>
          <div>Rule Echo (set-prop): {ruleEcho || "-"}</div>
          <div>
            Shared Last Email (set-shared-state):{" "}
            {__stackpage?.getState?.("demo.bridge.lastEmail", "-") as string}
          </div>
          {receiverResponse && (
            <div className="mt-1 break-all">Response: {receiverResponse}</div>
          )}
        </div>
      </div>
    );
  },

  ContactFormResultText: ({
    title = "Form Result Viewer",
    subscriptions = [],
    actions = [],
    ackMessagePrefix = "Receiver completed",
    emptyText = "No form data received yet.",
    ruleLog = "",
    pageStateKey = "selectedId",
    __stackpage,
  }: StackPageComponentProps<{
    title?: string;
    subscriptions?: StackPageEventSubscription[];
    actions?: StackPageEventAction[];
    ackMessagePrefix?: string;
    emptyText?: string;
    ruleLog?: string;
    pageStateKey?: string;
  }>) => {
    const [lastData, setLastData] = useState<any>(null);
    const [count, setCount] = useState(0);
    const [sharedPageState, setSharedPageState] = useState(
      String(__stackpage?.getPageState?.(pageStateKey, "-") || "-"),
    );

    useEffect(() => {
      if (!__stackpage?.subscribe) return;

      const offs = (subscriptions || [])
        .filter((sub) => sub?.enabled !== false && sub.event)
        .map((sub) =>
          __stackpage.subscribe(sub.event, (payload: any) => {
            setLastData(payload);
            setCount((prev: number) => prev + 1);

            if (sub.replyMode === "ack") {
              const responseEvent = sub.responseEvent || `${sub.event}:completed`;
              __stackpage.emit(responseEvent, {
                __requestId: payload?.__requestId,
                result:
                  sub.resultTemplate ||
                  `${ackMessagePrefix}: ${payload?.name || "unknown"} / ${
                    payload?.email || "no-email"
                  }`,
                handledAt: new Date().toISOString(),
              });
            }
        })
      );

      return () => {
        offs.forEach((off) => __stackpage.unsubscribe(off));
      };
    }, [__stackpage, subscriptions, ackMessagePrefix]);

    useEffect(() => {
      setSharedPageState(String(__stackpage?.getPageState?.(pageStateKey, "-") || "-"));
    }, [__stackpage, pageStateKey, count, lastData]);

    const payloadForAction = {
      nextTitle: `Result Viewer (${count + 1})`,
      count: count + 1,
      at: new Date().toISOString(),
      lastData,
    };

    const handleAction = async (action: StackPageEventAction) => {
      if (!action?.enabled || !__stackpage) return;
      const actionPayload = getByPath(payloadForAction, action.payloadPath) ?? payloadForAction;
      if (action.mode === "emit") {
        __stackpage.emit(action.event, actionPayload);
        return;
      }
      if (action.mode === "request" && __stackpage.emitWithAck) {
        const result = await __stackpage.emitWithAck(action.event, actionPayload, {
          responseEvent: action.responseEvent || `${action.event}:completed`,
          timeoutMs: 8000,
        });
        if (result !== undefined) {
          setLastData(result);
          setCount((prev: number) => prev + 1);
        }
      }
    };

    return (
      <div className="rounded-lg border border-gray-200 bg-slate-50 p-4">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        <p className="text-xs text-gray-500 mt-1 mb-3">
          Received Count: {count}
        </p>
        <p className="text-xs text-gray-600 mb-2">Rule Log (set-prop): {ruleLog || "-"}</p>
        <p className="text-xs text-gray-600 mb-3">
          Shared Result Last (set-shared-state):{" "}
          {(JSON.stringify(__stackpage?.getState?.("demo.result.last", {})) || "-").slice(0, 140)}
        </p>
        <p className="text-xs text-gray-600 mb-3">
          Shared Page State ({pageStateKey}): {sharedPageState}
        </p>
        <div className="mb-3 flex flex-wrap gap-2">
          {(actions || [])
            .filter((a) => a?.enabled !== false)
            .map((action) => (
              <button
                key={action.id}
                type="button"
                onClick={() => handleAction(action)}
                className="px-3 py-2 rounded bg-purple-600 text-white text-xs hover:bg-purple-700"
              >
                {action.label}
              </button>
            ))}
        </div>
        <pre className="text-xs text-gray-700 whitespace-pre-wrap break-all bg-white border border-gray-200 rounded p-3 min-h-[120px]">
          {lastData ? JSON.stringify(lastData, null, 2) : emptyText}
        </pre>
      </div>
    );
  },

  DemoPostList: ({
    title = "Post cards",
    items = DEMO_POST_ITEMS,
    selectedIdKey = "demo.post.selectedId",
    selectEvent = "demo:post:selected",
    emptyText = "No posts available.",
    description = "Click a post card to set the selected post id and notify the detail panel.",
    eventKind = "select_detail",
    __stackpage,
  }: StackPageComponentProps<{
    title?: string;
    items?: Array<any>;
    selectedIdKey?: string;
    selectEvent?: string;
    emptyText?: string;
    description?: string;
    eventKind?: EventPatternKind;
  }>) => {
    const selectedId = String(
      __stackpage?.getPageState?.(selectedIdKey, "") || ""
    );

    return (
      <div className="rounded-lg border border-amber-200 bg-white p-4">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3 className="text-base font-semibold text-amber-900">{title}</h3>
          <EventPatternBadge kind={eventKind} />
        </div>
        <p className="text-xs text-amber-700 mb-3">
          {description}
        </p>
        <div className="space-y-2">
          {(items || []).length === 0 ? (
            <div className="text-sm text-gray-500">{emptyText}</div>
          ) : (
            (items || []).map((item: any) => {
              const isActive = String(item.id) === selectedId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    __stackpage?.emit?.("select", {
                      ...item,
                      selectedIdKey,
                      selectEvent,
                    })
                  }
                  className={`w-full text-left rounded border px-3 py-2 transition ${
                    isActive
                      ? "border-amber-500 bg-amber-50"
                      : "border-gray-200 bg-white hover:bg-amber-50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <div className="font-medium text-gray-900">{item.title}</div>
                      <div className="text-xs text-gray-500">{item.category}</div>
                    </div>
                    <span className="text-xs text-gray-400">{item.id}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{item.excerpt}</p>
                </button>
              );
            })
          )}
        </div>
      </div>
    );
  },

  DemoPostDetail: ({
    title = "Post detail",
    items = DEMO_POST_ITEMS,
    selectedIdKey = "demo.post.selectedId",
    emptyText = "Select a post card to show details.",
    description = "This panel listens to the shared selected id and updates automatically.",
    eventKind = "select_detail",
    __stackpage,
  }: StackPageComponentProps<{
    title?: string;
    items?: Array<any>;
    selectedIdKey?: string;
    emptyText?: string;
    description?: string;
    eventKind?: EventPatternKind;
  }>) => {
    const selectedId = String(
      __stackpage?.getPageState?.(selectedIdKey, "") || ""
    );
    const selectedItem = (items || []).find(
      (item: any) => String(item.id) === selectedId
    );

    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-base font-semibold text-amber-900">{title}</h3>
          <EventPatternBadge kind={eventKind} />
        </div>
        <p className="text-xs text-amber-700 mb-3">{description}</p>
        {selectedItem ? (
          <div className="space-y-2">
            <div className="text-xs text-amber-700">Selected: {selectedItem.id}</div>
            <div className="text-lg font-semibold text-gray-900">{selectedItem.title}</div>
            <p className="text-sm text-gray-700">{selectedItem.body}</p>
            <div className="text-xs text-gray-500">Category: {selectedItem.category}</div>
          </div>
        ) : (
          <div className="text-sm text-gray-600">{emptyText}</div>
        )}
      </div>
    );
  },

  DemoPostFoldReceiver: ({
    title = "Content snapshot",
    items = DEMO_POST_ITEMS,
    selectedIdKey = "content.review.selectedId",
    emptyText = "Select a row in the fold navigator to update this receiver.",
    description = "Content-style receiver card showing the current selection, identity, and recent history trail.",
    eventKind = "select_detail",
    __stackpage,
  }: StackPageComponentProps<{
    title?: string;
    items?: Array<any>;
    selectedIdKey?: string;
    emptyText?: string;
    description?: string;
    eventKind?: EventPatternKind;
  }>) => {
    const selectedId = String(
      __stackpage?.getPageState?.(selectedIdKey, "") || ""
    );
    const selectedItem = (items || []).find(
      (item: any) => String(item.id) === selectedId
    );
    const [history, setHistory] = useState<Array<any>>([]);
    const metrics = getFoldReceiverMetrics({
      selectedId,
      selectedItem,
      selectedIdKey,
      historyLength: history.length,
    });

    useEffect(() => {
      if (!selectedItem) return;
      setHistory((prev) => {
        const next = [
          selectedItem,
          ...prev.filter((item) => String(item.id) !== String(selectedItem.id)),
        ];
        return next.slice(0, 4);
      });
    }, [selectedId, selectedItem]);

    return (
      <div className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-white via-indigo-50/60 to-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-indigo-600 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                Live receiver
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                synced
              </span>
            </div>
            <h3 className="mt-2 text-lg font-semibold text-slate-900">{title}</h3>
            <p className="mt-1 text-xs text-slate-600">{description}</p>
          </div>
          <EventPatternBadge kind={eventKind} />
        </div>
        {selectedItem ? (
          <div className="mt-4 space-y-4">
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-indigo-100 bg-white px-4 py-3">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-600">
                  Selected id
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900">
                  {metrics.selectedIdLabel}
                </div>
              </div>
              <div className="rounded-xl border border-emerald-100 bg-white px-4 py-3">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-600">
                  Business category
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900">
                  {metrics.selectedCategoryLabel}
                </div>
              </div>
              <div className="rounded-xl border border-slate-100 bg-white px-4 py-3">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Sync path
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900">
                  {metrics.selectedPathLabel}
                </div>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Recent syncs
                </div>
                <div className="mt-1 text-2xl font-semibold text-slate-900">
                  {metrics.syncCount}
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Route
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900">
                  {metrics.routeLabel}
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  State transition
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900">
                  {metrics.transitionLabel}
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Last action
              </div>
              <div className="mt-1 font-medium text-slate-900">
                {metrics.lastActionLabel}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Receiver post
              </div>
              <div className="mt-2 text-xl font-semibold text-slate-900">
                {selectedItem.title}
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {selectedItem.body}
              </p>
              <div className="mt-3 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                {selectedItem.excerpt}
              </div>
            </div>
            <div className="rounded-xl border border-indigo-100 bg-indigo-50/70 px-4 py-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                    Recent selections
                  </div>
                  <div className="mt-1 text-sm text-slate-600">
                    Keep an eye on the latest rows that drove the receiver update.
                  </div>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-700">
                  audit trail
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {history.length > 0 ? (
                  history.map((item) => (
                    <span
                      key={item.id}
                      className="rounded-full border border-indigo-200 bg-white px-3 py-1 text-xs font-medium text-indigo-700"
                    >
                      {item.title}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-indigo-700">{emptyText}</span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-sm text-slate-600">
            {t(emptyText)}
          </div>
        )}
      </div>
    );
  },

  DemoPostFoldSummary: ({
    title = "Review snapshot",
    items = DEMO_POST_ITEMS,
    selectedIdKey = "content.review.selectedId",
    selectedTitleKey = "content.review.selectedTitle",
    emptyText = "No row selected yet. Pick one from the accordion below.",
    description = "A quick page-side guide that shows the current content selection before the receiver panel updates.",
    eventKind = "select_detail",
    __stackpage,
  }: StackPageComponentProps<{
    title?: string;
    items?: Array<any>;
    selectedIdKey?: string;
    selectedTitleKey?: string;
    emptyText?: string;
    description?: string;
    eventKind?: EventPatternKind;
  }>) => {
    const selectedId = String(
      __stackpage?.getPageState?.(selectedIdKey, "") || ""
    );
    const selectedTitle = String(
      __stackpage?.getPageState?.(selectedTitleKey, "") || ""
    );
    const selectedItem = (items || []).find(
      (item: any) => String(item.id) === selectedId
    );

    return (
      <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-amber-50 p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <p className="mt-1 text-xs text-slate-600">{description}</p>
          </div>
          <EventPatternBadge kind={eventKind} />
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-amber-100 bg-white px-4 py-3">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-600">
              Current id
            </div>
            <div className="mt-1 text-sm font-semibold text-slate-900">
              {selectedId || "—"}
            </div>
          </div>
          <div className="rounded-xl border border-amber-100 bg-white px-4 py-3">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-600">
              Current title
            </div>
            <div className="mt-1 text-sm font-semibold text-slate-900">
              {selectedTitle || selectedItem?.title || "—"}
            </div>
          </div>
          <div className="rounded-xl border border-amber-100 bg-white px-4 py-3">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-600">
              Current category
            </div>
            <div className="mt-1 text-sm font-semibold text-slate-900">
              {selectedItem?.category || "—"}
            </div>
          </div>
        </div>
        <div className="mt-4 rounded-xl border border-dashed border-amber-200 bg-white px-4 py-3">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
            What to try
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
              Click one row
            </span>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
              Watch receiver update
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              Shared state + event bus
            </span>
          </div>
          {!selectedId && (
            <div className="mt-3 text-sm text-slate-600">{emptyText}</div>
          )}
        </div>
      </div>
    );
  },

  DemoPostFoldTips: ({
    title = "Review tips",
    description = "This helper card keeps the review queue readable as a runnable sample.",
    steps = [
      "Pick a post from the accordion.",
      "Watch the summary refresh immediately.",
      "Check the receiver history trail and latest detail.",
    ],
    eventKind = "select_detail",
  }: StackPageComponentProps<{
    title?: string;
    description?: string;
    steps?: Array<string>;
    eventKind?: EventPatternKind;
  }>) => {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <p className="mt-1 text-xs text-slate-600">{description}</p>
          </div>
          <EventPatternBadge kind={eventKind} />
        </div>
        <div className="mt-4 grid gap-2 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step}
              className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
            >
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Step {index + 1}
              </div>
              <div className="mt-1 text-sm font-medium text-slate-800">{step}</div>
            </div>
          ))}
        </div>
      </div>
    );
  },

  DemoPostFoldNavigator: ({
    title = "Review queue navigator",
    items = DEMO_POST_ITEMS,
    selectedIdKey = "content.review.selectedId",
    selectEvent = "demo:fold:post:selected",
    emptyText = "No posts available.",
    description = "A one-level accordion queue. Click a row to expand it and update the receiver panel.",
    eventKind = "select_detail",
    __stackpage,
  }: StackPageComponentProps<{
    title?: string;
    items?: Array<any>;
    selectedIdKey?: string;
    selectEvent?: string;
    emptyText?: string;
    description?: string;
    eventKind?: EventPatternKind;
  }>) => {
    const selectedId = String(__stackpage?.getPageState?.(selectedIdKey, "") || "");
    const [openId, setOpenId] = useState(selectedId);

    useEffect(() => {
      setOpenId(selectedId);
    }, [selectedId]);

    const handleToggle = (item: any) => {
      const nextOpen = openId === item.id ? "" : item.id;
      setOpenId(nextOpen);
      __stackpage?.emit?.("fold-select", {
        ...item,
        selectedIdKey,
        selectEvent,
        expanded: nextOpen === item.id,
      });
    };

    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-slate-900">{title}</h3>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              one level
            </span>
          </div>
          <EventPatternBadge kind={eventKind} />
        </div>
        <p className="text-xs text-slate-600 mb-3">{description}</p>
        <div className="space-y-2">
          {(items || []).length === 0 ? (
            <div className="text-sm text-gray-500">{emptyText}</div>
          ) : (
            (items || []).map((item: any) => {
              const isOpen = openId === item.id;
              const isSelected = String(item.id) === selectedId;
              return (
                <div
                  key={item.id}
                  className={`overflow-hidden rounded-xl border transition ${
                    isOpen
                      ? "border-indigo-300 bg-indigo-50 shadow-sm"
                      : "border-slate-200 bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleToggle(item)}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="font-semibold text-slate-900">{item.title}</div>
                        {isSelected && (
                          <span className="rounded-full border border-indigo-200 bg-white px-2 py-0.5 text-[10px] font-medium text-indigo-700">
                            selected
                          </span>
                        )}
                      </div>
                      <div className="mt-1 text-xs text-slate-500">{item.category}</div>
                    </div>
                    <div className="text-lg text-slate-500">{isOpen ? "▾" : "▸"}</div>
                  </button>
                  {isOpen && (
                    <div className="border-t border-indigo-100 bg-white px-4 py-3">
                      <p className="text-sm text-slate-700">{item.excerpt}</p>
                      <div className="mt-2 flex items-center justify-between gap-2 text-xs text-slate-500">
                        <span>{item.id}</span>
                        <span>Click another row to switch the receiver post</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  },

  MediaInquiryCard: ({
    title = "Inquiry form",
    description = "A polished contact form for incoming requests, briefs, and follow-up questions.",
    submitLabel = "Send inquiry",
    followUpLabel = "We’ll reply by email after review.",
    __stackpage,
  }: StackPageComponentProps<{
    title?: string;
    description?: string;
    submitLabel?: string;
    followUpLabel?: string;
  }>) => {
    const [name, setName] = useState("Aida Dabo");
    const [company, setCompany] = useState("Think AI");
    const [email, setEmail] = useState("hello@example.com");
    const [topic, setTopic] = useState("Media request");
    const [message, setMessage] = useState(
      "Please share details about the new media and location demo."
    );
    const [status, setStatus] = useState("Ready to receive an inquiry");
    const [lastSubmittedAt, setLastSubmittedAt] = useState("");

    const handleSubmit = () => {
      const submittedAt = new Date().toISOString();
      __stackpage?.emit?.("media:inquiry:submitted", {
        name,
        company,
        email,
        topic,
        message,
        submittedAt,
      });
      setStatus("Inquiry sent — we will follow up shortly.");
      setLastSubmittedAt(submittedAt);
    };

    return (
      <div className="overflow-hidden rounded-2xl border border-rose-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-rose-50 via-white to-orange-50 px-5 py-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-600">
                Contact lane
              </div>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">{title}</h3>
              <p className="mt-1 text-sm text-slate-600">{description}</p>
            </div>
            <span className="rounded-full border border-rose-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-700">
              inquiry
            </span>
          </div>
        </div>
        <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-3 p-5">
            <div className="grid gap-3 md:grid-cols-2">
              <label className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Name
                </span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-rose-300 focus:bg-white focus:ring-2 focus:ring-rose-100"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </label>
              <label className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Company
                </span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-rose-300 focus:bg-white focus:ring-2 focus:ring-rose-100"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Company name"
                />
              </label>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Email
                </span>
                <input
                  type="email"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-rose-300 focus:bg-white focus:ring-2 focus:ring-rose-100"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </label>
              <label className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Topic
                </span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-rose-300 focus:bg-white focus:ring-2 focus:ring-rose-100"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Project inquiry"
                />
              </label>
            </div>
            <label className="space-y-1 block">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Message
              </span>
              <textarea
                className="min-h-[120px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-rose-300 focus:bg-white focus:ring-2 focus:ring-rose-100"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your request"
              />
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center justify-center rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
              >
                {submitLabel}
              </button>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
                {followUpLabel}
              </div>
            </div>
          </div>
          <div className="border-t border-slate-200 bg-slate-50 p-5 lg:border-l lg:border-t-0">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Submission snapshot
              </div>
              <div className="mt-3 space-y-3">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Status
                  </div>
                  <div className="mt-1 text-sm font-medium text-slate-900">{status}</div>
                </div>
                <div className="grid gap-2">
                  <div className="rounded-xl bg-slate-50 px-3 py-2">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Name / company
                    </div>
                    <div className="mt-1 text-sm font-medium text-slate-900">
                      {name} · {company}
                    </div>
                  </div>
                  <div className="rounded-xl bg-slate-50 px-3 py-2">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Email / topic
                    </div>
                    <div className="mt-1 text-sm font-medium text-slate-900">
                      {email} · {topic}
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-dashed border-rose-200 bg-rose-50/70 px-3 py-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-rose-600">
                    Recent activity
                  </div>
                  <div className="mt-1 text-sm text-slate-700">
                    {lastSubmittedAt
                      ? `Submitted at ${new Date(lastSubmittedAt).toLocaleString()}`
                      : "Waiting for the first inquiry."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  MediaShowcaseGrid: ({
    title = "Media cards",
    description = "A mix of list, image, and video cards that all open the same detail page.",
    items = DEMO_MEDIA_ITEMS,
    detailPageId = "page-media-detail-demo",
    emptyText = "No media items available.",
  }: StackPageComponentProps<{
    title?: string;
    description?: string;
    items?: Array<any>;
    detailPageId?: string;
    emptyText?: string;
  }>) => {
    const navigate = useNavigate();

    const handleOpen = (itemId: string) => {
      navigate(buildMediaDetailPath(detailPageId, itemId));
    };

    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Gallery lane
            </div>
            <h3 className="mt-1 text-xl font-semibold text-slate-900">{title}</h3>
            <p className="mt-1 text-sm text-slate-600">{description}</p>
          </div>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            detail-first
          </span>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {(items || []).length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
              {emptyText}
            </div>
          ) : (
            (items || []).map((item: any) => {
              const accent =
                item.kind === "video"
                  ? "from-indigo-50 to-violet-50 border-indigo-200"
                  : item.kind === "image"
                    ? "from-blue-50 to-cyan-50 border-blue-200"
                    : "from-slate-50 to-amber-50 border-slate-200";
              return (
                <div
                  key={item.id}
                  className={`overflow-hidden rounded-2xl border bg-gradient-to-br ${accent} shadow-sm`}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                            {item.kind}
                          </span>
                          <span className="text-xs font-medium text-slate-500">
                            {item.category}
                          </span>
                        </div>
                        <h4 className="mt-2 text-lg font-semibold text-slate-900">
                          {item.title}
                        </h4>
                      </div>
                      {item.locationLabel && (
                        <span className="rounded-full bg-white/80 px-2 py-1 text-[10px] font-medium text-slate-600">
                          {item.locationLabel}
                        </span>
                      )}
                    </div>

                    {item.kind === "list" && (
                      <div className="mt-4 rounded-xl border border-white/70 bg-white/80 p-4">
                        <p className="text-sm text-slate-700">{item.summary}</p>
                        <p className="mt-2 text-xs leading-5 text-slate-500">{item.body}</p>
                      </div>
                    )}

                    {item.kind === "image" && (
                      <div className="mt-4 overflow-hidden rounded-xl border border-white/70 bg-white">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-44 w-full object-cover"
                        />
                        <div className="p-4">
                          <p className="text-sm text-slate-700">{item.summary}</p>
                        </div>
                      </div>
                    )}

                    {item.kind === "video" && (
                      <div className="mt-4 overflow-hidden rounded-xl border border-white/70 bg-slate-950">
                        <div className="relative h-44">
                          <img
                            src={item.poster}
                            alt={item.title}
                            className="h-full w-full object-cover opacity-85"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur">
                              ▶
                            </div>
                          </div>
                        </div>
                        <div className="p-4 text-white">
                          <p className="text-sm text-white/85">{item.summary}</p>
                        </div>
                      </div>
                    )}

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-white px-2 py-1 text-[10px] font-medium text-slate-600">
                          {item.category}
                        </span>
                        <span className="rounded-full bg-white px-2 py-1 text-[10px] font-medium text-slate-600">
                          detail page
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleOpen(item.id)}
                        className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
                      >
                        Open details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  },

  MediaSliderCard: ({
    title = "Image slider",
    description = "A horizontal gallery strip for media that should feel premium and easy to scan.",
    slides = DEMO_MEDIA_ITEMS.filter((item) => item.kind !== "list"),
    detailPageId = "page-media-detail-demo",
  }: StackPageComponentProps<{
    title?: string;
    description?: string;
    slides?: Array<any>;
    detailPageId?: string;
  }>) => {
    const navigate = useNavigate();
    return (
      <div className="overflow-hidden rounded-2xl border border-violet-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-violet-50 via-white to-fuchsia-50 px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
                Horizontal slider
              </div>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">{title}</h3>
              <p className="mt-1 text-sm text-slate-600">{description}</p>
            </div>
            <span className="rounded-full border border-violet-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-700">
              swipe
            </span>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto px-5 py-5 [scrollbar-width:thin]">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="min-w-[260px] max-w-[260px] shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm snap-start"
            >
              <div className="relative h-44">
                <img
                  src={slide.image || slide.poster}
                  alt={slide.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80">
                    {slide.kind}
                  </div>
                  <div className="mt-1 text-lg font-semibold text-white">{slide.title}</div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-slate-600">{slide.summary}</p>
                <div className="mt-4 flex items-center justify-between gap-2">
                  <span className="text-xs text-slate-500">{slide.locationLabel}</span>
                  <button
                    type="button"
                    onClick={() => navigate(buildMediaDetailPath(detailPageId, slide.id))}
                    className="rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-xs font-semibold text-violet-700 transition hover:bg-violet-100"
                  >
                    Open detail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },

  GoogleStreetViewCard: ({
    title = "Street View",
    subtitle = "Jump into Google Street View for the same location shown on the page.",
    viewpoint = "35.6595,139.7005",
    heading = 170,
    pitch = 8,
    fov = 75,
    locationLabel = "Shibuya Crossing, Tokyo",
  }: StackPageComponentProps<{
    title?: string;
    subtitle?: string;
    viewpoint?: string;
    heading?: number;
    pitch?: number;
    fov?: number;
    locationLabel?: string;
  }>) => {
    const t = useT();
    const streetViewUrl = buildGoogleMapsStreetViewUrl({ viewpoint, heading, pitch, fov });
    return (
      <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-emerald-50 via-white to-cyan-50 px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
                Location lane
              </div>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">{title}</h3>
              <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
            </div>
            <span className="rounded-full border border-emerald-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
              street view
            </span>
          </div>
        </div>
        <div className="grid gap-0 lg:grid-cols-[1fr_0.85fr]">
          <div className="min-h-[240px] bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_55%),linear-gradient(135deg,_#f8fffb,_#effaf6)] p-5">
            <div className="flex h-full flex-col justify-between rounded-2xl border border-emerald-100 bg-white/80 p-5 backdrop-blur-sm">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-600">
                  Google Maps panoramic link
                </div>
                <div className="mt-3 text-2xl font-semibold text-slate-900">{t(locationLabel)}</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Use the street view card when the business context needs a real-world anchor,
                  a location preview, or a quick route check.
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                  viewpoint {viewpoint}
                </span>
                <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700">
                  heading {heading}°
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  fov {fov}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 p-5">
            <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/60 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
                Preview card
              </div>
              <div className="mt-2 text-sm text-slate-700">
                This card stays lightweight in the demo while still pointing to the official
                Google Street View route.
              </div>
            </div>
            <a
              href={streetViewUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Open Street View
            </a>
          </div>
        </div>
      </div>
    );
  },

  GoogleMapCard: ({
    title = "Map card",
    subtitle = "A clean map action card that opens the same location in Google Maps.",
    center = "35.6595,139.7005",
    zoom = 16,
    locationLabel = "Shibuya, Tokyo",
  }: StackPageComponentProps<{
    title?: string;
    subtitle?: string;
    center?: string;
    zoom?: number;
    locationLabel?: string;
  }>) => {
    const t = useT();
    const mapUrl = buildGoogleMapsMapUrl({ center, zoom });
    return (
      <div className="overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-blue-50 via-white to-cyan-50 px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                Location lane
              </div>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">{title}</h3>
              <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
            </div>
            <span className="rounded-full border border-blue-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
              map
            </span>
          </div>
        </div>
        <div className="grid gap-0 lg:grid-cols-[1fr_0.85fr]">
          <div className="min-h-[240px] bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_55%),linear-gradient(135deg,_#f7fbff,_#eef6ff)] p-5">
            <div className="flex h-full flex-col justify-between rounded-2xl border border-blue-100 bg-white/85 p-5 backdrop-blur-sm">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-600">
                  Google Maps location link
                </div>
                <div className="mt-3 text-2xl font-semibold text-slate-900">{t(locationLabel)}</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  The map card is best for quick route context, meeting spots, and business
                  locations that need a visual anchor.
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                  center {center}
                </span>
                <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700">
                  zoom {zoom}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 p-5">
            <div className="rounded-2xl border border-dashed border-blue-200 bg-blue-50/60 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                Preview card
              </div>
              <div className="mt-2 text-sm text-slate-700">
                This card keeps the demo lightweight and still opens the official Google Maps
                location URL.
              </div>
            </div>
            <a
              href={mapUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Open map
            </a>
          </div>
        </div>
      </div>
    );
  },

  MediaDetailPanel: ({
    title = "Media detail",
    description = "Click a card from the gallery to jump here and inspect the selected item.",
    items = DEMO_MEDIA_ITEMS,
    detailPageId = "page-media-detail-demo",
    emptyText = "No item selected yet.",
  }: StackPageComponentProps<{
    title?: string;
    description?: string;
    items?: Array<any>;
    detailPageId?: string;
    emptyText?: string;
  }>) => {
    const t = useT();
    const navigate = useNavigate();
    const location = useLocation();
    const queryItem = new URLSearchParams(location.search).get("item") || "";
    const selectedItem =
      items.find((item: any) => item.id === queryItem) || items[0] || null;
    const selectedSpot = selectedItem
      ? DEMO_LOCATION_SPOTS.find((spot) => spot.id === selectedItem.locationSpotId)
      : null;

    if (!selectedItem) {
      return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            {t("Detail page")}
          </div>
          <div className="mt-2 text-lg font-semibold text-slate-900">{t(title)}</div>
          <p className="mt-1 text-sm text-slate-600">{t(description)}</p>
          <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
            {t(emptyText)}
          </div>
          <button
            type="button"
            onClick={() => navigate(`/view/${detailPageId}`)}
            className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
          >
            Back to gallery
          </button>
        </div>
      );
    }

    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-slate-50 via-white to-blue-50 px-5 py-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Detail page
              </div>
              <h3 className="mt-1 text-2xl font-semibold text-slate-900">{title}</h3>
              <p className="mt-1 text-sm text-slate-600">{description}</p>
            </div>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              {selectedItem.kind}
            </span>
          </div>
        </div>
        <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="p-5">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              {selectedItem.kind === "video" ? (
                <div className="relative">
                  <img
                    src={selectedItem.poster}
                    alt={selectedItem.title}
                    className="h-[360px] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white text-xl backdrop-blur">
                      ▶
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="h-[360px] w-full object-cover"
                />
              )}
              <div className="space-y-3 p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-slate-900 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                    {selectedItem.category}
                  </span>
                  {selectedItem.locationLabel && (
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600">
                      {selectedItem.locationLabel}
                    </span>
                  )}
                </div>
                <h4 className="text-2xl font-semibold text-slate-900">{selectedItem.title}</h4>
                <p className="text-sm leading-6 text-slate-600">{selectedItem.body}</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-slate-200 bg-white p-3">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Kind
                    </div>
                    <div className="mt-1 text-sm font-medium text-slate-900">{selectedItem.kind}</div>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-3">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Route
                    </div>
                    <div className="mt-1 text-sm font-medium text-slate-900">{location.pathname}</div>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-3">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Detail id
                    </div>
                    <div className="mt-1 text-sm font-medium text-slate-900">{selectedItem.id}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4 border-t border-slate-200 bg-slate-50 p-5 lg:border-l lg:border-t-0">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Quick actions
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => navigate(`/view/${detailPageId}`)}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                >
                  Back to gallery
                </button>
                {selectedSpot && (
                  <>
                    <a
                      href={buildGoogleMapsStreetViewUrl({
                        viewpoint: selectedSpot.viewpoint,
                        heading: selectedSpot.heading,
                        pitch: selectedSpot.pitch,
                        fov: selectedSpot.fov,
                      })}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700"
                    >
                      Street View
                    </a>
                    <a
                      href={buildGoogleMapsMapUrl({
                        center: selectedSpot.center,
                        zoom: selectedSpot.zoom,
                      })}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700"
                    >
                      Open map
                    </a>
                  </>
                )}
              </div>
            </div>
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {t("Detail note")}
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {t(
                  "The gallery cards keep the launch path short, while this page focuses on a clean, single-item reading experience."
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  },

  RealEstateInquiryCard: ({
    title = "Property inquiry",
    description = "Collect buy, rent, or sell requests in a premium lead form.",
    submitLabel = "Send inquiry",
    followUpLabel = "We will reply with matching listings and a showing plan.",
    items = DEMO_REAL_ESTATE_ITEMS,
    selectedPropertyIdKey = "selectedPropertyId",
    __stackpage,
  }: StackPageComponentProps<{
    title?: string;
    description?: string;
    submitLabel?: string;
    followUpLabel?: string;
    items?: Array<any>;
    selectedPropertyIdKey?: string;
  }>) => {
    const t = useT();
    const selectedId = String(__stackpage?.getPageState?.(selectedPropertyIdKey, "") || "");
    const selectedItem = items.find((item: any) => item.id === selectedId) || null;
    const [name, setName] = useState("Aida Dabo");
    const [email, setEmail] = useState("hello@example.com");
    const [intent, setIntent] = useState(selectedItem?.kind === "rent" ? "Rent" : "Buy");
    const [budget, setBudget] = useState("¥100,000,000");
    const [area, setArea] = useState("Tokyo 23 wards");
    const [message, setMessage] = useState("Please share properties that match this request.");
    const [status, setStatus] = useState("Ready to receive a property inquiry");
    const [lastSubmittedAt, setLastSubmittedAt] = useState("");
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
      setIntent(selectedItem?.kind === "rent" ? "Rent" : "Buy");
      if (selectedItem) {
        setMessage(`Please send the latest details for ${selectedItem.title}.`);
      }
    }, [selectedItem?.id, selectedItem?.kind, selectedItem?.title]);

    const handleSubmit = () => {
      const submittedAt = new Date().toISOString();
      __stackpage?.emit?.(
        "realestate:inquiry:submitted",
        buildRealEstateInquiryPayload(
          { name, email, intent, budget, area, message, submittedAt },
          selectedItem,
          selectedPropertyIdKey
        )
      );
      setStatus("Inquiry sent — a matching list can be prepared.");
      setLastSubmittedAt(submittedAt);
      setSubmitted(true);
    };

    return (
      <div id="realestate-inquiry-card" className="overflow-hidden rounded-2xl border border-rose-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-rose-50 via-white to-orange-50 px-5 py-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-600">
                {t("Lead capture")}
              </div>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">{t(title)}</h3>
              <p className="mt-1 text-sm text-slate-600">{t(description)}</p>
            </div>
            <span className="rounded-full border border-rose-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-700">
              {t("buy / rent")}
            </span>
          </div>
        </div>
        <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-3 p-5">
            <div className="grid gap-3 md:grid-cols-2">
              <label className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {t("Name")}
                </span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-rose-300 focus:bg-white focus:ring-2 focus:ring-rose-100"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("Your name")}
                />
              </label>
              <label className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {t("Email")}
                </span>
                <input
                  type="email"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-rose-300 focus:bg-white focus:ring-2 focus:ring-rose-100"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("you@example.com")}
                />
              </label>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <label className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {t("Intent")}
                </span>
                <select
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-rose-300 focus:bg-white focus:ring-2 focus:ring-rose-100"
                  value={intent}
                  onChange={(e) => setIntent(e.target.value)}
                >
                  <option>{t("Buy")}</option>
                  <option>{t("Rent")}</option>
                  <option>{t("Sell")}</option>
                </select>
              </label>
              <label className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {t("Budget")}
                </span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-rose-300 focus:bg-white focus:ring-2 focus:ring-rose-100"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder={t("Budget")}
                />
              </label>
              <label className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {t("Area")}
                </span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-rose-300 focus:bg-white focus:ring-2 focus:ring-rose-100"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder={t("Preferred area")}
                />
              </label>
            </div>
            <label className="space-y-1 block">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {t("Message")}
              </span>
              <textarea
                className="min-h-[120px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-rose-300 focus:bg-white focus:ring-2 focus:ring-rose-100"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t("Describe the property brief")}
              />
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center justify-center rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
              >
                {t(submitLabel)}
              </button>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
                {t(followUpLabel)}
              </div>
            </div>
          </div>
          <div className="border-t border-slate-200 bg-slate-50 p-5 lg:border-l lg:border-t-0">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {t("Inquiry snapshot")}
              </div>
              <div className="mt-3 space-y-3">
                {selectedItem ? (
                  <div className="rounded-xl border border-rose-100 bg-rose-50/70 px-3 py-3">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-rose-600">
                      {t("Selected property")}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-slate-900">{t(selectedItem.title)}</div>
                    <div className="mt-1 text-xs leading-5 text-slate-600">
                      {t(selectedItem.locationLabel || "")} · {t(selectedItem.kind)}
                    </div>
                  </div>
                ) : null}
                <div className={`rounded-xl px-3 py-3 ${submitted ? "border border-emerald-100 bg-emerald-50/70" : "border border-slate-200 bg-slate-50"}`}>
                  <div className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${submitted ? "text-emerald-600" : "text-slate-400"}`}>
                    {t("Submission state")}
                  </div>
                  <div className={`mt-1 text-sm font-semibold ${submitted ? "text-emerald-700" : "text-slate-900"}`}>
                    {submitted ? t("Submitted") : t("Ready")}
                  </div>
                  <div className="mt-1 text-xs leading-5 text-slate-600">
                    {submitted ? t("The inquiry payload now includes the selected property context.") : t("The form will sync with the selected property before sending.")}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {t("Status")}
                  </div>
                  <div className="mt-1 text-sm font-medium text-slate-900">{status}</div>
                </div>
                <div className="grid gap-2">
                  <div className="rounded-xl bg-slate-50 px-3 py-2">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {t("Intent / area")}
                    </div>
                    <div className="mt-1 text-sm font-medium text-slate-900">
                      {intent} · {area}
                    </div>
                  </div>
                  <div className="rounded-xl bg-slate-50 px-3 py-2">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {t("Budget / email")}
                    </div>
                    <div className="mt-1 text-sm font-medium text-slate-900">
                      {budget} · {email}
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-dashed border-rose-200 bg-rose-50/70 px-3 py-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-rose-600">
                    {t("Recent activity")}
                  </div>
                  <div className="mt-1 text-sm text-slate-700">
                    {lastSubmittedAt
                      ? `${t("Submitted at")} ${new Date(lastSubmittedAt).toLocaleString()}`
                      : t("Waiting for the first real-estate inquiry.")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  RealEstateFilterBar: ({
    title = "Browse properties",
    description = "Filter the showcase by sale or rent, and narrow the results with a keyword.",
    intentKey = "realestate.filter.intent",
    keywordKey = "realestate.filter.keyword",
    activeIntent = "all",
    activeKeyword = "",
    __stackpage,
  }: StackPageComponentProps<{
    title?: string;
    description?: string;
    intentKey?: string;
    keywordKey?: string;
    activeIntent?: string;
    activeKeyword?: string;
  }>) => {
    const t = useT();
    const {
      value: keyword,
      setValue: setKeyword,
      externalValue: sharedKeyword,
    } = useOptimisticSharedStringInputState({
      stackpage: __stackpage,
      key: keywordKey,
      fallback: activeKeyword,
    });
    const {
      value: intent,
      setValue: setIntent,
      externalValue: sharedIntent,
    } = useOptimisticSharedStringInputState({
      stackpage: __stackpage,
      key: intentKey,
      fallback: activeIntent,
    });

    const emitFilter = (nextIntent: string, nextKeyword: string) => {
      __stackpage?.emit?.("realestate:filter:changed", {
        intent: nextIntent,
        keyword: nextKeyword,
        intentKey,
        keywordKey,
      });
    };

    const chips = [
      { label: t("All"), value: "all" },
      { label: t("Sell"), value: "sale" },
      { label: t("Rent"), value: "rent" },
    ];

    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-slate-50 via-white to-rose-50 px-5 py-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {t("Property controls")}
              </div>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">{t(title)}</h3>
              <p className="mt-1 text-sm text-slate-600">{t(description)}</p>
            </div>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              {t("buy / rent")}
            </span>
          </div>
        </div>
        <div className="space-y-4 p-5">
          <div className="flex flex-wrap gap-2">
            {chips.map((chip) => {
              const selected = intent === chip.value;
              return (
                <button
                  key={chip.value}
                  type="button"
                  onClick={() => {
                    setIntent(chip.value);
                    emitFilter(chip.value, keyword);
                  }}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    selected
                      ? "border-rose-300 bg-rose-50 text-rose-700 shadow-sm"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
          <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
            <label className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {t("Search keyword")}
              </span>
              <input
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-rose-300 focus:bg-white focus:ring-2 focus:ring-rose-100"
                value={sharedKeyword || keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                  emitFilter(intent, e.target.value);
                }}
                placeholder={t("Search by title, area, or summary")}
              />
            </label>
            <div className="flex items-end">
              <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-600">
                {t("Current filter:")} <span className="font-semibold text-slate-900">{sharedIntent || intent}</span>
                {sharedKeyword || keyword ? (
                  <>
                    {" "}
                    · <span className="font-semibold text-slate-900">{sharedKeyword || keyword}</span>
                  </>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700">
              {t("Live page-state driven")}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {t("Shared filters")}
            </span>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
              {t("Search updates the grid below.")}
            </span>
          </div>
        </div>
      </div>
    );
  },


  RealEstateNeighborhoodCard: ({
    title = "Neighborhood guide",
    description = "A calm area summary for the selected property with nearby points of interest.",
    items = DEMO_REAL_ESTATE_ITEMS,
    selectedPropertyIdKey = "selectedPropertyId",
    __stackpage,
  }: StackPageComponentProps<{
    title?: string;
    description?: string;
    items?: Array<any>;
    selectedPropertyIdKey?: string;
  }>) => {
    const t = useT();
    const selectedId = String(__stackpage?.getPageState?.(selectedPropertyIdKey, "") || "");
    const selectedItem = items.find((item: any) => item.id === selectedId) || items[0] || null;
    const profile = getRealEstateAreaProfile(selectedItem || undefined);

    return (
      <div className="overflow-hidden rounded-2xl border border-amber-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-amber-50 via-white to-orange-50 px-5 py-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
                {t("Area context")}
              </div>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">{t(title)}</h3>
              <p className="mt-1 text-sm text-slate-600">{t(description)}</p>
            </div>
            <span className="rounded-full border border-amber-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-700">
              {t("neighborhood")}
            </span>
          </div>
        </div>
        <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="p-5">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {t("Selected property")}
                  </div>
                  <div className="mt-1 text-lg font-semibold text-slate-900">
                    {t(selectedItem?.title || "—")}
                  </div>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600">
                  {t(selectedItem?.locationLabel || "—")}
                </span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-white p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {t("Commute")}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">{t(profile.commute)}</div>
                </div>
                <div className="rounded-xl bg-white p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {t("Walk time")}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">{t(profile.walk)}</div>
                </div>
                <div className="rounded-xl bg-white p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {t("Vibe")}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">{t(profile.vibe)}</div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {profile.nearby.map((nearby) => (
                  <span
                    key={nearby}
                    className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600"
                  >
                    {nearby}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-slate-200 bg-slate-50 p-5 lg:border-l lg:border-t-0">
            <div className="rounded-2xl border border-dashed border-amber-200 bg-white p-4 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
                {t("Area note")}
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {t("This card helps buyers and renters understand the neighborhood before opening map or street view links.")}
              </p>
              <div className="mt-4 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800">
                {selectedItem?.kind === "rent"
                  ? t("Tenant-friendly access")
                  : t("Buyer-friendly area context")}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  RealEstateAccessCard: ({
    title = "Access and location",
    description = "Street view, map, and quick property context in one calm panel.",
    items = DEMO_REAL_ESTATE_ITEMS,
    selectedPropertyIdKey = "selectedPropertyId",
    __stackpage,
  }: StackPageComponentProps<{
    title?: string;
    description?: string;
    items?: Array<any>;
    selectedPropertyIdKey?: string;
  }>) => {
    const t = useT();
    const selectedId = String(__stackpage?.getPageState?.(selectedPropertyIdKey, "") || "");
    const selectedItem = items.find((item: any) => item.id === selectedId) || items[0] || null;
    const selectedSpot = selectedItem
      ? DEMO_REAL_ESTATE_LOCATIONS.find((spot) => spot.id === selectedItem.locationSpotId)
      : null;

    if (!selectedItem || !selectedSpot) {
      return null;
    }

    return (
      <div className="overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-blue-50 via-white to-cyan-50 px-5 py-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                {t("Access panel")}
              </div>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">{t(title)}</h3>
              <p className="mt-1 text-sm text-slate-600">{t(description)}</p>
            </div>
            <span className="rounded-full border border-blue-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
              {selectedItem.locationLabel}
            </span>
          </div>
        </div>
        <div className="grid gap-4 p-5 lg:grid-cols-[1fr_auto]">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                {t("Street preview")}
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-900">{selectedSpot.locationLabel}</div>
              <p className="mt-2 text-xs text-slate-600">{t("Open the panoramic street view for entrances and surrounding context.")}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                {t("Map check")}
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-900">{t("Transit and commute")}</div>
              <p className="mt-2 text-xs text-slate-600">{t("Check the map before scheduling a property visit.")}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                {t("Detail route")}
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-900">{selectedItem.kind}</div>
              <p className="mt-2 text-xs text-slate-600">{t("Open the detail page for full property reading.")}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 lg:justify-end">
            <a
              href={buildGoogleMapsStreetViewUrl({
                viewpoint: selectedSpot.viewpoint as string,
                heading: selectedSpot.heading as number,
                pitch: selectedSpot.pitch as number,
                fov: selectedSpot.fov as number,
              })}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700"
            >
              {t("Open Street View")}
            </a>
            <a
              href={buildGoogleMapsMapUrl({
                center: selectedSpot.center as string,
                zoom: selectedSpot.zoom as number,
              })}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700"
            >
              {t("Open map")}
            </a>
            <button
              type="button"
              onClick={() => __stackpage?.emit?.("realestate:property:inspect", { id: selectedItem.id, selectedPropertyIdKey })}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              {t("Inspect property")}
            </button>
          </div>
        </div>
      </div>
    );
  },

  RealEstatePropertyGrid: (props: StackPageComponentProps<{
    title?: string;
    description?: string;
    items?: Array<any>;
    detailPageId?: string;
    selectedPropertyIdKey?: string;
    emptyText?: string;
    intentKey?: string;
    keywordKey?: string;
    __stackpage?: any;
  }>) => {
    const {
      title = "Featured properties",
      description = "Premium sale and rental cards with detail actions for each property.",
      items = DEMO_REAL_ESTATE_ITEMS,
      detailPageId = "page-realestate-detail-demo",
      selectedPropertyIdKey = "selectedPropertyId",
      emptyText = "No properties available.",
      intentKey = "realestate.filter.intent",
      keywordKey = "realestate.filter.keyword",
    } = props;
    const stackpageRuntime = props.__stackpage ?? (globalThis as any).__stackpage;
    const t = useT();
    const navigate = useNavigate();
    const activeIntent = String(
      stackpageRuntime?.getPageState?.(intentKey, "all") || "all"
    ).toLowerCase();
    const activeKeyword = String(stackpageRuntime?.getPageState?.(keywordKey, "") || "")
      .trim()
      .toLowerCase();
    const selectedId = String(stackpageRuntime?.getPageState?.(selectedPropertyIdKey, "") || "");
    const openDetail = (item: any) => {
      const path = buildRealEstateDetailTransitionPath(detailPageId, item.id, "listing-grid");
      stackpageRuntime?.setPageState?.(selectedPropertyIdKey, item.id);
      stackpageRuntime?.setPageState?.("realestate.transition.source", "listing-grid");
      stackpageRuntime?.emit?.("realestate:property:selected", buildRealEstatePropertySelectionEvent(item));
      if (typeof window !== "undefined") {
        window.location.assign(path);
        return;
      }
      navigate(path);
    };
    const filteredItems = (items || []).filter((item: any) => {
      const intentMatches =
        activeIntent === "all" || String(item.kind || "").toLowerCase() === activeIntent;
      const keywordMatches =
        !activeKeyword ||
        [item.title, item.summary, item.body, item.category, item.locationLabel, item.price]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(activeKeyword));
      return intentMatches && keywordMatches;
    });

    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              {t("Property lane")}
            </div>
            <h3 className="mt-1 text-xl font-semibold text-slate-900">{t(title)}</h3>
            <p className="mt-1 text-sm text-slate-600">{t(description)}</p>
          </div>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            {t("buy / rent")}
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {t("Active filter:")} {t(activeIntent)}
          </span>
          <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700">
            {t(activeIntent)}
          </span>
          {activeKeyword ? (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {t("keyword:")} {activeKeyword}
            </span>
          ) : null}
          <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">
            {t("Showing")} {filteredItems.length} {t("matches")} / {(items || []).length} {t("visible")}
          </span>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-rose-600">
              {t("Results summary")}
            </div>
            <div className="mt-1 text-sm font-semibold text-slate-900">
              {filteredItems.length} {t("matches")}
            </div>
            <div className="mt-1 text-xs text-slate-600">
              {t("Search results update immediately when you change the filter or keyword.")}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              {t("Current intent")}
            </div>
            <div className="mt-1 text-sm font-semibold text-slate-900">{t(activeIntent)}</div>
            <div className="mt-1 text-xs text-slate-500">
              {activeIntent === "sale"
                ? t("Sale listings")
                : activeIntent === "rent"
                  ? t("Rental listings")
                  : t("All properties")}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              {t("Keyword")}
            </div>
            <div className="mt-1 text-sm font-semibold text-slate-900">
              {activeKeyword ? activeKeyword : t("All properties")}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              {t("The grid below reads the shared search state.")}
            </div>
          </div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredItems.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
              {emptyText}
            </div>
          ) : (
            filteredItems.map((item: any) => {
              const isSelected = item.id === selectedId;
              const kindAccent =
                item.kind === "sale"
                  ? {
                      shell: "from-rose-50 to-orange-50 border-rose-200",
                      ribbon: "bg-rose-600 text-white",
                      halo: "bg-rose-100 text-rose-700",
                      button: "bg-rose-600 text-white hover:bg-rose-500",
                    }
                  : {
                      shell: "from-sky-50 to-cyan-50 border-sky-200",
                      ribbon: "bg-sky-600 text-white",
                      halo: "bg-sky-100 text-sky-700",
                      button: "bg-sky-600 text-white hover:bg-sky-500",
                    };
              return (
                <div
                  key={item.id}
                  className={`overflow-hidden rounded-2xl border bg-gradient-to-br ${kindAccent.shell} shadow-sm transition ${isSelected ? "ring-2 ring-rose-400 ring-offset-2 ring-offset-white" : ""}`}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${kindAccent.ribbon}`}
                          >
                            {t(item.kind)}
                          </span>
                          <span className="rounded-full bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                            {t(item.category)}
                          </span>
                          <span className="text-xs font-medium text-slate-500">
                            {t(item.status)}
                          </span>
                          {isSelected ? (
                            <span className="rounded-full bg-rose-600 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                              {t("Selected property")}
                            </span>
                          ) : null}
                        </div>
                        <h4 className="mt-2 text-lg font-semibold text-slate-900">{t(item.title)}</h4>
                      </div>
                      <span className={`rounded-full px-2 py-1 text-[10px] font-medium ${kindAccent.halo}`}>
                        {t(item.locationLabel)}
                      </span>
                    </div>

                    {item.kind === "sale" && (
                      <div className="mt-4 overflow-hidden rounded-xl border border-white/70 bg-white">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-44 w-full object-cover"
                        />
                        <div className="p-4">
                          <p className="text-sm text-slate-700">{t(item.summary)}</p>
                        </div>
                      </div>
                    )}

                    {item.kind === "rent" && item.video ? (
                      <div className="mt-4 overflow-hidden rounded-xl border border-white/70 bg-slate-950">
                        <div className="relative h-44">
                          <img
                            src={item.poster}
                            alt={item.title}
                            className="h-full w-full object-cover opacity-85"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur">
                              ▶
                            </div>
                          </div>
                        </div>
                        <div className="p-4 text-white">
                          <p className="text-sm text-white/85">{t(item.summary)}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4 rounded-xl border border-white/70 bg-white/80 p-4">
                        <p className="text-sm text-slate-700">{t(item.summary)}</p>
                        <p className="mt-2 text-xs leading-5 text-slate-500">{t(item.body)}</p>
                      </div>
                    )}

                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <div className="rounded-xl bg-white px-3 py-2">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                          {t("Price")}
                        </div>
                        <div className="mt-1 text-sm font-semibold text-slate-900">{t(item.price)}</div>
                      </div>
                      <div className="rounded-xl bg-white px-3 py-2">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                          {t("Area")}
                        </div>
                        <div className="mt-1 text-sm font-semibold text-slate-900">{t(item.area)}</div>
                      </div>
                      <div className="rounded-xl bg-white px-3 py-2">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                          {t("Rooms")}
                        </div>
                        <div className="mt-1 text-sm font-semibold text-slate-900">{t(item.rooms)}</div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-2">
                        <span className={`rounded-full px-2 py-1 text-[10px] font-medium ${kindAccent.halo}`}>
                          {t(item.kind)}
                        </span>
                        <span className="rounded-full bg-white px-2 py-1 text-[10px] font-medium text-slate-600">
                          {t("detail page")}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => openDetail(item)}
                        className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${kindAccent.button}`}
                      >
                        {t("Open details")}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  },

  RealEstatePropertySlider: (props: StackPageComponentProps<{
    title?: string;
    description?: string;
    slides?: Array<any>;
    detailPageId?: string;
    selectedPropertyIdKey?: string;
    __stackpage?: any;
  }>) => {
    const {
      title = "Property slider",
      description = "Horizontal premium cards for featured homes and rentals.",
      slides = DEMO_REAL_ESTATE_ITEMS,
      detailPageId = "page-realestate-detail-demo",
      selectedPropertyIdKey = "selectedPropertyId",
    } = props;
    const stackpageRuntime = props.__stackpage ?? (globalThis as any).__stackpage;
    const t = useT();
    const navigate = useNavigate();
    const selectedId = String(stackpageRuntime?.getPageState?.(selectedPropertyIdKey, "") || "");
    const openDetail = (item: any) => {
      const path = buildRealEstateDetailTransitionPath(detailPageId, item.id, "slider-card");
      stackpageRuntime?.setPageState?.(selectedPropertyIdKey, item.id);
      stackpageRuntime?.setPageState?.("realestate.transition.source", "slider-card");
      stackpageRuntime?.emit?.("realestate:property:selected", buildRealEstatePropertySelectionEvent(item, "slider-card"));
      if (typeof window !== "undefined") {
        window.location.assign(path);
        return;
      }
      navigate(path);
    };
    return (
      <div className="overflow-hidden rounded-2xl border border-violet-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-violet-50 via-white to-fuchsia-50 px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
                {t("Horizontal property slider")}
              </div>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">{t(title)}</h3>
              <p className="mt-1 text-sm text-slate-600">{t(description)}</p>
            </div>
            <span className="rounded-full border border-violet-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-700">
              {t("swipe")}
            </span>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto px-5 py-5 [scrollbar-width:thin]">
          {slides.map((item) => {
            const isSelected = item.id === selectedId;
            return (
            <div
              key={item.id}
              className={`min-w-[270px] max-w-[270px] shrink-0 overflow-hidden rounded-2xl border bg-white shadow-sm snap-start transition ${isSelected ? "border-rose-300 ring-2 ring-rose-300 ring-offset-2 ring-offset-white" : "border-slate-200"}`}
            >
              <div className="relative h-44">
                <img
                  src={item.image || item.poster}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80">
                    {t(item.kind)}
                  </div>
                  <div className="mt-1 text-lg font-semibold text-white">{t(item.title)}</div>
                  {isSelected ? (
                    <span className="mt-2 inline-flex rounded-full bg-rose-600 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                      {t("Selected property")}
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-slate-600">{t(item.summary)}</p>
                <div className="mt-4 flex items-center justify-between gap-2">
                  <span className="text-xs text-slate-500">{t(item.locationLabel)}</span>
                  <button
                    type="button"
                    onClick={() => openDetail(item)}
                    className="rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-xs font-semibold text-violet-700 transition hover:bg-violet-100"
                  >
                    {t("Open detail")}
                  </button>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    );
  },

  RealEstateStreetViewCard: ({
    title = "Neighborhood Street View",
    subtitle = "Preview the surroundings for the selected property before a viewing.",
    viewpoint = "35.6595,139.7005",
    heading = 175,
    pitch = 8,
    fov = 75,
    locationLabel = "Shibuya, Tokyo",
  }: StackPageComponentProps<{
    title?: string;
    subtitle?: string;
    viewpoint?: string;
    heading?: number;
    pitch?: number;
    fov?: number;
    locationLabel?: string;
  }>) => {
    const t = useT();
    const streetViewUrl = buildGoogleMapsStreetViewUrl({ viewpoint, heading, pitch, fov });
    return (
      <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-emerald-50 via-white to-cyan-50 px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
                {t("Location lane")}
              </div>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">{t(title)}</h3>
              <p className="mt-1 text-sm text-slate-600">{t(subtitle)}</p>
            </div>
            <span className="rounded-full border border-emerald-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
              {t("street view")}
            </span>
          </div>
        </div>
        <div className="grid gap-0 lg:grid-cols-[1fr_0.85fr]">
          <div className="min-h-[240px] bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_55%),linear-gradient(135deg,_#f8fffb,_#effaf6)] p-5">
            <div className="flex h-full flex-col justify-between rounded-2xl border border-emerald-100 bg-white/80 p-5 backdrop-blur-sm">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-600">
                  {t("Google Maps panoramic link")}
                </div>
                <div className="mt-3 text-2xl font-semibold text-slate-900">{t(locationLabel)}</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {t("Use the street view card to preview surrounding streets, entrances, and nearby context before a showing.")}
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                  {t("viewpoint")} {viewpoint}
                </span>
                <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700">
                  {t("heading")} {heading}°
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {t("fov")} {fov}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 p-5">
            <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/60 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
                {t("Preview card")}
              </div>
              <div className="mt-2 text-sm text-slate-700">
                {t("This card keeps the demo lightweight while still opening the official Google Street View route.")}
              </div>
            </div>
            <a
              href={streetViewUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              {t("Open Street View")}
            </a>
          </div>
        </div>
      </div>
    );
  },

  RealEstateMapCard: ({
    title = "Property map",
    subtitle = "Use the map card to check routes, transit, and neighborhood context.",
    center = "35.6595,139.7005",
    zoom = 16,
    locationLabel = "Shibuya, Tokyo",
  }: StackPageComponentProps<{
    title?: string;
    subtitle?: string;
    center?: string;
    zoom?: number;
    locationLabel?: string;
  }>) => {
    const t = useT();
    const mapUrl = buildGoogleMapsMapUrl({ center, zoom });
    return (
      <div className="overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-blue-50 via-white to-cyan-50 px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                {t("Location lane")}
              </div>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">{t(title)}</h3>
              <p className="mt-1 text-sm text-slate-600">{t(subtitle)}</p>
            </div>
            <span className="rounded-full border border-blue-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
              {t("map")}
            </span>
          </div>
        </div>
        <div className="grid gap-0 lg:grid-cols-[1fr_0.85fr]">
          <div className="min-h-[240px] bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_55%),linear-gradient(135deg,_#f7fbff,_#eef6ff)] p-5">
            <div className="flex h-full flex-col justify-between rounded-2xl border border-blue-100 bg-white/85 p-5 backdrop-blur-sm">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-600">
                  {t("Google Maps location link")}
                </div>
                <div className="mt-3 text-2xl font-semibold text-slate-900">{t(locationLabel)}</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {t("The map card is best for quick route context, commuting checks, and property visits.")}
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                  {t("center")} {center}
                </span>
                <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700">
                  {t("zoom")} {zoom}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 p-5">
            <div className="rounded-2xl border border-dashed border-blue-200 bg-blue-50/60 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                {t("Preview card")}
              </div>
              <div className="mt-2 text-sm text-slate-700">
                {t("This card keeps the demo lightweight and still opens the official Google Maps location URL.")}
              </div>
            </div>
            <a
              href={mapUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              {t("Open map")}
            </a>
          </div>
        </div>
      </div>
    );
  },

  RealEstateDetailPanel: ({
    title = "Property detail",
    description = "Open a card from the gallery to inspect the selected property and its viewing links.",
    items = DEMO_REAL_ESTATE_ITEMS,
    detailPageId = "page-realestate-detail-demo",
    emptyText = "No property selected yet.",
    __stackpage,
  }: StackPageComponentProps<{
    title?: string;
    description?: string;
    items?: Array<any>;
    detailPageId?: string;
    emptyText?: string;
  }>) => {
    const t = useT();
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const queryItem = query.get("item") || String(__stackpage?.getPageState?.("selectedPropertyId", "") || "");
    const transitionSource =
      query.get("source") || String(__stackpage?.getPageState?.("realestate.transition.source", "") || "");
    const selectedItem = resolveRealEstateDetailItem(
      items,
      queryItem,
      String(__stackpage?.getPageState?.("selectedPropertyId", "") || "")
    );
    if (!selectedItem) {
      return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            {t("Detail page")}
          </div>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">{t(title)}</h3>
          <p className="mt-1 text-sm text-slate-600">{t(description)}</p>
          <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
            {t(emptyText)}
          </div>
          <button
            type="button"
            onClick={() => navigate(`/view/${detailPageId}`)}
            className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
          >
            {t("Back to listings")}
          </button>
        </div>
      );
    }
    const selectedSpot = selectedItem
      ? DEMO_REAL_ESTATE_LOCATIONS.find((spot) => spot.id === selectedItem.locationSpotId)
      : null;
    const areaProfile = getRealEstateAreaProfile(selectedItem || undefined);
    const detailGuidance = getRealEstateDetailGuidance(selectedItem || undefined);
    const detailAccent =
      selectedItem.kind === "sale"
        ? {
            pill: "bg-rose-600 text-white",
            panel: "border-rose-200 bg-rose-50/60",
            chip: "bg-rose-100 text-rose-700",
          }
        : {
            pill: "bg-sky-600 text-white",
            panel: "border-sky-200 bg-sky-50/60",
            chip: "bg-sky-100 text-sky-700",
          };

    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-slate-50 via-white to-rose-50 px-5 py-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {t("Detail page")}
              </div>
              <h3 className="mt-1 text-2xl font-semibold text-slate-900">{t(title)}</h3>
              <p className="mt-1 text-sm text-slate-600">{t(description)}</p>
            </div>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              {t(selectedItem.kind)}
            </span>
          </div>
        </div>
        <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="p-5">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              {transitionSource ? (
                <div className="mb-5 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                        {t("Opened from")}
                      </div>
                      <div className="mt-1 text-sm font-semibold text-slate-900">
                        {t("Selection trace")}
                      </div>
                      <p className="mt-1 text-xs leading-5 text-slate-600">
                        {t("This detail view keeps the listing origin visible for the handoff.")}
                      </p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      {t(
                        transitionSource === "slider-card"
                          ? "Slider card"
                          : transitionSource === "listing-grid"
                            ? "Listing grid"
                            : transitionSource
                      )}
                    </span>
                  </div>
                  <div className="mt-4 grid gap-2 sm:grid-cols-3">
                    <div className="rounded-xl bg-slate-50 px-3 py-2">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        {t("Current property")}
                      </div>
                      <div className="mt-1 text-sm font-medium text-slate-900">{t(selectedItem.title)}</div>
                    </div>
                    <div className="rounded-xl bg-slate-50 px-3 py-2">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        {t("Source")}
                      </div>
                      <div className="mt-1 text-sm font-medium text-slate-900">
                        {t(
                          transitionSource === "slider-card"
                            ? "Slider card"
                            : transitionSource === "listing-grid"
                              ? "Listing grid"
                              : transitionSource
                        )}
                      </div>
                    </div>
                    <div className="rounded-xl bg-slate-50 px-3 py-2">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        {t("Flow")}
                      </div>
                      <div className="mt-1 text-sm font-medium text-slate-900">
                        {t("Listing → detail")}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              {selectedItem.video ? (
                <div className="relative">
                  <img
                    src={selectedItem.poster}
                    alt={selectedItem.title}
                    className="h-[360px] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white text-xl backdrop-blur">
                      ▶
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="h-[360px] w-full object-cover"
                />
              )}
              <div className="space-y-3 p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${detailAccent.pill}`}>
                    {t(selectedItem.category)}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600">
                    {t(selectedItem.price)}
                  </span>
                  {selectedItem.locationLabel && (
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600">
                      {t(selectedItem.locationLabel)}
                    </span>
                  )}
                </div>
                <h4 className="text-2xl font-semibold text-slate-900">{t(selectedItem.title)}</h4>
                <p className="text-sm leading-6 text-slate-600">{t(selectedItem.body)}</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-slate-200 bg-white p-3">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {t("Area")}
                    </div>
                    <div className="mt-1 text-sm font-medium text-slate-900">{t(selectedItem.area)}</div>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-3">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {t("Rooms")}
                    </div>
                    <div className="mt-1 text-sm font-medium text-slate-900">{t(selectedItem.rooms)}</div>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-3">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {t("Status")}
                    </div>
                    <div className="mt-1 text-sm font-medium text-slate-900">{t(selectedItem.status)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4 border-t border-slate-200 bg-slate-50 p-5 lg:border-l lg:border-t-0">
            <div className={`rounded-2xl border p-4 shadow-sm ${detailAccent.panel}`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {t("Listing recap")}
                  </div>
                  <h4 className="mt-1 text-lg font-semibold text-slate-900">{t(selectedItem.title)}</h4>
                  <p className="mt-1 text-sm text-slate-600">{t("The selected card stays visible here so the detail handoff feels continuous.")}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${detailAccent.chip}`}>
                  {t("Selected property")}
                </span>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                <div className="rounded-xl bg-white px-3 py-2">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {t("Price")}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">{t(selectedItem.price)}</div>
                </div>
                <div className="rounded-xl bg-white px-3 py-2">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {t("Area")}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">{t(selectedItem.area)}</div>
                </div>
                <div className="rounded-xl bg-white px-3 py-2">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {t("Rooms")}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">{t(selectedItem.rooms)}</div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {t("Quick actions")}
                  </div>
                  <p className="mt-1 text-sm text-slate-600">
                    {t(detailGuidance.summary)}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${
                    detailGuidance.accent === "blue"
                      ? "bg-blue-50 text-blue-700"
                      : "bg-rose-50 text-rose-700"
                  }`}
                >
                  {t(detailGuidance.label)}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => navigate(`/view/${detailPageId}`)}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                >
                  {t("Back to listings")}
                </button>
                <a
                  href="#realestate-inquiry-card"
                  className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700"
                >
                  {t("Ask about this property")}
                </a>
                {selectedSpot && (
                  <>
                    <a
                      href={buildGoogleMapsStreetViewUrl({
                        viewpoint: selectedSpot.viewpoint,
                        heading: selectedSpot.heading,
                        pitch: selectedSpot.pitch,
                        fov: selectedSpot.fov,
                      })}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700"
                    >
                      {t("Street View")}
                    </a>
                    <a
                      href={buildGoogleMapsMapUrl({
                        center: selectedSpot.center,
                        zoom: selectedSpot.zoom,
                      })}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700"
                    >
                      {t("Open map")}
                    </a>
                  </>
                )}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {t("Decision snapshot")}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                    {detailGuidance.priorities.map((priority) => (
                  <span
                    key={priority}
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      detailGuidance.accent === "blue"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-rose-50 text-rose-700"
                    }`}
                  >
                      {t(priority)}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                {t(detailGuidance.actionHint)}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {t("Area snapshot")}
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {t("Commute")}
                  </div>
                  <div className="mt-1 text-sm font-medium text-slate-900">{t(areaProfile.commute)}</div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {t("Walk time")}
                  </div>
                  <div className="mt-1 text-sm font-medium text-slate-900">{t(areaProfile.walk)}</div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {t("Vibe")}
                  </div>
                  <div className="mt-1 text-sm font-medium text-slate-900">{t(areaProfile.vibe)}</div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {areaProfile.nearby.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
                  >
                    {t(tag)}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {t(detailGuidance.title)}
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{t(detailGuidance.summary)}</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                {detailGuidance.checklist.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-slate-400" />
                    <span>{t(line)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-500">
                {t(detailGuidance.actionHint)}
              </div>
            </div>
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {t("Showing checklist")}
              </div>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                <li>{t("Confirm the selected room count and floor area before the visit.")}</li>
                <li>{t("Check the neighborhood profile and transit path in one glance.")}</li>
                <li>{t("Use Street View or Map to shorten the pre-showing decision flow.")}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  },

  DemoSearchBar: ({
    title = "Search bar",
    keywordKey = "demo.search.keyword",
    searchEvent = "demo:search:changed",
    placeholder = "Type to search",
    description = "Typing updates shared keyword state so the result list can filter itself.",
    eventKind = "search_filter",
    __stackpage,
  }: StackPageComponentProps<{
    title?: string;
    keywordKey?: string;
    searchEvent?: string;
    placeholder?: string;
    description?: string;
    eventKind?: EventPatternKind;
  }>) => {
    const t = useT();
    const { value: keyword, setValue: setKeyword, externalValue } =
      useOptimisticSharedStringInputState({
        stackpage: __stackpage,
        key: keywordKey,
        fallback: "",
      });

    const handleChange = (value: string) => {
      setKeyword(value);
      __stackpage?.emit?.("search", {
        q: value,
        keyword: value,
        keywordKey,
        searchEvent,
      });
    };

    return (
      <div className="rounded-lg border border-blue-200 bg-white p-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-base font-semibold text-blue-900">{t(title)}</h3>
          <EventPatternBadge kind={eventKind} />
        </div>
        <p className="text-xs text-blue-700 mb-3">{t(description)}</p>
        <input
          className="w-full border border-blue-200 rounded px-3 py-2 text-sm"
          value={keyword}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={t(placeholder)}
        />
        <div className="mt-2 text-xs text-blue-700">
          {t("Shared keyword:")} {externalValue || "-"}
        </div>
      </div>
    );
  },

  DemoSearchResults: ({
    title = "Search results",
    items = DEMO_POST_ITEMS,
    keywordKey = "demo.search.keyword",
    emptyText = "No results yet.",
    description = "This widget reads the shared keyword and filters the list on its own.",
    eventKind = "search_filter",
    __stackpage,
  }: StackPageComponentProps<{
    title?: string;
    items?: Array<any>;
    keywordKey?: string;
    emptyText?: string;
    description?: string;
    eventKind?: EventPatternKind;
  }>) => {
    const t = useT();
    const keyword = String(__stackpage?.getPageState?.(keywordKey, "") || "")
      .trim()
      .toLowerCase();
    const filtered = (items || []).filter((item: any) => {
      if (!keyword) return true;
      return [item.title, item.excerpt, item.body, item.category]
        .filter(Boolean)
        .some((text) => String(text).toLowerCase().includes(keyword));
    });

    return (
      <div className="rounded-lg border border-blue-200 bg-slate-50 p-4">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3 className="text-base font-semibold text-blue-900">{t(title)}</h3>
          <EventPatternBadge kind={eventKind} />
        </div>
        <p className="text-xs text-blue-700 mb-3">{t(description)}</p>
        <div className="text-xs text-gray-500 mb-2">
          {t("Matching")} "{keyword || "-"}" — {filtered.length} {t("item(s)")}
        </div>
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <div className="text-sm text-gray-500">{t(emptyText)}</div>
          ) : (
            filtered.map((item: any) => (
              <div key={item.id} className="rounded border border-gray-200 bg-white p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-medium text-gray-900">{t(item.title)}</div>
                  <span className="text-xs text-gray-400">{t(item.category)}</span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{t(item.excerpt)}</p>
              </div>
            ))
          )}
        </div>
      </div>
    );
  },

  DemoRegistrationForm: ({
    title = "Registration form",
    confirmText = "Send this registration?",
    submitEvent = "demo:registration:submit",
    responseEvent = "demo:registration:submit:completed",
    buttonLabel = "Review and submit",
    description = "Confirm before submit, then send the payload to the receiver.",
    eventKind = "submit_confirm",
    __stackpage,
  }: StackPageComponentProps<{
    title?: string;
    confirmText?: string;
    submitEvent?: string;
    responseEvent?: string;
    buttonLabel?: string;
    description?: string;
    eventKind?: EventPatternKind;
  }>) => {
    const [name, setName] = useState("Alice");
    const [email, setEmail] = useState("alice@example.com");
    const [team, setTeam] = useState("Product");
    const [status, setStatus] = useState("Ready");
    const [result, setResult] = useState("");

    const handleSubmit = async () => {
      const payload = {
        name,
        email,
        team,
        submittedAt: new Date().toISOString(),
      };

      if (!window.confirm(confirmText)) {
        setStatus("Cancelled");
        return;
      }

      if (!__stackpage?.emitWithAck) {
        setStatus("No runtime API available");
        return;
      }

      setStatus("Waiting for receiver...");
      try {
        const response = await __stackpage.emitWithAck(submitEvent, payload, {
          responseEvent,
        });
        setResult(typeof response === "string" ? response : JSON.stringify(response));
        setStatus("Submitted");
      } catch (error: any) {
        setStatus(`Failed: ${error?.message || "unknown error"}`);
      }
    };

    return (
      <div className="rounded-lg border border-emerald-200 bg-white p-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-base font-semibold text-emerald-900">{title}</h3>
          <EventPatternBadge kind={eventKind} />
        </div>
        <p className="text-xs text-emerald-700 mb-3">{description}</p>
        <div className="grid gap-2">
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            placeholder="Team"
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-3 px-3 py-2 rounded bg-emerald-600 text-white text-sm hover:bg-emerald-700"
        >
          {buttonLabel}
        </button>
        <div className="mt-3 text-xs text-gray-600 space-y-1">
          <div>Status: {status}</div>
          {result && <div>Receiver: {result}</div>}
        </div>
      </div>
    );
  },

  DemoRequestReceiver: ({
    title = "Receiver",
    listenEvent = "demo:button:request",
    responseEvent = "demo:button:request:completed",
    replyPrefix = "Handled by receiver",
    emptyText = "Waiting for a request...",
    description = "This widget listens for a request and sends a reply back to the sender.",
    eventKind = "request_bridge",
    __stackpage,
  }: StackPageComponentProps<{
    title?: string;
    listenEvent?: string;
    responseEvent?: string;
    replyPrefix?: string;
    emptyText?: string;
    description?: string;
    eventKind?: EventPatternKind;
  }>) => {
    const [lastRequest, setLastRequest] = useState<any>(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!__stackpage?.subscribe) return;
      const unsubscribe = __stackpage.subscribe(listenEvent, (payload: any) => {
        setLastRequest(payload);
        setCount((prev) => prev + 1);
        __stackpage.emit(responseEvent, {
          __requestId: payload?.__requestId,
          result: `${replyPrefix}: ${payload?.message || payload?.name || "ok"}`,
          handledAt: new Date().toISOString(),
        });
      });

      return () => __stackpage.unsubscribe(unsubscribe);
    }, [__stackpage, listenEvent, responseEvent, replyPrefix]);

    return (
      <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3 className="text-base font-semibold text-purple-900">{title}</h3>
          <EventPatternBadge kind={eventKind} />
        </div>
        <p className="text-xs text-purple-700 mb-2">{description}</p>
        <div className="text-xs text-purple-700 mb-2">Requests handled: {count}</div>
        <pre className="text-xs bg-white border border-purple-200 rounded p-3 min-h-[120px] whitespace-pre-wrap break-all">
          {lastRequest ? JSON.stringify(lastRequest, null, 2) : emptyText}
        </pre>
      </div>
    );
  },

  DemoRequestButton: ({
    title = "Request button",
    buttonLabel = "Send request",
    requestEvent = "demo:button:request",
    responseEvent = "demo:button:request:completed",
    message = "Button clicked",
    description = "Press to send a request and wait for the receiver to answer.",
    eventKind = "request_bridge",
    __stackpage,
  }: StackPageComponentProps<{
    title?: string;
    buttonLabel?: string;
    requestEvent?: string;
    responseEvent?: string;
    message?: string;
    description?: string;
    eventKind?: EventPatternKind;
  }>) => {
    const [status, setStatus] = useState("Ready");
    const [result, setResult] = useState("");

    const handleClick = async () => {
      if (!__stackpage?.emitWithAck) return;
      setStatus("Waiting for response...");
      try {
        const response = await __stackpage.emitWithAck(
          requestEvent,
          {
            message,
            sentAt: new Date().toISOString(),
          },
          { responseEvent }
        );
        setResult(typeof response === "string" ? response : JSON.stringify(response));
        setStatus("Completed");
      } catch (error: any) {
        setStatus(`Failed: ${error?.message || "unknown error"}`);
      }
    };

    return (
      <div className="rounded-lg border border-indigo-200 bg-white p-4">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3 className="text-base font-semibold text-indigo-900">{title}</h3>
          <EventPatternBadge kind={eventKind} />
        </div>
        <p className="text-xs text-indigo-700 mb-3">{description}</p>
        <button
          type="button"
          onClick={handleClick}
          className="px-3 py-2 rounded bg-indigo-600 text-white text-sm hover:bg-indigo-700"
        >
          {buttonLabel}
        </button>
        <div className="mt-3 text-xs text-gray-600 space-y-1">
          <div>Status: {status}</div>
          {result && <div>Receiver: {result}</div>}
        </div>
      </div>
    );
  },

  DemoEventPatternGuide: ({
    title = "Event patterns",
    description = "This demo uses four core event patterns for simple page building.",
  }: {
    title?: string;
    description?: string;
  }) => (
    <EventPatternGuide title={title} description={description} />
  ),

  DemoFlowSection: ({
    index = "1",
    title = "Section",
    description = "",
    accent = "slate",
  }: {
    index?: string;
    title?: string;
    description?: string;
    accent?: "slate" | "amber" | "blue" | "emerald" | "indigo" | "purple";
  }) => <DemoFlowSection index={index} title={title} description={description} accent={accent} />,

  LifecycleEventDashboard: ({
    title = "Page + widget lifecycle dashboard",
    description = "Watch page bootstrap and widget mount/unmount events while building the page.",
    watchWidgetId = "",
    maxEntries = 8,
  }: {
    title?: string;
    description?: string;
    watchWidgetId?: string;
    maxEntries?: number;
  }) => (
    <LifecycleEventDashboard
      title={title}
      description={description}
      watchWidgetId={watchWidgetId}
      maxEntries={maxEntries}
    />
  ),

  BusinessDealFilter: ({
    title = "Opportunity filters",
    description = "Filter the opportunity pipeline with shared page state and event-driven updates.",
    stageKey = "sales.pipeline.stage",
    keywordKey = "sales.pipeline.keyword",
    filterEvent = "business:deal:filter",
    stages = ["all", "qualification", "proposal", "negotiation", "closed won"],
    eventKind = "search_filter",
    __stackpage,
  }: StackPageComponentProps<{
    title?: string;
    description?: string;
    stageKey?: string;
    keywordKey?: string;
    filterEvent?: string;
    stages?: string[];
    eventKind?: EventPatternKind;
  }>) => {
    const {
      value: stage,
      setValue: setStage,
      externalValue: sharedStage,
    } = useOptimisticSharedStringInputState({
      stackpage: __stackpage,
      key: stageKey,
      fallback: "all",
    });
    const {
      value: keyword,
      setValue: setKeyword,
      externalValue: sharedKeyword,
    } = useOptimisticSharedStringInputState({
      stackpage: __stackpage,
      key: keywordKey,
      fallback: "",
    });

    const emitFilter = (nextStage: string, nextKeyword: string) => {
      __stackpage?.emit?.("filter", {
        stage: nextStage,
        keyword: nextKeyword,
        stageKey,
        keywordKey,
        filterEvent,
      });
    };

    return (
      <div className="rounded-lg border border-blue-200 bg-white p-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-base font-semibold text-blue-900">{title}</h3>
          <EventPatternBadge kind={eventKind} />
        </div>
        <p className="text-xs text-blue-700 mb-3">{description}</p>
        <div className="grid gap-2 md:grid-cols-2">
          <select
            className="w-full border border-blue-200 rounded px-3 py-2 text-sm"
            value={stage}
            onChange={(e) => {
              const nextStage = e.target.value;
              setStage(nextStage);
              emitFilter(nextStage, keyword);
            }}
          >
            {stages.map((option) => (
              <option key={option} value={option}>
                {option === "all" ? "All stages" : option}
              </option>
            ))}
          </select>
          <input
            className="w-full border border-blue-200 rounded px-3 py-2 text-sm"
            value={sharedKeyword || keyword}
            onChange={(e) => {
              const nextKeyword = e.target.value;
              setKeyword(nextKeyword);
              emitFilter(stage, nextKeyword);
            }}
            placeholder="Filter by account, owner, or summary"
          />
        </div>
        <div className="mt-2 text-xs text-blue-700">
          Stage: {sharedStage || stage || "all"} · Keyword: {sharedKeyword || keyword || "-"}
        </div>
      </div>
    );
  },

  BusinessDealStageAction: ({
    title = "Stage step",
    description = "Advance the selected opportunity through the workflow and emit a stage-change event.",
    selectedIdKey = "sales.pipeline.selectedId",
    workflowStageKey = "sales.pipeline.selectedStage",
    stageChangedEvent = "business:deal:stage:changed",
    stages = ["qualification", "proposal", "negotiation", "closed won"],
    __stackpage,
  }: StackPageComponentProps<{
    title?: string;
    description?: string;
    selectedIdKey?: string;
    workflowStageKey?: string;
    stageChangedEvent?: string;
    stages?: string[];
  }>) => {
    const selectedId = String(
      __stackpage?.getPageState?.(selectedIdKey, "") || ""
    );
    const stage = String(
      __stackpage?.getPageState?.(workflowStageKey, "") || ""
    ).toLowerCase();
    const currentIndex = Math.max(
      0,
      stages.findIndex((item) => item.toLowerCase() === stage)
    );
    const nextStage = stages[Math.min(currentIndex + 1, stages.length - 1)];
    const isComplete = currentIndex >= stages.length - 1;

    const advanceStage = (targetStage: string) => {
      if (!selectedId || !targetStage) return;
      __stackpage?.emit?.("advance-stage", {
        selectedId,
        workflowStageKey,
        nextStage: targetStage,
        currentStage: stage || stages[0],
        stageChangedEvent,
      });
    };

    return (
      <div className="rounded-lg border border-violet-200 bg-white p-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-base font-semibold text-violet-900">{title}</h3>
          <span className="rounded-full border border-violet-200 bg-violet-50 px-2 py-1 text-[11px] font-medium text-violet-700">
            workflow
          </span>
        </div>
        <p className="text-xs text-violet-700 mb-3">{description}</p>
        <div className="mb-2 text-xs text-slate-600">
          Selected deal: {selectedId || "-"} · Current stage: {stage || "qualification"}
        </div>
        <div className="flex flex-wrap gap-2">
          {stages.map((item, index) => {
            const active = item.toLowerCase() === stage;
            const disabled = !selectedId || index <= currentIndex || (isComplete && index >= currentIndex);
            return (
              <button
                key={item}
                type="button"
                disabled={disabled}
                onClick={() => advanceStage(item)}
                className={`rounded px-3 py-2 text-xs font-medium transition ${
                  active
                    ? "bg-violet-600 text-white"
                    : "bg-violet-50 text-violet-700 hover:bg-violet-100 disabled:opacity-50"
                }`}
              >
                {item}
              </button>
            );
          })}
          <button
            type="button"
            disabled={!selectedId || isComplete}
            onClick={() => advanceStage(nextStage)}
            className="rounded bg-slate-900 px-3 py-2 text-xs font-medium text-white hover:bg-slate-800 disabled:opacity-50"
          >
            Advance to {nextStage}
          </button>
        </div>
      </div>
    );
  },

  BusinessDealReviewAction: ({
    title = "Review step",
    description = "Approve, reject, or reopen the selected opportunity and keep the workflow status visible.",
    selectedIdKey = "sales.pipeline.selectedId",
    reviewStatusKey = "sales.pipeline.reviewStatus",
    reviewEvent = "business:deal:review:changed",
    __stackpage,
  }: StackPageComponentProps<{
    title?: string;
    description?: string;
    selectedIdKey?: string;
    reviewStatusKey?: string;
    reviewEvent?: string;
  }>) => {
    const selectedId = String(
      __stackpage?.getPageState?.(selectedIdKey, "") || ""
    );
    const reviewStatus = String(
      __stackpage?.getPageState?.(reviewStatusKey, "needs review") || "needs review"
    ).toLowerCase();

    const updateReview = (nextStatus: string, decision: "approve" | "reject" | "reopen") => {
      if (!selectedId) return;
      __stackpage?.emit?.("review-deal", {
        selectedId,
        nextStatus,
        currentStatus: reviewStatus || "needs review",
        decision,
        reviewStatusKey,
        reviewEvent,
      });
    };

    const decisions = [
      {
        label: "Approve",
        status: "approved",
        decision: "approve" as const,
        className: "bg-emerald-600 text-white hover:bg-emerald-700",
      },
      {
        label: "Reject",
        status: "rejected",
        decision: "reject" as const,
        className: "bg-rose-600 text-white hover:bg-rose-700",
      },
      {
        label: "Reopen",
        status: "needs review",
        decision: "reopen" as const,
        className: "bg-slate-900 text-white hover:bg-slate-800",
      },
    ];

    return (
      <div className="rounded-lg border border-rose-200 bg-white p-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-base font-semibold text-rose-900">{title}</h3>
          <span className="rounded-full border border-rose-200 bg-rose-50 px-2 py-1 text-[11px] font-medium text-rose-700">
            review
          </span>
        </div>
        <p className="text-xs text-rose-700 mb-3">{description}</p>
        <div className="mb-2 text-xs text-slate-600">
          Selected deal: {selectedId || "-"} · Review status: {reviewStatus || "needs review"}
        </div>
        <div className="flex flex-wrap gap-2">
          {decisions.map((item) => (
            <button
              key={item.label}
              type="button"
              disabled={!selectedId}
              onClick={() => updateReview(item.status, item.decision)}
              className={`rounded px-3 py-2 text-xs font-medium transition disabled:opacity-50 ${item.className}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    );
  },

  BusinessDealOutcomeAction: ({
    title = "Outcome step",
    description = "Turn the review result into a publish, change-request, or follow-up outcome.",
    selectedIdKey = "sales.pipeline.selectedId",
    reviewStatusKey = "sales.pipeline.reviewStatus",
    outcomeStatusKey = "sales.pipeline.outcomeStatus",
    outcomeEvent = "business:deal:outcome:changed",
    __stackpage,
  }: StackPageComponentProps<{
    title?: string;
    description?: string;
    selectedIdKey?: string;
    reviewStatusKey?: string;
    outcomeStatusKey?: string;
    outcomeEvent?: string;
  }>) => {
    const selectedId = String(
      __stackpage?.getPageState?.(selectedIdKey, "") || ""
    );
    const reviewStatus = String(
      __stackpage?.getPageState?.(reviewStatusKey, "needs review") || "needs review"
    ).toLowerCase();
    const outcomeStatus = String(
      __stackpage?.getPageState?.(outcomeStatusKey, "pending") || "pending"
    ).toLowerCase();

    const decideOutcome = (
      nextStatus: string,
      decision: "publish" | "request_changes" | "assign_follow_up"
    ) => {
      if (!selectedId) return;
      __stackpage?.emit?.("decide-outcome", {
        selectedId,
        reviewStatus,
        currentOutcome: outcomeStatus,
        nextStatus,
        decision,
        outcomeStatusKey,
        outcomeEvent,
      });
    };

    const outcomes = [
      {
        label: "Approve & publish",
        status: "published",
        decision: "publish" as const,
        className: "bg-emerald-600 text-white hover:bg-emerald-700",
      },
      {
        label: "Request changes",
        status: "changes requested",
        decision: "request_changes" as const,
        className: "bg-amber-600 text-white hover:bg-amber-700",
      },
      {
        label: "Assign follow-up",
        status: "follow-up",
        decision: "assign_follow_up" as const,
        className: "bg-indigo-600 text-white hover:bg-indigo-700",
      },
    ];

    return (
      <div className="rounded-lg border border-indigo-200 bg-white p-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-base font-semibold text-indigo-900">{title}</h3>
          <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2 py-1 text-[11px] font-medium text-indigo-700">
            outcome
          </span>
        </div>
        <p className="text-xs text-indigo-700 mb-3">{description}</p>
        <div className="mb-2 text-xs text-slate-600">
          Selected deal: {selectedId || "-"} · Review: {reviewStatus || "needs review"} · Outcome: {outcomeStatus || "pending"}
        </div>
        <div className="flex flex-wrap gap-2">
          {outcomes.map((item) => (
            <button
              key={item.label}
              type="button"
              disabled={!selectedId}
              onClick={() => decideOutcome(item.status, item.decision)}
              className={`rounded px-3 py-2 text-xs font-medium transition disabled:opacity-50 ${item.className}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    );
  },

  BusinessDealOutcomeReceiver: ({
    title = "Outcome receiver",
    description = "Listen for outcome events and keep a visible audit trail for the selected opportunity.",
    listenEvent = "business:deal:outcome:changed",
    reviewEvent = "business:deal:review:changed",
    selectedIdKey = "sales.pipeline.selectedId",
    outcomeStatusKey = "sales.pipeline.outcomeStatus",
    maxEntries = 6,
    __stackpage,
  }: StackPageComponentProps<{
    title?: string;
    description?: string;
    listenEvent?: string;
    reviewEvent?: string;
    selectedIdKey?: string;
    outcomeStatusKey?: string;
    maxEntries?: number;
  }>) => {
    const selectedId = String(
      __stackpage?.getPageState?.(selectedIdKey, "") || ""
    );
    const outcomeStatus = String(
      __stackpage?.getPageState?.(outcomeStatusKey, "pending") || "pending"
    );
    const [entries, setEntries] = useState<
      Array<{
        event: string;
        selectedId: string;
        outcome: string;
        review: string;
        at: string;
        decision?: string;
      }>
    >([]);

    useEffect(() => {
      const pushEntry = (event: string, payload: any) => {
        setEntries((current) => [
          {
            event,
            selectedId: String(payload?.selectedId || selectedId || ""),
            outcome: String(payload?.nextStatus || payload?.currentOutcome || outcomeStatus || "pending"),
            review: String(payload?.reviewStatus || payload?.currentStatus || "needs review"),
            at: new Date().toISOString(),
            decision: String(payload?.decision || ""),
          },
          ...current,
        ].slice(0, Math.max(1, maxEntries)));
      };

      const unsubscribeOutcome = __stackpage?.subscribe?.(listenEvent, (payload: any) => {
        pushEntry(listenEvent, payload);
      });
      const unsubscribeReview = __stackpage?.subscribe?.(reviewEvent, (payload: any) => {
        pushEntry(reviewEvent, payload);
      });

      return () => {
        if (typeof unsubscribeOutcome === "function") unsubscribeOutcome();
        if (typeof unsubscribeReview === "function") unsubscribeReview();
      };
    }, [__stackpage, listenEvent, maxEntries, outcomeStatus, reviewEvent, selectedId]);

    return (
      <div className="rounded-lg border border-indigo-200 bg-white p-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-base font-semibold text-indigo-900">{title}</h3>
          <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2 py-1 text-[11px] font-medium text-indigo-700">
            receiver
          </span>
        </div>
        <p className="text-xs text-indigo-700 mb-3">{description}</p>
        <div className="mb-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
          <div>Selected deal: {selectedId || "-"}</div>
          <div>Outcome state: {outcomeStatus || "pending"}</div>
        </div>
        <div className="space-y-2">
          {entries.length === 0 ? (
            <div className="rounded border border-dashed border-slate-300 bg-slate-50 p-3 text-sm text-slate-500">
              Waiting for review or outcome events.
            </div>
          ) : (
            entries.map((entry) => (
              <div
                key={`${entry.event}-${entry.at}`}
                className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-slate-900">{entry.event}</span>
                  <span className="text-[11px] text-slate-400">{entry.at}</span>
                </div>
                <div className="mt-1 grid grid-cols-2 gap-2">
                  <div>Selected: {entry.selectedId || "-"}</div>
                  <div>Outcome: {entry.outcome || "-"}</div>
                  <div>Review: {entry.review || "-"}</div>
                  <div>Decision: {entry.decision || "-"}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  },

  BusinessChainNavigator: ({
    title = "Business chain navigator",
    description = "See which step is currently active as the deal moves through the workflow.",
    selectedIdKey = "sales.pipeline.selectedId",
    workflowStageKey = "sales.pipeline.selectedStage",
    reviewStatusKey = "sales.pipeline.reviewStatus",
    outcomeStatusKey = "sales.pipeline.outcomeStatus",
    steps = [
      { label: "Select", status: "deal selected" },
      { label: "Stage", status: "workflow stage" },
      { label: "Review", status: "review status" },
      { label: "Outcome", status: "outcome status" },
    ],
    __stackpage,
  }: StackPageComponentProps<{
    title?: string;
    description?: string;
    selectedIdKey?: string;
    workflowStageKey?: string;
    reviewStatusKey?: string;
    outcomeStatusKey?: string;
    steps?: Array<{ label: string; status: string }>;
  }>) => {
    const selectedId = String(
      __stackpage?.getPageState?.(selectedIdKey, "") || ""
    );
    const workflowStage = String(
      __stackpage?.getPageState?.(workflowStageKey, "") || ""
    );
    const reviewStatus = String(
      __stackpage?.getPageState?.(reviewStatusKey, "needs review") || "needs review"
    );
    const outcomeStatus = String(
      __stackpage?.getPageState?.(outcomeStatusKey, "pending") || "pending"
    );
    const normalizedReview = reviewStatus.toLowerCase();
    const normalizedOutcome = outcomeStatus.toLowerCase();
    const stepStates: Record<string, "pending" | "active" | "complete"> = {
      Select: selectedId ? "complete" : "active",
      Stage: selectedId && workflowStage ? "complete" : selectedId ? "active" : "pending",
      Review:
        selectedId && workflowStage
          ? normalizedReview === "needs review"
            ? "active"
            : "complete"
          : "pending",
      Outcome:
        selectedId && workflowStage
          ? normalizedReview === "needs review"
            ? "pending"
            : normalizedOutcome === "pending"
              ? "active"
              : "complete"
          : "pending",
    };
    const badgeClasses: Record<"pending" | "active" | "complete", string> = {
      pending: "border-slate-200 bg-slate-100 text-slate-500",
      active: "border-indigo-300 bg-indigo-100 text-indigo-700",
      complete: "border-emerald-300 bg-emerald-100 text-emerald-700",
    };
    const currentLabels = [
      { key: "Select", value: selectedId ? "selected" : "waiting" },
      { key: "Stage", value: workflowStage || "qualification" },
      { key: "Review", value: reviewStatus || "needs review" },
      { key: "Outcome", value: outcomeStatus || "pending" },
    ];

    return (
      <div className="rounded-lg border border-indigo-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-base font-semibold text-indigo-900">{title}</h3>
          <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2 py-1 text-[11px] font-medium text-indigo-700">
            navigator
          </span>
        </div>
        <p className="text-xs text-indigo-700 mb-3">{description}</p>
        <div className="grid gap-2 md:grid-cols-4">
          {steps.map((step) => {
            const current = currentLabels.find((item) => item.key === step.label)?.value || "";
            const isActive =
              (step.label === "Select" && Boolean(selectedId)) ||
              (step.label === "Stage" && Boolean(workflowStage)) ||
              (step.label === "Review" && Boolean(reviewStatus)) ||
              (step.label === "Outcome" && Boolean(outcomeStatus));
            return (
              <div
                key={step.label}
                className={`rounded border p-3 ${isActive ? "border-indigo-300 bg-indigo-50" : "border-slate-200 bg-slate-50"}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {step.label}
                  </div>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                      badgeClasses[stepStates[step.label] || "pending"]
                    }`}
                  >
                    {stepStates[step.label] || "pending"}
                  </span>
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900">{step.status}</div>
                <div className="mt-1 text-xs text-slate-600">{current}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },

  BusinessChainStatusSummary: ({
    title = "Chain status summary",
    description = "A compact readout of the selected deal and its workflow state.",
    selectedIdKey = "sales.pipeline.selectedId",
    workflowStageKey = "sales.pipeline.selectedStage",
    reviewStatusKey = "sales.pipeline.reviewStatus",
    outcomeStatusKey = "sales.pipeline.outcomeStatus",
    leadStatusKey = "sales.pipeline.leadStatus",
    __stackpage,
  }: StackPageComponentProps<{
    title?: string;
    description?: string;
    selectedIdKey?: string;
    workflowStageKey?: string;
    reviewStatusKey?: string;
    outcomeStatusKey?: string;
    leadStatusKey?: string;
  }>) => {
    const selectedId = String(
      __stackpage?.getPageState?.(selectedIdKey, "") || ""
    );
    const workflowStage = String(
      __stackpage?.getPageState?.(workflowStageKey, "") || ""
    );
    const reviewStatus = String(
      __stackpage?.getPageState?.(reviewStatusKey, "needs review") || "needs review"
    );
    const outcomeStatus = String(
      __stackpage?.getPageState?.(outcomeStatusKey, "pending") || "pending"
    );
    const leadStatus = String(
      __stackpage?.getPageState?.(leadStatusKey, "new") || "new"
    );

    const items = [
      { label: "Deal", value: selectedId || "none" },
      { label: "Stage", value: workflowStage || "qualification" },
      { label: "Review", value: reviewStatus },
      { label: "Outcome", value: outcomeStatus },
      { label: "Lead", value: leadStatus },
    ];

    return (
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-700">
            summary
          </span>
        </div>
        <p className="text-xs text-slate-600 mb-3">{description}</p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((item) => (
            <div key={item.label} className="rounded border border-slate-200 bg-slate-50 px-3 py-2">
              <div className="text-[11px] uppercase tracking-wide text-slate-500">{item.label}</div>
              <div className="mt-1 text-sm font-semibold text-slate-900">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  },

  BusinessChainProgressBar: ({
    title = "Chain progress",
    description = "A quick visual of the workflow progression from selection to outcome.",
    selectedIdKey = "sales.pipeline.selectedId",
    workflowStageKey = "sales.pipeline.selectedStage",
    reviewStatusKey = "sales.pipeline.reviewStatus",
    outcomeStatusKey = "sales.pipeline.outcomeStatus",
    __stackpage,
  }: StackPageComponentProps<{
    title?: string;
    description?: string;
    selectedIdKey?: string;
    workflowStageKey?: string;
    reviewStatusKey?: string;
    outcomeStatusKey?: string;
  }>) => {
    const selectedId = String(__stackpage?.getPageState?.(selectedIdKey, "") || "");
    const workflowStage = String(__stackpage?.getPageState?.(workflowStageKey, "") || "");
    const reviewStatus = String(
      __stackpage?.getPageState?.(reviewStatusKey, "needs review") || "needs review"
    ).toLowerCase();
    const outcomeStatus = String(
      __stackpage?.getPageState?.(outcomeStatusKey, "pending") || "pending"
    ).toLowerCase();

    const stageIndex = selectedId && workflowStage ? 1 : selectedId ? 0 : -1;
    const reviewIndex =
      selectedId && workflowStage && reviewStatus !== "needs review" ? 2 : -1;
    const outcomeIndex =
      selectedId && workflowStage && reviewStatus !== "needs review" && outcomeStatus !== "pending"
        ? 3
        : -1;

    const states = [0, 1, 2, 3].map((index) => {
      if (index === 0) return selectedId ? "complete" : "active";
      if (index === 1) return stageIndex >= 1 ? "complete" : stageIndex === 0 ? "active" : "pending";
      if (index === 2) return reviewIndex >= 2 ? "complete" : reviewIndex === -1 ? "pending" : "active";
      return outcomeIndex >= 3 ? "complete" : outcomeIndex === -1 ? "pending" : "active";
    }) as Array<"pending" | "active" | "complete">;

    const fillWidth = selectedId
      ? reviewStatus !== "needs review"
        ? outcomeStatus !== "pending"
          ? "100%"
          : "75%"
        : "50%"
      : "25%";

    const labels = ["Select", "Stage", "Review", "Outcome"];
    const descriptions = [
      selectedId ? "Deal selected" : "Waiting for a deal",
      workflowStage || "qualification",
      reviewStatus || "needs review",
      outcomeStatus || "pending",
    ];

    return (
      <div className="rounded-lg border border-emerald-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-base font-semibold text-emerald-900">{title}</h3>
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[11px] font-medium text-emerald-700">
            progress
          </span>
        </div>
        <p className="text-xs text-emerald-700 mb-3">{description}</p>
        <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all"
            style={{ width: fillWidth }}
          />
        </div>
        <div className="grid gap-2 md:grid-cols-4">
          {labels.map((label, index) => (
            <div
              key={label}
              className={`rounded border p-3 ${
                states[index] === "complete"
                  ? "border-emerald-300 bg-emerald-50"
                  : states[index] === "active"
                    ? "border-emerald-300 bg-emerald-100"
                    : "border-slate-200 bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {label}
                </div>
                <span
                  className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                    states[index] === "complete"
                      ? "border-emerald-300 bg-emerald-100 text-emerald-700"
                      : states[index] === "active"
                        ? "border-emerald-300 bg-white text-emerald-700"
                        : "border-slate-200 bg-white text-slate-500"
                  }`}
                >
                  {states[index]}
                </span>
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-900">{descriptions[index]}</div>
            </div>
          ))}
        </div>
      </div>
    );
  },

  BusinessChainNextAction: ({
    title = "Next action",
    description = "A guided hint that tells the user what to do next in the business chain.",
    selectedIdKey = "sales.pipeline.selectedId",
    workflowStageKey = "sales.pipeline.selectedStage",
    reviewStatusKey = "sales.pipeline.reviewStatus",
    outcomeStatusKey = "sales.pipeline.outcomeStatus",
    leadStatusKey = "sales.pipeline.leadStatus",
    __stackpage,
  }: StackPageComponentProps<{
    title?: string;
    description?: string;
    selectedIdKey?: string;
    workflowStageKey?: string;
    reviewStatusKey?: string;
    outcomeStatusKey?: string;
    leadStatusKey?: string;
  }>) => {
    const selectedId = String(__stackpage?.getPageState?.(selectedIdKey, "") || "");
    const workflowStage = String(__stackpage?.getPageState?.(workflowStageKey, "") || "");
    const reviewStatus = String(
      __stackpage?.getPageState?.(reviewStatusKey, "needs review") || "needs review"
    ).toLowerCase();
    const outcomeStatus = String(
      __stackpage?.getPageState?.(outcomeStatusKey, "pending") || "pending"
    ).toLowerCase();
    const leadStatus = String(__stackpage?.getPageState?.(leadStatusKey, "new") || "new");

    let label = "Select a deal";
    let detail = "Choose a deal from the list so the workflow can begin.";
    let accent: "blue" | "indigo" | "rose" | "emerald" | "slate" = "blue";

    if (!selectedId) {
      label = "Select a deal";
      detail = `Current lead status: ${leadStatus}. Pick a deal to start the chain.`;
      accent = "blue";
    } else if (!workflowStage) {
      label = "Advance the stage";
      detail = "Use the stage step to move the selected deal into the workflow.";
      accent = "indigo";
    } else if (reviewStatus === "needs review") {
      label = "Review the deal";
      detail = "Approve, reject, or reopen the deal after the stage move.";
      accent = "rose";
    } else if (outcomeStatus === "pending") {
      label = "Choose an outcome";
      detail = "Publish, request changes, or assign a follow-up after review.";
      accent = "emerald";
    } else {
      label = "Workflow complete";
      detail = "The current deal has a final outcome. You can reopen it or pick another deal.";
      accent = "slate";
    }

    const palette: Record<string, { border: string; bg: string; title: string; badge: string }> = {
      blue: {
        border: "border-blue-200",
        bg: "bg-blue-50",
        title: "text-blue-900",
        badge: "border-blue-200 bg-white text-blue-700",
      },
      indigo: {
        border: "border-indigo-200",
        bg: "bg-indigo-50",
        title: "text-indigo-900",
        badge: "border-indigo-200 bg-white text-indigo-700",
      },
      rose: {
        border: "border-rose-200",
        bg: "bg-rose-50",
        title: "text-rose-900",
        badge: "border-rose-200 bg-white text-rose-700",
      },
      emerald: {
        border: "border-emerald-200",
        bg: "bg-emerald-50",
        title: "text-emerald-900",
        badge: "border-emerald-200 bg-white text-emerald-700",
      },
      slate: {
        border: "border-slate-200",
        bg: "bg-slate-50",
        title: "text-slate-900",
        badge: "border-slate-200 bg-white text-slate-700",
      },
    };
    const style = palette[accent];

    return (
      <div className={`rounded-lg border p-4 shadow-sm ${style.border} ${style.bg}`}>
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className={`text-base font-semibold ${style.title}`}>{title}</h3>
          <span className={`rounded-full border px-2 py-1 text-[11px] font-medium ${style.badge}`}>
            {label}
          </span>
        </div>
        <p className={`text-xs mb-1 ${style.title}`}>{description}</p>
        <div className="text-sm text-slate-700">{detail}</div>
      </div>
    );
  },

  BusinessChainLegend: ({
    title = "Chain legend",
    description = "Color key for the business chain page so the workflow is easy to read.",
    items = [
      { label: "Blue", meaning: "selection and starting point" },
      { label: "Indigo", meaning: "current workflow focus" },
      { label: "Rose", meaning: "review / approval stage" },
      { label: "Emerald", meaning: "final outcome / completion" },
    ],
  }: StackPageComponentProps<{
    title?: string;
    description?: string;
    items?: Array<{ label: string; meaning: string }>;
  }>) => {
    const swatches: Record<string, string> = {
      Blue: "bg-blue-500",
      Indigo: "bg-indigo-500",
      Rose: "bg-rose-500",
      Emerald: "bg-emerald-500",
    };

    return (
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-700">
            legend
          </span>
        </div>
        <p className="text-xs text-slate-600 mb-3">{description}</p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.label} className="rounded border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-center gap-2">
                <span className={`h-3 w-3 rounded-full ${swatches[item.label] || "bg-slate-400"}`} />
                <div className="text-sm font-semibold text-slate-900">{item.label}</div>
              </div>
              <div className="mt-1 text-xs text-slate-600">{item.meaning}</div>
            </div>
          ))}
        </div>
      </div>
    );
  },

  BusinessChainGuide: ({
    title = "Business chain guide",
    description = "Follow the same deal through selection, stage, review, and outcome in one predictable order.",
    steps = [
      {
        label: "1. Select",
        summary: "Pick a single deal so the other widgets share the same target.",
      },
      {
        label: "2. Stage",
        summary: "Advance the selected deal through qualification, proposal, negotiation, or closed won.",
      },
      {
        label: "3. Review",
        summary: "Approve, reject, or reopen the deal after the stage change.",
      },
      {
        label: "4. Outcome",
        summary: "Publish, request changes, or assign a follow-up and watch the receiver log the event.",
      },
    ],
  }: StackPageComponentProps<{
    title?: string;
    description?: string;
    steps?: Array<{ label: string; summary: string }>;
  }>) => {
    return (
      <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-base font-semibold text-indigo-900">{title}</h3>
          <span className="rounded-full border border-indigo-200 bg-white px-2 py-1 text-[11px] font-medium text-indigo-700">
            guide
          </span>
        </div>
        <p className="text-xs text-indigo-700 mb-3">{description}</p>
        <div className="grid gap-2 md:grid-cols-2">
          {steps.map((step) => (
            <div key={step.label} className="rounded border border-indigo-100 bg-white p-3">
              <div className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
                {step.label}
              </div>
              <div className="mt-1 text-sm text-slate-700">{step.summary}</div>
            </div>
          ))}
        </div>
      </div>
    );
  },

  BusinessDealList: ({
    title = "Opportunity pipeline",
    items = [],
    selectedIdKey = "sales.pipeline.selectedId",
    stageKey = "sales.pipeline.stage",
    keywordKey = "sales.pipeline.keyword",
    selectEvent = "business:deal:selected",
    emptyText = "No deals available.",
    description = "Select an opportunity to update shared page state and notify the detail panel.",
    eventKind = "select_detail",
    __stackpage,
  }: StackPageComponentProps<{
    title?: string;
    items?: Array<any>;
    selectedIdKey?: string;
    stageKey?: string;
    keywordKey?: string;
    selectEvent?: string;
    emptyText?: string;
    description?: string;
    eventKind?: EventPatternKind;
  }>) => {
    const selectedId = String(
      __stackpage?.getPageState?.(selectedIdKey, "") || ""
    );
    const stage = String(__stackpage?.getPageState?.(stageKey, "all") || "all")
      .trim()
      .toLowerCase();
    const keyword = String(__stackpage?.getPageState?.(keywordKey, "") || "")
      .trim()
      .toLowerCase();
    const filteredItems = (items || []).filter((item: any) => {
      const stageMatches =
        stage === "all" || String(item.stage || "").toLowerCase() === stage;
      const keywordMatches =
        !keyword ||
        [item.name, item.title, item.account, item.owner, item.summary, item.stage]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(keyword));
      return stageMatches && keywordMatches;
    });

    return (
      <div className="rounded-lg border border-amber-200 bg-white p-4">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3 className="text-base font-semibold text-amber-900">{title}</h3>
          <EventPatternBadge kind={eventKind} />
        </div>
        <p className="text-xs text-amber-700 mb-3">{description}</p>
        <div className="space-y-2">
          {filteredItems.length === 0 ? (
            <div className="text-sm text-gray-500">{emptyText}</div>
          ) : (
            filteredItems.map((item: any) => {
              const isActive = String(item.id) === selectedId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    __stackpage?.emit?.("select", {
                      ...item,
                      selectedIdKey,
                      selectEvent,
                    })
                  }
                  className={`w-full text-left rounded border px-3 py-2 transition ${
                    isActive
                      ? "border-amber-500 bg-amber-50"
                      : "border-gray-200 bg-white hover:bg-amber-50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <div className="font-medium text-gray-900">{item.name || item.title}</div>
                      <div className="text-xs text-gray-500">
                        {item.account} · {item.stage}
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{item.amount}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{item.summary}</p>
                </button>
              );
            })
          )}
        </div>
        <div className="mt-3 text-[11px] text-amber-700">
          Showing {filteredItems.length} of {(items || []).length} deal(s)
        </div>
      </div>
    );
  },

  BusinessDealDetail: ({
    title = "Opportunity detail",
    items = [],
    selectedIdKey = "sales.pipeline.selectedId",
    stageKey = "sales.pipeline.stage",
    keywordKey = "sales.pipeline.keyword",
    emptyText = "Select a deal to show its details.",
    description = "This panel listens to the shared selected opportunity id and updates automatically.",
    eventKind = "select_detail",
    __stackpage,
  }: StackPageComponentProps<{
    title?: string;
    items?: Array<any>;
    selectedIdKey?: string;
    stageKey?: string;
    keywordKey?: string;
    emptyText?: string;
    description?: string;
    eventKind?: EventPatternKind;
  }>) => {
    const selectedId = String(
      __stackpage?.getPageState?.(selectedIdKey, "") || ""
    );
    const stage = String(__stackpage?.getPageState?.(stageKey, "all") || "all");
    const keyword = String(__stackpage?.getPageState?.(keywordKey, "") || "");
    const workflowStage = String(
      __stackpage?.getPageState?.("sales.pipeline.selectedStage", "") || ""
    );
    const reviewStatus = String(
      __stackpage?.getPageState?.("sales.pipeline.reviewStatus", "") || ""
    );
    const outcomeStatus = String(
      __stackpage?.getPageState?.("sales.pipeline.outcomeStatus", "") || ""
    );
    const selectedItem = (items || []).find(
      (item: any) => String(item.id) === selectedId
    );

    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-base font-semibold text-amber-900">{title}</h3>
          <EventPatternBadge kind={eventKind} />
        </div>
        <p className="text-xs text-amber-700 mb-3">{description}</p>
        {selectedItem ? (
          <div className="space-y-2">
            <div className="text-xs text-amber-700">Selected: {selectedItem.id}</div>
            <div className="text-lg font-semibold text-gray-900">{selectedItem.name || selectedItem.title}</div>
            <p className="text-sm text-gray-700">{selectedItem.summary}</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              <div>Account: {selectedItem.account}</div>
              <div>Stage: {selectedItem.stage}</div>
              <div>Owner: {selectedItem.owner}</div>
              <div>Amount: {selectedItem.amount}</div>
            </div>
            <div className="pt-2 text-xs text-amber-700">
              Filter context: stage {stage || "all"} · keyword {keyword || "-"}
            </div>
            {workflowStage && (
              <div className="text-xs text-violet-700">
                Workflow stage: {workflowStage}
              </div>
            )}
            {reviewStatus && (
              <div className="text-xs text-rose-700">
                Review status: {reviewStatus}
              </div>
            )}
            {outcomeStatus && (
              <div className="text-xs text-indigo-700">
                Outcome: {outcomeStatus}
              </div>
            )}
          </div>
        ) : (
          <div className="text-sm text-gray-600">{emptyText}</div>
        )}
      </div>
    );
  },

  BusinessOpsSummary: ({
    title = "Business summary",
    description = "High-level KPIs loaded from the same page datasource.",
    stats = [],
  }: StackPageComponentProps<{
    title?: string;
    description?: string;
    stats?: Array<{ label: string; value: string; delta?: string }>;
  }>) => (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-2">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        <p className="text-xs text-slate-600">{description}</p>
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
        {(stats || []).map((stat) => (
          <div key={stat.label} className="rounded border border-slate-200 bg-slate-50 p-3">
            <div className="text-xs text-slate-500">{stat.label}</div>
            <div className="mt-1 text-lg font-semibold text-slate-900">{stat.value}</div>
            {stat.delta && <div className="text-xs text-slate-600">{stat.delta}</div>}
          </div>
        ))}
      </div>
    </div>
  ),
});

// Component props provider - returns default props for each component type
export const componentPropsProvider = () => {
  const defaultProps: Record<string, any> = {
    Button: {
      text: "Click me",
      color: "blue",
      size: "md",
      onClick: () => alert("Button clicked!"),
      __schemaOptions:{
        size: {options: ['sm', 'md', 'lg']},
      }
    },
    Card: {
      title: "Card Title",
      content:
        "This is a sample card with some content that can be customized.",
      shadow: true,
      border: true,
    },
    CardList: {
      items: [
        { title: "Card", content: "Card content", shadow: true, border: true },
        {
          title: "Card2",
          content: "Card content2",
          shadow: true,
          border: true,
        },
      ],
    },
    Input: {
      placeholder: "Enter text here",
      value: "",
      type: "text",
      label: "Input Field",
      required: false,
    },
    ImageCard: {
      src: "https://dnicugzydez8x.cloudfront.net/60-think-prd/2025/07/image-26.png",
      alt: "Sample image",
      caption: "This is a sample image card",
      width: "100%",
      height: "auto",
    },
    VideoCard: {
      src: "https://dnicugzydez8x.cloudfront.net/60-think-prd/2025/09/IMG_2444.mov",
      title: "Sample Video",
      description: "This is a sample video card",
      width: "100%",
      height: "200px",
    },
    ImageBlurred: {
      src: "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80",
      content: "Growth",
      date: "20 July 2022",
      author: "Sara Lamalo",
      alt: "Nature Image",
      title: "This is ImageBlurred",
    },
    ImageCircle: {
      src: "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80",
      alt: "Circle Image",
      title: "This is ImageCircle",
    },
    SimpleCard: {
      src: "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80",
      content: `Growth is not just about numbers, it's about the journey. and the people we meet along the way. life is a journey, not a destination. experience is the best teacher.
           Growth is not just about numbers, it's about the journey. and the people we meet along the way. life is a journey, not a destination. experience is the best teacher.
           Growth is not just about numbers, it's about the journey. and the people we meet along the way. life is a journey, not a destination. experience is the best teacher.`,
      date: "20 July 2022",
      author: "Ai Dabo",
      caption: "This think item",
      title: "This is SimpleCard",
    },

    // New Custom Components Default Props
    CustomAlert: {
      type: "success",
      title: "Success!",
      message: "Your action was completed successfully.",
    },
    CustomBadge: {
      variant: "primary",
      children: "New Feature",
    },
    CustomProgress: {
      value: 75,
      label: "Loading...",
    },
    AvatarStack: {
      maxDisplay: 6,
      shape: ["circle", "square"],
      showNames: true,
      users: [
        {
          name: "John Doe",
          image:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
        },
        {
          name: "Jane Smith",
          image:
            "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=120&h=120&fit=crop&crop=face",
        },
        {
          name: "Mike Johnson",
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face",
        },
        {
          name: "Sarah Wilson",
          image:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face",
        },
        {
          name: "David Brown",
          image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face",
        },
        {
          name: "Emily Davis",
          image:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=face",
        },
      ],
    },
    StatsCard: {
      title: "Total Users",
      value: "12,402",
      change: 12.5,
      description: "From last month",
    },
    PageStateBridge: {
      title: "Page State Bridge",
      description:
        "Inspect and update shared page state without direct component coupling.",
      stateKey: "keyword",
    },
    FormControlSampler: {
      title: "Form control sampler",
      description:
        "Use this widget to test typing, selection, toggles, colors, file input, and submission without page-state sync.",
      submitLabel: "Save draft",
    },
    ContactFormBridge: {
      title: "Contact Form Sender",
      ruleEcho: "",
      successText: "Sent (no response required).",
      waitingText: "Waiting for receiver response...",
      actions: [
        {
          id: "bridge-action-1",
          label: "Send (No Wait)",
          mode: "emit",
          event: "contact:submit",
          enabled: true,
        },
        {
          id: "bridge-action-2",
          label: "Send (Wait Response)",
          mode: "request",
          event: "contact:submit:request",
          responseEvent: "contact:submit:request:completed",
          enabled: true,
        },
        {
          id: "bridge-action-3",
          label: "Run Rule Demo",
          mode: "emit",
          event: "demo:bridge.rules",
          enabled: true,
        },
      ],
      __interactions: [
        {
          id: "bridge-rule-1",
          event: "demo:bridge.rules",
          action: "set-shared-state",
          targetPath: "demo.bridge.lastEmail",
          valueFrom: "$.email",
          enabled: true,
        },
        {
          id: "bridge-rule-2",
          event: "demo:bridge.rules",
          action: "emit-event",
          targetPath: "demo:bridge.rules:after",
          valueFrom: "$",
          enabled: true,
        },
        {
          id: "bridge-rule-3",
          event: "demo:bridge.rules:after",
          action: "set-prop",
          targetWidgetId: "$self",
          targetPath: "title",
          valueFrom: "$.name",
          enabled: true,
        },
        {
          id: "bridge-rule-4",
          event: "demo:bridge.rules",
          action: "set-prop",
          targetWidgetId: "$self",
          targetPath: "ruleEcho",
          valueFrom: "$.message",
          enabled: true,
        },
      ],
    },
    ContactFormResultText: {
      title: "Contact Form Receiver",
      ruleLog: "",
      ackMessagePrefix: "Receiver completed",
      emptyText: "No form data received yet.",
      subscriptions: [
        {
          id: "result-sub-1",
          event: "contact:submit",
          enabled: true,
          replyMode: "none",
        },
        {
          id: "result-sub-2",
          event: "contact:submit:request",
          enabled: true,
          replyMode: "ack",
          responseEvent: "contact:submit:request:completed",
          resultTemplate: "Receiver completed via subscription",
        },
        {
          id: "result-sub-3",
          event: "demo:bridge.rules:after",
          enabled: true,
          replyMode: "none",
        },
      ],
      actions: [
        {
          id: "result-action-1",
          label: "Run Rule Demo",
          mode: "emit",
          event: "demo:result.rules",
          enabled: true,
        },
      ],
      __interactions: [
        {
          id: "result-rule-1",
          event: "demo:result.rules",
          action: "set-prop",
          targetWidgetId: "$self",
          targetPath: "title",
          valueFrom: "$.nextTitle",
          enabled: true,
        },
        {
          id: "result-rule-2",
          event: "demo:result.rules",
          action: "set-prop",
          targetWidgetId: "$self",
          targetPath: "ruleLog",
          valueFrom: "$.at",
          enabled: true,
        },
        {
          id: "result-rule-3",
          event: "demo:result.rules",
          action: "set-shared-state",
          targetPath: "demo.result.last",
          valueFrom: "$",
          enabled: true,
        },
        {
          id: "result-rule-4",
          event: "demo:result.rules",
          action: "emit-event",
          targetPath: "demo:result.rules:after",
          valueFrom: "$",
          enabled: true,
        },
      ],
    },
    DemoPostList: {
      title: "Post cards",
      items: DEMO_POST_ITEMS,
      selectedIdKey: "demo.post.selectedId",
      selectEvent: "demo:post:selected",
      description: "Click a card to set the selected id and show the detail panel.",
      eventKind: "select_detail",
      __interactions: [
        {
          id: "post-list-select-state",
          event: "select",
          action: "set-shared-state",
          targetPath: "demo.post.selectedId",
          valueFrom: "$.id",
          enabled: true,
        },
        {
          id: "post-list-select-event",
          event: "select",
          action: "emit-event",
          targetPath: "demo:post:selected",
          valueFrom: "$",
          enabled: true,
        },
      ],
    },
    DemoPostDetail: {
      title: "Post detail",
      items: DEMO_POST_ITEMS,
      selectedIdKey: "demo.post.selectedId",
      description: "This panel updates from the shared selected id.",
      eventKind: "select_detail",
    },
    DemoPostFoldReceiver: {
      title: "Content snapshot",
      items: DEMO_POST_ITEMS,
      selectedIdKey: "content.review.selectedId",
      description: "Content-style receiver card showing the current selection and recent history trail.",
      eventKind: "select_detail",
    },
    DemoPostFoldSummary: {
      title: "Review snapshot",
      items: DEMO_POST_ITEMS,
      selectedIdKey: "content.review.selectedId",
      selectedTitleKey: "content.review.selectedTitle",
      description: "This page-side summary shows the selected article before the receiver updates.",
      eventKind: "select_detail",
    },
    DemoPostFoldTips: {
      title: "Review tips",
      description: "This helper card keeps the review queue readable as a runnable sample.",
      eventKind: "select_detail",
    },
    DemoPostFoldNavigator: {
      title: "Review queue navigator",
      items: DEMO_POST_ITEMS,
      selectedIdKey: "content.review.selectedId",
      selectEvent: "demo:fold:post:selected",
      description: "Accordion-style rows emit fold-select and update the receiver snapshot.",
      eventKind: "select_detail",
      __interactions: [
        {
          id: "fold-navigator-select-state",
          event: "fold-select",
          action: "set-shared-state",
          targetPath: "content.review.selectedId",
          valueFrom: "$.id",
          enabled: true,
        },
        {
          id: "fold-navigator-select-title",
          event: "fold-select",
          action: "set-shared-state",
          targetPath: "content.review.selectedTitle",
          valueFrom: "$.title",
          enabled: true,
        },
        {
          id: "fold-navigator-select-event",
          event: "fold-select",
          action: "emit-event",
          targetPath: "demo:fold:post:selected",
          valueFrom: "$",
          enabled: true,
        },
      ],
    },
    MediaInquiryCard: {
      title: "Inquiry form",
      description: "A polished contact form for incoming requests, briefs, and follow-up questions.",
      submitLabel: "Send inquiry",
      followUpLabel: "We’ll reply by email after review.",
    },
    MediaShowcaseGrid: {
      title: "Media cards",
      description: "A mix of list, image, and video cards that all open the same detail page.",
      items: DEMO_MEDIA_ITEMS,
      detailPageId: "page-media-detail-demo",
    },
    MediaSliderCard: {
      title: "Image slider",
      description: "A horizontal gallery strip for media that should feel premium and easy to scan.",
      slides: DEMO_MEDIA_ITEMS.filter((item) => item.kind !== "list"),
      detailPageId: "page-media-detail-demo",
    },
    GoogleStreetViewCard: {
      title: "Street View",
      subtitle: "Jump into Google Street View for the same location shown on the page.",
      viewpoint: "35.6595,139.7005",
      heading: 170,
      pitch: 8,
      fov: 75,
      locationLabel: "Shibuya Crossing, Tokyo",
    },
    GoogleMapCard: {
      title: "Map card",
      subtitle: "A clean map action card that opens the same location in Google Maps.",
      center: "35.6595,139.7005",
      zoom: 16,
      locationLabel: "Shibuya, Tokyo",
    },
    MediaDetailPanel: {
      title: "Media detail",
      description: "Click a card from the gallery to jump here and inspect the selected item.",
      items: DEMO_MEDIA_ITEMS,
      detailPageId: "page-media-detail-demo",
    },
    RealEstateInquiryCard: {
      title: "Property inquiry",
      description: "Collect buy, rent, or sell requests in a premium lead form.",
      submitLabel: "Send inquiry",
      followUpLabel: "We will reply with matching listings and a showing plan.",
      selectedPropertyIdKey: "selectedPropertyId",
      items: DEMO_REAL_ESTATE_ITEMS,
    },
    RealEstateFilterBar: {
      title: "Browse properties",
      description: "Filter the showcase by sale or rent, and narrow the results with a keyword.",
      intentKey: "realestate.filter.intent",
      keywordKey: "realestate.filter.keyword",
      activeIntent: "all",
      activeKeyword: "",
    },
    RealEstateNeighborhoodCard: {
      title: "Neighborhood guide",
      description: "A calm area summary for the selected property with nearby points of interest.",
      selectedPropertyIdKey: "selectedPropertyId",
    },
    RealEstateAccessCard: {
      title: "Access panel",
      description: "Street View, map, and area context in one clean card.",
      selectedPropertyIdKey: "selectedPropertyId",
      detailPageId: "page-realestate-detail-demo",
    },
    RealEstatePropertyGrid: {
      title: "Featured properties",
      description: "Premium sale and rental cards with detail actions for each property.",
      items: DEMO_REAL_ESTATE_ITEMS,
      detailPageId: "page-realestate-detail-demo",
      selectedPropertyIdKey: "selectedPropertyId",
    },
    RealEstatePropertySlider: {
      title: "Property slider",
      description: "Horizontal premium cards for featured homes and rentals.",
      slides: DEMO_REAL_ESTATE_ITEMS,
      detailPageId: "page-realestate-detail-demo",
      selectedPropertyIdKey: "selectedPropertyId",
    },
    RealEstateStreetViewCard: {
      title: "Neighborhood Street View",
      subtitle: "Preview the surroundings for the selected property before a viewing.",
      viewpoint: "35.6595,139.7005",
      heading: 175,
      pitch: 8,
      fov: 75,
      locationLabel: "Shibuya, Tokyo",
    },
    RealEstateMapCard: {
      title: "Property map",
      subtitle: "Use the map card to check routes, transit, and neighborhood context.",
      center: "35.6595,139.7005",
      zoom: 16,
      locationLabel: "Shibuya, Tokyo",
    },
    RealEstateDetailPanel: {
      title: "Property detail",
      description: "Open a card from the gallery to inspect the selected property and its viewing links.",
      items: DEMO_REAL_ESTATE_ITEMS,
      detailPageId: "page-realestate-detail-demo",
    },
    DemoSearchBar: {
      title: "Search bar",
      keywordKey: "demo.search.keyword",
      searchEvent: "demo:search:changed",
      placeholder: "Search posts...",
      description: "Typing updates the shared keyword and refreshes the results panel.",
      eventKind: "search_filter",
      __interactions: [
        {
          id: "search-bar-state",
          event: "search",
          action: "set-shared-state",
          targetPath: "demo.search.keyword",
          valueFrom: "$.keyword",
          enabled: true,
        },
        {
          id: "search-bar-event",
          event: "search",
          action: "emit-event",
          targetPath: "demo:search:changed",
          valueFrom: "$",
          enabled: true,
        },
      ],
    },
    DemoSearchResults: {
      title: "Search results",
      items: DEMO_POST_ITEMS,
      keywordKey: "demo.search.keyword",
      description: "This list filters itself from the shared search keyword.",
      eventKind: "search_filter",
    },
    DemoRegistrationForm: {
      title: "Registration form",
      confirmText: "Send this registration?",
      submitEvent: "demo:registration:submit",
      responseEvent: "demo:registration:submit:completed",
      buttonLabel: "Review and submit",
      description: "Confirm before submit so the receiver can reply cleanly.",
      eventKind: "submit_confirm",
      __interactions: [
        {
          id: "registration-submit-state",
          event: "demo:registration:submit",
          action: "set-shared-state",
          targetPath: "demo.registration.last",
          valueFrom: "$",
          enabled: true,
        },
      ],
    },
    DemoRequestReceiver: {
      title: "Receiver",
      listenEvent: "demo:button:request",
      responseEvent: "demo:button:request:completed",
      replyPrefix: "Handled by receiver",
      description: "Listens for a request and sends a response back.",
      eventKind: "request_bridge",
    },
    DemoRequestButton: {
      title: "Request button",
      buttonLabel: "Send request",
      requestEvent: "demo:button:request",
      responseEvent: "demo:button:request:completed",
      message: "Button clicked",
      description: "Press to send a request and wait for the receiver reply.",
      eventKind: "request_bridge",
    },
    DemoEventPatternGuide: {
      title: "Event patterns",
      description:
        "Use these four core patterns as the starting point for new components.",
    },
    DemoFlowSection: {
      index: "1",
      title: "Select → Detail",
      description: "Click a post card, then check the detail panel on the right.",
      accent: "amber",
    },
    LifecycleEventDashboard: {
      title: "Page + widget lifecycle dashboard",
      description:
        "Watch page bootstrap and widget mount/unmount events while building the page.",
      watchWidgetId: "",
      maxEntries: 8,
    },
    BusinessDealFilter: {
      title: "Opportunity filters",
      description:
        "Filter the opportunity pipeline with shared page state and event-driven updates.",
      stageKey: "sales.pipeline.stage",
      keywordKey: "sales.pipeline.keyword",
      filterEvent: "business:deal:filter",
    },
    BusinessDealList: {
      title: "Opportunity pipeline",
      selectedIdKey: "sales.pipeline.selectedId",
      stageKey: "sales.pipeline.stage",
      keywordKey: "sales.pipeline.keyword",
      selectEvent: "business:deal:selected",
      description:
        "Select an opportunity to update shared page state and notify the detail panel.",
    },
    BusinessDealDetail: {
      title: "Opportunity detail",
      selectedIdKey: "sales.pipeline.selectedId",
      stageKey: "sales.pipeline.stage",
      keywordKey: "sales.pipeline.keyword",
      description:
        "This panel listens to the shared selected opportunity id and updates automatically.",
    },
    BusinessDealStageAction: {
      title: "Stage step",
      selectedIdKey: "sales.pipeline.selectedId",
      workflowStageKey: "sales.pipeline.selectedStage",
      stageChangedEvent: "business:deal:stage:changed",
    },
    BusinessDealReviewAction: {
      title: "Review step",
      selectedIdKey: "sales.pipeline.selectedId",
      reviewStatusKey: "sales.pipeline.reviewStatus",
      reviewEvent: "business:deal:review:changed",
    },
    BusinessDealOutcomeAction: {
      title: "Outcome step",
      selectedIdKey: "sales.pipeline.selectedId",
      reviewStatusKey: "sales.pipeline.reviewStatus",
      outcomeStatusKey: "sales.pipeline.outcomeStatus",
      outcomeEvent: "business:deal:outcome:changed",
    },
    BusinessDealOutcomeReceiver: {
      title: "Outcome receiver",
      listenEvent: "business:deal:outcome:changed",
      reviewEvent: "business:deal:review:changed",
      selectedIdKey: "sales.pipeline.selectedId",
      outcomeStatusKey: "sales.pipeline.outcomeStatus",
      maxEntries: 6,
    },
    BusinessChainNavigator: {
      title: "Business chain navigator",
      description:
        "See which step is currently active as the deal moves through the workflow.",
      selectedIdKey: "sales.pipeline.selectedId",
      workflowStageKey: "sales.pipeline.selectedStage",
      reviewStatusKey: "sales.pipeline.reviewStatus",
      outcomeStatusKey: "sales.pipeline.outcomeStatus",
    },
    BusinessChainStatusSummary: {
      title: "Chain status summary",
      description:
        "A compact readout of the selected deal and its workflow state.",
      selectedIdKey: "sales.pipeline.selectedId",
      workflowStageKey: "sales.pipeline.selectedStage",
      reviewStatusKey: "sales.pipeline.reviewStatus",
      outcomeStatusKey: "sales.pipeline.outcomeStatus",
      leadStatusKey: "sales.pipeline.leadStatus",
    },
    BusinessChainProgressBar: {
      title: "Chain progress",
      description:
        "A quick visual of the workflow progression from selection to outcome.",
      selectedIdKey: "sales.pipeline.selectedId",
      workflowStageKey: "sales.pipeline.selectedStage",
      reviewStatusKey: "sales.pipeline.reviewStatus",
      outcomeStatusKey: "sales.pipeline.outcomeStatus",
    },
    BusinessChainNextAction: {
      title: "Next action",
      description:
        "A guided hint that tells the user what to do next in the business chain.",
      selectedIdKey: "sales.pipeline.selectedId",
      workflowStageKey: "sales.pipeline.selectedStage",
      reviewStatusKey: "sales.pipeline.reviewStatus",
      outcomeStatusKey: "sales.pipeline.outcomeStatus",
      leadStatusKey: "sales.pipeline.leadStatus",
    },
    BusinessChainLegend: {
      title: "Chain legend",
      description:
        "Color key for the business chain page so the workflow is easy to read.",
    },
    BusinessChainGuide: {
      title: "Business chain guide",
      description:
        "Follow the same deal through selection, stage, review, and outcome in one predictable order.",
    },
    BusinessOpsSummary: {
      title: "Business summary",
      description: "High-level KPIs loaded from the same page datasource.",
      stats: [
        { label: "Open deals", value: "12", delta: "+2 this week" },
        { label: "Win rate", value: "34%", delta: "+4% vs last month" },
        { label: "At risk", value: "3", delta: "Needs follow-up" },
      ],
    },
  };

  return defaultProps;
};
