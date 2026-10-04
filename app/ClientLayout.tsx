
'use client'

import { usePathname } from "next/navigation"
import StoreProvider from "./StoreProvider";
import Navbar from "@/components/navbar/NavbarContainer";
import Hero from "@/components/Hero";
import Main from "@/components/Main";
import Footer from "@/components/Footer";
import ThemeProvider from "./ThemeProvider";
import ToastNew from "@/components/ToastNew";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const pathname = usePathname();

    const showHero = pathname !== "/";

    return(
        <div className={`body-grid ${!showHero ? "no-hero" : ""}`}>
            <StoreProvider>
                <Navbar />
                {showHero && <Hero /> }
                <Main>
                    {children}
                </Main>

                <ToastNew />

                <Footer />
                <ThemeProvider />
            </StoreProvider>
        </div>
    )
}