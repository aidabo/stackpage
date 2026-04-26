# StackPage

StackPage is a React + TypeScript page builder library built on `gridstack.js`.
It is designed for drag-and-drop page composition, schema-driven property editing,
data binding, and page-level event wiring.

## Contents

- [At a glance](#at-a-glance)
- [Why StackPage exists](#why-stackpage-exists)
- [Highlights](#highlights)
- [Event system](#event-system)
- [How to build a page](#how-to-build-a-page)
- [Lifecycle events plan](#lifecycle-events-plan)
- [Architecture](#architecture)
- [Demo pages](#demo-pages)
- [Project layout](#project-layout)
- [Getting started](#getting-started)
- [Basic usage](#basic-usage)
- [Host data sources](#host-data-sources)
- [Runtime widget API](#runtime-widget-api)
- [i18n](#i18n)
- [Development notes](#development-notes)
- [Exported types](#exported-types)
- [Related docs](#related-docs)

## At a glance

| Area | What it provides |
| --- | --- |
| Layout | Drag-and-drop page composition with nested grid support |
| Editing | Schema-driven property editor, JSON editor, and event editor |
| Runtime | One contract for edit / preview / view modes |
| State | Page state, widget props, and shared event bus |
| Data | Host data sources, bindings, and runtime value resolution |
| Events | Declarative interaction rules with request/response support |
| Persistence | Schema-only saved pages plus runtime refetch behavior |
| Recovery | README + event spec + demo data for easier session handoff |

The library ships with:

- editor / preview / view modes in one runtime
- nested grid layouts
- component catalog support
- schema-based property editing
- data source bindings
- page state and interaction rules
- runtime widget communication API
- host data source support for reusable page-builder data
- schema-only persistence for saved pages
- demo pages, sample widgets, and local JSON demo data
- runtime tests and build scripts
- dedicated event-system documentation with diagrams

## Why StackPage exists

StackPage is meant to give you a practical page builder that can:

- compose pages visually
- bind content to data sources
- keep page-level state in one place
- let widgets communicate without custom glue code everywhere
- support future AI-assisted page building without inventing a second page schema

The core idea is:

> configure page behavior with schema + bindings + interaction rules, then let the runtime execute it.

---

## Highlights

- **Drag-and-drop page composition**
  - based on `gridstack.js`
  - supports nested sub-grids

- **One runtime for edit / preview / view**
  - same component contract
  - same widget communication API
  - same page state model

- **Schema-driven property editing**
  - RJSF-based form editor
  - JSON editor for advanced editing
  - event definitions visible in the properties workflow

- **Data binding**
  - binding selectors: `id`, `ids`, `all`
  - array mapping support
  - runtime value resolution through the binding engine

- **Page-level interaction rules**
  - `set-prop`
  - `set-shared-state`
  - `emit-event`
  - `emit-request`

- **Runtime component communication**
  - `__stackpage.emit(...)`
  - `__stackpage.emitWithAck(...)`
  - `__stackpage.subscribe(...)`
  - `__stackpage.setPageState(...)`
  - `__stackpage.getPageState(...)`

- **Host data source support**
  - host-side dynamic data sources
  - reusable across page builder, AI, and future RAG

- **Demo-friendly recovery surface**
  - project README for quick orientation
  - event-system spec with diagrams
  - seeded demo DB and sample widgets

## Project status

StackPage is actively being used and extended in the monorepo.

- current emphasis: page builder runtime, event rules, and shared data sources
- docs emphasis: keep specs close to the code so a new session can recover quickly
- demo emphasis: keep sample widgets simple, visible, and easy to verify

---

## Event system

StackPage uses a declarative interaction model.

When a component emits an event, the runtime:

1. matches the event against `__interactions`
2. resolves the payload value
3. performs the configured action
4. optionally emits a follow-up event or request response

This is a runtime rule executor, not AI-generated handler code.

For the full event model, diagrams, and current/future boundaries, see:

- [`docs/event-system-spec.md`](./docs/event-system-spec.md)
- [`docs/page-builder-workflow-and-ai-plan.md`](./docs/page-builder-workflow-and-ai-plan.md)
- [`docs/README.md`](./docs/README.md)

---

## Lifecycle events plan

Some initialization and load behavior is still hardcoded in components today.

The next planned step is to move page/widget bootstrap logic into first-class lifecycle events exposed through `__stackpage`.

Planned lifecycle events include:

- `page:init`
- `page:load`
- `page:ready`
- `widget:init`
- `widget:load`
- `widget:unmount`

For the design plan and migration stages, see:

- [`docs/lifecycle-events-and-stackpage-api-plan.md`](./docs/lifecycle-events-and-stackpage-api-plan.md)

The lifecycle plan now includes a concrete rule schema for future `page:*` and `widget:*` bootstrap events.

The same doc also includes a first implementation checklist for runtime emission points, UI authoring support, migration, and future AI suggestion flow.

---

## How to build a page

StackPage page building is currently a manual editor workflow.

### Typical page-building flow

1. define React widgets
2. register them in `componentMapProvider`
3. organize them in `componentCatalogProvider`
4. seed initial props with `componentPropsProvider`
5. render `<StackPage />`
6. drag widgets onto the canvas
7. edit properties, bindings, and events
8. save the page

### Page-building details

- the page editor stores layout and configuration
- runtime data is fetched again on load
- interactions are declarative and rule-based
- event execution comes from the runtime, not from AI-generated code

### AI-assisted page completion plan

AI-assisted page completion is **planned but not implemented yet**.

The intended future flow is:

1. the assistant inspects the current page
2. it suggests widgets, props, bindings, and events
3. the user reviews the draft
4. the user applies the draft changes
5. the user saves the page

For the detailed plan and future stages, see:

- [`docs/page-builder-workflow-and-ai-plan.md`](./docs/page-builder-workflow-and-ai-plan.md)

---

## Architecture

### Core runtime pieces

- `StackPageProvider`
  - page attributes
  - selected widget
  - widget props
  - shared page state
  - event bus

- `GridStackRender` / `GridStackWidgetRenderer`
  - renders layout items
  - injects `__stackpage`
  - routes widget events into runtime rules

- `componentCommunication.ts`
  - runtime API
  - event bus
  - interaction rule executor
  - request/response support

### Persistence model

Saved page data keeps only the configuration needed to rebuild the page:

- layout
- page attributes
- page state
- source configuration
- widget metadata

Widget props may contain:

- `__schema`
- `__bindings`
- `__ignoredMappings`
- `__interactions`
- `__schemaOptions`

Runtime-fetched data is not treated as saved page content.

### Host injection contracts

Host applications provide:

- `componentMapProvider`
- `componentCatalogProvider`
- `componentPropsProvider`
- `getHostDataSources`

This keeps StackPage reusable across different host apps while still letting the host define real business components and data sources.

---

## Demo pages

The repo includes demo content under `packages/stackpage/src/demo`.

Notable samples include:

- `Page State Bridge`
  - shows page state sharing
  - useful for testing synchronous vs asynchronous state updates

- `Form control sampler`
  - contains common form controls
  - useful for testing input behavior

- event-pattern demo pages
  - select → detail
  - search → results
  - submit → confirm
  - request → reply

### Demo entry points

The main demo page is seeded in `packages/stackpage/data/db.json` and can be
loaded through the demo app / local JSON server flow.

If you want to verify behavior visually, start with:

- `Page State Bridge`
  - page state sync and input focus behavior
- `Form control sampler`
  - common form controls and local form behavior
- `Event Patterns Demo`
  - four canonical event patterns in one layout

The demo DB is stored in:

- `packages/stackpage/data/db.json`

---

## Project layout

```text
packages/stackpage/
├─ src/
│  ├─ demo/              # Demo pages and sample widgets
│  └─ lib/               # StackPage runtime and editor library
├─ docs/                 # Project docs and specs
├─ tests/                # Runtime tests
├─ data/db.json          # Demo page database
├─ package.json
└─ vite.config*.ts
```

### Important source areas

- `src/lib/components/stackpage.tsx`
- `src/lib/components/StackPageProvider.tsx`
- `src/lib/gridstack/grid-stack-render.tsx`
- `src/lib/gridstack/grid-stack-widget-render.tsx`
- `src/lib/utils/componentCommunication.ts`
- `src/lib/components/PropertiesTab.tsx`
- `src/lib/components/DataTab.tsx`
- `src/lib/components/JsonTab.tsx`
- `src/lib/components/InteractionEditorDialog.tsx`
- `src/demo/components/MyComponents.tsx`

---

## Getting started

This package is primarily used inside the monorepo.

### Install dependencies

```bash
yarn
```

### Run the demo app

```bash
yarn --cwd packages/stackpage dev
```

### Run the local JSON server for the demo DB

```bash
yarn --cwd packages/stackpage jsonserver
```

### Build the library

```bash
yarn --cwd packages/stackpage build:lib
```

### Build the demo bundle

```bash
yarn --cwd packages/stackpage build:demo
```

### Run runtime tests

```bash
yarn --cwd packages/stackpage test:runtime
```

Individual runtime tests:

- `yarn --cwd packages/stackpage test:binding`
- `yarn --cwd packages/stackpage test:communication`
- `yarn --cwd packages/stackpage test:page-state`

---

## Basic usage

```tsx
import {
  StackPage,
  type ComponentMapProvider,
  type ComponentCatalogProvider,
  type ComponentPropsProvider,
  type LoadLayoutFn,
  type SaveLayoutFn,
} from "stackpage";

const componentMapProvider: ComponentMapProvider = () => ({
  Hero: (props) => <div>{props.title}</div>,
  CardList: (props) => <pre>{JSON.stringify(props.items, null, 2)}</pre>,
});

const componentCatalogProvider: ComponentCatalogProvider = () => ({
  common: ["Hero"],
  businesses: [
    { id: "portal", label: "Portal", components: ["CardList"] },
  ],
});

const componentPropsProvider: ComponentPropsProvider = () => ({
  Hero: { title: "Hello" },
  CardList: { items: [] },
});

const onLoadLayout: LoadLayoutFn = async (pageid) => {
  return fetch(`/api/pages/${pageid}`).then((r) => r.json());
};

const onSaveLayout: SaveLayoutFn = async (pageProps) => {
  await fetch(`/api/pages/${pageProps.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pageProps),
  });
};

export default function Editor({ pageid }: { pageid: string }) {
  return (
    <StackPage
      pageid={pageid}
      pageMode="edit"
      onLoadLayout={onLoadLayout}
      onSaveLayout={onSaveLayout}
      componentMapProvider={componentMapProvider}
      componentCatalogProvider={componentCatalogProvider}
      componentPropsProvider={componentPropsProvider}
    />
  );
}
```

---

## Host data sources

StackPage supports host-side dynamic data sources through `getHostDataSources`.

Use this when the host app needs to expose reusable page-builder data:

```ts
import type { GetHostDataSourcesFn } from "stackpage";

const getHostDataSources: GetHostDataSourcesFn = async () => [
  {
    id: "host-post-search",
    type: "host-function",
    name: "Post Search",
    hostFunctionId: "post-search",
    fetchData: async (params) => {
      const q = params?.q ?? "";
      return fetch(`/api/posts?q=${encodeURIComponent(q)}`).then((r) =>
        r.json()
      );
    },
  },
];
```

---

## Runtime widget API

Rendered widgets receive `__stackpage`.

### Available methods

- `emit(eventName, payload?)`
- `emitWithAck(eventName, payload?, { responseEvent?, timeoutMs? })`
- `subscribe(eventName, handler)`
- `unsubscribe(unsubscribeFn)`
- `setState(path, value)`
- `getState(path, defaultValue?)`
- `setPageState(path, value)`
- `getPageState(path, defaultValue?)`

Use this API for custom widget behavior and pair it with declarative `__interactions` rules when you want the runtime to manage the wiring.

### Included demo and docs assets

To make the project easier to recover after a session interruption, the repo also includes:

- `docs/event-system-spec.md`
- demo widgets such as:
  - `Page State Bridge`
  - `Form control sampler`
  - event-pattern samples for select/search/submit/request
- `data/db.json` for local demo pages
- runtime tests under `tests/`

---

## i18n

Pass an `i18n` prop from the host app:

```tsx
<StackPage
  i18n={{
    locale: "ja",
    t: (text) => translate(text),
  }}
/>
```

Notes:

- current extraction expects `t("string literal")` in render paths
- using variables like `t(text)` makes automatic extraction harder

---

## Development notes

- Edit-heavy panels and dialogs are lazy-loaded for better view-mode performance.
- Debug logs are browser-flag controlled:
  - enable: `localStorage.setItem("stackpage:debug", "1")`
  - disable: `localStorage.removeItem("stackpage:debug")`
- The demo DB lives in `packages/stackpage/data/db.json`
- Event rules are documented in `docs/event-system-spec.md`

---

## Exported types

Selected public types include:

- `StackPageProps`
- `PageProps`
- `ComponentMapProvider`
- `ComponentCatalogProvider`
- `ComponentPropsProvider`
- `GetHostDataSourcesFn`
- `DataSource`
- `HostFunctionDataSource`
- `InteractionRule`
- `StackPageRuntimeApi`
- `StackPageEventAction`
- `StackPageEventSubscription`

---

## Related docs

- `packages/stackpage/src/demo/components/MyComponents.tsx`
- `packages/stackpage/src/lib/utils/componentCommunication.ts`
- `packages/stackpage/src/lib/components/StackPageProvider.tsx`
