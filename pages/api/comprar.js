import { connectToDatabase } from "../../lib/mongodb"


export default async function handler(request, response) {

    const { database } = await connectToDatabase()
    /* transform boy from json to object */
    const body = JSON.parse(request.body);
    if (body.book_id === undefined) {
        response.json([]);
        return;
    }
    const book_id = body.book_id;
    const book_selldate = body.book_selldate;
    const book_selldate2 = body.book_selldate2;
    const user = body.user;
    const bookvendido = await database
        .collection("historial")
        .find({ book_id: book_id })
        .insertOne({
            selldate: book_selldate,
            selldate2: book_selldate2,
            userBuy: user,
        });
    response.json([bookvendido])

}