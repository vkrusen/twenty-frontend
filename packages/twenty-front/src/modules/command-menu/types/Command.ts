import { IconComponent } from '@/ui/display/icon/types/IconComponent';

export enum CommandType {
  Navigate = 'Navigate',
  Create = 'Create',
}

export type Command = {
  id: string;
  to: string;
  label: string;
  type: CommandType.Navigate | CommandType.Create;
  Icon?: IconComponent;
  firstHotKey?: string;
  secondHotKey?: string;
  onCommandClick?: () => void;
};
