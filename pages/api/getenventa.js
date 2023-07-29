import { connectToDatabase } from "../../lib/mongodb"


export default async function handler(request, response) {

    const { database } = await connectToDatabase()
    const body = JSON.parse(request.body);
    const isbn = body.isbn;
    const books = await database
        .collection("historial")
        .find({state:"en venta"})
        .toArray();
        console.log("bookshistorial",books);
    if (books.length > 0) {
        response.json(books);
    }else
    {
        response.json([]);
    }
}