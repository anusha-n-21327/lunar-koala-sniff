import React from 'react';

interface CalculatorDisplayProps {
  value: string;
}

export const CalculatorDisplay = ({ value }: CalculatorDisplayProps) => {
  // Format the value for better readability
  const formattedValue = () => {
    try {
      const num = parseFloat(value);
      if (value.length > 15) {
        return num.toExponential(9);
      }
      return value;
    } catch (error) {
      return value; // Return as is if not a number (e.g., "Error")
    }
  };

  return (
    <div className="bg-gray-800 text-white text-right p-4 rounded-t-lg mb-4">
      <p className="text-5xl font-light break-all h-16 flex items-end justify-end" data-testid="display">
        {formattedValue()}
      </p>
    </div>
  );
};