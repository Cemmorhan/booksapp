import { connectToDatabase } from "../../lib/mongodb"


export default async function handler(request, response) {

    console.log("getuser");
    const { database } = await connectToDatabase()
    console.log(request.body)
    /* transform boy from json to object */
    const body = JSON.parse(request.body);
    if (body.user_id === undefined) {
        response.json([]);
        return;
    }
    const user_id = body.user_id;
    console.log(user_id);
    const user = await database
        .collection("users")
        .find({ user_id: user_id })
        .limit(1)
        .toArray();
    console.log(user);
    if (user.length > 0) {
        response.json(user);
    } else {
        let user = await database
            .collection("users")
            .insertOne({
                user_id: user_id,
                name: "name",
                email: "email",
                phone: "phone",
                address: "address",
                city: "city",
                state: "state",
                zip: "zip",
                country: "country",
                card: "card",
                cart: {
                    items: [
                        {
                            isbn: "isbn",
                            qty: "qty"
                        },
                        {
                            isbn: "isbn",
                            qty: "qty"
                        }
                    ]
                },
                monedero: {
                    saldo: 0,
                },
                historial: {
                    compras: [
                        {
                            id: "id1",
                            date: "date",
                            total: "total",
                            estado: "entregado",
                            items: [
                                {
                                    id: "id",
                                    title: "title",
                                    price: "price",
                                    qty: "qty",
                                    total: "total",
                                    isbn: "isbn"
                                },
                                {
                                    id: "id",
                                    title: "title",
                                    price: "price",
                                    qty: "qty",
                                    total: "total",
                                    isbn: "isbn"
                                }
                            ]

                        },
                        {
                            id: "id2",
                            date: "date",
                            total: "total",
                            estado: "en tránsito",
                            items: [
                                {
                                    id: "id",
                                    title: "title",
                                    price: "price",
                                    qty: "qty",
                                    total: "total",
                                    isbn: "isbn"
                                },
                                {
                                    id: "id",
                                    title: "title",
                                    price: "price",
                                    qty: "qty",
                                    total: "total",
                                    isbn: "isbn"

                                }]
                        }
                    ],
                    ventas: [
                        {
                            id: "id1",
                            date: "date",
                            total: "total",
                            estado: "pendiente",
                            items: [
                                {
                                    id: "id",
                                    title: "title",
                                    price: "price",
                                    qty: "qty",
                                    total: "total",
                                    isbn: "isbn"
                                }]
                        },
                        {
                            id: "id2",
                            date: "date",
                            total: "total",
                            estado: "vendido",
                            items: [
                                {
                                    id: "id",
                                    title: "title",
                                    price: "price",
                                    qty: "qty",
                                    total: "total",
                                    isbn: "isbn"
                                }]
                        }
                    ]

                },
            });
        response.json([user]);

    }
}
