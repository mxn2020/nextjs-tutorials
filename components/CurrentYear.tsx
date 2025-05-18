// components/CurrentYear.tsx
"use client";
import React from "react";

export function CurrentYear() {
  return <>{new Date().getFullYear()}</>;
}
