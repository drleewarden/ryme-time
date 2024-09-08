'use client';
import { useState } from 'react';
import PageContainer from '@/components/layout/page-container';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';
import Sidebar from './components/SideBar';
import MainPage from './components/MainPage';
// import './App.css';
import { ToastContainer } from 'react-toastify';
import ExploreCustomChats from './components/ExploreCustomChats';
import CustomChatEditor from './components/CustomChatEditor';
export default function page() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  interface MainPageProps {
    className: string;
    isSidebarCollapsed: boolean;
    toggleSidebarCollapse: () => void;
  }
  const MainPageWithProps: React.FC<Partial<MainPageProps>> = (props) => (
    <MainPage
      className={'main-content'}
      isSidebarCollapsed={isSidebarCollapsed}
      toggleSidebarCollapse={toggleSidebarCollapse}
      {...props}
    />
  );
  return (
    <PageContainer scrollable={true}>
      sdfsfs
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <div className="App dark:bg-gray-900 dark:text-gray-100">
            <ToastContainer />
            <div className="relative z-0 flex h-full w-full overflow-hidden">
              <Sidebar
                className="sidebar-container flex-shrink-0"
                isSidebarCollapsed={isSidebarCollapsed}
                toggleSidebarCollapse={toggleSidebarCollapse}
              />
              <div className="h-full flex-grow overflow-hidden">
                <Routes>
                  <Route path="/" element={<MainPageWithProps />} />
                  <Route path="/c/:id" element={<MainPageWithProps />} />
                  <Route path="/explore" element={<ExploreCustomChats />} />
                  // Use the wrapper for new routes
                  <Route path="/g/:gid" element={<MainPageWithProps />} />
                  <Route path="/g/:gid/c/:id" element={<MainPageWithProps />} />
                  <Route path="/custom/editor" element={<CustomChatEditor />} />
                  <Route
                    path="/custom/editor/:id"
                    element={<CustomChatEditor />}
                  />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </div>
          </div>
        </I18nextProvider>
      </BrowserRouter>
    </PageContainer>
  );
}
