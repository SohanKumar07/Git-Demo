// Example user controller
const getUsers = (req, res) => {
  res.json([{ id: 1, name: "Sohan" }, { id: 2, name: "Kumar" }]);
};

const createUser = (req, res) => {
  const newUser = req.body;
  res.json({ message: "User created successfully!", user: newUser });
};

module.exports = { getUsers, createUser };
