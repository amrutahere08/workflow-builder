# Workflow Builder

A visual, interactive tool for designing and managing complex workflow logic. This application allows users to build tree-based workflows dynamically, handling branching logic and sequential actions with a clean, custom-built UI.


**[Live Demo](https://workflow-builder-git-main-amrutas-projects-d90c29e5.vercel.app)** | **[Repository](https://github.com/amrutahere08/workflow-builder.git)**

## Project Overview

This application allows users to build complex logic trees dynamically. It features a custom recursive rendering engine to visualize nodes, branches, and connections without relying on third-party diagramming libraries

## Features

### Visual Workflow Canvas
- Renders a hierarchical tree structure using recursive components.
- Supports unlimited nesting of actions and conditional branches.
- Auto-adjusts layout and connecting lines based on the tree structure.

### Node Management
- **Action Nodes**: Represent single sequential steps.
- **Branch Nodes (Condition)**: Create "True" and "False" paths for logic flow.
- **End Nodes**: Mark the termination of a workflow path.
- **Context-Aware Interactions**: Custom mock menus for adding specific node types based on context.

### Robust State Management
- **Undo/Redo**: Implements a travel-aware history stack to revert or replay structural changes.
- **Auto-Repair Logic**: Intelligently reconnects child nodes to the nearest parent when a node is deleted, preserving the flow.
- **Save State**: Logs the current JSON structure of the workflow to the console for export/debugging.

## Tech Stack

*   **Framework**: React (Create React App / Vite)
*   **Language**: JavaScript
*   **Styling**: Pure CSS (No external UI libraries like MUI/Chakra)
*   **State Management**: React `Context API` + `useReducer` pattern for history management.

## Project Structure

```bash
src/
├── components/
│   └── Node.js           # Recursive component for rendering the tree
├── context/
│   └── WorkflowContext.js # Global state, reducer logic, and Undo/Redo history
├── App.js                # Main layout and header controls
└── App.css               # All custom styling and tree visualization logic
```

## Getting Started

1.  **Install dependencies**
    ```bash
    npm install
    ```

2.  **Start the development server**
    ```bash
    npm start
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## How to Use

1.  **Add a Node**: Hover over any component and click the **+** button.
     (Tip: Adding a "Condition" instantly creates two branch paths.)
2.  **Branching**: If a branch path is empty, click **+ Action** or **+ End** in the dotted "Empty Slot" box.
3.  **Edit**: Click directly on any node label to rename it.
4.  **Delete**: Click the **×** button. Watch how the tree heals itself!
5.  **Undo/Redo**: Made a mistake? Use the buttons in the header.
6.  **Save**: Click "Save Workflow" and check your browser's console (F12) to see the JSON output.

