import { WorkflowProvider, useWorkflow } from "./context/WorkflowContext";
import Node from "./components/Node";
import "./App.css";

function WorkflowBuilder() {
  const { workflow, undo, redo, canUndo, canRedo } = useWorkflow();

  const handleSave = () => {
    console.log("Saved Workflow:", JSON.stringify(workflow, null, 2));
    alert("Workflow logged to console!");
  };

  return (
    <div className="App">
      <header className="app-header">
        <h2>Workflow Builder</h2>
        <div className="header-controls">
          <button className="icon-btn" onClick={undo} disabled={!canUndo} title="Undo">
            ↩ Undo
          </button>
          <button className="icon-btn" onClick={redo} disabled={!canRedo} title="Redo">
            ↪ Redo
          </button>
          <button className="save-btn" onClick={handleSave}>
            Save Workflow
          </button>
        </div>
      </header>

      <div className="canvas">
        <Node node={workflow} />
      </div>
    </div>
  );
}

function App() {
  return (
    <WorkflowProvider>
      <WorkflowBuilder />
    </WorkflowProvider>
  );
}

export default App;
