const admin = require("../services/authService");

getAuthToken = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    req.authToken = req.headers.authorization.split(" ")[1];
  } else {
    req.authToken = null;
  }
  next();
};

checkIfAuthenticated = (req, res, next) => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const userInfo = await admin.auth().verifyIdToken(authToken);
      req.authId = userInfo.uid;
      return next();
    } catch (e) {
      return res
        .status(401)
        .send({ error: "You are not authorized to make this request" });
    }
  });
};

checkIfAdmin = (req, res, next) => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const userInfo = await admin.auth().verifyIdToken(authToken);

      if (userInfo.admin === true) {
        req.authId = userInfo.uid;
        return next();
      }

      throw new Error("unauthorized");
    } catch (e) {
      return res
        .status(401)
        .send({ error: "You are not authorized to make this request" });
    }
  });
};

checkIfAuthenticatedId = (req, res, next) => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const userInfo = await admin.auth().verifyIdToken(authToken);
      req.authId = userInfo.uid;
      if (userInfo.uid === req.params.id) {
        return next();
      } else {
        return res
          .status(401)
          .send({ error: "You are not authorized UID to make this request" });
      }
    } catch (e) {
      return res
        .status(401)
        .send({ error: "You are not authorized to make this request" });
    }
  });
};

module.exports = {
  checkIfAuthenticated,
  checkIfAdmin,
  checkIfAuthenticatedId,
};