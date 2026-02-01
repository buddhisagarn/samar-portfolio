import Message from "../Models/message.js";
import messageInfo from "../Models/contact.js";

// USER → send message
export const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields required" });
    }

    const newMessage = await Message.create({
      name,
      email,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN → get all messages
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN → mark as read
export const markAsRead = async (req, res) => {
  try {
    const msg = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true },
    );

    res.status(200).json(msg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN → delete message
export const deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Message contact info
export const messageInfoo = async (req, res) => {
  try {
    const { email, contact, location } = req.body;

    if (!email || !contact || !location) {
      return res.status(400).json({ Message: "Required Fields" });
    }

    const newMessage = await messageInfo.create({
      email,
      contact,
      location,
    });

    res.status(201).json({
      success: true,
      message: "Message Updated Successfully",
      data: newMessage,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMessageInfoo = async (req, res) => {
  try {
    const messageinfoos = await messageInfo.find();
    res.status(200).json(messageinfoos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const putMessageInfoo = async (req, res) => {
  try {
    const { email, contact, location } = req.body;

    const msg = await messageInfo.findOneAndUpdate(
      {},
      { email, contact, location },
      {
        new: true,
        upsert: true, // creates if not exists
        runValidators: true,
      },
    );

    res.status(200).json(msg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
