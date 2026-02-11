import React, { useEffect, useMemo, useState } from "react";
import {
  XMarkIcon,
  PlusIcon,
  TrashIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import {
  InteractionRule,
  normalizeInteractionRules,
  validateInteractionRules,
} from "../utils/componentCommunication";

interface InteractionEditorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (rules: InteractionRule[]) => void;
  currentRules?: InteractionRule[];
}

type EditorMode = "visual" | "json";
type RuleTemplateKey =
  | "self_prop"
  | "cross_prop"
  | "shared_state"
  | "event_chain"
  | "request_ack";

const DEFAULT_RULE: InteractionRule = {
  id: "rule-1",
  description: "",
  event: "change",
  action: "set-prop",
  targetWidgetId: "$self",
  targetPath: "title",
  valueFrom: "$",
  enabled: true,
};

const TEMPLATE = JSON.stringify([DEFAULT_RULE], null, 2);

const ACTIONS: Array<InteractionRule["action"]> = [
  "set-prop",
  "set-shared-state",
  "emit-event",
  "emit-request",
];

const MODELS = {
  visual: "Visual Editor",
  json: "JSON Editor",
} as const;

const TEMPLATE_OPTIONS: Array<{
  key: RuleTemplateKey;
  label: string;
  description: string;
}> = [
  {
    key: "self_prop",
    label: "Self Prop Update",
    description: "On event, update current component prop (target $self).",
  },
  {
    key: "cross_prop",
    label: "Cross Widget Prop",
    description: "On event, update another widget prop by targetWidgetId.",
  },
  {
    key: "shared_state",
    label: "Shared State Sync",
    description: "On event, write payload into shared state path.",
  },
  {
    key: "event_chain",
    label: "Event Chain",
    description: "On event, emit next event for staged flow.",
  },
  {
    key: "request_ack",
    label: "Request + Ack",
    description: "Emit request and wait response, then trigger success/error events.",
  },
];

export const InteractionEditorDialog: React.FC<InteractionEditorDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  currentRules = [],
}) => {
  const [mode, setMode] = useState<EditorMode>("visual");
  const [text, setText] = useState(TEMPLATE);
  const [rules, setRules] = useState<InteractionRule[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [widgetOptions, setWidgetOptions] = useState<
    Array<{ id: string; name: string; title: string }>
  >([]);
  const [copyMessage, setCopyMessage] = useState<string>("");
  const [selectedTemplate, setSelectedTemplate] =
    useState<RuleTemplateKey>("self_prop");

  useEffect(() => {
    if (!isOpen) return;

    const options = Array.from(document.querySelectorAll("[gs-id]"))
      .map((el) => {
        const id = el.getAttribute("gs-id") || "";
        const name =
          el.getAttribute("data-component-name") ||
          el.querySelector("[data-component-name]")?.getAttribute("data-component-name") ||
          "Unknown";
        const title =
          el.querySelector(".widget-header .font-medium")?.textContent?.trim() ||
          name;
        return { id, name, title };
      })
      .filter((item) => item.id);

    const dedup = Array.from(
      new Map(options.map((x) => [x.id, x])).values()
    );

    const initialRules =
      currentRules.length > 0 ? normalizeInteractionRules(currentRules) : [DEFAULT_RULE];
    setWidgetOptions(dedup);
    setRules(initialRules);
    setText(JSON.stringify(initialRules, null, 2));
    setError(null);
    setWarning(null);
    setMode("visual");
    setSelectedTemplate("self_prop");
    setCopyMessage("");
  }, [isOpen, currentRules]);

  const widgetSelectOptions = useMemo(
    () =>
      [
        { id: "$self", name: "Self", title: "Self" },
        ...widgetOptions,
      ].map((w) => ({
        value: w.id,
        label: `${w.title}:${w.id}`,
      })),
    [widgetOptions]
  );

  const widgetsUsedInRules = useMemo(() => {
    const used = new Set(
      rules
        .map((rule) => rule.targetWidgetId)
        .filter((x): x is string => Boolean(x))
    );
    return Array.from(used).map((id) => {
      if (id === "$self") return { id, label: "Self:$self" };
      const found = widgetOptions.find((w) => w.id === id);
      return {
        id,
        label: found ? `${found.title}:${found.id}` : `Unknown:${id}`,
      };
    });
  }, [rules, widgetOptions]);

  if (!isOpen) return null;

  const updateRule = (index: number, patch: Partial<InteractionRule>) => {
    setRules((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], ...patch };
      return next;
    });
  };

  const addRule = () => {
    setRules((prev) => [
      ...prev,
      {
        ...DEFAULT_RULE,
        id: `rule-${prev.length + 1}`,
      },
    ]);
  };

  const removeRule = (index: number) => {
    setRules((prev) => prev.filter((_, i) => i !== index));
  };

  const moveRule = (index: number, direction: "up" | "down") => {
    setRules((prev) => {
      const target = direction === "up" ? index - 1 : index + 1;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      const temp = next[index];
      next[index] = next[target];
      next[target] = temp;
      return next;
    });
  };

  const createTemplateRules = (key: RuleTemplateKey): InteractionRule[] => {
    const baseId = rules.length + 1;
    switch (key) {
      case "self_prop":
        return [
          {
            id: `rule-${baseId}`,
            description: "Update current widget title from payload name.",
            event: "change",
            action: "set-prop",
            targetWidgetId: "$self",
            targetPath: "title",
            valueFrom: "$.name",
            enabled: true,
          },
        ];
      case "cross_prop":
        return [
          {
            id: `rule-${baseId}`,
            description: "Update another widget content using submit payload.",
            event: "submit",
            action: "set-prop",
            targetWidgetId: "",
            targetPath: "content",
            valueFrom: "$.message",
            enabled: true,
          },
        ];
      case "shared_state":
        return [
          {
            id: `rule-${baseId}`,
            description: "Sync search keyword to shared state.",
            event: "search",
            action: "set-shared-state",
            targetPath: "search.keyword",
            valueFrom: "$.q",
            enabled: true,
          },
        ];
      case "event_chain":
        return [
          {
            id: `rule-${baseId}`,
            description: "Emit follow-up event for next stage.",
            event: "submit",
            action: "emit-event",
            targetPath: "submit:after",
            valueFrom: "$",
            enabled: true,
          },
        ];
      case "request_ack":
        return [
          {
            id: `rule-${baseId}`,
            description: "Send request and wait for completion event.",
            event: "submit",
            action: "emit-request",
            targetPath: "contact:request",
            responseEvent: "contact:request:completed",
            onSuccessEvent: "contact:request:success",
            onErrorEvent: "contact:request:error",
            timeoutMs: 5000,
            valueFrom: "$",
            enabled: true,
          },
          {
            id: `rule-${baseId + 1}`,
            description: "On success, update status.",
            event: "contact:request:success",
            action: "set-prop",
            targetWidgetId: "$self",
            targetPath: "status",
            valueFrom: "$.result",
            enabled: true,
          },
          {
            id: `rule-${baseId + 2}`,
            description: "On error, update error field.",
            event: "contact:request:error",
            action: "set-prop",
            targetWidgetId: "$self",
            targetPath: "error",
            valueFrom: "$.error",
            enabled: true,
          },
        ];
      default:
        return [];
    }
  };

  const applyTemplate = () => {
    const templateRules = createTemplateRules(selectedTemplate);
    if (!templateRules.length) return;
    setRules((prev) => [...prev, ...templateRules]);
  };

  const handleSave = () => {
    try {
      const normalized =
        mode === "json"
          ? normalizeInteractionRules(JSON.parse(text))
          : normalizeInteractionRules(rules);
      const issues = validateInteractionRules(normalized, {
        widgetIds: widgetOptions.map((w) => w.id),
      });
      const errors = issues
        .filter((i) => i.severity === "error")
        .map((i) => `Rule ${i.ruleIndex + 1}: ${i.message}`);
      const warnings = issues
        .filter((i) => i.severity === "warning")
        .map((i) => `Rule ${i.ruleIndex + 1}: ${i.message}`);

      if (errors.length > 0) {
        setError(errors.join("\n"));
        setWarning(warnings.length > 0 ? warnings.join("\n") : null);
        return;
      }
      setWarning(warnings.length > 0 ? warnings.join("\n") : null);
      onSave(normalized);
      onClose();
    } catch (err: any) {
      setError(err?.message || "Invalid JSON format");
    }
  };

  const copyWidgetId = async (id: string) => {
    try {
      await navigator.clipboard.writeText(id);
      setCopyMessage(`Copied: ${id}`);
      window.setTimeout(() => setCopyMessage(""), 1500);
    } catch {
      setCopyMessage("Copy failed");
      window.setTimeout(() => setCopyMessage(""), 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div
        className="bg-white rounded-lg shadow-xl flex flex-col overflow-hidden"
        style={{
          width: "min(1100px, 95vw)",
          height: "min(90vh, 860px)",
        }}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Interaction Rules</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100">
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="px-4 pt-3 flex gap-2 border-b">
          {(Object.keys(MODELS) as EditorMode[]).map((key) => (
            <button
              key={key}
              onClick={() => {
                setMode(key);
                setError(null);
                setWarning(null);
                if (key === "json") {
                  setText(JSON.stringify(rules, null, 2));
                }
              }}
              className={`px-3 py-2 text-sm rounded-t ${
                mode === key
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {MODELS[key]}
            </button>
          ))}
        </div>

        <div className="flex-1 min-h-0 p-4 flex flex-col gap-3 overflow-hidden">
          <p className="text-sm text-gray-600">
            Configure communication rules. Use <code>$self</code> for current widget.
          </p>
          <div className="text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded p-2 shrink-0 sticky top-0 z-10">
            <div className="font-medium mb-2">Widget Instances (title:id)</div>
            <div className="max-h-36 overflow-y-auto pr-1 space-y-2">
              <div className="shrink-0 w-64 rounded border bg-white p-2">
                <div className="text-[11px] text-gray-500">Self</div>
                <div className="text-xs font-semibold truncate">Self:$self</div>
                <button
                  onClick={() => copyWidgetId("$self")}
                  className="mt-2 px-2 py-1 text-[11px] border rounded hover:bg-gray-50"
                >
                  Copy ID
                </button>
              </div>
              {widgetOptions.map((item) => (
                <div key={item.id} className="rounded border bg-white p-2">
                  <div className="text-[11px] text-gray-500 truncate">
                    {item.name}
                  </div>
                  <div className="text-xs font-semibold truncate">
                    {item.title}:{item.id}
                  </div>
                  <button
                    onClick={() => copyWidgetId(item.id)}
                    className="mt-2 px-2 py-1 text-[11px] border rounded hover:bg-gray-50"
                  >
                    Copy ID
                  </button>
                </div>
              ))}
            </div>
            {copyMessage && (
              <div className="mt-1 text-[11px] text-emerald-700">{copyMessage}</div>
            )}
          </div>
          <div className="text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded p-2 shrink-0">
            <div className="font-medium mb-1">Widgets Used in Rules</div>
            <div className="flex flex-wrap gap-1">
              {(widgetsUsedInRules.length > 0 ? widgetsUsedInRules : [{ id: "-", label: "No widget target used yet" }]).map((item) => (
                <span
                  key={item.id}
                  className="px-2 py-0.5 rounded bg-white border border-gray-300 font-mono"
                >
                  {item.label}
                </span>
              ))}
            </div>
          </div>

          {mode === "json" ? (
            <div className="flex-1 min-h-0 overflow-hidden">
              <textarea
                className="w-full h-full p-3 font-mono text-xs border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
          ) : (
            <div className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-3">
              <div className="border rounded-lg p-3 bg-blue-50 border-blue-200">
                <div className="text-sm font-medium text-blue-900 mb-2">
                  Rule Templates
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <select
                    className="border rounded px-2 py-1 text-xs"
                    value={selectedTemplate}
                    onChange={(e) =>
                      setSelectedTemplate(e.target.value as RuleTemplateKey)
                    }
                  >
                    {TEMPLATE_OPTIONS.map((opt) => (
                      <option key={opt.key} value={opt.key}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <div className="md:col-span-2 text-xs text-blue-800">
                    {
                      TEMPLATE_OPTIONS.find((opt) => opt.key === selectedTemplate)
                        ?.description
                    }
                  </div>
                </div>
                <button
                  onClick={applyTemplate}
                  className="mt-2 inline-flex items-center gap-2 px-3 py-2 text-xs bg-blue-600 text-white hover:bg-blue-700 rounded"
                >
                  <PlusIcon className="w-4 h-4" />
                  Insert Template
                </button>
              </div>

              {rules.map((rule, index) => (
                <div key={rule.id || index} className="border rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-600">
                      Rule {index + 1}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveRule(index, "up")}
                        className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                        title="Move up"
                      >
                        <ArrowUpIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => moveRule(index, "down")}
                        className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                        title="Move down"
                      >
                        <ArrowDownIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeRule(index)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                        title="Delete rule"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
                    <input
                      className="border rounded px-2 py-1 text-xs"
                      value={rule.id || ""}
                      onChange={(e) => updateRule(index, { id: e.target.value })}
                      placeholder="rule id"
                    />
                    <input
                      className="border rounded px-2 py-1 text-xs md:col-span-2"
                      value={rule.description || ""}
                      onChange={(e) =>
                        updateRule(index, { description: e.target.value })
                      }
                      placeholder="description (optional)"
                    />
                    <input
                      className="border rounded px-2 py-1 text-xs"
                      value={rule.event || ""}
                      onChange={(e) => updateRule(index, { event: e.target.value })}
                      placeholder="event name"
                    />
                    <select
                      className="border rounded px-2 py-1 text-xs"
                      value={rule.action}
                      onChange={(e) =>
                        updateRule(index, {
                          action: e.target.value as InteractionRule["action"],
                        })
                      }
                    >
                      {ACTIONS.map((action) => (
                        <option key={action} value={action}>
                          {action}
                        </option>
                      ))}
                    </select>
                    <label className="flex items-center gap-2 text-xs">
                      <input
                        type="checkbox"
                        checked={rule.enabled !== false}
                        onChange={(e) =>
                          updateRule(index, { enabled: e.target.checked })
                        }
                      />
                      enabled
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <select
                      className="border rounded px-2 py-1 text-xs"
                      value={rule.targetWidgetId || ""}
                      onChange={(e) =>
                        updateRule(index, { targetWidgetId: e.target.value })
                      }
                    >
                      <option value="">target widget</option>
                      {widgetSelectOptions.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                    <input
                      className="border rounded px-2 py-1 text-xs"
                      value={rule.targetPath || ""}
                      onChange={(e) => updateRule(index, { targetPath: e.target.value })}
                      placeholder="targetPath"
                    />
                    <input
                      className="border rounded px-2 py-1 text-xs"
                      value={rule.valueFrom || ""}
                      onChange={(e) => updateRule(index, { valueFrom: e.target.value })}
                      placeholder="valueFrom (e.g. $.email)"
                    />
                  </div>

                  {rule.action === "emit-request" && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                      <input
                        className="border rounded px-2 py-1 text-xs"
                        value={rule.responseEvent || ""}
                        onChange={(e) =>
                          updateRule(index, { responseEvent: e.target.value })
                        }
                        placeholder="responseEvent"
                      />
                      <input
                        className="border rounded px-2 py-1 text-xs"
                        value={String(rule.timeoutMs || "")}
                        onChange={(e) =>
                          updateRule(index, {
                            timeoutMs: e.target.value ? Number(e.target.value) : undefined,
                          })
                        }
                        placeholder="timeoutMs"
                      />
                      <input
                        className="border rounded px-2 py-1 text-xs"
                        value={rule.onSuccessEvent || ""}
                        onChange={(e) =>
                          updateRule(index, { onSuccessEvent: e.target.value })
                        }
                        placeholder="onSuccessEvent"
                      />
                      <input
                        className="border rounded px-2 py-1 text-xs"
                        value={rule.onErrorEvent || ""}
                        onChange={(e) =>
                          updateRule(index, { onErrorEvent: e.target.value })
                        }
                        placeholder="onErrorEvent"
                      />
                    </div>
                  )}
                </div>
              ))}

              <button
                onClick={addRule}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded border"
              >
                <PlusIcon className="w-4 h-4" />
                Add Rule
              </button>
            </div>
          )}

          {error && (
            <div className="shrink-0 text-sm whitespace-pre-wrap text-red-600 bg-red-50 border border-red-200 rounded p-2">
              {error}
            </div>
          )}
          {warning && (
            <div className="shrink-0 text-sm whitespace-pre-wrap text-amber-700 bg-amber-50 border border-amber-200 rounded p-2">
              {warning}
            </div>
          )}
        </div>

        <div className="border-t p-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Save Rules
          </button>
        </div>
      </div>
    </div>
  );
};
