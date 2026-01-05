// MyComponents.tsx
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
            <p className="text-gray-600">{card.content ?? "Card content"}</p>
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
});

// Component props provider - returns default props for each component type
export const componentPropsProvider = () => {
  const defaultProps: Record<string, any> = {
    Button: {
      text: "Click me",
      color: "blue",
      size: "md",
      onClick: () => alert("Button clicked!"),
    },
    Card: {
      title: "Card Title",
      content:
        "This is a sample card with some content that can be customized.",
      shadow: true,
      border: true,
    },
    CardList: [
      { title: "Card", content: "Card content", shadow: true, border: true },
      { title: "Card2", content: "Card content2", shadow: true, border: true },
    ],
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
  };

  return defaultProps;
};
