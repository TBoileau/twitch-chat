import {Badges} from 'tmi.js';

export interface Message {
  id: string | undefined;
  content: string;
  username: string | undefined;
  twitch: string | undefined;
  date: Date;
  badges: Badges | undefined;
  emotes: { [emoteid: string]: string[] } | undefined;
  mod: boolean | undefined;
  subscriber: boolean | undefined;
  color: string | undefined;
}
