import {Component, OnInit} from '@angular/core';

interface ContactI {
  link: string
  svg: string
  title: string
  data: string
}

const ContactArray: ContactI[] = [
  {
    link: 'https://t.me/SVA_1985',
    svg: '#telegram',
    title: 'telegram',
    data: 'SVA_1985',
  },
  {
    link: 'https://discordapp.com/users/842765911681400894',
    svg: '#discord',
    title: 'discord',
    data: 'Vitaliy S.',
  },
  {
    link: 'https://github.com/SVA2021',
    svg: '#github',
    title: 'github',
    data: 'SVA2021',
  },
  {
    link: 'viber://chat?number=%2B79966236425',
    svg: '#viber',
    title: 'viber',
    data: '+79966236425',
  },
  {
    link: 'tel:+79966236425',
    svg: '#phone',
    title: 'phone',
    data: '+79966236425',
  },
  {
    link: 'mailto:sofronov.vit@gmail.com',
    svg: '#email',
    title: 'e-mail',
    data: 'sofronov.vit@gmail.com',
  },
];

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  contactList: ContactI[] = ContactArray

  constructor() { }

  ngOnInit(): void {
  }

}
