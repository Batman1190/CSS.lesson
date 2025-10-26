// CSS Fun Learning - Interactive JavaScript for Kids!

// Global variables
let completedExercises = new Set();
let currentExercise = 1;
const totalExercises = 50;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupNavigation();
    setupModal();
    loadProgress();
});

// Initialize the application
function initializeApp() {
    updateProgress();
    console.log('🎨 CSS Fun Learning initialized!');
}

// Setup navigation between sections
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Remove active class from all buttons and sections
            navButtons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button and corresponding section
            this.classList.add('active');
            document.getElementById(targetSection).classList.add('active');
        });
    });
}

// Setup modal functionality
function setupModal() {
    const modal = document.getElementById('achievementModal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Show achievement modal
function showAchievement(exerciseNumber) {
    const modal = document.getElementById('achievementModal');
    const achievementText = document.getElementById('achievementText');
    
    achievementText.textContent = `You completed Exercise ${exerciseNumber}! Great job! 🎉`;
    modal.style.display = 'block';
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        modal.style.display = 'none';
    }, 3000);
}

// Mark exercise as completed
function markExerciseCompleted(exerciseNumber) {
    if (!completedExercises.has(exerciseNumber)) {
        completedExercises.add(exerciseNumber);
        updateProgress();
        saveProgress();
        
        // Mark the exercise card as completed
        const exerciseCard = document.querySelector(`[data-exercise="${exerciseNumber}"]`);
        if (exerciseCard) {
            exerciseCard.classList.add('completed');
        }
        
        showAchievement(exerciseNumber);
    }
}

// Update progress bar
function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    const completedCount = completedExercises.size;
    const percentage = (completedCount / totalExercises) * 100;
    
    progressFill.style.width = percentage + '%';
    progressText.textContent = `${completedCount}/${totalExercises} Complete`;
}

// Save progress to localStorage
function saveProgress() {
    localStorage.setItem('cssLearningProgress', JSON.stringify(Array.from(completedExercises)));
}

// Load progress from localStorage
function loadProgress() {
    const savedProgress = localStorage.getItem('cssLearningProgress');
    if (savedProgress) {
        completedExercises = new Set(JSON.parse(savedProgress));
        updateProgress();
        
        // Mark completed exercises
        completedExercises.forEach(exerciseNumber => {
            const exerciseCard = document.querySelector(`[data-exercise="${exerciseNumber}"]`);
            if (exerciseCard) {
                exerciseCard.classList.add('completed');
            }
        });
    }
}

// ==================== EXERCISE FUNCTIONS ====================

// Exercise 1: Change Background Color
function changeBackground(elementId) {
    const element = document.getElementById(elementId);
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    element.style.backgroundColor = randomColor;
    markExerciseCompleted(1);
}

// Exercise 2: Change Size
function changeSize(elementId, size) {
    const element = document.getElementById(elementId);
    if (size === 'big') {
        element.style.fontSize = '2rem';
        element.style.transform = 'scale(1.2)';
    } else {
        element.style.fontSize = '0.8rem';
        element.style.transform = 'scale(0.8)';
    }
    markExerciseCompleted(2);
}

// Exercise 3: Make Bold
function makeBold(elementId) {
    const element = document.getElementById(elementId);
    element.style.fontWeight = 'bold';
    markExerciseCompleted(3);
}

// Exercise 4: Make Italic
function makeItalic(elementId) {
    const element = document.getElementById(elementId);
    element.style.fontStyle = 'italic';
    markExerciseCompleted(4);
}

// Exercise 5: Make Underline
function makeUnderline(elementId) {
    const element = document.getElementById(elementId);
    element.style.textDecoration = 'underline';
    markExerciseCompleted(5);
}

// Exercise 6: Center Text
function centerText(elementId) {
    const element = document.getElementById(elementId);
    element.style.textAlign = 'center';
    markExerciseCompleted(6);
}

// Exercise 7: Hide and Show Text
function hideText(elementId) {
    const element = document.getElementById(elementId);
    element.style.display = 'none';
    markExerciseCompleted(7);
}

function showText(elementId) {
    const element = document.getElementById(elementId);
    element.style.display = 'flex';
    markExerciseCompleted(7);
}

// Exercise 8: Add Border
function addBorder(elementId) {
    const element = document.getElementById(elementId);
    element.style.border = '5px solid #ff6b6b';
    element.style.borderRadius = '15px';
    markExerciseCompleted(8);
}

// Exercise 9: Rainbow Colors
function rainbowColors(elementId) {
    const element = document.getElementById(elementId);
    element.classList.add('rainbow');
    markExerciseCompleted(9);
}

// Exercise 10-16: Change Colors
function changeColor(elementId, color) {
    const element = document.getElementById(elementId);
    element.style.backgroundColor = color;
    markExerciseCompleted(parseInt(elementId.replace('demo', '')));
}

// Exercise 17: Make Circle
function makeCircle(elementId) {
    const element = document.getElementById(elementId);
    element.classList.add('circle');
    markExerciseCompleted(17);
}

// Exercise 18: Make Square
function makeSquare(elementId) {
    const element = document.getElementById(elementId);
    element.classList.add('square');
    markExerciseCompleted(18);
}

// Exercise 19: Make Rectangle
function makeRectangle(elementId) {
    const element = document.getElementById(elementId);
    element.classList.add('rectangle');
    markExerciseCompleted(19);
}

// Exercise 20: Make Triangle
function makeTriangle(elementId) {
    const element = document.getElementById(elementId);
    element.classList.add('triangle');
    markExerciseCompleted(20);
}

// Exercise 21: Make Heart
function makeHeart(elementId) {
    const element = document.getElementById(elementId);
    element.classList.add('heart');
    markExerciseCompleted(21);
}

// Exercise 22: Make Star
function makeStar(elementId) {
    const element = document.getElementById(elementId);
    element.classList.add('star');
    markExerciseCompleted(22);
}

// Exercise 23: Make Diamond
function makeDiamond(elementId) {
    const element = document.getElementById(elementId);
    element.classList.add('diamond');
    markExerciseCompleted(23);
}

// Exercise 24: Make Oval
function makeOval(elementId) {
    const element = document.getElementById(elementId);
    element.classList.add('oval');
    markExerciseCompleted(24);
}

// Exercise 25: Change Font
function changeFont(elementId, fontFamily) {
    const element = document.getElementById(elementId);
    element.style.fontFamily = fontFamily;
    markExerciseCompleted(25);
}

// Exercise 26: Add Shadow
function addShadow(elementId) {
    const element = document.getElementById(elementId);
    element.style.textShadow = '3px 3px 6px rgba(0,0,0,0.5)';
    markExerciseCompleted(26);
}

// Exercise 27: Space Letters
function spaceLetters(elementId) {
    const element = document.getElementById(elementId);
    element.style.letterSpacing = '5px';
    markExerciseCompleted(27);
}

// Exercise 28: Change Line Height
function changeLineHeight(elementId) {
    const element = document.getElementById(elementId);
    element.style.lineHeight = '2';
    markExerciseCompleted(28);
}

// Exercise 29: Transform Text
function transformText(elementId) {
    const element = document.getElementById(elementId);
    element.style.textTransform = 'uppercase';
    markExerciseCompleted(29);
}

// Exercise 30: Decorate Text
function decorateText(elementId) {
    const element = document.getElementById(elementId);
    element.style.textDecoration = 'line-through';
    markExerciseCompleted(30);
}

// Exercise 31: Space Words
function spaceWords(elementId) {
    const element = document.getElementById(elementId);
    element.style.wordSpacing = '10px';
    markExerciseCompleted(31);
}

// Exercise 32: Align Text
function alignText(elementId, alignment) {
    const element = document.getElementById(elementId);
    element.style.textAlign = alignment;
    markExerciseCompleted(32);
}

// Exercise 33: Add Margin
function addMargin(elementId) {
    const element = document.getElementById(elementId);
    element.style.margin = '20px';
    markExerciseCompleted(33);
}

// Exercise 34: Add Padding
function addPadding(elementId) {
    const element = document.getElementById(elementId);
    element.style.padding = '30px';
    markExerciseCompleted(34);
}

// Exercise 35: Change Width
function changeWidth(elementId) {
    const element = document.getElementById(elementId);
    element.style.width = '300px';
    markExerciseCompleted(35);
}

// Exercise 36: Change Height
function changeHeight(elementId) {
    const element = document.getElementById(elementId);
    element.style.height = '120px';
    markExerciseCompleted(36);
}

// Exercise 37: Change Position
function changePosition(elementId) {
    const element = document.getElementById(elementId);
    element.style.position = 'relative';
    element.style.left = '50px';
    element.style.top = '20px';
    markExerciseCompleted(37);
}

// Exercise 38: Float Box
function floatBox(elementId) {
    const element = document.getElementById(elementId);
    element.style.float = 'left';
    markExerciseCompleted(38);
}

// Exercise 39: Change Display
function changeDisplay(elementId) {
    const element = document.getElementById(elementId);
    element.style.display = 'inline-block';
    markExerciseCompleted(39);
}

// Exercise 40: Change Z-Index
function changeZIndex(elementId) {
    const element = document.getElementById(elementId);
    element.style.position = 'relative';
    element.style.zIndex = '10';
    markExerciseCompleted(40);
}

// Exercise 41: Bounce Animation
function bounceBox(elementId) {
    const element = document.getElementById(elementId);
    element.classList.add('bounce-animation');
    setTimeout(() => {
        element.classList.remove('bounce-animation');
    }, 2000);
    markExerciseCompleted(41);
}

// Exercise 42: Spin Animation
function spinBox(elementId) {
    const element = document.getElementById(elementId);
    element.classList.add('spin-animation');
    setTimeout(() => {
        element.classList.remove('spin-animation');
    }, 2000);
    markExerciseCompleted(42);
}

// Exercise 43: Fade Animation
function fadeBox(elementId) {
    const element = document.getElementById(elementId);
    element.style.transition = 'opacity 1s ease';
    element.style.opacity = '0.3';
    setTimeout(() => {
        element.style.opacity = '1';
    }, 1000);
    markExerciseCompleted(43);
}

// Exercise 44: Slide Animation
function slideBox(elementId) {
    const element = document.getElementById(elementId);
    element.style.transition = 'transform 1s ease';
    element.style.transform = 'translateX(100px)';
    setTimeout(() => {
        element.style.transform = 'translateX(0)';
    }, 1000);
    markExerciseCompleted(44);
}

// Exercise 45: Scale Animation
function scaleBox(elementId) {
    const element = document.getElementById(elementId);
    element.style.transition = 'transform 1s ease';
    element.style.transform = 'scale(1.5)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 1000);
    markExerciseCompleted(45);
}

// Exercise 46: Rotate Animation
function rotateBox(elementId) {
    const element = document.getElementById(elementId);
    element.style.transition = 'transform 1s ease';
    element.style.transform = 'rotate(180deg)';
    setTimeout(() => {
        element.style.transform = 'rotate(0deg)';
    }, 1000);
    markExerciseCompleted(46);
}

// Exercise 47: Pulse Animation
function pulseBox(elementId) {
    const element = document.getElementById(elementId);
    element.classList.add('pulse-animation');
    setTimeout(() => {
        element.classList.remove('pulse-animation');
    }, 2000);
    markExerciseCompleted(47);
}

// Exercise 48: Wiggle Animation
function wiggleBox(elementId) {
    const element = document.getElementById(elementId);
    element.classList.add('wiggle-animation');
    setTimeout(() => {
        element.classList.remove('wiggle-animation');
    }, 2000);
    markExerciseCompleted(48);
}

// Exercise 49: Glow Effect
function glowBox(elementId) {
    const element = document.getElementById(elementId);
    element.classList.add('glow-effect');
    setTimeout(() => {
        element.classList.remove('glow-effect');
    }, 3000);
    markExerciseCompleted(49);
}

// Exercise 50: Party Time - All animations together!
function partyTime(elementId) {
    const element = document.getElementById(elementId);
    
    // Apply multiple effects
    element.classList.add('rainbow', 'bounce-animation', 'pulse-animation');
    element.style.transform = 'rotate(360deg) scale(1.2)';
    element.style.transition = 'all 2s ease';
    
    // Add confetti effect
    createConfetti();
    
    setTimeout(() => {
        element.classList.remove('rainbow', 'bounce-animation', 'pulse-animation');
        element.style.transform = 'rotate(0deg) scale(1)';
    }, 3000);
    
    markExerciseCompleted(50);
}

// Create confetti effect for party time
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.animation = 'confettiFall 3s linear forwards';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 50);
    }
}

// Add confetti animation CSS
const confettiCSS = `
@keyframes confettiFall {
    0% {
        transform: translateY(-100vh) rotate(0deg);
        opacity: 1;
    }
    100% {
        transform: translateY(100vh) rotate(720deg);
        opacity: 0;
    }
}
`;

// Inject confetti CSS
const style = document.createElement('style');
style.textContent = confettiCSS;
document.head.appendChild(style);

// Add sound effects (optional - using Web Audio API)
function playSound(frequency, duration) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
        console.log('Audio not supported');
    }
}

// Add celebration sound when exercise is completed
function playCelebrationSound() {
    playSound(523, 0.1); // C5
    setTimeout(() => playSound(659, 0.1), 100); // E5
    setTimeout(() => playSound(784, 0.2), 200); // G5
}

// Enhanced markExerciseCompleted function with sound
function markExerciseCompleted(exerciseNumber) {
    if (!completedExercises.has(exerciseNumber)) {
        completedExercises.add(exerciseNumber);
        updateProgress();
        saveProgress();
        
        // Mark the exercise card as completed
        const exerciseCard = document.querySelector(`[data-exercise="${exerciseNumber}"]`);
        if (exerciseCard) {
            exerciseCard.classList.add('completed');
        }
        
        // Play celebration sound
        playCelebrationSound();
        
        showAchievement(exerciseNumber);
    }
}

// Reset all exercises (for testing or restart)
function resetAllExercises() {
    completedExercises.clear();
    updateProgress();
    saveProgress();
    
    // Remove completed class from all exercise cards
    document.querySelectorAll('.exercise-card').forEach(card => {
        card.classList.remove('completed');
    });
    
    console.log('All exercises reset!');
}

// Export functions for global access
window.resetAllExercises = resetAllExercises;
