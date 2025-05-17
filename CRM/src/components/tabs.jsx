// src/components/ui/tabs.jsx
import React, { useState } from "react";

export function Tabs({ children, defaultValue }) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  const tabs = React.Children.map(children, (child) => {
    if (child.type === TabsList) {
      return React.cloneElement(child, { activeTab, setActiveTab });
    }
    if (child.type === TabsContent) {
      return activeTab === child.props.value ? child : null;
    }
    return child;
  });
  return <div>{tabs}</div>;
}

export function TabsList({ children, activeTab, setActiveTab, className = "" }) {
  return (
    <div className={`flex space-x-2 ${className}`}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
}

export function TabsTrigger({ value, children, activeTab, setActiveTab }) {
  const isActive = activeTab === value;
  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2 rounded ${isActive ? "bg-blue-600 text-white" : "bg-gray-200"}`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }) {
  return <div className="mt-4">{children}</div>;
}
