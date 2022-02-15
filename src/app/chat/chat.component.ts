import {Component, OnInit} from '@angular/core';
import {ChatClient} from "../services/chat_client.service";
import {Message} from "../models/Message";
import {Command} from "../models/Command";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messages: Array<Message> = [];

  constructor(private chatClient: ChatClient, private firestore: AngularFirestore) {
  }

  ngOnInit(): void {
    this.chatClient.newMessage.subscribe((message: Message) => {
      this.messages.push(message);

      const command = message.content.match(/^!([a-z]+)$/);
      if (command) {
        this.firestore.doc<Command>(`commands/${command[1]}`)
          .snapshotChanges()
          .subscribe((observer) => {
            this.chatClient.send(<Message>{
              content: observer.payload.data()?.content
            });
          });
      }
    });
  }
}
