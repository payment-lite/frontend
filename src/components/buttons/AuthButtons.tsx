import {Button} from "@mantine/core";
import {signIn, signOut} from "next-auth/react";
import Link from "next/link";


export function SigninButton(){
    return(
        <Button color={'green'} variant={'subtle'} onClick={()=> signIn("",{callbackUrl:"/dashboard"})}>Sign in</Button>
    )
}

export function SignoutButton(){
    return(
        <Button variant={'subtle'} onClick={()=> signOut()}>Sign out</Button>
    )
}

export function SignupButton(){
    return(
        <Button variant={'subtle'} component={Link} href={'/signup'}>Sign up</Button>
    )
}