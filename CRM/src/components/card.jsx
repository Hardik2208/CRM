// src/components/ui/card.jsx
import React from "react";

export function Card({ children, className = "" }) {
  return <div className={`rounded-xl shadow-md p-4 text-gray-500 ${className}`}>{children}</div>;
}

export function CardHeader({ children }) {
  return <div className="mb-2">{children}</div>;
}

export function CardTitle({ children }) {
  return <h2 className="text-xl font-semibold">{children}</h2>;
}

export function CardContent({ children }) {
  return <div>{children}</div>;
}
