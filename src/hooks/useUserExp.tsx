"use client";
import { useState } from "react";

export const useUserExp = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const startLoading = () => {
    setLoading(true);
    setError(null);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  const setErrorMessage = (message: string) => {
    setError(message);
    setLoading(false);
  };

  return {
    loading,
    error,
    startLoading,
    stopLoading,
    setErrorMessage,
  };
};
