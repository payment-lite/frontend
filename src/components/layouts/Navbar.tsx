import { ScrollArea } from "@mantine/core";
import {
    IconAdjustments,
    IconCalendarStats,
    IconFileAnalytics,
    IconGauge,
    IconLock,
    IconNotes,
    IconPresentationAnalytics,
} from "@tabler/icons-react";
import classes from "./navbar.module.css";
import { LinksGroup } from "@/components/layouts/NavbarLinksGroup";
import { UserButton } from "@/components/buttons/UserButton";
import {useSession} from "next-auth/react";
import {lazy, Suspense} from "react";

const mockdata = [
    { label: "Dashboard", icon: IconGauge },
    {
        label: "Market news",
        icon: IconNotes,
        initiallyOpened: true,
        links: [
            { label: "Overview", link: "/" },
            { label: "Forecasts", link: "/" },
            { label: "Outlook", link: "/" },
            { label: "Real time", link: "/" },
        ],
    },
    {
        label: "Releases",
        icon: IconCalendarStats,
        links: [
            { label: "Upcoming releases", link: "/" },
            { label: "Previous releases", link: "/" },
            { label: "Releases schedule", link: "/" },
        ],
    },
    { label: "Analytics", icon: IconPresentationAnalytics },
    { label: "Contracts", icon: IconFileAnalytics },
    { label: "Settings", icon: IconAdjustments },
    {
        label: "Security",
        icon: IconLock,
        links: [
            { label: "Enable 2FA", link: "/" },
            { label: "Change password", link: "/" },
            { label: "Recovery codes", link: "/" },
        ],
    },
];


export function NavbarNested() {
    const links = mockdata.map((item) => (
        <LinksGroup {...item} key={item.label} />
    ));

    return (
        <nav className={classes.navbar}>
            {/*<ScrollArea className={classes.links} >*/}
            <ScrollArea type={'hover'} className={`h-[calc(100vh-150px)]`}>
                <div className={classes.linksInner}>{links}</div>
            </ScrollArea>

            <div className={classes.footer}>
                <UserButton />
            </div>
        </nav>
    );
}
