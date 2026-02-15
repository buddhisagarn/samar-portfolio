import Subscriber from "../Models/subscriber.js";

export const subscribeUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const exists = await Subscriber.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "Already subscribed" });
    }

    await Subscriber.create({ email });

    res.status(201).json({ message: "Subscribed successfully " });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
