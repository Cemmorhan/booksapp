import { connectToDatabase } from "../../lib/mongodb"

export default async function handler(req, res) {
  const client = await connectToDatabase();
  const db = client.db("nextjs-mongodb-demo");
  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      let myPost = await db.collection("posts").insertOne(bodyObject);
      res.json(myPost.ops[0]);
      break;
  }
}
