import Buscador from "@/components/Buscador"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Search() {
    const [value, setValue] = useState();
    const [type, setType] = useState();


    const router = useRouter();

    useEffect(() => {
        setValue(router.query.value)
        setType(router.query.type)

    }, [router.query.value]);

    useEffect(() => {
        if (value !== undefined && type !== undefined) {
            console.log(value);
            console.log(type);
        }
    }, [value, type]);
    return (
        <>
            <Buscador value={value} type={type} />
        </>

    )
}