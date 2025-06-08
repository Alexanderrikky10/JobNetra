import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

/**
 * Hook that mimics Next.js router.isReady behavior
 * Returns false during initial render/hydration, true once router is ready
 */
export function useRouterReady() {
  const [searchParams] = useSearchParams();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Mark as ready after the first render cycle
    // This ensures that searchParams are fully populated
    setIsReady(true);
  }, []);

  return isReady;
}

/**
 * Enhanced version that also validates required query parameters
 * Similar to useQueryReady but with Next.js router.isReady behavior
 */
export function useRouterReadyWithParams(requiredKeys = []) {
  const [searchParams] = useSearchParams();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Mark as ready after the first render cycle
    setIsReady(true);
  }, []);

  // If no required keys specified, just return router ready state
  if (requiredKeys.length === 0) {
    return isReady;
  }

  // If router is not ready, return false
  if (!isReady) {
    return false;
  }

  // Check if all required parameters are present and valid
  const hasRequiredParams = requiredKeys.every((key) => {
    const val = searchParams.get(key);
    return val !== null && val.trim() !== "";
  });

  return hasRequiredParams;
}

/**
 * Hook that provides both router ready state and query parameters
 * Most similar to Next.js router object
 */
export function useRouter() {
  const [searchParams] = useSearchParams();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  // Convert searchParams to a plain object (similar to Next.js router.query)
  const query = {};
  for (const [key, value] of searchParams.entries()) {
    query[key] = value;
  }

  return {
    isReady,
    query,
    searchParams, // Keep original searchParams for advanced usage
  };
}
