import {Component, OnInit} from '@angular/core';
import {ChatClient} from "../services/chat_client.service";
import {Message} from "../models/Message";

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
  }
}
