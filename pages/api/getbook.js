
import { connectToDatabase } from "../../lib/mongodb"


export default async function handler(request, response) {

    console.log("getbook");
    const { database } = await connectToDatabase()
    console.log("book",request.body)
    /* transform boy from json to object */
    const body = JSON.parse(request.body);
    if (body.book_id === undefined) {
        response.json([]);
        return;
    }
    const book_id = body.book_id;
    const book_title = body.title;
    const book_author=body.author;
    const book_language=body.language;
    const book_description=body.description;
    const book_isbn=body.isbn;
    const book_year=body.year;
    const book_pages=body.pages;
    const book_genre=body.genre;
    const book_publisher=body.publisher;
    const book_image=body.image;
    const raw=body.raw;

    console.log(book_id);
    const book = await database
        .collection("books")
        .find({book_id: book_id})
        .limit(1)
        .toArray();
    console.log(book);
    if (book.length > 0) {
        response.json(book);
    } else {
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
                cantidad: 0,
                raw: raw,
            });
        response.json([book]);

    }
    
}