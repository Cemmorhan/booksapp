import React, { useState, useEffect } from "react";

function Ventas() {

    const books = [
        {
            "title": "The lord of the rings",
            "author": "J.R.R. Tolkien",
            "year": 1954,
            "pages": 1178,
            "genre": "Fantasy",
            "language": "English",
            "publisher": "Allen & Unwin",
            "isbn": "978-0261103252",
            "image": "https://m.media-amazon.com/images/I/510XQhSh4pL.jpg",
            "summary": "The Lord of the Rings is an epic high fantasy novel written by English author and scholar J. R. R. Tolkien. The story began as a sequel to Tolkien's 1937 fantasy novel The Hobbit, but eventually developed into a much larger work. Written in stages between 1937 and 1949, The Lord of the Rings is one of the best-selling novels ever written, with over 150 million copies sold.",
            "reviews": [
                {
                    "name": "John Doe",
                    "date": "2018-01-01",
                    "text": "This is a great book!"
                },
                {
                    "name": "Jane Doe",
                    "date": "2018-01-02",
                    "text": "This is a great book!"
                }
            ]
        },
        {
            "title": "The Hobbit",
            "author": "J.R.R. Tolkien",
            "year": 1937,
            "pages": 310,
            "genre": "Fantasy",
            "language": "English",
            "publisher": "Allen & Unwin",
            "isbn": "978-0261103283",
            "image": "https://m.media-amazon.com/images/I/51StUkwRZpL.jpg",
            "summary": "The Hobbit, or There and Back Again is a children's fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in children's literature.",
            "reviews": [
                {
                    "name": "John Doe",
                    "date": "2018-01-01",
                    "text": "This is a great book!"
                },
                {
                    "name": "Jane Doe",
                    "date": "2018-01-02",
                    "text": "This is a great book!"
                }
            ]
        },
        {
            "title": "Harry Potter and the Philosopher's Stone",
            "author": "J.K. Rowling",
            "year": 1997,
            "pages": 223,
            "genre": "Fantasy",
            "language": "English",
            "publisher": "Bloomsbury",
            "isbn": "978-0747532743",
            "image": "https://m.media-amazon.com/images/I/51uxZ1EkT4L.jpg",
            "summary": "Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling's debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry.",
            "reviews": [
                {
                    "name": "John Doe",
                    "date": "2018-01-01",
                    "text": "This is a great book!"
                },
                {
                    "name": "Jane Doe",
                    "date": "2018-01-02",
                    "text": "This is a great book!"
                }
            ]
        },
        {
            "title": "The lord of the rings",
            "author": "J.R.R. Tolkien",
            "year": 1954,
            "pages": 1178,
            "genre": "Fantasy",
            "language": "English",
            "publisher": "Allen & Unwin",
            "isbn": "978-0261103252",
            "image": "https://m.media-amazon.com/images/I/510XQhSh4pL.jpg",
            "summary": "The Lord of the Rings is an epic high fantasy novel written by English author and scholar J. R. R. Tolkien. The story began as a sequel to Tolkien's 1937 fantasy novel The Hobbit, but eventually developed into a much larger work. Written in stages between 1937 and 1949, The Lord of the Rings is one of the best-selling novels ever written, with over 150 million copies sold.",
            "reviews": [
                {
                    "name": "John Doe",
                    "date": "2018-01-01",
                    "text": "This is a great book!"
                },
                {
                    "name": "Jane Doe",
                    "date": "2018-01-02",
                    "text": "This is a great book!"
                }
            ]
        },
        {
            "title": "The Hobbit",
            "author": "J.R.R. Tolkien",
            "year": 1937,
            "pages": 310,
            "genre": "Fantasy",
            "language": "English",
            "publisher": "Allen & Unwin",
            "isbn": "978-0261103283",
            "image": "https://m.media-amazon.com/images/I/51StUkwRZpL.jpg",
            "summary": "The Hobbit, or There and Back Again is a children's fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in children's literature.",
            "reviews": [
                {
                    "name": "John Doe",
                    "date": "2018-01-01",
                    "text": "This is a great book!"
                },
                {
                    "name": "Jane Doe",
                    "date": "2018-01-02",
                    "text": "This is a great book!"
                }
            ]
        },
        {
            "title": "Harry Potter and the Philosopher's Stone",
            "author": "J.K. Rowling",
            "year": 1997,
            "pages": 223,
            "genre": "Fantasy",
            "language": "English",
            "publisher": "Bloomsbury",
            "isbn": "978-0747532743",
            "image": "https://m.media-amazon.com/images/I/51uxZ1EkT4L.jpg",
            "summary": "Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling's debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry.",
            "reviews": [
                {
                    "name": "John Doe",
                    "date": "2018-01-01",
                    "text": "This is a great book!"
                },
                {
                    "name": "Jane Doe",
                    "date": "2018-01-02",
                    "text": "This is a great book!"
                }
            ]
        },
        {
            "title": "The lord of the rings",
            "author": "J.R.R. Tolkien",
            "year": 1954,
            "pages": 1178,
            "genre": "Fantasy",
            "language": "English",
            "publisher": "Allen & Unwin",
            "isbn": "978-0261103252",
            "image": "https://m.media-amazon.com/images/I/510XQhSh4pL.jpg",
            "summary": "The Lord of the Rings is an epic high fantasy novel written by English author and scholar J. R. R. Tolkien. The story began as a sequel to Tolkien's 1937 fantasy novel The Hobbit, but eventually developed into a much larger work. Written in stages between 1937 and 1949, The Lord of the Rings is one of the best-selling novels ever written, with over 150 million copies sold.",
            "reviews": [
                {
                    "name": "John Doe",
                    "date": "2018-01-01",
                    "text": "This is a great book!"
                },
                {
                    "name": "Jane Doe",
                    "date": "2018-01-02",
                    "text": "This is a great book!"
                }
            ]
        },
        {
            "title": "The Hobbit",
            "author": "J.R.R. Tolkien",
            "year": 1937,
            "pages": 310,
            "genre": "Fantasy",
            "language": "English",
            "publisher": "Allen & Unwin",
            "isbn": "978-0261103283",
            "image": "https://m.media-amazon.com/images/I/51StUkwRZpL.jpg",
            "summary": "The Hobbit, or There and Back Again is a children's fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in children's literature.",
            "reviews": [
                {
                    "name": "John Doe",
                    "date": "2018-01-01",
                    "text": "This is a great book!"
                },
                {
                    "name": "Jane Doe",
                    "date": "2018-01-02",
                    "text": "This is a great book!"
                }
            ]
        },
        {
            "title": "Harry Potter and the Philosopher's Stone",
            "author": "J.K. Rowling",
            "year": 1997,
            "pages": 223,
            "genre": "Fantasy",
            "language": "English",
            "publisher": "Bloomsbury",
            "isbn": "978-0747532743",
            "image": "https://m.media-amazon.com/images/I/51uxZ1EkT4L.jpg",
            "summary": "Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling's debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry.",
            "reviews": [
                {
                    "name": "John Doe",
                    "date": "2018-01-01",
                    "text": "This is a great book!"
                },
                {
                    "name": "Jane Doe",
                    "date": "2018-01-02",
                    "text": "This is a great book!"
                }
            ]
        },
        {
            "title": "The lord of the rings",
            "author": "J.R.R. Tolkien",
            "year": 1954,
            "pages": 1178,
            "genre": "Fantasy",
            "language": "English",
            "publisher": "Allen & Unwin",
            "isbn": "978-0261103252",
            "image": "https://m.media-amazon.com/images/I/510XQhSh4pL.jpg",
            "summary": "The Lord of the Rings is an epic high fantasy novel written by English author and scholar J. R. R. Tolkien. The story began as a sequel to Tolkien's 1937 fantasy novel The Hobbit, but eventually developed into a much larger work. Written in stages between 1937 and 1949, The Lord of the Rings is one of the best-selling novels ever written, with over 150 million copies sold.",
            "reviews": [
                {
                    "name": "John Doe",
                    "date": "2018-01-01",
                    "text": "This is a great book!"
                },
                {
                    "name": "Jane Doe",
                    "date": "2018-01-02",
                    "text": "This is a great book!"
                }
            ]
        },
        {
            "title": "The Hobbit",
            "author": "J.R.R. Tolkien",
            "year": 1937,
            "pages": 310,
            "genre": "Fantasy",
            "language": "English",
            "publisher": "Allen & Unwin",
            "isbn": "978-0261103283",
            "image": "https://m.media-amazon.com/images/I/51StUkwRZpL.jpg",
            "summary": "The Hobbit, or There and Back Again is a children's fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in children's literature.",
            "reviews": [
                {
                    "name": "John Doe",
                    "date": "2018-01-01",
                    "text": "This is a great book!"
                },
                {
                    "name": "Jane Doe",
                    "date": "2018-01-02",
                    "text": "This is a great book!"
                }
            ]
        },
        {
            "title": "Harry Potter and the Philosopher's Stone",
            "author": "J.K. Rowling",
            "year": 1997,
            "pages": 223,
            "genre": "Fantasy",
            "language": "English",
            "publisher": "Bloomsbury",
            "isbn": "978-0747532743",
            "image": "https://m.media-amazon.com/images/I/51uxZ1EkT4L.jpg",
            "summary": "Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling's debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry.",
            "reviews": [
                {
                    "name": "John Doe",
                    "date": "2018-01-01",
                    "text": "This is a great book!"
                },
                {
                    "name": "Jane Doe",
                    "date": "2018-01-02",
                    "text": "This is a great book!"
                }
            ]
        }
    ]

    /*comprueba si books es undefined y si lo es, cambia el estado de isDefined a false, si no, lo cambia a true*/

    return (
        <div>
            {books.map((book, index) => (<div key={index}>{book.title}</div>))}
        </div>
    );
}
export default Ventas;