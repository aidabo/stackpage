// utils/transformers.ts

// 内置转换器函数
export const transformers: Record<string, (value: any) => any> = {
  // 字符串转换
  uppercase: (value: any) => String(value).toUpperCase(),
  lowercase: (value: any) => String(value).toLowerCase(),
  capitalize: (value: any) => {
    const str = String(value);
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },
  trim: (value: any) => String(value).trim(),

  // 数字转换
  number: (value: any) => {
    const num = Number(value);
    return isNaN(num) ? 0 : num;
  },
  integer: (value: any) => {
    const num = Number(value);
    return isNaN(num) ? 0 : Math.floor(num);
  },
  round: (value: any) => {
    const num = Number(value);
    return isNaN(num) ? 0 : Math.round(num);
  },

  // 类型转换
  string: (value: any) => {
    if (value === null || value === undefined) return "";
    return String(value);
  },
  boolean: (value: any) => Boolean(value),

  // 日期转换
  date: (value: any) => {
    if (value instanceof Date) return value.toISOString().split("T")[0];
    const date = new Date(value);
    return isNaN(date.getTime()) ? value : date.toISOString().split("T")[0];
  },
  datetime: (value: any) => {
    if (value instanceof Date) return value.toISOString();
    const date = new Date(value);
    return isNaN(date.getTime()) ? value : date.toISOString();
  },

  // 货币格式
  currency: (value: any) => {
    const num = Number(value);
    if (isNaN(num)) return value;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(num);
  },

  // URL处理
  urlencode: (value: any) => encodeURIComponent(String(value)),
  urldecode: (value: any) => decodeURIComponent(String(value)),

  // 特殊格式
  slug: (value: any) => {
    return String(value)
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  },
  email: (value: any) => String(value).toLowerCase().trim(),

  // 文本处理
  plural: (value: any) => {
    const str = String(value);
    if (
      str.endsWith("y") &&
      !["a", "e", "i", "o", "u"].includes(str.charAt(str.length - 2))
    ) {
      return str.slice(0, -1) + "ies";
    } else if (
      str.endsWith("s") ||
      str.endsWith("x") ||
      str.endsWith("z") ||
      str.endsWith("ch") ||
      str.endsWith("sh")
    ) {
      return str + "es";
    }
    return str + "s";
  },

  singular: (value: any) => {
    const str = String(value);
    if (str.endsWith("ies")) return str.slice(0, -3) + "y";
    if (str.endsWith("es") && str.length > 2) return str.slice(0, -2);
    if (str.endsWith("s") && str.length > 1) return str.slice(0, -1);
    return str;
  },

  // 长度限制
  truncate: (value: any) => {
    const str = String(value);
    return str.length > 100 ? str.substring(0, 100) + "..." : str;
  },

  // JSON处理
  json: (value: any) => {
    try {
      return typeof value === "string"
        ? JSON.parse(value)
        : JSON.stringify(value);
    } catch {
      return value;
    }
  },
};

// 应用转换器
export const applyTransformer = (value: any, transformerId: string): any => {
  const transformer = transformers[transformerId];
  if (!transformer) {
    console.warn(`Unknown transformer: ${transformerId}`);
    return value;
  }

  try {
    return transformer(value);
  } catch (error) {
    console.error(`Transformer error (${transformerId}):`, error);
    return value;
  }
};

// 批量应用转换器
export const applyTransformers = (
  data: Record<string, any>,
  transformerMap: Record<string, string>
): Record<string, any> => {
  const result = { ...data };

  Object.entries(transformerMap).forEach(([key, transformerId]) => {
    if (result.hasOwnProperty(key)) {
      result[key] = applyTransformer(result[key], transformerId);
    }
  });

  return result;
};

// 获取转换器描述
export const getTransformerDescription = (transformerId: string): string => {
  const descriptions: Record<string, string> = {
    uppercase: "Convert text to uppercase",
    lowercase: "Convert text to lowercase",
    capitalize: "Capitalize first letter",
    trim: "Remove whitespace",
    number: "Convert to number",
    integer: "Convert to integer",
    round: "Round to nearest integer",
    string: "Convert to string",
    boolean: "Convert to boolean",
    date: "Format as date (YYYY-MM-DD)",
    datetime: "Format as ISO datetime",
    currency: "Format as currency ($1,234.56)",
    urlencode: "URL encode",
    urldecode: "URL decode",
    slug: "Convert to URL slug",
    email: "Format as email (lowercase)",
    plural: "Convert to plural form",
    singular: "Convert to singular form",
    truncate: "Truncate to 100 characters",
    json: "Convert between JSON string and object",
  };

  return descriptions[transformerId] || "Unknown transformation";
};
