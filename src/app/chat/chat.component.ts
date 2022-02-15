import {Component, OnInit} from '@angular/core';
import {ChatClient} from "../services/chat_client.service";
import {Message} from "../models/Message";
import {Badges} from "tmi.js";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  messages: Array<Message> = [];

  constructor(private chatClient: ChatClient) {
  }

  ngOnInit(): void {
    this.chatClient.newMessage.subscribe((message: Message) => {
      this.messages.push(message);
    });

    let i = 0;

    const interval = setInterval(() => {
      this.messages.push(<Message>{
        badges: <Badges>{
          subscriber: "18"
        },
        content: `Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message ${i}`,
        username: 'test',
        color: '#00FF00',
      });
      i++;
      if (i === 10) {
        clearInterval(interval);
      }
    }, 1000);
  }
}
