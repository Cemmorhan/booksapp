import { connectToDatabase } from "../../lib/mongodb"
import { ObjectId } from 'mongodb'

export default async function handler(request, response) {

    const { database } = await connectToDatabase()
    console.log(request.body)
    /* transform boy from json to object */
    const body = JSON.parse(request.body);
    if (body.book_id === undefined) {
        response.json([]);
        return;
    }
    const book_id = new ObjectId(body.book_id);
    const set = body.set;
    const push = body.push;
    const inc = body.inc;

    console.log("book_id", book_id);
    console.log(push);
    let update = await database
        .collection("historial")
        .updateOne({ "_id": book_id }, {
            $set:set, $push:push, $inc:inc
        }, { upsert: false })

    const book = await database
        .collection("historial")
        .find({ _id: book_id })
        .limit(1)
        .toArray();
    console.log(book);
    if (book.length > 0) {
        response.json(book);
    } else {
        response.json([]);

    }
}