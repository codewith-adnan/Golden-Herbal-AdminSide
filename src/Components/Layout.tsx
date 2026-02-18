import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = () => {
    return (
        <div className="h-screen flex flex-col bg-[#030405] overflow-hidden">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-grow overflow-y-auto custom-scrollbar bg-[#050505]">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
