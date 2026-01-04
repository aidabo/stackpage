# Project Context: StackPage Library

## Overview

StackPage is a low-code library for building page editors. It operates on a Host/Lib architecture:

- **The Host Project:** Provides custom components, default props, and API data sources (via callbacks).
- **The StackPage Lib:** Provides the editor UI, including the Canvas (based on `grid-stack.js`), Component Tree, Property Panel, and Data/Event binding engines.

**2. Core Workflow**

- **Drag & Drop:** Users drag components from the **Component Tab** to the Canvas.
- **Instantiation:** This creates a component instance with `defaultProps`.
- **Schema Generation:** The system immediately generates an RJSF-compatible schema based on these `defaultProps` using `PropertyTypeUtils`.
- **Storage:** This generated schema is saved strictly in the `props.__schema` field. It is distinct from actual prop data.
- **Editing:** Users modify component props via the **Property Tab**, which renders a form based on `props.__schema`.

**3. Schema Rules (Strict Constraints)**

- **Generation Trigger:** Occurs on component creation. If a component is selected and `props.__schema` is missing, regenerate it immediately from `defaultProps` via `PropertyTypeUtils`.
- **Type Inference:**
  - **Array:** If `defaultProps` has an array of objects, treat as `Array` schema.
  - **Select:** If `defaultProps` has an array of primitives (strings/numbers), treat as `Select` schema.
  - **Media:** Distinguish specific media types (Image, Video, Audio) rather than generic strings.
- **State Management:** When selecting a component, if schema generation is triggered, **do not** trigger a full component data update to prevent infinite render loops.
- **Select Options:** Can be sourced from Custom Options (static), Lists, or API.

---

## Implement Data & API Binding

**Current Status:** Schema editing and Page Save/Reload are functional.
**Goal:** Complete the Data Binding and API Binding logic. (Event binding is next, but out of scope for now).

**Implementation Plan (Step 2)**

### UI Architecture & DataExplorer

- **DataExplorerDialog:** This modal serves as the primary interface for selecting data sources.
- **API Integration:** The API selection dropdown and configuration should be accessible within this dialog to streamline the workflow.

### Mapping Engine, Transformers & Persistence

- **Path Resolution:** Implement data retrieval using a library like **`lodash.get`** (or `dlv`) to support dot-notation JSON paths (e.g., `response.users[0].name`).
- **Transformer Pipeline:** Implement a **Transformer Registry** in the Lib to allow data modification before injection (e.g., `toNumber`, `currency`, `formatDate`).
- **Persistence (Crucial):** When a user maps an API data source to a component, the **Mapping Info** (Source ID, JSON Path, Transformer Name) must be saved into the component's persistent storage (e.g., `props.__bindings`).
- **Schema Validation:** During mapping, the system must check the target component's `props.__schema`. If the transformed data type does not match the prop schema, the UI should show a warning.

### Runtime Behavior (Lib Project Responsibility)

- **Dynamic Binding Engine:** The StackPage Lib must contain a runtime engine that reads the saved **Mapping Info** on page load.
- **Execution Flow:**
  1.  Detect components with active API bindings.
  2.  Trigger the API call (via Host callback).
  3.  Apply the saved JSON Path (`lodash.get`).
  4.  Run the saved Transformer function.
  5.  Inject the final value into the component props dynamically.
- **Reloadability:** Ensure that this entire process happens automatically when the editor or page reloads, restoring the component's data state without user intervention.

### Save binding and mapping info

Now binding api datasource, mapping, transoform with selected component instance props is already prepared by DataExplorerDialog, but props update to real value when page build and save with props, so when api datasource result updated, not reflect dynamically.

As above, please fix for me.

1. must save binding and mapping info with props, see **schema saving and loading and apply when page building, i think similar to the works for **schema
2. Create shared resolver to resolve api mapping and tranform
3. Create shared dataservice to dynamically api fetch when binding
4. when page building, call above functions to bind and mapping and render real data to selected component instance to preview result of UI
5. when page save by handleSave , save \_\_binding info into props
6. when page load , if has binding info in props, use resolver to perform binding, mapping, transform
7. be careful check propertyTab and DataTab, DataTab show selected component instance props as form to edit mannually. if has binding setting, will show resolved data in form

### How to bind next.js api route datasource

- 前提条件：

  StackPage 是一个库，位于目录：01-jibunsee-react/package/stack-page，使用 Vite、TypeScript 和 React 构建。该库用于生成页面，即构建页面。宿主应用是一个 Next.js 应用，它是为 Ghost CMS 定制的前端网站，位于目录：01-jibunsee-react。现在，我们需要将 StackPage 中的 DataSource 绑定到生成的页面中的控件。绑定到全局 API（可以直接调用的 HTTP/HTTPS 端点）的功能已经实现，但我们希望动态绑定到宿主 Next.js API，以便在 StackPage 生成的页面控件中显示最新数据。

- 解决方案：

  您之前提供了一个适配器解决方案，其中 StackPage 中的 DataSourceTab 定义允许指定由适配器提供的 DataSource，数据由宿主 Next.js 应用动态提供。这个解决方案不错；现在我们需要修改 StackPage 库和宿主应用来实现它。请记住：StackPage 是一个库，宿主应用程序是 Next.js 应用程序，DataSource 绑定需要动态解析，这意味着页面构建和页面加载时都会显示最新值。

- 注意点：

  能保证 runtime 时调用正确， 因为运行时 next.js api 是不可见的, 当绑定 next.js api 是假设数据同源，和 next.js app 有同样的 domain, next.config.js 有 proxy 设定来访问 Ghost CMS api 等

---

- Prerequisites:

  StackPage is a library, directory: 01-jibunsee-react/package/stack-page, using Vite+TypeScript+React. This library is used to generate pages, i.e., build pages. The host app is a Next.js app, a customized front-end website for Ghost CMS, directory: 01-jibunsee-react. Now, we need to provide binding functionality from the DataSource in StackPage to controls within the generated pages. Binding to global APIs (HTTP/HTTPS endpoints that can be directly called) is already implemented, but we want to dynamically bind to the host Next.js API to display the latest data in the controls of the StackPage-generated pages.

- Solution:

  You previously provided an Adapter solution, where the DataSourceTab definition in StackPage allows specifying the DataSource provided by the Adapter, with data dynamically provided by the host Next.js app. This solution is good; now we need to modify the StackPage library and the host app to implement it. Please remember: StackPage is a library, the host app is the Next.js app, and the DataSource binding needs to be dynamically resolved, meaning that the latest value is displayed when the page is built and when the page is loaded.

## Fix data binding of Host function datasource

I found the problem is that Host function do not dynamically fetch and bind, it always get blank data.

Fix as following steps:

1: In DataExplorerDialog, when "apply & bind" for Host function datasource, In fetchData function, no related process, it is ignored by endpoint check
2: I want to use the same resolver for data mapping and bind process, currently three source files of DataExplorerDialog, useDataBinding, and StackPageProvider has related process code. Summary modify them to a shared function. and fetchMissingData in StackPageProvider seems unused, check and modify.
3: mapping and binding rule:
3.1: if schema is object type, always use first selected result item, even multiple selected and remember its id as current version to bind this record.
3.2: if schema is array, use all result items or multiple selected items

Please modify source step by step, tell me solution and how you done.

## Now fix following problem:

- Reflect existed binding info:

For DataExplorerDialog, from DataTab click "Data Binding" button, if selected component instance already bound, and props.\_\_bindings has correct binding info, the DataExplorerDialog not reflected bound field name, and ignoreMappings also not reflected, and in the visualDataPreview, selected record of datasource not reflected

- Binding info's select type change:

DataExplorerDialog and useDataBinding use DataFetchUtils's function to identify select type of mapping and binding, now select type has three pattern, id or index for schema type object component, only binding one selected record, and all for all datasource record. i want to change as following:

1. id for schema type object component or the first record
2. ids, multiple selected records with id as key to find, this for schema type array
3. all all datasource records

how to identify select type should use summaried shared functions, current version is dataFetchUtils's two functions:

1. createBindingSelector
2. getValueFromDataSource
