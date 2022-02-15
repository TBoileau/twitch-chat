import {Injectable} from '@angular/core';
import {Client} from 'tmi.js';
import {environment} from "../../environments/environment";
import {Observable, Observer} from "rxjs";
import {Message} from "../models/Message";

@Injectable({
  providedIn: 'root'
})
export class ChatClient {
  public newMessage!: Observable<Message>;
  private client: Client;

  constructor() {
    this.client = new Client(environment.twitch);

    this.client.connect();

    this.newMessage = new Observable<Message>((observer: Observer<Message>) => {
      this.client.on('message', (channel, tags, message) => {
        observer.next(<Message>{
          id: tags?.id,
          username: tags["display-name"],
          twitch: tags?.username,
          emotes: tags?.emotes || {},
          date: new Date(),
          content: message,
          badges: tags?.badges,
          mod: tags?.mod,
          subscriber: tags?.subscriber,
          color: tags?.color,
        });
      });
    });
  }
}
