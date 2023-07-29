import { connectToDatabase } from "../../lib/mongodb"


export default async function handler(request, response) {

    const { database } = await connectToDatabase()
    const body = JSON.parse(request.body);
    if (body.isbn === undefined) {
        response.json([]);
        return;
    }
    const isbn = body.isbn;
    const books = await database
        .collection("historial")
        .find({isbn:isbn})
        .toArray();
        console.log("bookshistorial",books);
    if (books.length > 0) {
        response.json(books);
    }else
    {
        response.json([]);
    }
}