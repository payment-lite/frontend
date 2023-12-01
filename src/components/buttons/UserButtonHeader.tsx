import {Button, Menu, rem, UnstyledButton} from "@mantine/core";
import {IconChevronDown, IconLogout, IconSettings, IconUser} from "@tabler/icons-react";
import Link from "next/link";
import {signOut} from "next-auth/react";

interface UserButtonHeaderProps {
    name:string | undefined
}
export default function UserButtonHeader({name}:UserButtonHeaderProps) {
    return (
        <Menu
            transitionProps={{ transition: 'pop-top-right' }}
            position="bottom-end"
            width={200}
            withinPortal
            trigger={'hover'}
        >
            <Menu.Target>
                <Button
                    variant={'subtle'}
                    rightSection={
                        <IconChevronDown style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                    }
                    pr={12}
                >
                    {name}
                </Button>
            </Menu.Target>
            <Menu.Dropdown>
               <div className={'flex flex-col items-center'}>
                   <Menu.Label>Settings</Menu.Label>
                   <Menu.Item component={Link} href={'/user/settings'} leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                       Settings
                   </Menu.Item>
                   <Menu.Item component={Link} href={'/user/profile'} leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />}>
                       Profile
                   </Menu.Item>
                   <Menu.Divider/>
                   <Menu.Item onClick={()=>signOut()} color={'red'} leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}>
                       Logout
                   </Menu.Item>
               </div>
            </Menu.Dropdown>
        </Menu>
    )
}