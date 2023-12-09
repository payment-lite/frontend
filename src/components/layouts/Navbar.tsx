import { UserButton } from "@/components/buttons/UserButton";
import { LinksGroup } from "@/components/layouts/NavbarLinksGroup";
import { ScrollArea, Text } from "@mantine/core";
import {
  IconAdjustments,
  IconFileAnalytics,
  IconGauge,
  IconLock,
  IconNotes,
  IconPresentationAnalytics,
} from "@tabler/icons-react";
import classes from "./navbar.module.css";

const mockdata = [
  { label: "Dashboard", icon: IconGauge },
  {
    label: "History Transaction",
    icon: IconNotes,
    initiallyOpened: true,
    link: "/history-transaction",
  },
  { label: "Transaction", type: "divider" },
  { label: "Analytics", icon: IconPresentationAnalytics },
  { label: "Contracts", icon: IconFileAnalytics },
  { label: "Settings", type: "divider" },
  { label: "Team", icon: IconAdjustments },
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
  const links = mockdata.map((item) =>
    item.type === "divider" ? (
      <div key={item.label} className="py-2">
        <Text fw={500} c="dimmed" size="sm">
          {item.label}
        </Text>
      </div>
    ) : (
      <LinksGroup key={item.label} {...item} />
    )
  );

  return (
    <nav className={classes.navbar}>
      {/*<ScrollArea className={classes.links} >*/}
      <ScrollArea type={"hover"} className={`h-[calc(100vh-130px)]`}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserButton />
      </div>
    </nav>
  );
}
