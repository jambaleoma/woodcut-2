import { AccessService } from './../services/access.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage {

  userChoice: String;
  pcChoice: String;
  userWins: number;
  pcWins: number;
  resultMessage: String;
  userWin: number;
  currentUser: User = null;

  constructor(
    private router: Router,
    private accessService: AccessService) {
    this.resetGame();
    this.currentUser = this.accessService.getCurrentUser();
  }

  resetGame() {
    this.userChoice = '';
    this.pcChoice = '';
    this.userWins = 0;
    this.pcWins = 0;
    this.userWin = 0;
    this.resultMessage = 'GIOCA!';
  }

  navigateTo(direction: string) {
    this.resetGame();
    this.router.navigateByUrl(direction);
  }

  chose(userChoice: String) {
    this.userChoice = userChoice;
    this.randomPcChoice();

    if (this.sameChoice()) {
      this.userWin = 3;
      return;
    }

    if (this.checkIfWon()) {
      this.userWins++;
      this.resultMessage = 'HAI VINTO!';
      this.userWin = 1;
    } else {
      this.pcWins++;
      this.resultMessage = 'HAI PERSO!';
      this.userWin = 2;
    }

  }

  randomPcChoice() {
    switch (this.getRandomInt(5)) {
      case 0:
        this.pcChoice = 'Sasso'
        break;
      case 1:
        this.pcChoice = 'Lizard'
        break;
      case 2:
        this.pcChoice = 'Carta'
        break;
      case 3:
        this.pcChoice = 'Spock'
        break;
      case 4:
        this.pcChoice = 'Forbici'
        break;
    }
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  sameChoice() {
    if (this.pcChoice === this.userChoice) {
      this.resultMessage = 'PAREGGIO';
      return true;
    }
  }

  checkIfWon() {
    if (!this.sameChoice()) {
      if (this.pcChoice === 'Sasso') {
        if (this.userChoice === 'Carta' || this.userChoice === 'Spock') {
          return true;
        } else {
          return false;
        }
      } else if (this.pcChoice === 'Lizard') {
        if (this.userChoice === 'Sasso' || this.userChoice === 'Forbici') {
          return true;
        } else {
          return false;
        }
      } else if (this.pcChoice === 'Carta') {
        if (this.userChoice === 'Lizard' || this.userChoice === 'Forbici') {
          return true;
        } else {
          return false;
        }
      } else if (this.pcChoice === 'Spock') {
        if (this.userChoice === 'Lizard' || this.userChoice === 'Carta') {
          return true;
        } else {
          return false;
        }
      } else if (this.pcChoice === 'Forbici') {
        if (this.userChoice === 'Sasso' || this.userChoice === 'Spock') {
          return true;
        } else {
          return false;
        }
      }
    }
  }

  changeColorPc(pcChoice: String) {
    if (pcChoice === this.pcChoice) {
      if (this.sameChoice()) {
        return 'yellow';
      } else if (!this.checkIfWon()) {
        return 'green';
      } else {
        return 'red';
      }
    } else {
      return 'white';
    }
  }

  changeColorUser(userChoice: String) {
    if (userChoice === this.userChoice) {
      if (this.sameChoice()) {
        return 'yellow';
      } else if (this.checkIfWon()) {
        return 'green';
      } else {
        return 'red';
      }
    } else {
      return 'white';
    }
  }
}
