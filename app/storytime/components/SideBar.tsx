import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Cog8ToothIcon,
  PlusIcon,
  Squares2X2Icon
} from '@heroicons/react/24/outline';
import { CloseSideBarIcon, iconProps, OpenSideBarIcon } from '@/svg';
import { useTranslation } from 'react-i18next';
import Tooltip from './Tooltip';
import UserSettingsModal from './UserSettingsModal';
import ChatShortcuts from './ChatShortcuts';
import ConversationList from './ConversationList';

interface SidebarProps {
  className: string;
  isSidebarCollapsed: boolean;
  toggleSidebarCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  className,
  isSidebarCollapsed,
  toggleSidebarCollapse
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isSettingsModalVisible, setSettingsModalVisible] = useState(false);

  const openSettingsDialog = () => {
    setSettingsModalVisible(true);
  };

  const handleNewChat = () => {
    navigate('/', { state: { reset: Date.now() } });
  };

  const handleOnClose = () => {
    setSettingsModalVisible(false);
  };

  return (
    <div className={`${className} ${isSidebarCollapsed ? 'w-0' : 'w-auto'}`}>
      {isSidebarCollapsed && (
        <div className="absolute left-0 top-0 z-50">
          <Tooltip title={t('open-sidebar')} side="right" sideOffset={10}>
            <button
              className="flex h-11 min-h-[44px] w-11 flex-shrink-0 cursor-pointer items-center justify-center
              gap-3 rounded-md border bg-white px-3 py-1 text-sm
              transition-colors duration-200 hover:bg-gray-300 dark:border-white/20 dark:bg-transparent dark:text-white dark:hover:bg-gray-600"
              onClick={toggleSidebarCollapse}
            >
              <OpenSideBarIcon />
            </button>
          </Tooltip>
        </div>
      )}
      <UserSettingsModal
        isVisible={isSettingsModalVisible}
        onClose={handleOnClose}
      />
      {/* sidebar is always dark mode*/}
      <div className="sidebar h-full flex-shrink-0 overflow-x-hidden transition-all duration-500 dark:bg-gray-900">
        <div className="h-full w-[260px]">
          <div className="flex h-full min-h-0 flex-col ">
            <div className="scrollbar-trigger relative h-full flex-1 items-start border-white/20">
              <h2 className="sr-only">Chat history</h2>
              <nav
                className="flex h-full flex-col p-2"
                aria-label="Chat history"
              >
                <div className="mb-1 flex flex-row gap-2">
                  <button
                    className="flex h-11 min-h-[44px] flex-grow cursor-pointer items-center
                       gap-3 overflow-hidden rounded-md
                       border bg-white px-3 py-1 text-sm transition-colors duration-200
                       hover:bg-gray-500/10 dark:border-white/20 dark:bg-transparent dark:text-white"
                    onClick={handleNewChat}
                    type="button"
                  >
                    <PlusIcon {...iconProps} />
                    <span className="truncate">{t('new-chat')}</span>
                  </button>
                  <Tooltip
                    title={t('open-settings')}
                    side="right"
                    sideOffset={10}
                  >
                    <button
                      type="button"
                      className="flex h-11 min-h-[44px] w-11 flex-shrink-0 cursor-pointer items-center justify-center
                      gap-3 rounded-md border bg-white px-3 py-1 text-sm transition-colors
                      duration-200 hover:bg-gray-500/10 dark:border-white/20 dark:bg-transparent dark:text-white"
                      onClick={openSettingsDialog}
                    >
                      <Cog8ToothIcon />
                    </button>
                  </Tooltip>
                  <Tooltip
                    title={t('close-sidebar')}
                    side="right"
                    sideOffset={10}
                  >
                    <button
                      className="flex h-11 min-h-[44px] w-11 flex-shrink-0 cursor-pointer items-center justify-center
                      gap-3 rounded-md border bg-white px-3 py-1
                      text-sm transition-colors duration-200 hover:bg-gray-500/10 dark:border-white/20 dark:bg-transparent dark:text-white"
                      onClick={toggleSidebarCollapse}
                      type="button"
                    >
                      <CloseSideBarIcon />
                    </button>
                  </Tooltip>
                </div>
                <Link
                  to="/explore"
                  className="m-2 flex items-center text-gray-900 dark:bg-gray-900 dark:text-gray-100"
                >
                  <Squares2X2Icon {...iconProps} className="mr-2 mt-1" />
                  <span>{t('custom-chats-header')}</span>
                </Link>
                <ChatShortcuts />
                <ConversationList />
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
