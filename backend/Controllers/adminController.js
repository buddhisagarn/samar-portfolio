import Subscriber from "../Models/subscriber.js";
import { sendEmail } from "../utils/sendEmail.js";

export const getSubscribers = async (req, res) => {
  const subscribers = await Subscriber.find().sort({ subscribedAt: -1 });
  res.json(subscribers);
};

export const deleteSubscriber = async (req, res) => {
  await Subscriber.findByIdAndDelete(req.params.id);
  res.json({ message: "Subscriber removed" });
};

export const sendBulkEmail = async (req, res) => {
  const { subject, message } = req.body;
  const subscribers = await Subscriber.find();

  for (let sub of subscribers) {
    await sendEmail(sub.email, subject, `<h2>${subject}</h2><p>${message}</p>`);
  }

  res.json({ message: "Emails sent successfully " });
};
