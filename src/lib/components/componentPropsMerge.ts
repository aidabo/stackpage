const mergeSchemas = (defaults: any, saved: any) => {
  if (!defaults) return saved;
  if (!saved) return defaults;

  return {
    ...defaults,
    ...saved,
    properties: {
      ...(defaults.properties || {}),
      ...(saved.properties || {}),
    },
  };
};

/**
 * Keep saved values authoritative while allowing newly released default props
 * and schema fields to appear for components already stored in a page layout.
 */
export const mergeComponentEditorProps = (
  defaultProps: Record<string, any> = {},
  savedProps: Record<string, any> = {},
): Record<string, any> => {
  const schema = mergeSchemas(defaultProps.__schema, savedProps.__schema);

  return {
    ...defaultProps,
    ...savedProps,
    ...(schema ? { __schema: schema } : {}),
  };
};
