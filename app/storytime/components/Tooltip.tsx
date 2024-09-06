// Tooltip.tsx
import React, { useContext } from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import { UserContext } from '@/context/UserContext';

interface TooltipProps {
  title: string;
  children: React.ReactNode;
  side: 'top' | 'right' | 'bottom' | 'left';
  sideOffset: number;
}

const Tooltip: React.FC<TooltipProps> = ({
  title,
  children,
  side,
  sideOffset
}) => {
  const { userSettings, setUserSettings } = useContext(UserContext);

  return (
    <RadixTooltip.Provider delayDuration={400}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            className="relative max-w-xs rounded-lg border border-gray-800 bg-gray-100 p-1 text-gray-900 shadow-sm transition-opacity dark:border-gray-300 dark:bg-gray-800 dark:text-gray-100"
            side={side}
            sideOffset={sideOffset}
          >
            <span className="flex items-center whitespace-pre-wrap px-2 py-1 text-left text-sm font-medium normal-case">
              {title}
            </span>
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};

export default Tooltip;
