import dotenv from "dotenv";

dotenv.config();

const configKeys = {
  MONGO_URL: "mongodb+srv://mohammedriyazriyaz04:7b7z0wpEFRslnCSD@cluster0.balviqn.mongodb.net/",
  PORT: process.env.PORT || 3001,
  JWT_SECRET: process.env.JWT_SECRET,
};

export default configKeys;
