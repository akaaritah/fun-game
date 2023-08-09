import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.css']
})
export class ShipComponent implements OnInit {
  shipImageUrl = './assets/ship.png'; 
  backgroundImageUrl = './assets/background.jpg';
  shipPositionX = 800;
  obstacleImageUrl = './assets/obstacle.jpg';
  obstacles: { x: number, y: number }[] = [];
  obstacleWidth = 120; // Adjust the obstacle width
  score= 0;
  shipWidth= 160;
  shipHeight=160;
  obstacleHeight= 120;
  gameOver: boolean = false;
  constructor(private router: Router) {}

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
      this.moveObstacles(); // Call moveObstacles to update obstacle positions
    }, 20);
  }

  startObstacles() {
    setInterval(() => {
      this.generateObstacles();
    }, 2000); // Create a new obstacle every 2 seconds
  }
  
  generateObstacles() {
    const maxX = window.innerWidth;
    
    const randomX = Math.floor(Math.random() * (maxX - this.obstacleWidth));
    this.obstacles.push({ x: randomX, y: 0 }); // Initialize obstacle at the top
  }

  moveObstacles() {
    if (this.score <= -10) {
      this.gameOver = true;
      return;
    }
    const obstacleSpeed = 5; // Adjust the obstacle speed
  
    this.obstacles.forEach((obstacle, index) => {
      obstacle.y += obstacleSpeed;
  
      // Calculate obstacle and ship middle positions
      const obstacleMiddleX = obstacle.x + this.obstacleWidth / 2;
      const shipMiddleX = this.shipPositionX + this.shipWidth / 2;
      const shipBottomY = window.innerHeight - this.shipHeight;
  
      // Check for collision only when the ship is on the same Y level as the obstacle
      if (
        obstacle.y > shipBottomY - this.obstacleHeight && // Ship and obstacle are on the same Y level
        Math.abs(obstacleMiddleX - shipMiddleX) < this.shipWidth / 2 // Ship middle touches obstacle middle
      ) {
        this.score += 1;
        this.obstacles.splice(index, 1); // Remove the collided obstacle
      }
    });
  
    // Remove off-screen obstacles and subtract a point
    this.obstacles = this.obstacles.filter(obstacle => {
      if (obstacle.y >= window.innerHeight) {
        this.score -= 1;
        return false;
      }
      return true;
    });
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
    const maxLeftPosition = 0;
    if (this.shipPositionX > maxLeftPosition) {
      this.shipPositionX -= 20;
    }
  }
  
  moveShipRight() {
    const maxRightPosition = window.innerWidth - 180;
    if (this.shipPositionX < maxRightPosition) {
      this.shipPositionX += 20;
    }
  }

  returnToMenu() {
    this.gameOver = false;
    this.score = 0;
    this.obstacles = [];
    this.router.navigate(['/']);
  }
}