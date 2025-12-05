import User from "../models/User.js";

// /api/users/auth
export const createUserAuth = async (req, res) => {
  const uid = req.user.uid;
  const { email, username, photoUrl } = req.body;
  try {
    let user = await User.findOne({ firebaseUID: uid });
    if (!user) {
      user = await User.create({
        firebaseUID: uid,
        email,
        username,
        photoUrl
      });
    }
    res.json(user);
  } catch (err) {
    console.error("AUTH ERROR:", err);
    res.status(500).json({ error: "failed to authenticate DB account" });
  }
};

// Legacy user creation
export const createUserLegacy = async (req, res) => {
  const { userId, email, username, photoUrl } = req.body;

  try {
    let user = await User.findOne({ firebaseUID: userId });

    if (!user) {
      user = await User.create({
        firebaseUID,
        email,
        username,
        photoUrl,
      });
    }

    res.json(user);

  } catch (err) {
    res.status(500).json({ error: "Error creating user" });
  }
};

// GET /api/users/:uid
export const getUserByUID = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUID: req.params.uid });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};