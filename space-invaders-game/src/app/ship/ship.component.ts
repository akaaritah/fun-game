import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.css']
})
export class ShipComponent implements OnInit {
  shipImageUrl = './assets/ship.png'; // Replace with your ship image path
  backgroundImageUrl = './assets/background.jpg'; // Replace with your background image path
  shipPositionX = 0;

  ngOnInit() {
    this.startBackgroundAnimation();
  }

  startBackgroundAnimation() {
    const background = document.getElementById('game-background') as HTMLElement;
    let posY = 0;

    setInterval(() => {
      posY += 1; // Adjust the speed of background movement
      background.style.backgroundPosition = `0px ${posY}px`;
    }, 20); // Adjust the interval to control the animation smoothness
  }

  @HostListener('window:keydown', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'a' || event.key === 'A') {
      this.moveShipLeft();
    } else if (event.key === 'd' || event.key === 'D') {
      this.moveShipRight();
    }
  }

  moveShipLeft() {
    this.shipPositionX -= 10; // Adjust the movement step
  }

  moveShipRight() {
    this.shipPositionX += 10; // Adjust the movement step
  }
}