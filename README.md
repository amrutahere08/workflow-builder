# Workflow Builder

A visual, interactive tool for designing and managing complex workflow logic. This application allows users to build tree-based workflows dynamically, handling branching logic and sequential actions with a clean, custom-built UI.

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

- **React**: Functional components, Hooks (`useState`, `useContext`, `useCallback`).
- **Context API**: Centralized state management for the workflow tree and history.
- **CSS3**: Pure CSS for styling, layout, and visual connectors (NO external UI libraries).

## Project Structure

- `src/components/`: UI components like `Node.js` that handle recursive rendering.
- `src/context/`: Contains `WorkflowContext.js` for global state and logic (add/delete/undo).
- `src/App.js`: Main layout and control bar implementation.

## Getting Started

1.  **Install dependencies**
    ```bash
    npm install
    ```

2.  **Start the application**
    ```bash
    npm start
    ```
    Runs the app in development mode at [http://localhost:3000](http://localhost:3000).
