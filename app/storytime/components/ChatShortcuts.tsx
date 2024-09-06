import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import chatSettingsDB, { chatSettingsEmitter } from '@/service/ChatSettingsDB';
import { ChatSettings } from '@/models/ChatSettings';
import CubeIcon from '@heroicons/react/24/outline/CubeIcon';

const ChatShortcuts: React.FC = () => {
  const [chatSettings, setChatSettings] = useState<ChatSettings[]>([]);

  const loadChatSettings = async () => {
    const filteredAndSortedChatSettings = await chatSettingsDB.chatSettings
      .where('showInSidebar')
      .equals(1)
      .sortBy('name');
    setChatSettings(filteredAndSortedChatSettings);
  };

  const onDatabaseUpdate = (data: any) => {
    loadChatSettings();
  };

  useEffect(() => {
    chatSettingsEmitter.on('chatSettingsChanged', onDatabaseUpdate);
    loadChatSettings();
    return () => {
      chatSettingsEmitter.off('chatSettingsChanged', onDatabaseUpdate);
    };
  }, []);

  return (
    <div>
      {chatSettings.map((setting) => (
        <Link
          to={`/g/${setting.id}`}
          key={setting.id}
          className="relative flex cursor-pointer items-center gap-3 break-all rounded-md px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <div className="overflow-hidden  rounded-full bg-white">
            {setting.icon?.data ? (
              <img
                src={setting.icon.data}
                alt=""
                className="bg-gray-100 dark:bg-gray-400"
                style={{ width: 24, height: 24 }}
              />
            ) : (
              <CubeIcon
                className="text-gray-900"
                style={{ width: 24, height: 24 }}
              />
            )}
          </div>
          <span className="relative max-h-5 flex-1 overflow-hidden overflow-ellipsis whitespace-nowrap break-all text-gray-800 dark:text-gray-100">
            {setting.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default ChatShortcuts;
