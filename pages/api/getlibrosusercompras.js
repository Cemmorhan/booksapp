import { connectToDatabase } from "../../lib/mongodb"


export default async function handler(request, response) {

    const { database } = await connectToDatabase()
    const body = JSON.parse(request.body);
    if (body.user_id === undefined) {
        response.json([]);
        return;
    }
    const usuario = body.user_id;
    const books = await database
        .collection("historial")
        .find({"salesdata.userbuy.sub":usuario})
        .toArray();
        console.log("libros del usuario",books);
    if (books.length > 0) {
        response.json(books);
    }else
    {
        response.json([]);
    }
}