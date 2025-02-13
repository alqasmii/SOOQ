import * as React from "react";

export function Card({ className, children }) {
  return <div className={`border rounded-lg shadow-md p-4 ${className}`}>{children}</div>;
}

export function CardContent({ children }) {
  return <div className="mt-2">{children}</div>;
}
