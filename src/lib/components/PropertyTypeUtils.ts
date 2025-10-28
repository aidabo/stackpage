// propertyTypeUtils.ts

// Helper function to check if string is a valid HTTP URL
export const isValidHttpUrl = (string: string): boolean => {
  try {
    const url = new URL(string);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
};

// Strict date validation - only accepts unambiguous date formats
export const isValidDate = (dateString: any): boolean => {
  if (typeof dateString !== "string") return false;

  const trimmed = dateString.trim();
  if (!trimmed) return false;

  // Only accept these exact formats
  const strictDatePatterns = [
    /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/, // YYYY-MM-DDTHH:mm:ss
    /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, // YYYY-MM-DD HH:mm:ss
    /^\d{4}\/\d{2}\/\d{2}$/, // YYYY/MM/DD
  ];

  const matchesFormat = strictDatePatterns.some((pattern) =>
    pattern.test(trimmed)
  );
  if (!matchesFormat) return false;

  try {
    const date = new Date(trimmed);
    return !isNaN(date.getTime());
  } catch {
    return false;
  }
};

// Check if value matches select pattern
export const isSelectField = (value: any): boolean => {
  if (typeof value !== "string") return false;

  const selectPattern = /^\[([^\]]+)\]$/;
  const match = value.match(selectPattern);
  return !!(match && (match[1].includes(",") || match[1].includes("|")));
};

// Parse select options from select pattern string
export const parseSelectOptions = (selectString: string): string[] => {
  const match = selectString.match(/^\[([^\]]+)\]$/);
  if (!match) return [];

  const optionsString = match[1];

  if (optionsString.includes(",")) {
    return optionsString.split(",").map((opt) => opt.trim());
  } else if (optionsString.includes("|")) {
    return optionsString.split("|").map((opt) => opt.trim());
  }

  return [optionsString.trim()];
};

// Main field type detection function
// export const detectFieldType = (name: string, value: any): string => {
//   const lowerName = name.toLowerCase();

//   // Check for special field names
//   if (
//     [
//       "src", "source", "file", "image", "url", "avatar", "logo", "icon",
//       "video", "audio", "media",
//     ].includes(lowerName)
//   ) {
//     return "file";
//   }

//   // Check for date/time fields - only check if name suggests it's a date
//   const dateLikeNames = [
//     "date", "time", "datetime", "created", "updated", "start", "end",
//     "timestamp", "published", "due", "_at",
//   ];
//   const isDateLikeName = dateLikeNames.some((dateName) =>
//     lowerName.includes(dateName)
//   );

//   // Only check for dates if the field name suggests it's a date field
//   if (isDateLikeName && isValidDate(value)) {
//     if (
//       lowerName.includes("time") ||
//       lowerName.includes("datetime") ||
//       lowerName === "timestamp"
//     ) {
//       return "datetime";
//     }
//     return "date";
//   }

//   // Check value type
//   if (typeof value === "number") return "number";
//   if (typeof value === "boolean") return "boolean";
//   if (Array.isArray(value)) return "array";
//   if (typeof value === "object" && value !== null) return "json";

//   if (typeof value === "string") {
//     // Check for select pattern
//     if (isSelectField(value)) {
//       return "select";
//     }

//     // Check for long text or multi-line
//     if (value.length > 40 || value.includes("\n")) return "textarea";

//     // Check if it's a color value
//     if (
//       lowerName.includes("color") ||
//       value.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
//     ) {
//       return "color";
//     }

//     // Check for email
//     if (lowerName.includes("email") && value.includes("@")) {
//       return "email";
//     }

//     // Check for URL
//     if ((lowerName.includes("url") || lowerName.includes("link")) && isValidHttpUrl(value)) {
//       return "url";
//     }

//     return "text";
//   }

//   return "text";
// };

// Get file type based on extension or value
export const getFileType = (
  fileValue: string
): "image" | "video" | "audio" | "document" | "other" => {
  if (!fileValue) return "other";

  // Check for data URLs
  if (fileValue.startsWith("data:")) {
    if (fileValue.startsWith("data:image")) return "image";
    if (fileValue.startsWith("data:video")) return "video";
    if (fileValue.startsWith("data:audio")) return "audio";
    return "other";
  }

  // Check file extension
  const extension = fileValue.split(".").pop()?.toLowerCase() || "";

  const imageExtensions = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "webp",
    "bmp",
    "svg",
    "ico",
    "tiff",
  ];
  const videoExtensions = [
    "mp4",
    "mov",
    "avi",
    "webm",
    "mkv",
    "flv",
    "wmv",
    "m4v",
    "3gp",
  ];
  const audioExtensions = ["mp3", "wav", "ogg", "aac", "flac", "m4a", "wma"];
  const documentExtensions = [
    "pdf",
    "doc",
    "docx",
    "txt",
    "rtf",
    "odt",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
  ];

  if (imageExtensions.includes(extension)) return "image";
  if (videoExtensions.includes(extension)) return "video";
  if (audioExtensions.includes(extension)) return "audio";
  if (documentExtensions.includes(extension)) return "document";

  return "other";
};

// Get accept attribute for file input based on field name and value
export const getFileAccept = (name: string, value: any): string => {
  const lowerName = name.toLowerCase();
  const fileType = getFileType(value);

  if (
    lowerName.includes("image") ||
    lowerName.includes("avatar") ||
    lowerName.includes("logo") ||
    lowerName.includes("icon")
  ) {
    return "image/*";
  }
  if (lowerName.includes("video")) {
    return "video/*";
  }
  if (lowerName.includes("audio") || lowerName.includes("sound")) {
    return "audio/*";
  }
  if (
    lowerName.includes("document") ||
    lowerName.includes("pdf") ||
    lowerName.includes("doc")
  ) {
    return ".pdf,.doc,.docx,.txt,.rtf,.odt,.xls,.xlsx,.ppt,.pptx";
  }

  // Priority 2: by current file value
  switch (fileType) {
    case "image":
      return "image/*";
    case "video":
      return "video/*";
    case "audio":
      return "audio/*";
    case "document":
      return ".pdf,.doc,.docx,.txt,.rtf,.odt,.xls,.xlsx,.ppt,.pptx";
    default:
      return "*/*";
  }
};

// Date formatting utilities
export const formatDateForInput = (
  dateValue: any,
  type: "date" | "datetime"
): string => {
  if (!dateValue) return "";

  try {
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return "";

    if (type === "date") {
      return date.toISOString().split("T")[0]; // YYYY-MM-DD
    } else {
      return date.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm
    }
  } catch {
    return "";
  }
};

export const parseDateFromInput = (
  inputValue: string,
  type: "date" | "datetime"
): string => {
  if (!inputValue) return "";

  try {
    if (type === "date") {
      const date = new Date(inputValue + "T00:00:00");
      return date.toISOString().split("T")[0];
    } else {
      const date = new Date(inputValue);
      return date.toISOString();
    }
  } catch {
    return inputValue;
  }
};

export const formatDateForDisplay = (
  dateValue: any,
  type: "date" | "datetime"
): string => {
  if (!dateValue) return "";

  try {
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    if (type === "date") {
      return `${year}/${month}/${day}`;
    } else {
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${year}/${month}/${day} ${hours}:${minutes}`;
    }
  } catch {
    return "";
  }
};

// Enhanced field type detection with support for dynamic fields
export const detectFieldType = (
  name: string,
  value: any,
  onGetSelectOptions?: (
    propertyName: string,
    componentType: string
  ) => Promise<string[]>
): string => {
  const lowerName = name.toLowerCase();

  // Check for special field names
  if (
    [
      "src",
      "source",
      "file",
      "image",
      "url",
      "avatar",
      "logo",
      "icon",
      "video",
      "audio",
      "media",
    ].includes(lowerName)
  ) {
    return "file";
  }

  // Check for date/time fields - only check if name suggests it's a date
  const dateLikeNames = [
    "date",
    "time",
    "datetime",
    "created",
    "updated",
    "start",
    "end",
    "timestamp",
    "published",
    "due",
    "_at",
  ];
  const isDateLikeName = dateLikeNames.some((dateName) =>
    lowerName.includes(dateName)
  );

  // Only check for dates if the field name suggests it's a date field
  if (isDateLikeName && isValidDate(value)) {
    if (
      lowerName.includes("time") ||
      lowerName.includes("datetime") ||
      lowerName === "timestamp"
    ) {
      return "datetime";
    }
    return "date";
  }

  // Check value type
  if (typeof value === "number") return "number";
  if (typeof value === "boolean") return "boolean";
  if (Array.isArray(value)) return "array";
  if (typeof value === "object" && value !== null) return "json";

  if (typeof value === "string") {
    // Check for select pattern
    if (isSelectField(value)) {
      return "select";
    }

    // Check for dynamic select fields (if callback provided)
    if (onGetSelectOptions && isLikelySelectField(name)) {
      return "dynamic-select";
    }

    // Check for long text or multi-line
    if (value.length > 40 || value.includes("\n")) return "textarea";

    // Check if it's a color value
    if (
      lowerName.includes("color") ||
      value.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    ) {
      return "color";
    }

    // Check for email
    if (lowerName.includes("email") && value.includes("@")) {
      return "email";
    }

    // Check for URL
    if (
      (lowerName.includes("url") || lowerName.includes("link")) &&
      isValidHttpUrl(value)
    ) {
      return "url";
    }

    return "text";
  }

  return "text";
};

// Check if a field is likely to be a select field based on name
export const isLikelySelectField = (name: string): boolean => {
  const lowerName = name.toLowerCase();
  const selectLikeNames = [
    "type",
    "category",
    "status",
    "state",
    "role",
    "priority",
    "size",
    "color",
    "variant",
    "alignment",
    "position",
    "option",
    "selection",
    "choice",
    "mode",
    "direction",
  ];

  return selectLikeNames.some((selectName) => lowerName.includes(selectName));
};

// Get dynamic select options
export const getDynamicSelectOptions = async (
  propertyName: string,
  componentType: string,
  onGetSelectOptions?: (
    propertyName: string,
    componentType: string
  ) => Promise<string[]>
): Promise<string[]> => {
  if (!onGetSelectOptions) {
    return [];
  }

  try {
    return await onGetSelectOptions(propertyName, componentType);
  } catch (error) {
    console.error(`Failed to get select options for ${propertyName}:`, error);
    return [];
  }
};

// Handle API calls for dynamic fields
export const handleApiCall = async (
  endpoint: string,
  method: string = "GET",
  data?: any,
  onApiCall?: (endpoint: string, method?: string, data?: any) => Promise<any>
): Promise<any> => {
  if (!onApiCall) {
    throw new Error("API call handler not provided");
  }

  return await onApiCall(endpoint, method, data);
};

// Handle custom actions
export const handleCustomAction = async (
  action: string,
  data: any,
  onCustomAction?: (action: string, data: any) => Promise<any>
): Promise<any> => {
  if (!onCustomAction) {
    throw new Error("Custom action handler not provided");
  }

  return await onCustomAction(action, data);
};
