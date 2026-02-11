# StackPage

A React + TypeScript page builder library based on `gridstack.js` for drag-and-drop layout editing, data binding, schema-driven property editing, and cross-component interactions.

## Keywords

`page-builder` `drag-and-drop` `gridstack` `react` `typescript` `schema-driven-ui` `json-schema` `data-binding` `headless-cms` `low-code`

## Features

- Drag-and-drop page composition with nested sub-grids
- Edit / preview / view modes in one runtime
- Component catalog split (`common` + `business`)
- Schema-based property editor (RJSF)
- Data source manager (`api`, `static`, `host-function`)
- Data binding with selector modes (`id`, `ids`, `all`) and array mapping (`$[]`)
- Page-level interaction rules:
  - `set-prop`
  - `set-shared-state`
  - `emit-event`
  - `emit-request` (request/response)
- Runtime component communication API (`__stackpage`)
- i18n support via host-provided `t(...)`

## Architecture

### Core providers

- `StackPageProvider`: page state, selected widget, widget props, shared state, event bus
- `GridStackProvider` / `GridStackRenderProvider`: gridstack lifecycle and render mapping
- Host injection contracts:
  - `componentMapProvider`
  - `componentCatalogProvider`
  - `componentPropsProvider`
  - `getHostDataSources`

### Persistence model

- Page-level source data: `source.lists`, `source.dataSources`
- Widget-level metadata in props:
  - `__schema`
  - `__bindings`
  - `__ignoredMappings`
  - `__interactions`

## Installation

```bash
yarn add stackpage
```

Import styles once:

```ts
import "stackpage/styles";
```

## Basic Usage

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
  CardList: (props) => <pre>{JSON.stringify(props.items)}</pre>,
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
  // Return PageProps from server
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

## Host Function Data Sources

Provide host-side dynamic data sources using `getHostDataSources`:

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
      return fetch(`/api/posts?q=${encodeURIComponent(q)}`).then((r) => r.json());
    },
  },
];
```

## Component Communication (`__stackpage`)

Every rendered widget can receive runtime API:

- `emit(eventName, payload?)`
- `emitWithAck(eventName, payload?, { responseEvent?, timeoutMs? })`
- `subscribe(eventName, handler)`
- `unsubscribe(unsubscribeFn)`
- `setState(path, value)`
- `getState(path, defaultValue?)`

Use it directly in business components for custom logic, then combine with `__interactions` rules for declarative wiring.

## i18n

Pass `i18n` prop from host app:

```tsx
<StackPage
  // ...
  i18n={{
    locale: "ja",
    t: (text) => translate(text),
  }}
/>
```

Important:
- Current extraction strategy expects `t("string literal")` in render paths.
- If you use variables (e.g. `t(text)`), i18n parser cannot auto-extract keys.

## Build & Test

```bash
yarn build
yarn build:lib
yarn test:runtime
```

Runtime tests:
- `tests/binding-engine.runtime.test.ts`
- `tests/component-communication.runtime.test.ts`

## Development Notes

- Edit-only heavy dialogs/tabs are lazy-loaded for better view-mode performance.
- Debug logs are browser-flag controlled:
  - enable: `localStorage.setItem("stackpage:debug", "1")`
  - disable: `localStorage.removeItem("stackpage:debug")`

## Exported Types (selected)

- `StackPageProps`, `PageProps`
- `ComponentMapProvider`, `ComponentCatalogProvider`, `ComponentPropsProvider`
- `GetHostDataSourcesFn`, `DataSource`, `HostFunctionDataSource`
- `InteractionRule`, `StackPageRuntimeApi`
- `StackPageEventAction`, `StackPageEventSubscription`

