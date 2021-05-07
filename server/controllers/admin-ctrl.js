import admin from "../services/authService";

makeUserAdmin = async (req, res) => {
  const { userId } = req.body;

  await admin.auth().setCustomUserClaims(userId, { admin: true });

  return res.send({ message: "Success" });
};

module.exports = {
  makeUserAdmin,
};
