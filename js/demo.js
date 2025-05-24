// Demo functionality
let processingInterval;

function startProcessing() {
    const dataSquares = document.querySelectorAll('.data-square');
    const processingEngine = document.getElementById('processingEngine');
    
    processingInterval = setInterval(() => {
        // Pick a random data square
        const randomSquare = dataSquares[Math.floor(Math.random() * dataSquares.length)];
        const rect = randomSquare.getBoundingClientRect();
        const engineRect = processingEngine.getBoundingClientRect();
        
        // Create flowing data particle
        const particle = document.createElement('div');
        particle.className = 'flowing-data';
        particle.style.background = getComputedStyle(randomSquare).background;
        particle.style.left = rect.left + 'px';
        particle.style.top = rect.top + 'px';
        particle.style.position = 'fixed';
        
        document.body.appendChild(particle);
        
        // Animate particle to processing engine
        setTimeout(() => {
            particle.style.left = engineRect.left + engineRect.width/2 + 'px';
            particle.style.top = engineRect.top + engineRect.height/2 + 'px';
        }, 50);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 2000);
        
        // Flash processing engine
        processingEngine.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.8)';
        setTimeout(() => {
            processingEngine.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
        }, 300);
        
        // Flash output items
        setTimeout(() => {
            document.querySelectorAll('.output-item').forEach(item => {
                item.style.transform = 'scale(1.1)';
                item.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.4)';
                setTimeout(() => {
                    item.style.transform = 'scale(1)';
                    item.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                }, 300);
            });
        }, 1000);
        
    }, 1800);
}

// Add click interactions to data squares
function initializeDataSquares() {
    document.querySelectorAll('.data-square').forEach(square => {
        square.addEventListener('click', function() {
            // Scale and rotate animation
            this.style.transform = 'scale(1.3) rotate(15deg)';
            this.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.4)';
            
            // Create immediate particle flow
            triggerParticleFlow(this);
            
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
                this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
            }, 400);
        });
    });
}

// Add hover effects to output items
function initializeOutputItems() {
    document.querySelectorAll('.output-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        });
    });
}

// Trigger particle flow from specific square
function triggerParticleFlow(square) {
    const processingEngine = document.getElementById('processingEngine');
    const rect = square.getBoundingClientRect();
    const engineRect = processingEngine.getBoundingClientRect();
    
    // Create flowing data particle
    const particle = document.createElement('div');
    particle.className = 'flowing-data';
    particle.style.background = getComputedStyle(square).background;
    particle.style.left = rect.left + 'px';
    particle.style.top = rect.top + 'px';
    particle.style.position = 'fixed';
    particle.style.zIndex = '1000';
    
    document.body.appendChild(particle);
    
    // Animate particle to processing engine
    setTimeout(() => {
        particle.style.left = engineRect.left + engineRect.width/2 + 'px';
        particle.style.top = engineRect.top + engineRect.height/2 + 'px';
    }, 50);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 2000);
    
    // Flash processing engine
    processingEngine.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.8)';
    processingEngine.style.transform = 'scale(1.05)';
    setTimeout(() => {
        processingEngine.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
        processingEngine.style.transform = 'scale(1)';
    }, 300);
    
    // Flash output items after delay
    setTimeout(() => {
        document.querySelectorAll('.output-item').forEach(item => {
            item.style.transform = 'scale(1.15)';
            item.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.4)';
            setTimeout(() => {
                item.style.transform = 'scale(1)';
                item.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
            }, 300);
        });
    }, 800);
}

// Initialize demo when page loads
function initializeDemo() {
    // Initialize interactive elements
    initializeDataSquares();
    initializeOutputItems();
    
    // Start automatic processing after a delay
    setTimeout(() => {
        startProcessing();
    }, 1500);
}

// Clean up function for page unload
function cleanupDemo() {
    if (processingInterval) {
        clearInterval(processingInterval);
    }
    
    // Remove any existing particles
    document.querySelectorAll('.flowing-data').forEach(particle => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    });
}

// Start demo when page loads
document.addEventListener('DOMContentLoaded', initializeDemo);

// Cleanup when page unloads
window.addEventListener('beforeunload', cleanupDemo);

// Handle visibility change (pause when tab is not active)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        if (processingInterval) {
            clearInterval(processingInterval);
        }
    } else {
        // Restart processing when tab becomes active again
        setTimeout(() => {
            startProcessing();
        }, 1000);
    }
});