// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations and effects
    initGlitchEffects();
    initScrollAnimations();
    initCTAButton();
    initFloatingEmojis();
    initAudioTeaser();
    initSocialPosts();
    
    // Add a class to the body after a delay to trigger fade-in animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});

// Glitch text effects
function initGlitchEffects() {
    const glitchTexts = document.querySelectorAll('.glitch-text');
    
    glitchTexts.forEach(text => {
        // Randomly trigger additional glitch effect
        setInterval(() => {
            text.classList.add('extra-glitch');
            setTimeout(() => {
                text.classList.remove('extra-glitch');
            }, 200);
        }, Math.random() * 5000 + 3000);
    });
}

// Scroll-based animations
function initScrollAnimations() {
    // Get all sections for scroll animations
    const sections = document.querySelectorAll('section');
    
    // Create an Intersection Observer with improved threshold for smoother transitions
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Add 'in-view' class when section is visible
            if (entry.isIntersecting) {
                // Add a small delay for a smoother entrance effect
                setTimeout(() => {
                    entry.target.classList.add('in-view');
                    
                    // Trigger typing indicators when in view
                    if (entry.target.querySelector('.typing-indicator')) {
                        const indicators = entry.target.querySelectorAll('.typing-indicator');
                        indicators.forEach((indicator, index) => {
                            setTimeout(() => {
                                indicator.classList.add('typing');
                            }, index * 1000);
                        });
                    }
                }, 150);
            }
        });
    }, {
        threshold: 0.15, // Slightly higher threshold for smoother transitions
        rootMargin: "0px 0px -10% 0px" // Trigger slightly before the element is fully in view
    });
    
    // Observe each section
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add scroll event for parallax effects with smoother transitions
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        // Smoother parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            // Use requestAnimationFrame for smoother animation
            requestAnimationFrame(() => {
                hero.style.backgroundPositionY = scrollPosition * 0.3 + 'px'; // Reduced multiplier for smoother effect
            });
        }
        
        // Smoother parallax effect for CTA section
        const cta = document.querySelector('.cta');
        if (cta) {
            requestAnimationFrame(() => {
                cta.style.backgroundPositionY = (scrollPosition - cta.offsetTop) * 0.15 + 'px'; // Reduced multiplier
            });
        }
        
        // Create crumbling effect as user scrolls, but less frequently for smoother experience
        if (Math.random() > 0.995) { // Reduced frequency
            createCrumblingEffect(scrollPosition);
        }
    }, { passive: true }); // Add passive flag for better performance
}

// Create visual "crumbling" effect as the user scrolls
function createCrumblingEffect(scrollPosition) {
    // Add glitching elements randomly as user scrolls
    if (Math.random() > 0.99) {
        const glitch = document.createElement('div');
        glitch.classList.add('random-glitch');
        glitch.style.top = Math.random() * 100 + 'vh';
        glitch.style.left = Math.random() * 100 + 'vw';
        glitch.style.width = Math.random() * 100 + 50 + 'px';
        glitch.style.height = Math.random() * 5 + 2 + 'px';
        
        document.body.appendChild(glitch);
        
        // Remove after animation completes
        setTimeout(() => {
            glitch.remove();
        }, 1000);
    }
}

// CTA Button interactions
function initCTAButton() {
    const ctaButton = document.getElementById('cta-button');
    const franticMessages = document.getElementById('frantic-messages');
    
    if (ctaButton && franticMessages) {
        // Add pulsing animation to make button more clickable
        ctaButton.classList.add('pulse-animation');
        
        // Position and show frantic messages immediately on page load
        const messages = franticMessages.querySelectorAll('.message');
        messages.forEach((message, index) => {
            // Position messages randomly around the button
            const angle = (index / messages.length) * Math.PI * 2;
            const distance = 80 + Math.random() * 40;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            message.style.transform = `translate(${x}px, ${y}px)`;
            
            // Fade in with delay
            setTimeout(() => {
                message.style.opacity = '0.7'; // Start with partial opacity
            }, index * 200);
        });
        
        // Enhance hover effect
        ctaButton.addEventListener('mouseenter', () => {
            // Increase opacity and animation intensity on hover
            messages.forEach(message => {
                message.style.opacity = '1';
                message.style.animationDuration = '3s'; // Faster animation
            });
            
            // Add glow effect on hover
            ctaButton.classList.add('hover-glow');
        });
        
        // Restore normal state on mouse leave
        ctaButton.addEventListener('mouseleave', () => {
            // Return to partial opacity
            messages.forEach(message => {
                message.style.opacity = '0.7';
                message.style.animationDuration = '5s'; // Normal animation speed
            });
            
            // Remove glow effect
            ctaButton.classList.remove('hover-glow');
        });
        
        // Button click effect
        ctaButton.addEventListener('click', () => {
            // Add shake effect
            ctaButton.classList.add('shake');
            
            // Show frantic messages on click too
            franticMessages.style.display = 'block';
            
            // Create explosion effect
            createExplosionEffect(ctaButton);
            
            // Animate each message with dispersion effect
            const messages = franticMessages.querySelectorAll('.message');
            messages.forEach((message, index) => {
                // Calculate random direction for dispersion
                const randomAngle = Math.random() * Math.PI * 2;
                const randomDistance = 300 + Math.random() * 200; // Larger distance for dispersion
                const randomX = Math.cos(randomAngle) * randomDistance;
                const randomY = Math.sin(randomAngle) * randomDistance;
                
                // Random rotation for more chaotic effect
                const randomRotation = (Math.random() - 0.5) * 60;
                
                // Apply dispersion with varying speeds
                const speed = 0.5 + Math.random() * 0.5;
                message.style.transition = `transform ${speed}s cubic-bezier(0.165, 0.84, 0.44, 1), opacity ${speed}s ease`;
                message.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg)`;
                
                // Fade in briefly then out with delay
                setTimeout(() => {
                    message.style.opacity = '1';
                    
                    // Fade out after brief appearance
                    setTimeout(() => {
                        message.style.opacity = '0';
                    }, 300 + Math.random() * 200);
                }, index * 50); // Shorter delay for more immediate reaction
            });
            
            // Show typing indicator
            const finalTyping = document.querySelector('.final-typing');
            if (finalTyping) {
                finalTyping.classList.add('active');
                
                // Hide typing after a few seconds
                setTimeout(() => {
                    finalTyping.classList.remove('active');
                }, 3000);
            }
            
            // Remove shake after animation completes
            setTimeout(() => {
                ctaButton.classList.remove('shake');
            }, 500);
            
            // Reset messages after animation completes
            setTimeout(() => {
                // Hide container after animation
                franticMessages.style.display = 'none';
                
                // Reset message positions for next interaction
                setTimeout(() => {
                    messages.forEach((message, index) => {
                        const angle = (index / messages.length) * Math.PI * 2;
                        const distance = 80 + Math.random() * 40;
                        const x = Math.cos(angle) * distance;
                        const y = Math.sin(angle) * distance;
                        
                        message.style.transition = 'none';
                        message.style.transform = `translate(${x}px, ${y}px)`;
                        message.style.opacity = '0';
                        
                        // Reset transition after position is set
                        setTimeout(() => {
                            message.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
                        }, 50);
                    });
                    
                    // Show messages again
                    franticMessages.style.display = 'block';
                    
                    // Fade messages back in with delay
                    messages.forEach((message, index) => {
                        setTimeout(() => {
                            message.style.opacity = '0.7';
                        }, index * 200 + 100);
                    });
                }, 1000);
            }, 2000);
        });
    }
}

// Create explosion particle effect
function createExplosionEffect(button) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('explosion-particle');
        
        // Random position, size and color
        const size = Math.random() * 8 + 4;
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 50;
        const duration = Math.random() * 0.6 + 0.4;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        particle.style.backgroundColor = `hsl(${Math.random() * 20 + 350}, 100%, 50%)`;
        particle.style.boxShadow = `0 0 ${size}px hsl(${Math.random() * 20 + 350}, 100%, 50%)`;
        particle.style.animation = `explode ${duration}s forwards cubic-bezier(0.165, 0.84, 0.44, 1)`;
        
        // Set final position for animation
        particle.style.setProperty('--end-x', `${Math.cos(angle) * distance}px`);
        particle.style.setProperty('--end-y', `${Math.sin(angle) * distance}px`);
        
        document.body.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }
}

// Floating emoji animations
function initFloatingEmojis() {
    const emojis = document.querySelectorAll('.emoji');
    
    // Set random positions and delays for emojis
    emojis.forEach(emoji => {
        // Random starting position
        emoji.style.left = Math.random() * 100 + 'vw';
        
        // Random animation duration
        const duration = Math.random() * 10 + 15;
        emoji.style.animationDuration = duration + 's';
        
        // Random delay
        const delay = Math.random() * 10;
        emoji.style.animationDelay = delay + 's';
        
        // Randomly show emojis
        setInterval(() => {
            if (Math.random() > 0.7) {
                emoji.style.opacity = '0.2';
                
                // Hide after a few seconds
                setTimeout(() => {
                    emoji.style.opacity = '0';
                }, Math.random() * 3000 + 1000);
            }
        }, Math.random() * 10000 + 5000);
    });
}

// Audio Teaser section initialization
function initAudioTeaser() {
    const audioPlayer = document.querySelector('.audio-player audio');
    const audioComponents = document.querySelectorAll('.component');
    const prompts = document.querySelectorAll('.prompt');
    
    if (audioPlayer) {
        // Add glitch effect when audio plays
        audioPlayer.addEventListener('play', () => {
            const glitchEffect = document.querySelector('.audio-glitch-effect');
            if (glitchEffect) {
                glitchEffect.style.opacity = '0.8';
                glitchEffect.style.animationDuration = '0.5s';
            }
            
            // Add subtle animation to prompts when audio plays
            prompts.forEach(prompt => {
                prompt.classList.add('active-prompt');
            });
        });
        
        // Reset effects when audio pauses
        audioPlayer.addEventListener('pause', () => {
            const glitchEffect = document.querySelector('.audio-glitch-effect');
            if (glitchEffect) {
                glitchEffect.style.opacity = '0.5';
                glitchEffect.style.animationDuration = '2s';
            }
            
            // Remove animations from prompts
            prompts.forEach(prompt => {
                prompt.classList.remove('active-prompt');
            });
        });
        
        // Add hover effects to components
        audioComponents.forEach(component => {
            component.addEventListener('mouseenter', () => {
                component.classList.add('component-hover');
            });
            
            component.addEventListener('mouseleave', () => {
                component.classList.remove('component-hover');
            });
        });
    }
}

// Add CSS class for elements that come into view during scrolling
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        // Check if element is in viewport
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('visible');
        }
    });
}

// Add some random glitching to elements
setInterval(() => {
    // Randomly select an element to glitch
    const elements = [
        '.hero h1',
        '.emergency-alert',
        '.quote',
        '.cta h2'
    ];
    
    const randomElement = elements[Math.floor(Math.random() * elements.length)];
    const element = document.querySelector(randomElement);
    
    if (element) {
        element.classList.add('glitching');
        
        setTimeout(() => {
            element.classList.remove('glitching');
        }, 200);
    }
}, 5000);

// Initialize social media posts animations and interactions
function initSocialPosts() {
    const socialPosts = document.querySelectorAll('.social-post');
    
    socialPosts.forEach(post => {
        // Add hover effect
        post.addEventListener('mouseenter', () => {
            post.style.transform = 'translateY(-5px)';
            post.style.boxShadow = '0 5px 15px rgba(255, 51, 51, 0.2)';
        });
        
        post.addEventListener('mouseleave', () => {
            post.style.transform = 'translateY(0)';
            post.style.boxShadow = 'none';
        });
        
        // Add random glitch effect
        setInterval(() => {
            if (Math.random() > 0.95) {
                post.classList.add('glitching');
                setTimeout(() => {
                    post.classList.remove('glitching');
                }, 200);
            }
        }, 5000);
        
        // Add interaction for Instagram heart icon
        const heartIcons = post.querySelectorAll('.heart-icon');
        heartIcons.forEach(icon => {
            icon.addEventListener('click', () => {
                icon.style.backgroundImage = 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ff3333"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>\')';
                icon.classList.add('liked');
                
                // Add heart animation
                const heart = document.createElement('div');
                heart.classList.add('heart-animation');
                heart.style.position = 'absolute';
                heart.style.left = '50%';
                heart.style.top = '50%';
                heart.style.transform = 'translate(-50%, -50%)';
                heart.style.color = 'var(--accent-color)';
                heart.style.fontSize = '5rem';
                heart.style.opacity = '0';
                heart.style.pointerEvents = 'none';
                heart.style.zIndex = '10';
                heart.style.animation = 'heartPop 0.8s forwards';
                heart.innerHTML = '❤️';
                
                post.querySelector('.post-image') ? post.querySelector('.post-image').appendChild(heart) : post.appendChild(heart);
                
                setTimeout(() => {
                    heart.remove();
                }, 800);
            });
        });
    });
}

// Add CSS for dynamic elements
const style = document.createElement('style');
style.textContent = `
    .random-glitch {
        position: fixed;
        background-color: rgba(255, 51, 51, 0.5);
        z-index: 999;
        pointer-events: none;
        animation: glitchFade 1s forwards;
    }
    
    @keyframes glitchFade {
        0% { opacity: 0.7; }
        50% { opacity: 0.5; }
        100% { opacity: 0; }
    }
    
    .shake {
        animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
    }
    
    @keyframes shake {
        10%, 90% { transform: translate3d(-1px, 0, 0); }
        20%, 80% { transform: translate3d(2px, 0, 0); }
        30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
        40%, 60% { transform: translate3d(4px, 0, 0); }
    }
    
    .glitching {
        animation: textGlitch 0.2s linear;
    }
    
    @keyframes textGlitch {
        0% { opacity: 1; transform: translate(0); }
        20% { opacity: 0.8; transform: translate(-5px, 2px); }
        40% { opacity: 0.9; transform: translate(5px, -2px); }
        60% { opacity: 0.6; transform: translate(-2px, 5px); }
        80% { opacity: 0.9; transform: translate(2px, -5px); }
        100% { opacity: 1; transform: translate(0); }
    }
    
    .extra-glitch {
        animation: extraGlitch 0.2s linear;
    }
    
    @keyframes extraGlitch {
        0% { transform: skew(0); }
        20% { transform: skew(10deg); }
        40% { transform: skew(-15deg); }
        60% { transform: skew(15deg); }
        80% { transform: skew(-5deg); }
        100% { transform: skew(0); }
    }
    
    .final-typing {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    .final-typing.active {
        opacity: 1;
    }
    
    section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 1s ease, transform 1s ease;
    }
    
    section.in-view {
        opacity: 1;
        transform: translateY(0);
    }
    
    @keyframes heartPop {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
        40% { transform: translate(-50%, -50%) scale(0.9); }
        60% { transform: translate(-50%, -50%) scale(1.1); }
        80% { transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5); }
    }
    
    .liked {
        animation: heartBeat 0.3s ease;
    }
    
    @keyframes heartBeat {
        0% { transform: scale(1); }
        50% { transform: scale(1.3); }
        100% { transform: scale(1); }
    }
`;

document.head.appendChild(style);
