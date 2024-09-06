import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChatBubbleLeftIcon,
  CheckIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import ConversationService, {
  Conversation
} from '@/service/ConversationService';
import { iconProps } from '@/svg';
import { MAX_TITLE_LENGTH } from '@/constants/appConstants';

interface ConversationListItemProps {
  convo: Conversation;
  isSelected: boolean;
  loadConversations: () => void;
  setSelectedId: (id: number) => void;
}

const ConversationListItem: React.FC<ConversationListItemProps> = ({
  convo,
  isSelected,
  loadConversations,
  setSelectedId
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(convo.title);
  const navigate = useNavigate();
  const acceptButtonRef = useRef<HTMLButtonElement | null>(null);

  const saveEditedTitle = () => {
    ConversationService.updateConversationPartial(convo, { title: editedTitle })
      .then(() => {
        setIsEditingTitle(false);
        loadConversations(); // Reload conversations to reflect the updated title
      })
      .catch((error) => {
        console.error('Error updating conversation title:', error);
      });
  };

  const deleteConversation = () => {
    ConversationService.deleteConversation(convo.id)
      .then(() => {
        loadConversations(); // Reload conversations to reflect the deletion
      })
      .catch((error) => {
        console.error('Error deleting conversation:', error);
      });
  };

  const selectConversation = () => {
    if (isEditingTitle) {
      // If in edit mode, cancel edit mode and select the new conversation
      setIsEditingTitle(false);
      setEditedTitle(''); // Clear editedTitle
    } else {
      // If not in edit mode, simply select the conversation
    }
    setSelectedId(convo.id);
    if (!isEditingTitle) {
      const url = convo.gid
        ? `/g/${convo.gid}/c/${convo.id}`
        : `/c/${convo.id}`;
      navigate(url);
    }
  };

  const toggleEditMode = (convo: Conversation) => {
    if (!isEditingTitle) {
      // Entering edit mode, initialize editedTitle with convo.title
      setEditedTitle(convo.title);
    } else {
      // Exiting edit mode, clear editedTitle
      setEditedTitle('');
    }
    setIsEditingTitle(!isEditingTitle);
  };

  const handleTitleInputKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    conversation: Conversation
  ) => {
    if (e.key === 'Enter') {
      // Save the edited title when Enter key is pressed
      saveEditedTitle();
    } else if (e.key === 'Escape') {
      setIsEditingTitle(false);
    }
  };

  const handleInputBlur = (
    e: React.FocusEvent<HTMLInputElement>,
    conversation: Conversation
  ) => {
    if (acceptButtonRef.current) {
      saveEditedTitle();
    }
    // Check if the blur event was not caused by pressing the Enter key
    // If in edit mode and the input loses focus, cancel the edit
    setEditedTitle(conversation.title);
    setIsEditingTitle(false);
  };

  const handleContextMenu = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setIsEditingTitle(false);
  };

  if (isSelected) {
    return (
      <li
        key={convo.id}
        className="relative z-[15]"
        style={{ opacity: 1, height: 'auto' }}
      >
        <div
          role="button"
          className={`group relative flex cursor-pointer items-center gap-3 break-all rounded-md bg-gray-100 px-3 py-3 pr-14 dark:bg-gray-800`}
        >
          <ChatBubbleLeftIcon {...iconProps} />
          {isEditingTitle ? (
            <div className={'flex items-center gap-3'}>
              <input
                type="text"
                className={'dark:bg-gray-800 dark:text-gray-100'}
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onKeyDown={(e) => handleTitleInputKeyPress(e, convo)}
                autoFocus={true}
                maxLength={MAX_TITLE_LENGTH}
                style={{ width: '10em' }}
                onBlur={(e) => {
                  if (isEditingTitle) {
                    handleInputBlur(e, convo);
                  }
                }}
              />
            </div>
          ) : (
            <div className="relative max-h-5 w-full flex-1 overflow-hidden overflow-ellipsis whitespace-nowrap break-all text-left">
              {convo.title}
            </div>
          )}
          <div className="absolute right-1 z-10 flex text-gray-800 dark:text-gray-300">
            {isEditingTitle ? (
              <>
                <button
                  ref={acceptButtonRef}
                  onClick={() => {
                    saveEditedTitle();
                  }}
                  className={`p-1 hover:text-gray-400 dark:hover:text-white`}
                  onContextMenu={handleContextMenu}
                >
                  <CheckIcon {...iconProps} />
                </button>
                <button
                  onClick={() => {
                    setIsEditingTitle(false); // Exit edit mode without saving
                    setEditedTitle(''); // Clear the edited title
                  }}
                  className={`p-1 hover:text-gray-400 dark:hover:text-white`}
                >
                  <XMarkIcon {...iconProps} />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => toggleEditMode(convo)}
                  className={`p-1 hover:text-gray-400 dark:hover:text-white`}
                >
                  <PencilSquareIcon {...iconProps} />
                </button>
                <button
                  onClick={() => deleteConversation()}
                  className="p-1 hover:text-gray-400 dark:hover:text-white"
                >
                  <TrashIcon {...iconProps} />
                </button>
              </>
            )}
          </div>
        </div>
      </li>
    );
  } else {
    return (
      <li
        key={convo.id}
        className="relative z-[15]"
        style={{ opacity: 1, height: 'auto' }}
      >
        <button
          onClick={() => selectConversation()}
          type="button"
          className="dark:hover:bg-gray-850 relative flex w-full cursor-pointer items-center gap-3 break-all rounded-md bg-gray-50 px-3 py-3 hover:bg-gray-200 dark:bg-gray-900"
        >
          <ChatBubbleLeftIcon {...iconProps} />
          <div className="relative max-h-5 flex-1 overflow-hidden overflow-ellipsis whitespace-nowrap break-all text-left">
            {convo.title}
          </div>
        </button>
      </li>
    );
  }
};

export default ConversationListItem;
