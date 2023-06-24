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
    const user_email = body.user_email;
    console.log(user_id);
    const user = await database
        .collection("users")
        .find({ user_id: user_id , email: user_email })
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
                nickname: "",
                name: "",
                lastname: "",
                email: user_email,
                phone: "",
                address: "",
                city: "",
                state: "",
                zip: "",
                country: "",
                card: "",
                saldo: 0,
                cart: {
                    items: []
                },
                historial: {
                    compras: []

                },
            });
        response.json([user]);

    }
}
