import DashboardLayout from "@/components/layouts/DashboardLayout";
import { getServerServerSidePropsSession } from "@/utils/helpers/getServerServerSidePropsSession";
import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import Head from "next/head";

interface DashboardProps {
  session: Session;
}
export default function Dashboard({ session }: Readonly<DashboardProps>) {
  return (
    <DashboardLayout session={session}>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main>
        <p>Dashboard</p>
      </main>
    </DashboardLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await getServerServerSidePropsSession(context);
}
