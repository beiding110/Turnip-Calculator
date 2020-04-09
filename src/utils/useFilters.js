import { useEffect, useMemo } from "react";
import { useLocalStorage } from "react-use";

const toHash = (filters) => filters.join(" ").trimEnd().split(" ").join(",");

const fromHash = (hash) => hash.slice(1).split(",");

const useFilters = () => {
  const [filters, saveFilters] = useLocalStorage("filters", []);

  // Array of strings
  const inputFilters = useMemo(
    () =>
      Array.from({ length: 13 }).map((v, i) =>
        String(Number(filters[i]) || "")
      ),
    [filters]
  );

  // Array of numbers
  const sanitizedFilters = useMemo(
    () =>
      Array.from({ length: 13 }).map((v, i) => Number(filters[i]) || undefined),
    [filters]
  );

  useEffect(() => {
    if (!Array.isArray(filters)) {
      saveFilters([]);
    }
  }, [filters]);

  return {
    filters: sanitizedFilters,
    inputFilters,
    saveFilters,
  };
};

export default useFilters;
export { toHash, fromHash };
