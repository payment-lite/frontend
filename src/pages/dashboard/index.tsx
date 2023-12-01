import Head from "next/head";
import {useSession} from "next-auth/react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import {GetServerSidePropsContext} from "next";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {getServerSession, Session} from "next-auth";
import {getServerServerSidePropsSession} from "@/utils/helpers/getServerServerSidePropsSession";

interface DashboardProps {
    session: Session
}
export default function Dashboard({session}: DashboardProps) {
    return (
        <DashboardLayout session={session}>
            <Head>
                <title>Dashboard</title>
            </Head>
            <main>
                <p>Dashboard</p>
            </main>
        </DashboardLayout>
    )
}


export async function getServerSideProps(context:GetServerSidePropsContext) {
    return await getServerServerSidePropsSession(context)
}