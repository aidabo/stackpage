
import React, { useEffect, useRef } from 'react';

// Using a simple contenteditable div for simplicity to avoid complex Tiptap setup 
// in this environment if dependencies aren't fully resolvable.

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ content, onChange, placeholder }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  // Simple sync for initial load
  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.innerHTML) {
       if (editorRef.current.innerHTML === '' || content === '') {
         editorRef.current.innerHTML = content;
       }
    }
  }, [content]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    onChange(e.currentTarget.innerHTML);
  };

  const execCmd = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    // Force trigger input to update state
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  const handleLink = () => {
    const url = window.prompt('Enter URL:', 'https://');
    if (url) {
      execCmd('createLink', url);
    }
  };

  return (
    <div className="border border-gray-700 rounded bg-gray-800 overflow-hidden focus-within:ring-1 focus-within:ring-blue-500 transition-all">
       {/* Toolbar */}
       <div className="flex flex-wrap items-center gap-2 p-2 bg-gray-900 border-b border-gray-700 text-gray-400">
          
          {/* Basic Formatting */}
          <div className="flex items-center border-r border-gray-700 pr-2 gap-1">
            <button className="p-1.5 hover:text-white hover:bg-gray-700 rounded transition-colors" title="Bold" onClick={() => execCmd('bold')}>
               <span className="font-bold text-xs">B</span>
            </button>
            <button className="p-1.5 hover:text-white hover:bg-gray-700 rounded transition-colors" title="Italic" onClick={() => execCmd('italic')}>
               <span className="italic text-serif text-xs">I</span>
            </button>
            <button className="p-1.5 hover:text-white hover:bg-gray-700 rounded transition-colors" title="Underline" onClick={() => execCmd('underline')}>
               <span className="underline text-xs">U</span>
            </button>
            <button className="p-1.5 hover:text-white hover:bg-gray-700 rounded transition-colors" title="Insert Link" onClick={handleLink}>
               <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
            </button>
          </div>

          {/* Typography */}
          <div className="flex items-center gap-2 border-r border-gray-700 pr-2">
             <select 
               onChange={(e) => execCmd('fontName', e.target.value)}
               className="bg-gray-800 text-xs text-white border border-gray-700 rounded px-1 py-1 focus:outline-none focus:border-blue-500 h-7"
               title="Font Family"
             >
               <option value="Inter, sans-serif">Default</option>
               <option value="Georgia, serif">Serif</option>
               <option value="Courier New, monospace">Mono</option>
               <option value="Arial, sans-serif">Arial</option>
               <option value="Times New Roman, serif">Times</option>
             </select>

             <select 
               onChange={(e) => execCmd('fontSize', e.target.value)}
               className="bg-gray-800 text-xs text-white border border-gray-700 rounded px-1 py-1 focus:outline-none focus:border-blue-500 h-7"
               title="Font Size"
               defaultValue="3"
             >
               <option value="1">Tiny</option>
               <option value="2">Small</option>
               <option value="3">Normal</option>
               <option value="4">Large</option>
               <option value="5">Huge</option>
               <option value="6">Massive</option>
               <option value="7">Gigantic</option>
             </select>

             <div className="flex items-center gap-1" title="Text Color">
               <span className="text-xs font-bold text-gray-500">A</span>
               <input 
                 type="color" 
                 onChange={(e) => execCmd('foreColor', e.target.value)}
                 className="w-5 h-5 bg-transparent border-0 p-0 cursor-pointer rounded overflow-hidden"
               />
             </div>
          </div>

          {/* Alignment */}
           <div className="flex items-center gap-1">
            <button className="p-1.5 hover:text-white hover:bg-gray-700 rounded transition-colors" title="Ordered List" onClick={() => execCmd('insertOrderedList')}>
               <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>
            </button>
            <button className="p-1.5 hover:text-white hover:bg-gray-700 rounded transition-colors" title="Unordered List" onClick={() => execCmd('insertUnorderedList')}>
               <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
           </div>

       </div>
       
       {/* Editor Area */}
       <div 
         ref={editorRef}
         contentEditable
         onInput={handleInput}
         className="p-4 min-h-[150px] text-sm text-gray-200 outline-none prose prose-invert max-w-none"
         data-placeholder={placeholder}
         style={{ fontFamily: 'inherit' }}
       />
    </div>
  );
};

export default TiptapEditor;
