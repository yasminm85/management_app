import mongoose from "mongoose";
import Nested from "../models/nestedModel.js";

export const buildPath = async (folderId) => {
  const path = [];

  let currentId = folderId;

  while (currentId) {
    const folder = await Nested.findById(currentId).lean();
    if (!folder) break;

    path.unshift({
      id: folder._id,
      name: folder.name
    });

    currentId = folder.parentId;
  }

  return path;
};