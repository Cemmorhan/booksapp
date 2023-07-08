import { connectToDatabase } from "../../lib/mongodb"


export default async function handler(request, response) {

console.log("getonebook");
    const { database } = await connectToDatabase()
    console.log(request.body)
    /* transform boy from json to object */
    const body = JSON.parse(request.body);
    if ((body.type === undefined)||(body.value === undefined)) {
        response.json([]);
        return;
    }
    const type =  body.type;
    const value = body.value;
    console.log(type,value);
    const books = await database
        .collection("books")
        .find({[type]:{$regex: value, $options: "i"}})
        .toArray();
console.log(books);
    if (books.length > 0) {
        response.json(books);
    }else
    {
        response.json([]);
    }
}
