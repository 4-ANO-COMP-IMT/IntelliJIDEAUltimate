// ToolContext.tsx
import React, { createContext, useReducer } from "react";

type ToolState = {
	selectedTool: string | null;
};

const initialState: ToolState = { selectedTool: null };

const ToolReducer = (
	state: ToolState,
	action: { type: string; payload: string }
): ToolState => {
	switch (action.type) {
		case "SET_TOOL":
			return { ...state, selectedTool: action.payload };
		default:
			return state;
	}
};

export interface ToolContextValue {
	state: ToolState;
	dispatch: React.Dispatch<any>;
}

export const ToolContext = createContext<ToolContextValue | undefined>(
	undefined
);

export const ToolProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [state, dispatch] = useReducer(ToolReducer, initialState);

	return (
		<ToolContext.Provider value={{ state, dispatch }}>
			{children}
		</ToolContext.Provider>
	);
};
