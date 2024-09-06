import React from 'react';
import {
  EllipsisHorizontalIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';
import './SubmitButton.css';
import Tooltip from './Tooltip';
import { useTranslation } from 'react-i18next';

interface SubmitButtonProps {
  loading: boolean;
  disabled: boolean;
  name?: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  loading,
  disabled,
  name
}) => {
  const { t } = useTranslation();
  const strokeColor = disabled ? 'currentColor' : 'white';

  return (
    <Tooltip title={t('send-message')} side="top" sideOffset={0}>
      <button
        name={name}
        type="submit"
        disabled={loading || disabled}
        className="relative z-10 mr-2 rounded-md p-1 text-black enabled:bg-black enabled:text-white disabled:opacity-40 dark:text-white enabled:dark:bg-white enabled:dark:text-black"
      >
        {loading ? (
          <EllipsisHorizontalIcon
            className="animate-ellipsis-pulse"
            width={24}
            height={24}
            stroke={strokeColor}
          />
        ) : (
          <PaperAirplaneIcon width={24} height={24} />
        )}
      </button>
    </Tooltip>
  );
};
