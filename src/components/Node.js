import React, { useState } from "react";
import { useWorkflow } from "../context/WorkflowContext";

function Node({ node }) {
  const { addNode, deleteNode, updateLabel } = useWorkflow();
  const [isHovered, setIsHovered] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);

  const handleChangeLabel = (e) => {
    updateLabel(node.id, e.target.value);
  };

  const hasChildren = node.children && node.children.length > 0;
  const isBranch = node.type === "branch";

  const trueChild = isBranch ? node.children.find(c => c.outcome === 'true') : null;
  const falseChild = isBranch ? node.children.find(c => c.outcome === 'false') : null;

  return (
    <div className="node-wrapper">
      <div
        className={`node-card ${node.type}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setShowAddMenu(false); }}
      >
        {node.outcome && (
          <div className={`outcome-badge ${node.outcome}`}>
            {node.outcome === 'true' ? 'True' : 'False'}
          </div>
        )}

        <div className="node-content">
          <span className="node-type-label">{node.type.toUpperCase()}</span>
          <input
            value={node.label}
            onChange={handleChangeLabel}
            className="node-input"
          />
        </div>

        <div className="node-controls" style={{ opacity: isHovered || showAddMenu ? 1 : 0 }}>
          {node.id !== "start" && (
            <button className="btn-delete" onClick={() => deleteNode(node.id)} title="Delete Node">
              ×
            </button>
          )}

          {node.type !== "end" && !isBranch && (
            <div className="add-menu-wrapper">
              <button
                className="btn-add"
                onClick={() => setShowAddMenu(!showAddMenu)}
                title="Add Node"
              >
                +
              </button>
              {showAddMenu && (
                <div className="add-menu">
                  <button onClick={() => addNode(node.id, "action")}>Action</button>
                  <button onClick={() => addNode(node.id, "branch")}>Condition</button>
                  <button onClick={() => addNode(node.id, "end")}>End</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {(hasChildren || isBranch) && <div className="line-down"></div>}

      {!isBranch && hasChildren && (
        <div className="children-container is-linear">
          {node.children.map((child) => (
            <Node key={child.id} node={child} />
          ))}
        </div>
      )}

      {isBranch && (
        <div className="children-container is-branch">
          <div className="branch-col">
            {trueChild ? (
              <Node node={trueChild} />
            ) : (
              <div className="empty-slot">
                <div className="outcome-badge true">True</div>
                <button className="btn-add-slot" onClick={() => addNode(node.id, "action", "true")}>+ Action</button>
                <button className="btn-add-slot" onClick={() => addNode(node.id, "end", "true")}>+ End</button>
              </div>
            )}
          </div>

          <div className="branch-col">
            {falseChild ? (
              <Node node={falseChild} />
            ) : (
              <div className="empty-slot">
                <div className="outcome-badge false">False</div>
                <button className="btn-add-slot" onClick={() => addNode(node.id, "action", "false")}>+ Action</button>
                <button className="btn-add-slot" onClick={() => addNode(node.id, "end", "false")}>+ End</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Node;
