import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CalculatorButtonProps {
  label: string;
  onClick: (label: string) => void;
  className?: string;
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link";
}

export const CalculatorButton = ({ label, onClick, className, variant = "secondary" }: CalculatorButtonProps) => {
  return (
    <Button
      onClick={() => onClick(label)}
      className={cn("text-xl md:text-2xl h-16 w-full", className)}
      variant={variant}
    >
      {label}
    </Button>
  );
};