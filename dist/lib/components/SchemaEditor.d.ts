import { default as React } from 'react';
import { FieldSchema, NamedList, DataSource } from './types';
interface SchemaEditorProps {
    schema: FieldSchema[];
    lists: NamedList[];
    dataSources?: DataSource[];
    onChange: (newSchema: FieldSchema[]) => void;
    isNested?: boolean;
}
export declare const SchemaEditor: React.FC<SchemaEditorProps>;
export {};
