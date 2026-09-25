export type ThemeMode = 'dark' | 'light';

export type ActiveTab = 'all' | 'socials' | 'discord' | 'about' | 'fivem';

export interface FiveMCharacter {
  id: string;
  name: string;
  imageUrl: string;
  bio: string;
  role?: string;
  serverName?: string;
  status?: string;
  age?: string;
  alias?: string;
}

export interface UserProfile {
  name: string;
  shortName: string;
  tagline: string;
  bio: string;
  location: string;
  primaryHandle: string;
  avatarUrl: string;
  bannerUrl: string;
}

export interface SocialAccount {
  id: string;
  name: string;
  arabicName: string;
  handle: string;
  url: string;
  description: string;
  color: string;
  bgGradient: string;
  iconName: string;
  statsLabel: string;
  statsValue: string;
  verified: boolean;
}

export interface DiscordChannel {
  id: string;
  name: string;
  type: 'text' | 'voice';
  unread?: boolean;
  activeCount?: number;
}

export interface DiscordRole {
  name: string;
  color: string;
  count: number;
}

export interface DiscordServerConfig {
  name: string;
  inviteCode: string;
  inviteUrl: string;
  totalMembers: number;
  onlineMembers: number;
  description: string;
  announcementText: string;
  bannerUrl?: string;
  channels: DiscordChannel[];
  roles: DiscordRole[];
}

export interface SetupSpecItem {
  id: string;
  title: string;
  spec: string;
}

export interface FavoriteGameItem {
  id: string;
  name: string;
  genre: string;
  role: string;
}

export interface FaqItem {
  id: string;
  q: string;
  a: string;
}
