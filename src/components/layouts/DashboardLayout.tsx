import {NavbarNested} from "@/components/layouts/Navbar";
import {AppShell, Burger, Menu} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import Image from "next/image";
import {Session} from "next-auth";
import {useSession} from "next-auth/react";
import {UserButton} from "@/components/buttons/UserButton";
import {redirect} from "next/navigation";
import UserButtonHeader from "@/components/buttons/UserButtonHeader";
import Header from "@/components/layouts/Header";

export default function DashboardLayout({children}:{children: React.ReactNode,session:Session}) {
    const [opened, { toggle }] = useDisclosure();
    const session = useSession()
    if (session.status === 'unauthenticated'){
        return redirect('/signin')
    }
    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding="sm"
        >
            <AppShell.Header px={'xl'}>
               <Header opened={opened} toggle={toggle} name={session.data?.user.name} />
            </AppShell.Header>

            <AppShell.Navbar>
                <NavbarNested />
            </AppShell.Navbar>

            <AppShell.Main key="Dashboard-layout">
                {children}
            </AppShell.Main>
        </AppShell>
    )
}