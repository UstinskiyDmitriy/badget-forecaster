export const loadFromLocalStorage = <T>(key: string): T | null => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return null;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error('Ошибка загрузки из LocalStorage:', e);
    return null;
  }
};

export const saveToLocalStorage = <T>(key: string, state: T): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (e) {
    console.error('Ошибка сохранения в LocalStorage:', e);
  }
};