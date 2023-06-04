import { connectToDatabase } from "../../lib/mongodb"


export default async function handler(request, response) {


    const { database } = await connectToDatabase()

    const topventas = await database
        .collection("books")
        .find( )
        .toArray();
    if (topventas.length > 0) {
        response.json(topventas);
    }else
    {
        response.json([]);
    }
}