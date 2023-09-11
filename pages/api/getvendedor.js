import { connectToDatabase } from "../../lib/mongodb"


export default async function handler(request, response) {

    console.log("getuservendedor");
    const { database } = await connectToDatabase()
    console.log(request.body)
    /* transform boy from json to object */
    const body = JSON.parse(request.body);
    if (body.book_id === undefined) {
        response.json([]);
        return;
    }
    const _id = body.book_id;
    const book = await database
        .collection("historial")
        .find({ _id: _id })
        .limit(1)
        .toArray();
    if (book.length > 0) {
        response.json(book);
    }
}
