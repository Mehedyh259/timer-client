const users = [
  { email: "user1@example.com", password: "12345" },
  { email: "user2@example.com", password: "12345" },
  { email: "user3@example.com", password: "12345" },
  { email: "user4@example.com", password: "12345" },
  { email: "user5@example.com", password: "12345" },
];

export const getUserByEmail = (email) => {
  const found = users.find((user) => user.email === email);
  return found;
};
