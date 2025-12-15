# Project Context: StackPage Library

**1. Overview**
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

# Current Task: Implement Data & API Binding

**Current Status:** Schema editing and Page Save/Reload are functional.
**Goal:** Complete the Data Binding and API Binding logic. (Event binding is next, but out of scope for now).

**Implementation Plan (Step 2)**

**1. UI Architecture & DataExplorer**

- **DataExplorerDialog:** This modal serves as the primary interface for selecting data sources.
- **API Integration:** The API selection dropdown and configuration should be accessible within this dialog to streamline the workflow.

**2. Mapping Engine, Transformers & Persistence**

- **Path Resolution:** Implement data retrieval using a library like **`lodash.get`** (or `dlv`) to support dot-notation JSON paths (e.g., `response.users[0].name`).
- **Transformer Pipeline:** Implement a **Transformer Registry** in the Lib to allow data modification before injection (e.g., `toNumber`, `currency`, `formatDate`).
- **Persistence (Crucial):** When a user maps an API data source to a component, the **Mapping Info** (Source ID, JSON Path, Transformer Name) must be saved into the component's persistent storage (e.g., `props.__bindings`).
- **Schema Validation:** During mapping, the system must check the target component's `props.__schema`. If the transformed data type does not match the prop schema, the UI should show a warning.

**3. Runtime Behavior (Lib Project Responsibility)**

- **Dynamic Binding Engine:** The StackPage Lib must contain a runtime engine that reads the saved **Mapping Info** on page load.
- **Execution Flow:**
  1.  Detect components with active API bindings.
  2.  Trigger the API call (via Host callback).
  3.  Apply the saved JSON Path (`lodash.get`).
  4.  Run the saved Transformer function.
  5.  Inject the final value into the component props dynamically.
- **Reloadability:** Ensure that this entire process happens automatically when the editor or page reloads, restoring the component's data state without user intervention.
