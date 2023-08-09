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
  generateBackgroundStyle(): string {
    return 'url(' + this.backgroundImageUrl + ')';
  }

  ngOnInit() {
    this.startBackgroundAnimation();
  }

  startBackgroundAnimation() {
    const background = document.getElementById('game-background') as HTMLElement;
    let posY = 0;

    setInterval(() => {
      posY += 1.5; // Adjust the speed of background movement
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
    const maxLeftPosition = 30;
    if (this.shipPositionX > maxLeftPosition) {
      this.shipPositionX -= 20; // Adjust the movement step
    }
  }
  
  moveShipRight() {
    // Calculate the maximum right position for the ship
    const maxRightPosition = window.innerWidth  - 270;
    if (this.shipPositionX < maxRightPosition) {
      this.shipPositionX += 20; // Adjust the movement step
    }
  }
}