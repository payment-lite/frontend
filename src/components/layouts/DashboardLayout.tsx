import Header from "@/components/layouts/Header";
import { NavbarNested } from "@/components/layouts/Navbar";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import UserNotVerified from "../utils/userNotVerified";

export default function DashboardLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: Session;
}>) {
  const [opened, { toggle }] = useDisclosure();
  if (!session.user.token) {
    return redirect("/signin");
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="sm"
    >
      <AppShell.Header px={"xl"}>
        <Header opened={opened} toggle={toggle} name={session.user.name} />
      </AppShell.Header>

      <AppShell.Navbar>
        <NavbarNested />
      </AppShell.Navbar>

      <AppShell.Main key="Dashboard-layout">
        {session.user.team.status === "unverified" ||
          (session.user.team.status === "rejected" && <UserNotVerified />)}
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
