function Text({ content }: { content: string; }) {
  return (
    <div className="flex items-start p-2 bg-white border rounded shadow-sm text-left">
      <div>
        <p className="text-sm">{content}</p>
      </div>
    </div>
  );
}

export default Text;
