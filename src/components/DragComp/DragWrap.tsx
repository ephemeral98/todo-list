import { ReactNode } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const DrapWrap: React.FC<{
  children: ReactNode;
  style?: React.CSSProperties;
  className?: string;
}> = ({ children, style, className }) => {
  return (
    <div className={className} style={style}>
      <DndProvider backend={HTML5Backend}>{children}</DndProvider>
    </div>
  );
};

export default DrapWrap;
