
const getonebookisbn = async () => {
    if (isbn === undefined) {
        return;
    }
    if (isbn === "0") {
        return;
    }
    const send = { isbn: isbn }
    const results = await fetch("/api/getonebook", {
        method: "POST",
        body: JSON.stringify(send),
    }).then((response) => response.json());
    const books = results.map((result) => {
        return { ...result }
    });
    setBooks(books);
};