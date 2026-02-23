import mongoose from "mongoose";
import Nested from "../models/nestedModel.js";

export const nestedName = async (id) => {
  const result = await Nested.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(id) }
    },
    {
      $graphLookup: {
        from: Nested.collection.name,
        startWith: "$parentId",
        connectFromField: "parentId",
        connectToField: "_id",
        as: "ancestors",
        depthField: "level"
      }
    }
  ]);

  if (!result.length) {
    return []; }

  const folder = result[0];

  const sortedAncestors = folder.ancestors
    .sort((a, b) => b.level - a.level)
    .map(a => ({
      _id: a._id,
      name: a.name
    }));

  return [
    ...sortedAncestors,
    { _id: folder._id, name: folder.name }
  ];
};