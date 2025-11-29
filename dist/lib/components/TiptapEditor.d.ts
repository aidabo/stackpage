import { default as React } from 'react';
interface TiptapEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}
declare const TiptapEditor: React.FC<TiptapEditorProps>;
export default TiptapEditor;
