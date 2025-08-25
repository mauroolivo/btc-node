'use client'
import MyChild from "@/app/play/MyChild";


export default function Page() {

    const dothis = (arg: string): void => {
        console.log(arg);
    }

    return (

            <>

            <p>pippo</p>
                <MyChild data="some data" action={dothis}/>
        </>
    )};

