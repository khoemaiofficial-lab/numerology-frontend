import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href='/' className="flex sm:justify-start lg:col-start-2 lg:justify-center">
            <Image src='/images/logo web.png'width={250} height={100} priority alt="logo"/>
        </Link>
    )
}
