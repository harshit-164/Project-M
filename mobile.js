let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchX = 0;
  touchY = 0;
  prevTouchX = 0;
  prevTouchY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    const handleTouchMove = (x, y) => {
      if (!this.rotating) {
        this.velX = x - this.prevTouchX;
        this.velY = y - this.prevTouchY;

        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;
      }

      if (this.rotating) {
        const dirX = x - this.touchX;
        const dirY = y - this.touchY;
        const angle = Math.atan2(dirY, dirX);
        let degrees = (180 * angle) / Math.PI;
        degrees = (360 + Math.round(degrees)) % 360;
        this.rotation = degrees;
      }

      paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;

      this.prevTouchX = x;
      this.prevTouchY = y;
    };

    // Touch Start
    paper.addEventListener("touchstart", (e) => {
      e.preventDefault(); // Prevent default scrolling behavior
      if (this.holdingPaper) return;

      this.holdingPaper = true;

      const touch = e.touches[0];
      this.touchX = touch.clientX;
      this.touchY = touch.clientY;
      this.prevTouchX = touch.clientX;
      this.prevTouchY = touch.clientY;

      // Bring the paper to the top
      paper.style.zIndex = highestZ;
      highestZ += 1;

      // Enable rotation if a second touch is detected
      if (e.touches.length > 1) {
        this.rotating = true;
      }
    });

    // Touch Move
    document.addEventListener("touchmove", (e) => {
      e.preventDefault();
      if (!this.holdingPaper) return;

      const touch = e.touches[0];
      handleTouchMove(touch.clientX, touch.clientY);
    });

    // Touch End
    window.addEventListener("touchend", () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  }
}

// Initialize Papers
const papers = Array.from(document.querySelectorAll(".paper"));
papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});
