import type React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import layout from './layout.module.css';

interface AppLayoutProps{
    children: React.ReactNode;
}

const AppLayout : React.FC<AppLayoutProps> = ({children}) => {
    return (
        <div className={layout.appLayout}>
            <aside className={layout.appLayout}>
                <Sidebar />
            </aside>

            <div className={layout.appMain}>
                <Header />
                <main className={layout.appContent}>{children}</main>
            </div>
        </div>
    );
};

export default AppLayout;
