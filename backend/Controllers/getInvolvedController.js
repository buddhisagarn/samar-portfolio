import GetInvolved from "../Models/GetInvolved.js";

// GET (Public)
export const getGetInvolved = async (req, res) => {
  const content = await GetInvolved.findOne();
  res.json(content);
};

// CREATE / UPDATE (Admin)
export const upsertGetInvolved = async (req, res) => {
  const data = req.body;

  let content = await GetInvolved.findOne();
  if (content) {
    content = await GetInvolved.findByIdAndUpdate(content._id, data, {
      new: true,
    });
  } else {
    content = await GetInvolved.create(data);
  }

  res.json(content);
};
