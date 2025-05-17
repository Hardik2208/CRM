// src/components/ui/input.jsx
import React from "react";

export function Input({ className = "", ...props }) {
  return (
    <input
      className={`border rounded px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      {...props}
    />
  );
}
