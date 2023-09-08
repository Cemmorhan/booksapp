import { connectToDatabase } from "../../lib/mongodb"


export default async function handler(request, response) {
    const { database } = await connectToDatabase()
    console.log(request.body)
    /* transform boy from json to object */
    const body = JSON.parse(request.body);
    if (body.isbn === undefined) {
        response.json([]);
        return;
    }
    const isbn = body.isbn;
    console.log(isbn);
    const books = await database
        .collection("books")
        .find({
            isbn: {
                $in: isbn
            }
        })
        .toArray();
    if (books.length > 0) {
        response.json(books);
    }else
    {
        response.json([]);
    }
}
