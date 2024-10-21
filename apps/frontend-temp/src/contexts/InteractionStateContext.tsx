// import React, { createContext, useContext, useEffect } from 'react';
// import { ToolContext } from './ToolContext';
// import { DrawingContext } from './DrawingContext';

// export const InteractionStateContext = createContext<React.ReactNode | undefined>(undefined);

// export const InteractionStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const toolContext = useContext(ToolContext);
//   const drawingContext = useContext(DrawingContext);

//   if (!toolContext || !drawingContext) {
//     throw new Error('InteractionStateProvider must be used within ToolProvider and DrawingProvider');
//   }

//   const { state: toolState } = toolContext;
//   const { state: drawingState, dispatch: drawingDispatch } = drawingContext;

//   useEffect(() => {
//     if (drawingState.isDrawing && toolState.selectedTool !== 'draw') {
//       drawingDispatch({ type: 'STOP_DRAWING' });
//     }
//   }, [toolState, drawingState, drawingDispatch]);

//   return (
//     <InteractionStateContext.Provider value={null}>
//       {children}
//     </InteractionStateContext.Provider>
//   );
// };
