import { connectToDatabase } from "../../lib/mongodb"


export default async function handler(request, response) {

    const { database } = await connectToDatabase()
    /* transform boy from json to object */
    const body = JSON.parse(request.body);
    if (body.book_id === undefined) {
        response.json([]);
        return;
    }
    const book_id = body.book_id;
    const book_isbn = body.isbn;
    const book_user = body.user;
    const book_price = body.price;
    const book_updatedate = body.updatedate;
    const book_selldate = body.elldate;
    const book_state = body.state;

    const book = await database
        .collection("libros en venta")
        .find({ book_id: book_id })
        .limit(1)
        .toArray();
    if (book.length > 0) {
        response.json(book);
    } else {
        let book = await database
            .collection("libros en venta")
            .insertOne({
                book_id: book_id,
                isbn: book_isbn,
                user: body.user,
                price: body.price,
                updatedate: body.updatedate,
                selldate: body.elldate,
                state: body.state,
            });
        response.json([book]);
    }
}