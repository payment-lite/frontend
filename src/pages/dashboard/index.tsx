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
            bikin logout, bikin custom signin page, benerin redirect pas lagi login
        </DashboardLayout>
    )
}


export async function getServerSideProps(context:GetServerSidePropsContext) {
    return await getServerServerSidePropsSession(context)
}