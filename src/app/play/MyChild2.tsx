'use client'
import {Button} from "flowbite-react";

export default function MyChild2({action}: {action: (arg: number) => void}) {

  // setState: React.Dispatch<React.SetStateAction<number>>;

  return (

    <>

      <p>child 2</p>
      {/*<Button onClick={ () => handleClick("abc") } >button</Button>*/}
      <Button onClick={ () => action(5) } >button</Button>
    </>
  )};