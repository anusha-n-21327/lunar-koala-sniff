import React, { useState } from 'react';
import { CalculatorDisplay } from './CalculatorDisplay';
import { CalculatorButton } from './CalculatorButton';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { showError } from '@/utils/toast';

export const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [mode, setMode] = useState<'standard' | 'scientific'>('standard');

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      if (display.length >= 15) return;
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
        setDisplay('0.');
        setWaitingForSecondOperand(false);
        return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearAll = () => {
    setDisplay("0");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const backspace = () => {
    if (waitingForSecondOperand) return;
    setDisplay(display.slice(0, -1) || "0");
  };

  const calculate = (operand1: number, operand2: number, op: string): number => {
    switch (op) {
      case '+': return operand1 + operand2;
      case '−': return operand1 - operand2;
      case '×': return operand1 * operand2;
      case '÷': 
        if (operand2 === 0) {
            showError("Cannot divide by zero");
            return NaN;
        }
        return operand1 / operand2;
      case 'xʸ': return Math.pow(operand1, operand2);
      default: return operand2;
    }
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      if (isNaN(result)) {
        setDisplay("Error");
        return;
      }
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };
  
  const handleEquals = () => {
    if (waitingForSecondOperand) return;
    const inputValue = parseFloat(display);
    if (operator && firstOperand !== null) {
      const result = calculate(firstOperand, inputValue, operator);
      if (isNaN(result)) {
        setDisplay("Error");
      } else {
        setDisplay(String(result));
        setFirstOperand(result);
      }
      setOperator(null);
      setWaitingForSecondOperand(true);
    }
  };

  const handleScientific = (func: string) => {
    const value = parseFloat(display);
    let result: number;
    switch (func) {
      case 'sin': result = Math.sin(value * Math.PI / 180); break;
      case 'cos': result = Math.cos(value * Math.PI / 180); break;
      case 'tan': result = Math.tan(value * Math.PI / 180); break;
      case 'log': result = value > 0 ? Math.log10(value) : NaN; break;
      case 'ln': result = value > 0 ? Math.log(value) : NaN; break;
      case '√': result = value >= 0 ? Math.sqrt(value) : NaN; break;
      case 'x²': result = Math.pow(value, 2); break;
      case 'eˣ': result = Math.exp(value); break;
      case 'π': 
        setDisplay(String(Math.PI));
        setWaitingForSecondOperand(true);
        return;
      case 'n!':
        if (value < 0 || !Number.isInteger(value)) {
          result = NaN;
          showError("Input must be a non-negative integer.");
        } else if (value > 170) {
            result = Infinity;
        } else {
            let fact = 1;
            for (let i = 2; i <= value; i++) {
              fact *= i;
            }
            result = fact;
        }
        break;
      case '%': result = value / 100; break;
      default: return;
    }

    if (isNaN(result)) {
        setDisplay("Error");
    } else {
        setDisplay(String(result));
    }
    setWaitingForSecondOperand(true);
  };

  const handleButtonClick = (label: string) => {
    if (display === "Error" || display === "Infinity") {
        if (label === 'C') clearAll();
        return;
    }

    if (label >= '0' && label <= '9') inputDigit(label);
    else if (label === '.') inputDecimal();
    else if (label === 'C') clearAll();
    else if (label === '←') backspace();
    else if (label === '=') handleEquals();
    else if (['+', '−', '×', '÷', 'xʸ'].includes(label)) performOperation(label);
    else handleScientific(label);
  };

  const scientificButtons = [
    'sin', 'cos', 'tan', 'log', 'ln', '√', 'x²', 'xʸ', 'eˣ', 'π', 'n!',
  ];

  return (
    <div className="w-full max-w-sm md:max-w-lg mx-auto bg-gray-900 rounded-lg shadow-2xl p-4 text-white">
      <CalculatorDisplay value={display} />
      <div className="flex items-center space-x-2 my-4">
        <Switch
          id="mode-switch"
          checked={mode === 'scientific'}
          onCheckedChange={(checked) => setMode(checked ? 'scientific' : 'standard')}
        />
        <Label htmlFor="mode-switch">Scientific Mode</Label>
      </div>
      <div className="flex gap-2">
        {mode === 'scientific' && (
          <div className="grid grid-cols-3 gap-2">
            {scientificButtons.map(label => (
              <CalculatorButton key={label} label={label} onClick={handleButtonClick} variant="outline" />
            ))}
          </div>
        )}
        <div className="grid grid-cols-4 gap-2 flex-1">
            <CalculatorButton label="C" onClick={handleButtonClick} className="bg-red-500 hover:bg-red-600 text-white" />
            <CalculatorButton label="←" onClick={handleButtonClick} />
            <CalculatorButton label="%" onClick={handleButtonClick} />
            <CalculatorButton label="÷" onClick={handleButtonClick} variant="outline" />
            
            <CalculatorButton label="7" onClick={handleButtonClick} />
            <CalculatorButton label="8" onClick={handleButtonClick} />
            <CalculatorButton label="9" onClick={handleButtonClick} />
            <CalculatorButton label="×" onClick={handleButtonClick} variant="outline" />

            <CalculatorButton label="4" onClick={handleButtonClick} />
            <CalculatorButton label="5" onClick={handleButtonClick} />
            <CalculatorButton label="6" onClick={handleButtonClick} />
            <CalculatorButton label="−" onClick={handleButtonClick} variant="outline" />

            <CalculatorButton label="1" onClick={handleButtonClick} />
            <CalculatorButton label="2" onClick={handleButtonClick} />
            <CalculatorButton label="3" onClick={handleButtonClick} />
            <CalculatorButton label="+" onClick={handleButtonClick} variant="outline" />

            <CalculatorButton label="0" onClick={handleButtonClick} className="col-span-2" />
            <CalculatorButton label="." onClick={handleButtonClick} />
            <CalculatorButton label="=" onClick={handleButtonClick} className="bg-blue-500 hover:bg-blue-600 text-white" />
        </div>
      </div>
    </div>
  );
};