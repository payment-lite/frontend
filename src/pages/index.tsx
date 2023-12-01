import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from "next/head";
import {GetServerSidePropsContext} from "next";
import {getServerSession, Session} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {SigninButton, SignoutButton, SignupButton} from "@/components/buttons/AuthButtons";
import {Text} from "@mantine/core";

const inter = Inter({ subsets: ['latin'] })

type Iprops = {
    session: Session | null
}
export default function Home({session}:Iprops) {
  return (
   <main className={'flex items-center justify-center h-screen'}>
       <Head>
           <title>Payment Lite</title>
       </Head>
     <div className={`max-w-[600px] break-words`}>
         {session ? <SignoutButton/> : (
             <div className={`flex gap-3`}>
                 <SigninButton/>
                 <SignupButton/>
             </div>
         )}
     </div>
   </main>
  )
}


export async function getServerSideProps(ctx: GetServerSidePropsContext):Promise<{props:Iprops}> {
    const session = await getServerSession(ctx.req,ctx.res,authOptions)
    console.log(process.env.GOOGLE_CLIENT_ID)
  return {
    props: {
        session
    }
  }
}

