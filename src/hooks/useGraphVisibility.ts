import { useEffect, useState } from 'react';

export const useGraphVisibility = (isSidebarOpen: boolean) => {
  const [showGraph, setShowGraph] = useState(false);

  useEffect(() => {
    setShowGraph(false);
    const timeoutId = setTimeout(() => {
      setShowGraph(true);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isSidebarOpen]);

  return showGraph;
};
