import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatSettings } from '../models/ChatSettings';
import CubeIcon from '@heroicons/react/24/outline/CubeIcon';
import './ExploreCustomChats.css';
import ChatSettingDropdownMenu from './ChatSettingDropdownMenu';

interface ChatSettingsListProps {
  chatSettings: ChatSettings[];
}

const ChatSettingsList: React.FC<ChatSettingsListProps> = ({
  chatSettings
}) => {
  const navigate = useNavigate();

  const navigateToChatSetting = (id: number) => {
    navigate(`/g/${id}`, { state: { reset: Date.now() } });
  };

  return (
    <div className="chat-settings-grid w-full">
      {chatSettings.map((setting) => (
        <div
          key={setting.id}
          onClick={() => navigateToChatSetting(setting.id)}
          className="relative flex cursor-pointer items-center gap-4 rounded-lg bg-gray-100 p-3 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          <div className="absolute right-0 top-0 bg-transparent">
            <ChatSettingDropdownMenu
              chatSetting={setting}
              showTitle={false}
              showDelete={true}
              alignRight={true}
              className="bg-transparent"
            />
          </div>
          <div className="h-12 w-12 flex-shrink-0">
            <div className="overflow-hidden rounded-full bg-white">
              {setting.icon && setting.icon.data ? (
                <img src={setting.icon.data} alt="" className="h-full w-full" />
              ) : (
                <CubeIcon className="h-full w-full text-gray-900" />
              )}
            </div>
          </div>
          <div className="overflow-hidden">
            <span className="line-clamp-2 text-sm font-medium leading-tight text-gray-900 dark:text-gray-200">
              {setting.name}
            </span>
            <span className="line-clamp-3 text-xs text-gray-600 dark:text-gray-400">
              {setting.description}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ChatSettingsList;
