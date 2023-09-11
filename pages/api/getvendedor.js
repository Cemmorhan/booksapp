import { connectToDatabase } from "../../lib/mongodb"
import { ObjectId } from 'mongodb'

export default async function handler(request, response) {

    const { database } = await connectToDatabase()
    const body = JSON.parse(request.body);
    if (body.book_id === undefined) {
        response.json([]);
        return;
    }
    if (body.state === undefined) {
        response.json([]);
        return;
    }
    const _id = new ObjectId(body.book_id);
    const state = body.state;
    const books = await database
        .collection("historial")
        .find({_id:_id, state:state})
        .toArray();
        console.log("bookshistorial",books);
    if (books.length > 0) {
        response.json(books);
    }else
    {
        response.json([]);
    }
}