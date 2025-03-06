export const BASE_URL = "https://neo-note-backend.onrender.com"

export const getInitials = (name) => {
  if (!name) return "";
  const words = name.split(" ");

  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }
  return initials.toUpperCase();
};
export const getFirst = (name) => {
  if (!name) return "";

  const words = name.trim().split(" "); // Split name into words
  const firstWord = words[0]; // Get the first word

  return firstWord.charAt(0).toUpperCase() + firstWord.slice(1).toLowerCase(); // Capitalize first letter
};

export const validEmail = (email) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};

export const validPassword = (password) => {
  if (password.length < 5) return false;
  return true;
};

export const helpFun = (tags) => {
  const parsedTags = tags.flatMap((tag) => tag.split(" ").map((t) => t.trim()));
  return parsedTags;
};
