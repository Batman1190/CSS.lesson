// CSS Coding School for Kids - Interactive Learning JavaScript

// Global variables
let completedLessons = new Set();
let currentLesson = 1;
const totalLessons = 30;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupNavigation();
    setupModal();
    loadProgress();
    setupCodeEditors();
});

// Initialize the application
function initializeApp() {
    updateProgress();
    console.log('🎨 CSS Coding School initialized!');
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

// Setup code editors with syntax highlighting
function setupCodeEditors() {
    const textareas = document.querySelectorAll('.code-editor textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            // Basic syntax highlighting simulation
            highlightSyntax(this);
        });
        
        textarea.addEventListener('keydown', function(e) {
            // Auto-indentation
            if (e.key === 'Enter') {
                const cursorPos = this.selectionStart;
                const textBefore = this.value.substring(0, cursorPos);
                const lines = textBefore.split('\n');
                const currentLine = lines[lines.length - 1];
                const indent = currentLine.match(/^(\s*)/)[1];
                
                if (currentLine.includes('{')) {
                    setTimeout(() => {
                        const newCursorPos = this.selectionStart;
                        this.value = this.value.substring(0, newCursorPos) + '\n' + indent + '    ' + this.value.substring(newCursorPos);
                        this.setSelectionRange(newCursorPos + indent.length + 5, newCursorPos + indent.length + 5);
                    }, 0);
                }
            }
        });
    });
}

// Basic syntax highlighting
function highlightSyntax(textarea) {
    // This is a simplified version - in a real app you'd use a proper syntax highlighter
    const value = textarea.value;
    const lines = value.split('\n');
    
    // Add visual feedback for common CSS properties
    if (value.includes('background-color') || value.includes('color') || value.includes('font-size')) {
        textarea.style.borderColor = '#4caf50';
    } else if (value.includes('px') || value.includes('deg') || value.includes('s')) {
        textarea.style.borderColor = '#ff9800';
    } else {
        textarea.style.borderColor = '#4ecdc4';
    }
}

// Show achievement modal
function showAchievement(lessonNumber) {
    const modal = document.getElementById('achievementModal');
    const achievementText = document.getElementById('achievementText');
    
    achievementText.textContent = `You completed Lesson ${lessonNumber}! You're learning to code! 🎉`;
    modal.style.display = 'block';
    
    // Auto-hide after 4 seconds
    setTimeout(() => {
        modal.style.display = 'none';
    }, 4000);
}

// Mark lesson as completed
function markLessonCompleted(lessonNumber) {
    if (!completedLessons.has(lessonNumber)) {
        completedLessons.add(lessonNumber);
        updateProgress();
        saveProgress();
        
        // Mark the lesson card as completed
        const lessonCard = document.querySelector(`[data-lesson="${lessonNumber}"]`);
        if (lessonCard) {
            lessonCard.classList.add('completed');
        }
        
        // Play celebration sound
        playCelebrationSound();
        
        showAchievement(lessonNumber);
    }
}

// Update progress bar
function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    const completedCount = completedLessons.size;
    const percentage = (completedCount / totalLessons) * 100;
    
    progressFill.style.width = percentage + '%';
    progressText.textContent = `${completedCount}/${totalLessons} Lessons Complete`;
}

// Save progress to localStorage
function saveProgress() {
    localStorage.setItem('cssCodingProgress', JSON.stringify(Array.from(completedLessons)));
}

// Load progress from localStorage
function loadProgress() {
    const savedProgress = localStorage.getItem('cssCodingProgress');
    if (savedProgress) {
        completedLessons = new Set(JSON.parse(savedProgress));
        updateProgress();
        
        // Mark completed lessons
        completedLessons.forEach(lessonNumber => {
            const lessonCard = document.querySelector(`[data-lesson="${lessonNumber}"]`);
            if (lessonCard) {
                lessonCard.classList.add('completed');
            }
        });
    }
}

// Show hint
function showHint(lessonNumber) {
    const hintContent = document.getElementById(`hintContent${lessonNumber}`);
    if (hintContent.style.display === 'none' || hintContent.style.display === '') {
        hintContent.style.display = 'block';
    } else {
        hintContent.style.display = 'none';
    }
}

// Run user's CSS code
function runCode(lessonNumber) {
    const codeTextarea = document.getElementById(`code${lessonNumber}`);
    const resultElement = document.getElementById(`result${lessonNumber}`);
    const userCode = codeTextarea.value.trim();
    
    if (!userCode) {
        showError(resultElement, "Please write some CSS code first!");
        return;
    }
    
    try {
        // Parse and validate CSS
        const cssRules = parseCSS(userCode);
        
        if (cssRules.length === 0) {
            showError(resultElement, "I don't understand that CSS. Try something like 'background-color: red;'");
            return;
        }
        
        // Apply CSS to result element and count successful applications
        const appliedRules = applyCSSToElement(resultElement, cssRules);
        
        // Only show success if at least one rule was successfully applied
        if (appliedRules > 0) {
            // Show success animation
            resultElement.classList.add('success-animation');
            setTimeout(() => {
                resultElement.classList.remove('success-animation');
            }, 600);
            
            // Mark lesson as completed
            markLessonCompleted(lessonNumber);
            
            // Provide feedback
            showSuccess(resultElement, "Great job! Your CSS is working!");
        } else {
            // No rules were successfully applied - show error
            showError(resultElement, "Your CSS syntax looks correct, but the values aren't valid. Check your values!");
        }
        
    } catch (error) {
        showError(resultElement, "There's an error in your CSS. Check the syntax!");
        console.log('CSS Error:', error);
    }
}

// Parse CSS code (improved parser with validation)
function parseCSS(cssCode) {
    const rules = [];
    const lines = cssCode.split('\n');
    
    lines.forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine && trimmedLine.includes(':')) {
            const parts = trimmedLine.split(':');
            if (parts.length >= 2) {
                const property = parts[0].trim();
                const value = parts.slice(1).join(':').trim().replace(/;$/, '');
                
                // Validate property name (must be a valid CSS property)
                if (isValidCSSProperty(property)) {
                    rules.push({ property, value });
                }
            }
        }
    });
    
    return rules;
}

// Validate CSS property names
function isValidCSSProperty(property) {
    const validProperties = [
        'background-color', 'color', 'font-size', 'font-weight', 'font-style', 'font-family',
        'text-decoration', 'text-align', 'text-shadow', 'text-transform', 'letter-spacing',
        'border', 'border-radius', 'padding', 'margin', 'width', 'height',
        'display', 'position', 'left', 'top', 'right', 'bottom',
        'transform', 'transition', 'animation', 'line-height', 'word-spacing',
        'z-index', 'float', 'opacity', 'box-shadow', 'outline'
    ];
    return validProperties.includes(property);
}

// CSS Value Validation Functions
function isValidColor(value) {
    const colorKeywords = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'black', 'white', 'gray', 'grey', 'brown', 'cyan', 'magenta', 'lime', 'navy', 'teal', 'silver', 'maroon', 'olive', 'aqua', 'fuchsia'];
    const hexPattern = /^#[0-9A-Fa-f]{3,6}$/;
    const rgbPattern = /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/;
    const rgbaPattern = /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[0-9.]+\s*\)$/;
    
    return colorKeywords.includes(value.toLowerCase()) || 
           hexPattern.test(value) || 
           rgbPattern.test(value) || 
           rgbaPattern.test(value);
}

function isValidSize(value) {
    const sizePattern = /^\d+(\.\d+)?(px|em|rem|%|vh|vw)$/;
    return sizePattern.test(value) || value === 'auto';
}

function isValidFontWeight(value) {
    const validWeights = ['normal', 'bold', 'bolder', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
    return validWeights.includes(value);
}

function isValidFontStyle(value) {
    const validStyles = ['normal', 'italic', 'oblique'];
    return validStyles.includes(value);
}

function isValidTextDecoration(value) {
    const validDecorations = ['none', 'underline', 'overline', 'line-through', 'blink'];
    return validDecorations.includes(value) || value.includes('underline') || value.includes('line-through');
}

function isValidTextAlign(value) {
    const validAligns = ['left', 'right', 'center', 'justify'];
    return validAligns.includes(value);
}

function isValidBorder(value) {
    // Basic border validation - should contain width, style, and optionally color
    return value.includes('solid') || value.includes('dashed') || value.includes('dotted') || value.includes('none');
}

function isValidDisplay(value) {
    const validDisplays = ['block', 'inline', 'inline-block', 'flex', 'grid', 'none', 'table', 'table-cell'];
    return validDisplays.includes(value);
}

function isValidPosition(value) {
    const validPositions = ['static', 'relative', 'absolute', 'fixed', 'sticky'];
    return validPositions.includes(value);
}

function isValidTextTransform(value) {
    const validTransforms = ['none', 'capitalize', 'uppercase', 'lowercase'];
    return validTransforms.includes(value);
}

function isValidFloat(value) {
    const validFloats = ['left', 'right', 'none'];
    return validFloats.includes(value);
}

// Apply CSS rules to an element (with improved validation)
function applyCSSToElement(element, cssRules) {
    let appliedRules = 0;
    
    cssRules.forEach(rule => {
        const property = rule.property;
        const value = rule.value;
        
        // Validate and apply CSS properties with strict value checking
        switch (property) {
            case 'background-color':
                if (isValidColor(value)) {
                    element.style.backgroundColor = value;
                    appliedRules++;
                }
                break;
            case 'color':
                if (isValidColor(value)) {
                    element.style.color = value;
                    appliedRules++;
                }
                break;
            case 'font-size':
                if (isValidSize(value)) {
                    element.style.fontSize = value;
                    appliedRules++;
                }
                break;
            case 'font-weight':
                if (isValidFontWeight(value)) {
                    element.style.fontWeight = value;
                    appliedRules++;
                }
                break;
            case 'font-style':
                if (isValidFontStyle(value)) {
                    element.style.fontStyle = value;
                    appliedRules++;
                }
                break;
            case 'text-decoration':
                if (isValidTextDecoration(value)) {
                    element.style.textDecoration = value;
                    appliedRules++;
                }
                break;
            case 'text-align':
                if (isValidTextAlign(value)) {
                    element.style.textAlign = value;
                    appliedRules++;
                }
                break;
            case 'border':
                if (isValidBorder(value)) {
                    element.style.border = value;
                    appliedRules++;
                }
                break;
            case 'border-radius':
                if (isValidSize(value)) {
                    element.style.borderRadius = value;
                    appliedRules++;
                }
                break;
            case 'padding':
                if (isValidSize(value)) {
                    element.style.padding = value;
                    appliedRules++;
                }
                break;
            case 'margin':
                if (isValidSize(value)) {
                    element.style.margin = value;
                    appliedRules++;
                }
                break;
            case 'width':
                if (isValidSize(value)) {
                    element.style.width = value;
                    appliedRules++;
                }
                break;
            case 'height':
                if (isValidSize(value)) {
                    element.style.height = value;
                    appliedRules++;
                }
                break;
            case 'display':
                if (isValidDisplay(value)) {
                    element.style.display = value;
                    appliedRules++;
                }
                break;
            case 'position':
                if (isValidPosition(value)) {
                    element.style.position = value;
                    appliedRules++;
                }
                break;
            case 'left':
            case 'top':
            case 'right':
            case 'bottom':
                if (isValidSize(value)) {
                    element.style[property] = value;
                    appliedRules++;
                }
                break;
            case 'text-shadow':
                element.style.textShadow = value;
                appliedRules++;
                break;
            case 'letter-spacing':
                if (isValidSize(value)) {
                    element.style.letterSpacing = value;
                    appliedRules++;
                }
                break;
            case 'text-transform':
                if (isValidTextTransform(value)) {
                    element.style.textTransform = value;
                    appliedRules++;
                }
                break;
            case 'transform':
                element.style.transform = value;
                appliedRules++;
                break;
            case 'transition':
                element.style.transition = value;
                appliedRules++;
                break;
            case 'animation':
                element.style.animation = value;
                appliedRules++;
                break;
            case 'font-family':
                element.style.fontFamily = value;
                appliedRules++;
                break;
            case 'line-height':
                element.style.lineHeight = value;
                appliedRules++;
                break;
            case 'word-spacing':
                if (isValidSize(value)) {
                    element.style.wordSpacing = value;
                    appliedRules++;
                }
                break;
            case 'z-index':
                if (!isNaN(value)) {
                    element.style.zIndex = value;
                    appliedRules++;
                }
                break;
            case 'float':
                if (isValidFloat(value)) {
                    element.style.float = value;
                    appliedRules++;
                }
                break;
        }
    });
    
    // Return the number of successfully applied rules
    return appliedRules;
}

// Show success message
function showSuccess(element, message) {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #4caf50;
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        font-size: 1rem;
        font-weight: bold;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
        border: 2px solid #45a049;
        animation: slideDown 0.5s ease;
        max-width: 90%;
        text-align: center;
    `;
    successDiv.textContent = message;
    
    // Add to body instead of element to ensure visibility
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Show error message
function showError(element, message) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #f44336;
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        font-size: 1rem;
        font-weight: bold;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(244, 67, 54, 0.3);
        border: 2px solid #d32f2f;
        animation: slideDown 0.5s ease;
        max-width: 90%;
        text-align: center;
    `;
    errorDiv.textContent = message;
    
    // Add to body instead of element to ensure visibility
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// Add sound effects
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

// Celebration sound when lesson is completed
function playCelebrationSound() {
    playSound(523, 0.1); // C5
    setTimeout(() => playSound(659, 0.1), 100); // E5
    setTimeout(() => playSound(784, 0.2), 200); // G5
}

// Reset all lessons (for testing or restart)
function resetAllLessons() {
    completedLessons.clear();
    updateProgress();
    saveProgress();
    
    // Remove completed class from all lesson cards
    document.querySelectorAll('.lesson-card').forEach(card => {
        card.classList.remove('completed');
    });
    
    // Clear all code editors
    document.querySelectorAll('.code-editor textarea').forEach(textarea => {
        textarea.value = '';
    });
    
    // Reset all result elements
    document.querySelectorAll('.demo-box').forEach(element => {
        element.style.cssText = '';
        element.className = 'demo-box';
    });
    
    console.log('All lessons reset!');
}

// Export functions for global access
window.resetAllLessons = resetAllLessons;

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl+Enter to run code
    if (e.ctrlKey && e.key === 'Enter') {
        const activeTextarea = document.activeElement;
        if (activeTextarea && activeTextarea.tagName === 'TEXTAREA') {
            const textareaId = activeTextarea.id;
            const lessonNumber = textareaId.replace('code', '');
            runCode(lessonNumber);
        }
    }
    
    // Escape to close modal
    if (e.key === 'Escape') {
        const modal = document.getElementById('achievementModal');
        modal.style.display = 'none';
    }
});

// Add helpful tooltips
function addTooltips() {
    const codeEditors = document.querySelectorAll('.code-editor textarea');
    codeEditors.forEach(editor => {
        editor.title = "Tip: Press Ctrl+Enter to run your code!";
    });
    
    const runButtons = document.querySelectorAll('.run-btn');
    runButtons.forEach(button => {
        button.title = "Click to see your CSS code in action!";
    });
}

// Initialize tooltips when DOM is ready
document.addEventListener('DOMContentLoaded', addTooltips);