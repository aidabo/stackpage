interface TextProps {
  content?: string;
  image?: string;
  src?: string;
  title?: string;
  [key: string]: any;
}

function Text(props: TextProps) {
  const { content, image, src, title } = props;
  const imageUrl = image || src;

  return (
    <div className="flex flex-col items-center p-2 bg-white border rounded shadow-sm text-left gap-2 h-full overflow-hidden">
      {title && <h3 className="font-bold text-2xl text-center">{title}</h3>}
      
      {imageUrl && (
        <div className="w-full relative min-h-[100px] bg-gray-50 flex items-center justify-center rounded overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title || "Component image"} 
            className="object-cover max-w-full min-h-48"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}
      
      {content && (
        <div className="w-full">
          <p className="text-sm whitespace-pre-wrap">{content}</p>
        </div>
      )}
      
      {/* Render generic debug info if neither content nor image exists */}
      {!content && !imageUrl && !title && (
        <div className="text-xs text-gray-400 italic">
          No content to display. Add 'content', 'title', or 'image' properties.
        </div>
      )}
    </div>
  );
}

export default Text;
