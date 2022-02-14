import {Component, Input} from '@angular/core';
import {Message} from "../models/Message";
import {Badges} from '../data/badges';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @Input() message!: Message;

  get badges() {
    let badges = '';
    if (this.message.badges?.subscriber) {
      // @ts-ignore
      badges += `<img alt="${Badges[this.message.badges?.subscriber].title}" src="${Badges[this.message.badges?.subscriber].image_url_4x}">`;
    }
    return badges;
  }

  get html() {
    if (!this.message.emotes) return this.message.content;

    const stringReplacements: Array<{ stringToReplace: string, replacement: string }> = [];

    Object.entries(this.message.emotes).forEach(([id, positions]) => {
      // use only the first position to find out the emote key word
      const position = positions[0];
      const [start, end] = position.split("-");
      const stringToReplace = this.message.content.substring(
        parseInt(start, 10),
        parseInt(end, 10) + 1
      );

      stringReplacements.push({
        stringToReplace: stringToReplace,
        replacement: `<img alt="${stringToReplace}" src="https://static-cdn.jtvnw.net/emoticons/v1/${id}/3.0">`,
      });
    });

    // generate HTML and replace all emote keywords with image elements
    return stringReplacements.reduce(
      (acc, {stringToReplace, replacement}) => {
        return acc.split(stringToReplace).join(replacement);
      },
      this.message.content
    );
  }
}
