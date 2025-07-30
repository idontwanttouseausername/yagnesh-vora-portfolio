import { useState, useMemo } from "react";

export function useFilter<T>(
  items: T[],
  getCategory: (item: T) => string
) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") {
      return items;
    }
    return items.filter(item => getCategory(item) === activeFilter);
  }, [items, activeFilter, getCategory]);

  return {
    activeFilter,
    setActiveFilter,
    filteredItems,
  };
}
