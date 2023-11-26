import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
  const client = await clientPromise;
  const db = client.db("tummytox");

  if (req.query.request === "post") {
    db.collection("cartProducts")
      .insertOne(req.body)
      .then((response) => res.status(200).json(response))
      .catch((err) => res.status(500).json(err));
  } else if (req.query.request === "delete") {
    db.collection("cartProducts")
      .deleteOne({ _id: JSON.parse(req.body).id })
      .then((response) => res.status(200).json(response))
      .catch((error) => res.status(500).json(error));
  }
};
