import React from "react";
import { Lato } from "next/font/google";
import Head from "next/head";
import Navbar from "../../components/global/navbar";
import { Toaster } from "react-hot-toast";

const lato = Lato({
    subsets: ["latin"],
    weight: ["400", "700"],
});

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div
            className={`font-sans bg-[#F9F9F9] min-h-screen ${lato.className}`}
        >
            <Head>
                <title>Surelock Products Site</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            {children}
            <Toaster />
        </div>
    );
};

export default Layout;
