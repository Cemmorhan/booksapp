import { connectToDatabase } from "../../lib/mongodb"


export default async function handler(request, response) {


    const { database } = await connectToDatabase()

    const books = await database
        .collection("books")
        .find( )
        .toArray();
    if (books.length > 0) {
        response.json(books);
    }else
    {
        response.json([]);
    }
}
