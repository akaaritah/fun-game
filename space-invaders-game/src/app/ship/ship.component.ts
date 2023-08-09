import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.css']
})
export class ShipComponent implements OnInit {
  shipImageUrl = './assets/ship.png'; 
  backgroundImageUrl = './assets/background.jpg';
  shipPositionX = 0;
  obstacleImageUrl = './assets/obstacle.jpg';
  obstacles: { x: number, y: number }[] = [];

  generateBackgroundStyle(): string {
    return 'url(' + this.backgroundImageUrl + ')';
  }

  
  ngOnInit() {
    this.startBackgroundAnimation();
    this.startObstacles();
  }

  startBackgroundAnimation() {
    const background = document.getElementById('game-background') as HTMLElement;
    let posY = 0;

    setInterval(() => {
      posY += 1.5;
      background.style.backgroundPosition = `0px ${posY}px`;
    }, 20);
  }

  startObstacles() {
    setInterval(() => {
      this.generateObstacle();
    }, 2000); // Create a new obstacle every 2 seconds
  }
  
  generateObstacle() {
    const maxX = window.innerWidth;
    for (let x = 0; x < maxX; x += 100) {
      this.obstacles.push({ x, y: 0 });
    }
  }

  moveObstacles() {
    const obstacleSpeed = 20; // Adjust the obstacle speed
    this.obstacles.forEach(obstacle => {
      obstacle.y += obstacleSpeed;
    });
    // Remove off-screen obstacles
    this.obstacles = this.obstacles.filter(obstacle => obstacle.y < window.innerHeight);
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
      this.shipPositionX -= 20;
    }
  }
  
  moveShipRight() {
    const maxRightPosition = window.innerWidth - 270;
    if (this.shipPositionX < maxRightPosition) {
      this.shipPositionX += 20;
    }
  }
}