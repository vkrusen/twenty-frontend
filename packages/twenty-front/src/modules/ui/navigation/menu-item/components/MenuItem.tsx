import { MouseEvent } from 'react';

import { IconComponent } from '@/ui/display/icon/types/IconComponent';
import { FloatingIconButtonGroup } from '@/ui/input/button/components/FloatingIconButtonGroup';

import { MenuItemLeftContent } from '../internals/components/MenuItemLeftContent';
import {
  StyledHoverableMenuItemBase,
  StyledMenuItemLeftContent,
} from '../internals/components/StyledMenuItemBase';
import { MenuItemAccent } from '../types/MenuItemAccent';

export type MenuItemIconButton = {
  Icon: IconComponent;
  onClick?: (event: MouseEvent<any>) => void;
};

export type MenuItemProps = {
  LeftIcon?: IconComponent | null;
  accent?: MenuItemAccent;
  text: string;
  iconButtons?: MenuItemIconButton[];
  isTooltipOpen?: boolean;
  className?: string;
  testId?: string;
  onClick?: (event: MouseEvent<HTMLLIElement>) => void;
};

export const MenuItem = ({
  LeftIcon,
  accent = 'default',
  text,
  iconButtons,
  isTooltipOpen,
  className,
  testId,
  onClick,
}: MenuItemProps) => {
  const showIconButtons = Array.isArray(iconButtons) && iconButtons.length > 0;

  const handleMenuItemClick = (event: MouseEvent<HTMLLIElement>) => {
    if (!onClick) return;
    event.preventDefault();
    event.stopPropagation();

    onClick?.(event);
  };

  return (
    <StyledHoverableMenuItemBase
      data-testid={testId ?? undefined}
      onClick={handleMenuItemClick}
      className={className}
      accent={accent}
      isMenuOpen={!!isTooltipOpen}
    >
      <StyledMenuItemLeftContent>
        <MenuItemLeftContent LeftIcon={LeftIcon ?? undefined} text={text} />
      </StyledMenuItemLeftContent>
      <div className="hoverable-buttons">
        {showIconButtons && (
          <FloatingIconButtonGroup iconButtons={iconButtons} size="small" />
        )}
      </div>
    </StyledHoverableMenuItemBase>
  );
};
