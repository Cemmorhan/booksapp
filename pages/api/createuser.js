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
    console.log(user_id);
    let user = await database
    .collection("users")
    .insertOne({user_id:user_id});

    console.log(user);
    if (user.length > 0) {
        response.json(user);
    } else {
        response.json([]);
    }
}
