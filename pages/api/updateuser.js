import { connectToDatabase } from "../../lib/mongodb"


export default async function handler(request, response) {

    console.log("getuser");
    const { database } = await connectToDatabase()
    console.log(request.body)
    /* transform boy from json to object */
    const body = JSON.parse(request.body);
    if (body.user_id === undefined) {
        response.json([]);
        return;
    }
    const user_id = body.user_id;
    const set = body.set;
    const push = body.push;
    const inc = body.inc;

    let update = await database
        .collection("users")
        .updateOne({ "user_id": user_id }, {
            $set:set, $push:push, $inc:inc
        }, { upsert: false })

    const user = await database
        .collection("users")
        .find({ user_id: user_id })
        .limit(1)
        .toArray();
    console.log(user);
    if (user.length > 0) {
        response.json(user);
    } else {
        response.json([]);

    }
}
