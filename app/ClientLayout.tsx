
'use client'

import StoreProvider from "./StoreProvider";
import Navbar from "@/components/navbar/NavbarContainer";
import Banner from "@/components/Banner";
import Main from "@/components/Main";
import Footer from "@/components/Footer";
import ThemeProvider from "./ThemeProvider";
import ToastNew from "@/components/ToastNew";
import SidebarContainer from "@/components/sidebar/SidebarContainer";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return(
        <div className="body-grid">
            <StoreProvider>
                <Navbar />
                <Banner />
                <div className="app-content">
                    <SidebarContainer />
                    <Main>
                        {children}
                    </Main>
                </div>

                <ToastNew />

                <Footer />
                <ThemeProvider />
            </StoreProvider>
        </div>
    )
}
