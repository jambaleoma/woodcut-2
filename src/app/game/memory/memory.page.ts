import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemoryCard } from 'src/app/model/memoryCard.model';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.page.html',
  styleUrls: ['./memory.page.scss']
})
export class MemoryPage implements OnInit {
  public state = 'default';
  public cards: MemoryCard[] = [];
  public cardsName: string[] = [
    'AllenKey',
    'enggHammer',
    'nails',
    'nut',
    'saw',
    'screws',
    'toolbox',
    'wingnut',
    'nutBolt',
    'pliers',
    'screwdriver',
    'tapeMeasure',
    'trowel',
    'wrench',
  ];

  constructor(private router: Router) {
    for (const cardname of this.cardsName) {
      const mc: MemoryCard = {
        name: cardname,
        chosen: false,
      };
      this.cards.push(mc);
      this.cards.push(mc);
    }
  }

  ngOnInit() {}

  resetGame() {}

  navigateTo(direction: string) {
    this.resetGame();
    this.router.navigateByUrl(direction);
  }

  rotateCard(card: any) {
    card.state = (this.state === 'default' ? 'rotated' : 'default');
  }
}
