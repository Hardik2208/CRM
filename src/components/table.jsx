// src/components/ui/table.jsx
import React from "react";

export function Table({ children }) {
  return <table className="w-full border-collapse">{children}</table>;
}

export function TableHeader({ children }) {
  return <thead className="bg-gray-100">{children}</thead>;
}

export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children }) {
  return <tr className="border-b">{children}</tr>;
}

export function TableHead({ children }) {
  return <th className="text-left p-2 font-medium text-sm text-gray-600">{children}</th>;
}

export function TableCell({ children, className = "" }) {
  return <td className={`p-2 text-sm ${className}`}>{children}</td>;
}
