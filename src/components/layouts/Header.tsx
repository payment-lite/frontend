import {Burger} from "@mantine/core";
import Image from "next/image";
import UserButtonHeader from "@/components/buttons/UserButtonHeader";


export default function Header({opened, toggle,name}: { opened: boolean, toggle: () => void, name: string | undefined }) {
    return (
        <div className={`flex h-full justify-between items-center`}>
            <div className={'flex'}>
                <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                <Image className={'hidden sm:flex'} src={'/PL.png'} alt={'LOGO'} height={50} width={70}/>
            </div>
            <div className={`flex items-center gap-4`}>
                <div>
                    <UserButtonHeader name={name}/>
                </div>
            </div>
        </div>
    )
}