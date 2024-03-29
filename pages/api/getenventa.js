import { connectToDatabase } from "../../lib/mongodb"


export default async function handler(request, response) {


    const { database } = await connectToDatabase()

    const books = await database
    .collection("historial")
    .find( {state: "en venta"})
    .sort({ updatedate: -1 })

    .toArray();
    if (books.length > 0) {
        response.json(books);
    }else
    {
        response.json([]);
    }
}