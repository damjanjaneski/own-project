import clientPromise from "../../../lib/mongodb";
import { BSON } from "mongodb/lib/core";

export default async (req, res) => {
  const client = await clientPromise;
  const db = client.db("tummytox");

  if (req.query.target === "wishlist") {
    if (req.query.request === "delete") {
      console.log("aa");
      db.collection("users").updateOne(
        { _id: BSON.ObjectId(req.query.userId) },
        {
          $pull: { wishlist: { _id: req.query.id } },
        }
      );
    } else if (req.query.request === "post") {
      db.collection("users").updateOne(
        { _id: BSON.ObjectId(req.query.userId) },
        { $addToSet: { wishlist: req.body } }
      );
    }
  } else if (req.query.target === "cart") {
    if (req.query.request === "delete") {
      db.collection("users").updateOne(
        { _id: BSON.ObjectId(req.query.userId) },
        { $pull: { cart: { _id: JSON.parse(req.body).id } } }
      );
    } else if (req.query.request === "post") {
      console.log("post");
      db.collection("users").updateOne(
        {
          _id: BSON.ObjectId(req.query.userId),
        },
        { $addToSet: { cart: req.body } }
      );
    }
  } else {
    const users = await db.collection("users").find({}).toArray();
    return res.json(users);
  }
};
