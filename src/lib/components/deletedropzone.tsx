import { useCallback } from 'react';
import { useGridStackContext } from '@/lib/grid-stack-context';

export default function DeleteDropZone({ onDropDelete }: { onDropDelete: () => void }) {
  const { removeWidget } = useGridStackContext();

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    
    // Get the widget ID from drag data
    const widgetId = event.dataTransfer.getData('text/plain');
    if (widgetId) {
      // Remove widget from gridstack
      const el = document.querySelector(`[gs-id="${widgetId}"]`) as HTMLElement | null;
      if (el && (el as any).gridstackNode?.grid) {
        (el as any).gridstackNode.grid.removeWidget(el, true, true);
      }
      
      // Remove from context
      removeWidget(widgetId);
    }
    
    onDropDelete();
  }, [onDropDelete, removeWidget]);

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (event: React.DragEvent) => {
    event.preventDefault();
    event.currentTarget.classList.add('bg-red-200', 'border-red-400');
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    event.currentTarget.classList.remove('bg-red-200', 'border-red-400');
  };

  return (
    <div
      id="trash"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      className="bg-red-50 min-h-20 h-18 flex items-center justify-center p-0 border-2 border-dashed border-red-200 rounded-lg transition-all duration-200 hover:bg-red-100 cursor-pointer group"
    >
      <div className="w-full h-full flex flex-col items-center justify-center m-3">
        <svg 
          className="w-16 h-16 text-red-300 group-hover:text-red-400 transition-colors" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
          />
        </svg>
      </div>        
    </div>
  );
}