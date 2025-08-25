'use client'
import {Button} from "flowbite-react";

export default function MyChild({data, action}: {data: string, action: (arg: string) => void}) {


    function handleClick(arg: string) {
        console.log(arg)
    }
    return (

        <>

            <p>child</p>
            <Button onClick={ () => handleClick("abc") } >button</Button>
            <Button onClick={ () => action(data) } >button</Button>
        </>
    )};