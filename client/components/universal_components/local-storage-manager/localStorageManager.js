export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const setItemWithExpiration = (key, value, expirationMinutes) => {
  const now = new Date();
  const item = {
    value,
    expiration: now.getTime() + expirationMinutes * 60 * 1000, // Convert minutes to milliseconds
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getItemWithExpiration = (key) => {
  const item = localStorage.getItem(key);
  if (item) {
    const parsedItem = JSON.parse(item);
    const now = new Date().getTime();
    if (!parsedItem.expiration || parsedItem.expiration >= now) {
      return parsedItem.value;
    } else {
      removeItem(key);
    }
  }
  return null;
};

export const getItem = (key) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const removeItem = (key) => {
  localStorage.removeItem(key);
};
