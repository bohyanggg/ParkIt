// history.js module
import { useState } from 'react';

export const history = [];

export function addToHistory(item) {
  history.push(item);
}

export function useHistory() {
  const [historyState, setHistoryState] = useState(history);

  function addToHistoryAndUpdateState(item) {
    addToHistory(item);
    setHistoryState([...history]);
  }

  return { history: historyState, addToHistoryAndUpdateState };
}