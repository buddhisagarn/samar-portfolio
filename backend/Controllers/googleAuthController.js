import { generateToken } from "../utils/generateToken.js";

export const googleCallback = (req, res) => {
  const { email, name } = req.user;

  const token = generateToken({ email });

  res.redirect(
    `${process.env.CLIENT_URL}/auth-success?token=${token}&email=${email}`,
  );
};
