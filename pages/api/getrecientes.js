import { connectToDatabase } from "../../lib/mongodb"


export default async function handler(request, response) {


    const { database } = await connectToDatabase()

    const recientes = await database
        .collection("books")
        .find( )
        .toArray();
    if (recientes.length > 0) {
        response.json(recientes);
    }else
    {
        response.json([]);
    }
}