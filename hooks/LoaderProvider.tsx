// components/LoaderProvider.tsx
"use client";
import { useState, useEffect } from "react";
import { setLoaderCallbacks } from "@/lib/axios";
import Loader from "@/components/Loader/Loader";

export default function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoaderCallbacks(
      () => setLoading(true),
      () => setLoading(false)
    );
  }, []);

  return (
    <>
      {loading && <Loader />}
      {children}
    </>
  );
}
