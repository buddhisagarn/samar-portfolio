import About from "../Models/about.js";
import cloudinary from "../config/cloudinary.js";

export const aboutSection = async (req, res) => {
  try {
    const { title, about, description, pictitle, skills } = req.body;

    let aboutData = await About.findOne();

    let imageUrl = null;

    /* ---------- UPLOAD IMAGE TO CLOUDINARY ---------- */
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        {
          folder: "about", //  cloudinary folder name
        },
      );

      imageUrl = uploadResult.secure_url;
    }

    /* ---------- UPDATE EXISTING ---------- */
    if (aboutData) {
      aboutData.title = title;
      aboutData.about = about;
      aboutData.description = description;
      aboutData.pictitle = pictitle;
      aboutData.skill = skills ? JSON.parse(skills) : [];

      // update image ONLY if new uploaded
      if (imageUrl) {
        aboutData.image = imageUrl;
      }

      await aboutData.save();
    } else {
      /* ---------- CREATE NEW ---------- */
      aboutData = await About.create({
        title,
        about,
        description,
        pictitle,
        skill: skills ? JSON.parse(skills) : [],
        image: imageUrl, // null if no image uploaded
      });
    }

    res.status(200).json({
      success: true,
      data: aboutData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET About Data
export const getaboutSection = async (req, res) => {
  try {
    const aboutData = await About.findOne();
    res.status(200).json(aboutData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
