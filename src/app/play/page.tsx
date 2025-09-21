'use client'
import MyChild from "@/app/play/MyChild";
import {useState} from "react";
import {Button} from "@/components/ui/button"
import MyChild2 from "@/app/play/MyChild2";


export default function Page() {

  const [count, setCount] = useState<number>(0)



  return (

    <>
    <p>Count is: {count}</p>
      <Button onClick={ () => setCount(3) } >set from page</Button>
      <MyChild2 action={setCount}/>
    </>
  )
};

