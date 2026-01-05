import React, { createContext, useState, useContext, useCallback } from 'react';

const WorkflowContext = createContext();

export const useWorkflow = () => useContext(WorkflowContext);

const initialWorkflow = {
    id: "start",
    type: "start",
    label: "Start",
    children: []
};

export const WorkflowProvider = ({ children }) => {
    const [history, setHistory] = useState({
        past: [],
        present: initialWorkflow,
        future: []
    });

    const { present: workflow } = history;

    const clone = (obj) => JSON.parse(JSON.stringify(obj));

    const modifyTree = useCallback((callback) => {
        setHistory((curr) => {
            const newPresent = clone(curr.present);
            callback(newPresent);

            return {
                past: [...curr.past, curr.present],
                present: newPresent,
                future: []
            };
        });
    }, []);

    const undo = () => {
        setHistory((curr) => {
            if (curr.past.length === 0) return curr;

            const previous = curr.past[curr.past.length - 1];
            const newPast = curr.past.slice(0, curr.past.length - 1);

            return {
                past: newPast,
                present: previous,
                future: [curr.present, ...curr.future]
            };
        });
    };

    const redo = () => {
        setHistory((curr) => {
            if (curr.future.length === 0) return curr;

            const next = curr.future[0];
            const newFuture = curr.future.slice(1);

            return {
                past: [...curr.past, curr.present],
                present: next,
                future: newFuture
            };
        });
    };

    const addNode = (parentId, type, outcome = null) => {
        modifyTree((root) => {
            const findAndAdd = (node) => {
                if (node.id === parentId) {
                    const newNode = {
                        id: Date.now().toString(),
                        type,
                        label: type === "end" ? "End" : (type === "branch" ? "Condition" : "New Action"),
                        children: [],
                        outcome: outcome
                    };

                    if (node.type === "branch") {
                        node.children.push(newNode);
                    } else {
                        if (node.children.length > 0) {
                            newNode.children = [...node.children];
                        }
                        node.children = [newNode];
                    }
                    return true;
                }

                if (node.children) {
                    for (const child of node.children) {
                        if (findAndAdd(child)) return true;
                    }
                }
                return false;
            };

            findAndAdd(root);
        });
    };

    const deleteNode = (nodeId) => {
        if (nodeId === "start") return;

        modifyTree((root) => {
            const findAndDelete = (parentNode, node) => {
                if (node.id === nodeId) {
                    let childrenToAdopt = node.children || [];

                    if (node.type === "branch") {
                        const truePath = node.children.find(c => c.outcome === 'true');
                        childrenToAdopt = truePath ? [truePath] : (node.children[0] ? [node.children[0]] : []);
                        childrenToAdopt.forEach(c => delete c.outcome);
                    }

                    if (parentNode.type === "branch") {
                        const existingOutcome = node.outcome;
                        if (childrenToAdopt.length > 0) {
                            childrenToAdopt[0].outcome = existingOutcome;
                        }
                    }

                    const index = parentNode.children.findIndex(c => c.id === nodeId);
                    if (index !== -1) {
                        if (parentNode.type === 'branch') {
                            if (childrenToAdopt.length > 0) {
                                parentNode.children.splice(index, 1, childrenToAdopt[0]);
                            } else {
                                parentNode.children.splice(index, 1);
                            }
                        } else {
                            if (childrenToAdopt.length > 0) {
                                parentNode.children = [childrenToAdopt[0]];
                            } else {
                                parentNode.children = [];
                            }
                        }
                    }
                    return true;
                }

                if (node.children) {
                    for (const child of node.children) {
                        if (findAndDelete(node, child)) return true;
                    }
                }
                return false;
            };

            for (const child of root.children) {
                if (findAndDelete(root, child)) break;
            }
        });
    };

    const updateLabel = (id, newLabel) => {
        modifyTree((root) => {
            const findAndUpdate = (node) => {
                if (node.id === id) {
                    node.label = newLabel;
                    return true;
                }
                if (node.children) {
                    for (const child of node.children) {
                        if (findAndUpdate(child)) return true;
                    }
                }
                return false;
            };
            findAndUpdate(root);
        });
    };

    return (
        <WorkflowContext.Provider value={{
            workflow,
            addNode,
            deleteNode,
            updateLabel,
            undo,
            redo,
            canUndo: history.past.length > 0,
            canRedo: history.future.length > 0
        }}>
            {children}
        </WorkflowContext.Provider>
    );
};
