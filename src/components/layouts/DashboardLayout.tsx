import {NavbarNested} from "@/components/layouts/Navbar";
import {AppShell, Burger} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import Image from "next/image";
import {Session} from "next-auth";

export default function DashboardLayout({children,session}:{children: React.ReactNode,session:Session}) {
    const [opened, { toggle }] = useDisclosure();
    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding="sm"
        >
            <AppShell.Header px={'xl'}>
                <div className={`flex h-full justify-between items-center`}>
                    <div>
                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                        <Image src={'/PL.png'} alt={'LOGO'} height={50} width={70}/>
                    </div>
                    <div>
                        {children}
                    </div>
                </div>
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