import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
    return (
        <div className="p-4">
            <Link href="/">
                <Image
                    src="/logo.png"
                    className=" object-contain"
                    alt="logo"
                    width={100}
                    height={100}
                />
            </Link>
        </div>
    );
};

export default Navbar;
