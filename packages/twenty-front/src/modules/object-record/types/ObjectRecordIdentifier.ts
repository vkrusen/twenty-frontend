import { AvatarType } from '@/users/components/Avatar';

export type ObjectRecordIdentifier = {
  id: string;
  name: string;
  avatarUrl?: string | null;
  avatarType?: AvatarType | null;
};
