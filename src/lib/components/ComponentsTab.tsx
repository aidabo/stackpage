
import {
  getComponentMap,
  ComponentMapProvider,
} from "./stackoptions";
import { useStackPage } from "./StackPageContext";
import DeleteDropZone from "./deletedropzone";

// Components Tab Component
export const ComponentsTab = ({ 
  componentMapProvider, 
  onDragStart 
}: { 
  componentMapProvider?: ComponentMapProvider;
  onDragStart: (e: React.DragEvent, componentType: string) => void;
}) => {
  const { setSelectedComponent, setSelectedInstance } = useStackPage();
  const componentMap = getComponentMap(componentMapProvider);

  return (
    <div className="h-full p-4 space-y-6 max-h-[calc(100vh-48*0.25rem)] overflow-y-auto">
      <h3 className="text-lg font-medium mb-3">Components</h3>
      <p className="text-sm text-gray-600 mb-4">
        Drag components to the main area or click to select them
      </p>

      {/* Delete Drop Zone */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          Delete Zone
        </h4>
        <DeleteDropZone
          onDropDelete={() => {
            console.log("Component deleted via drop zone");
            setSelectedComponent(null);
            setSelectedInstance(null);
          }}
        />
        <p className="text-xs text-gray-500 mt-2 text-center">
          Drag components here to delete them
        </p>
      </div>

      {/* SubGrid Component */}
      <div
        key="SubGrid"
        gs-type="SubGrid"
        data-gs-type="SubGrid"
        className="grid-stack-item grid-stack-item-widget"
        draggable="true"
        onDragStart={(e) => onDragStart(e, "SubGrid")}
        onDragEnd={() => console.log("====SubGrid drag event end....")}
        onClick={() => {
          setSelectedComponent("SubGrid");
          setSelectedInstance(null);
        }}
      >
        <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-dashed border-blue-300 text-sm hover:from-blue-100 hover:to-indigo-100 cursor-pointer transition-all duration-200 hover:shadow-lg text-center group">
          <div className="font-semibold text-blue-700 mb-2 flex items-center justify-center">
            <svg
              className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 3v18M3 9h18"
              />
            </svg>
            SubGrid
          </div>
          <div className="text-xs text-blue-600 font-medium">
            Nested Grid Container
          </div>
          <div className="text-xs text-blue-500 mt-1">
            Drag to create nested layout
          </div>
        </div>
      </div>

      {/* Rest of the component grid */}
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(componentMap).map(([name /*Component*/]) => (
          <div
            key={name}
            gs-type={name}
            data-gs-type={name}
            className="grid-stack-item grid-stack-item-widget"
            draggable="true"
            onDragStart={(e) => onDragStart(e, name)}
            onDragEnd={() => console.log("====drag event end....")}
            onClick={() => {
              setSelectedComponent(name);
              setSelectedInstance(null);
            }}
          >
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm hover:bg-gray-100 cursor-pointer transition-all duration-200 hover:shadow-md text-center">
              <div className="font-medium text-gray-800 mb-2">{name}</div>
              <div className="text-xs text-gray-500">Drag to main area</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};