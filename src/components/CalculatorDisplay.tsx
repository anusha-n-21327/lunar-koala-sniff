import React from 'react';

interface CalculatorDisplayProps {
  value: string;
}

export const CalculatorDisplay = ({ value }: CalculatorDisplayProps) => {
  const getFontSizeClass = () => {
    const length = value.length;
    if (length > 18) {
      return 'text-3xl';
    }
    if (length > 13) {
      return 'text-4xl';
    }
    return 'text-5xl';
  };

  return (
    <div className="bg-gray-800 text-white text-right p-4 rounded-t-lg mb-4 overflow-hidden">
      <p className={`font-light break-all h-20 flex items-end justify-end ${getFontSizeClass()}`} data-testid="display">
        {value}
      </p>
    </div>
  );
};