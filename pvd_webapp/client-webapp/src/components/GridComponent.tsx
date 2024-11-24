import React from 'react';

interface GridComponentProps {
  grid: boolean[][];
}

const GridComponent: React.FC<GridComponentProps> = ({ grid }) => {
  if (grid.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 bg-gray-800 rounded-lg border-2 border-dashed border-gray-600">
        <p className="text-gray-400 text-sm">Grid is empty</p>
      </div>
    );
  }

  return (
    <div className="overflow-auto bg-black p-2 rounded-lg">
      <div 
        className="grid gap-0"
        style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(256, 5px)',
          gridTemplateRows: 'repeat(64, 5px)',
          width: 'fit-content'
        }}
      >
        {grid.map((row, y) => 
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={`w-[5px] h-[5px] ${cell ? 'bg-white' : 'bg-black'}`}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default GridComponent;