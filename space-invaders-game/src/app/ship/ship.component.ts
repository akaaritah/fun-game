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
  obstacleWidth = 120;
  score= 0;
  shipWidth= 160;
  shipHeight=160;
  obstacleHeight= 120;
  gameMessage: string = ''; 
  isGameOver: boolean = false;
  constructor(private router: Router) {}
  isGameRunning: boolean = true;
  obstacleSpeed = 5;
  playerSpeed = 20;
  backgroundMusic: HTMLAudioElement | null = null;
  scoreSound: HTMLAudioElement | null = null;

  

  generateBackgroundStyle(): string {
    return 'url(' + this.backgroundImageUrl + ')';
  }

  
  ngOnInit() {
    this.startBackgroundAnimation();
    this.startObstacles();
    this.startSpeedIncrementTimer();
    this.backgroundMusic = document.getElementById('background-music') as HTMLAudioElement;
    this.scoreSound = document.getElementById('score-sound') as HTMLAudioElement;
    this.backgroundMusic.play();
    if (this.scoreSound) {
      this.scoreSound.volume = 0.25;
    }
  }

  startSpeedIncrementTimer() {
    setInterval(() => {
      this.obstacleSpeed += 1;
      this.playerSpeed += 0.75;
    }, 10000);
  }

  startBackgroundAnimation() {
    const background = document.getElementById('game-background') as HTMLElement;
    let posY = 0;
  
    setInterval(() => {
      posY += 1.5;
      background.style.backgroundPosition = `0px ${posY}px`;
      this.moveObstacles();
    }, 20);
  }

  startObstacles() {
    setInterval(() => {
      if (this.isGameRunning) {
        this.generateObstacles();
      }
    }, 2000);
  }


  generateObstacles() {
    const maxX = window.innerWidth;
    
    const randomX = Math.floor(Math.random() * (maxX - this.obstacleWidth));
    this.obstacles.push({ x: randomX, y: 0 });
  }


  moveObstacles() {
    if (this.score <= -10) {
      this.isGameOver = true;
      this.gameMessage= 'You lose! You can try again...'
      this.isGameRunning = false;
      return;
    }
  
    if (this.score >= 60) {
      this.isGameOver = true;
      this.gameMessage= 'You win! Very nice.'
      this.isGameRunning = false;
      return;
    }
  
    this.obstacles.forEach((obstacle, index) => {
      obstacle.y += this.obstacleSpeed;
  
      const obstacleMiddleX = obstacle.x + this.obstacleWidth / 2;
      const shipMiddleX = this.shipPositionX + this.shipWidth / 2;
      const shipBottomY = window.innerHeight - this.shipHeight;
  
      if (
        obstacle.y > shipBottomY - this.obstacleHeight &&
        Math.abs(obstacleMiddleX - shipMiddleX) < this.shipWidth / 2
      ) {
        this.score += 1;
        this.playScoreSound();
        this.obstacles.splice(index, 1);
      }
    });
  
    this.obstacles = this.obstacles.filter(obstacle => {
      if (obstacle.y >= window.innerHeight) {
        this.score -= 1;
        return false;
      }
      return true;
    });
  }

  playScoreSound() {
    if (this.scoreSound) {
      this.scoreSound.currentTime = 0;
      this.scoreSound.play();
    }
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
      this.shipPositionX -= this.playerSpeed;
    }
  }
  
  moveShipRight() {
    const maxRightPosition = window.innerWidth - 180;
    if (this.shipPositionX < maxRightPosition) {
      this.shipPositionX += this.playerSpeed;
    }
  }

returnToMenu() {
  this.isGameOver = false;
  this.score = 0;
  this.obstacles = [];
  this.router.navigate(['/']);
}
}