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
    const book_title = body.title;
    const book_author = body.author;
    const book_language = body.language;
    const book_description = body.description;
    const book_isbn = body.isbn;
    const book_year = body.year;
    const book_pages = body.pages;
    const book_genre = body.genre;
    const book_publisher = body.publisher;
    const book_image = body.image;
    const raw = body.raw;


    const book_user = body.user;
    const book_price = body.price;
    const book_updatedate = body.updatedate;
    const book_selldate = null;
    const book_state = "en venta";

    const book = await database
        .collection("books")
        .find({ book_id: book_id })
        .limit(1)
        .toArray();
    if (book.length === 0) {
        let book = await database
            .collection("books")
            .insertOne({
                book_id: book_id,
                title: book_title,
                author: book_author,
                language: book_language,
                description: book_description,
                isbn: book_isbn,
                year: book_year,
                pages: book_pages,
                genre: book_genre,
                publisher: book_publisher,
                image: book_image,
                cantidad: 1,
                raw: raw,
            });

    }
    const bookenventa = await database
        .collection("historial")
        .insertOne({
            book_id: book_id,
            isbn: book_isbn,
            user: book_user,
            price: book_price,
            updatedate: book_updatedate,
            selldate: book_selldate,
            state: book_state,
        });
    response.json([bookenventa])

}