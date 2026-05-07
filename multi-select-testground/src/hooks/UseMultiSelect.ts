import { useState, useCallback } from 'react';

export function useMultiSelect<T>(allItems: T[]) {

  const [selectedIds, setSelectedIds] = useState<Set<T>>(new Set());
  
  const [lastClickedId, setLastClickedId] = useState<T | null>(null);

  const toggleItem = useCallback((id: T, isShiftPressed: boolean) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      
      if (isShiftPressed && lastClickedId) {
  const startIndex = allItems.indexOf(lastClickedId);
  const endIndex = allItems.indexOf(id);

  const start = Math.min(startIndex, endIndex);
  const end = Math.max(startIndex, endIndex);

  const rangeToSelect = allItems.slice(start, end + 1);
  rangeToSelect.forEach(itemId => newSet.add(itemId));
} else {
  if (newSet.has(id)) {
    newSet.delete(id);
  } else {
    newSet.add(id);
  }
}
      return newSet;
    });
    
    setLastClickedId(id);
  }, [allItems, lastClickedId]);

  const selectAll = useCallback(() => {
    setSelectedIds(new Set(allItems));
  }, [allItems]);

  const clearAll = useCallback(() => {
    setSelectedIds(new Set());
  }, []);
  const isSelected = useCallback((id: T) => {
    return selectedIds.has(id);
  }, [selectedIds]);

  return {
    selectedIds: Array.from(selectedIds),
    toggleItem,
    selectAll,
    clearAll,
    isSelected
  };
}