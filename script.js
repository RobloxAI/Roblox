document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Get DOM elements
  const startBtn = document.getElementById('start-btn');
  const heroStartBtn = document.getElementById('hero-start-btn');
  const ctaStartBtn = document.getElementById('cta-start-btn');
  const downloadModal = document.getElementById('download-modal');
  const closeModal = document.querySelector('.close-modal');
  const downloadBtn = document.getElementById('download-btn');
  const fullscreenOverlay = document.getElementById('fullscreen-overlay');
  const enterFullscreenBtn = document.getElementById('enter-fullscreen');
  const prankContainer = document.getElementById('prank-container');
  const errorMessages = document.getElementById('error-messages');
  const countdownScreen = document.getElementById('countdown-screen');
  const countdownElement = document.getElementById('countdown');
  const finalMessage = document.getElementById('final-message');
  const faqItems = document.querySelectorAll('.faq-item');

  // Initialize elements
  downloadModal.style.opacity = '0';
  downloadModal.style.visibility = 'hidden';
  fullscreenOverlay.style.opacity = '0';
  fullscreenOverlay.style.visibility = 'hidden';
  prankContainer.style.display = 'none';
  countdownScreen.style.opacity = '0';
  countdownScreen.style.visibility = 'hidden';
  finalMessage.style.opacity = '0';
  finalMessage.style.visibility = 'hidden';

  // FAQ toggle functionality
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  });

  // Open download modal
  function openDownloadModal() {
    downloadModal.classList.add('active');
    downloadModal.style.opacity = '1';
    downloadModal.style.visibility = 'visible';
    document.body.style.overflow = 'hidden';
    
    // Check if already in fullscreen
    if (!document.fullscreenElement) {
      fullscreenOverlay.classList.add('active');
      fullscreenOverlay.style.opacity = '1';
      fullscreenOverlay.style.visibility = 'visible';
    }
  }

  // Close download modal
  function closeDownloadModal() {
    downloadModal.classList.remove('active');
    downloadModal.style.opacity = '0';
    downloadModal.style.visibility = 'hidden';
    document.body.style.overflow = '';
  }

  // Event listeners for buttons
  startBtn.addEventListener('click', openDownloadModal);
  heroStartBtn.addEventListener('click', openDownloadModal);
  ctaStartBtn.addEventListener('click', openDownloadModal);
  closeModal.addEventListener('click', closeDownloadModal);

  // Enter fullscreen
  enterFullscreenBtn.addEventListener('click', () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().then(() => {
        fullscreenOverlay.classList.remove('active');
        fullscreenOverlay.style.opacity = '0';
        fullscreenOverlay.style.visibility = 'hidden';
      }).catch(err => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
      fullscreenOverlay.classList.remove('active');
      fullscreenOverlay.style.opacity = '0';
      fullscreenOverlay.style.visibility = 'hidden';
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
      fullscreenOverlay.classList.remove('active');
      fullscreenOverlay.style.opacity = '0';
      fullscreenOverlay.style.visibility = 'hidden';
    }
  });

  // Check if fullscreen is exited
  document.addEventListener('fullscreenchange', checkFullscreen);
  document.addEventListener('webkitfullscreenchange', checkFullscreen);
  document.addEventListener('mozfullscreenchange', checkFullscreen);
  document.addEventListener('MSFullscreenChange', checkFullscreen);

  function checkFullscreen() {
    if (!document.fullscreenElement && !document.webkitFullscreenElement && 
        !document.mozFullScreenElement && !document.msFullscreenElement) {
      if (downloadModal.classList.contains('active') && !prankContainer.classList.contains('active')) {
        fullscreenOverlay.classList.add('active');
        fullscreenOverlay.style.opacity = '1';
        fullscreenOverlay.style.visibility = 'visible';
      }
    }
  }

  // Enhanced error message templates - added many more
  const errorTemplates = [
    { title: "CRITICAL ERROR", message: "System32 corruption detected. Attempting recovery..." },
    { title: "WARNING", message: "Unauthorized access detected. Security protocols breached." },
    { title: "SYSTEM FAILURE", message: "Memory allocation failed. Data corruption imminent." },
    { title: "FATAL ERROR", message: "Boot sequence compromised. System integrity at risk." },
    { title: "SECURITY ALERT", message: "Malicious code detected. Firewall bypassed." },
    { title: "CONNECTION ERROR", message: "Remote server connection terminated unexpectedly." },
    { title: "DRIVER FAILURE", message: "Hardware driver malfunction. Device not responding." },
    { title: "MEMORY ERROR", message: "RAM corruption detected in sector 0x7FFF." },
    { title: "PROCESS FAILURE", message: "Critical process terminated unexpectedly." },
    { title: "NETWORK ERROR", message: "Network adapter failure. Connectivity compromised." },
    { title: "KERNEL PANIC", message: "System kernel has crashed. Reboot required immediately." },
    { title: "DISK FAILURE", message: "Hard drive sectors corrupted. Data loss imminent." },
    { title: "BIOS ERROR", message: "BIOS checksum failed. Hardware initialization error." },
    { title: "CPU OVERLOAD", message: "Processor temperature critical. Thermal shutdown imminent." },
    { title: "REGISTRY CORRUPTION", message: "Windows registry hive damaged beyond repair." },
    { title: "MALWARE DETECTED", message: "Dangerous trojan detected. System compromised." },
    { title: "RANSOMWARE ALERT", message: "Encryption of personal files in progress..." },
    { title: "BOOTLOADER FAILURE", message: "Unable to locate operating system. Boot failed." },
    { title: "HARDWARE FAILURE", message: "Critical hardware component not responding." },
    { title: "SYSTEM HIJACK", message: "Remote control of system detected. Access compromised." },
    { title: "DATA BREACH", message: "Personal information being extracted. Firewall bypassed." },
    { title: "VIRUS ALERT", message: "Dangerous virus spreading through system files." },
    { title: "POWER FAILURE", message: "Unexpected power fluctuation. Data integrity at risk." },
    { title: "GPU FAILURE", message: "Graphics processing unit has malfunctioned." },
    { title: "SYSTEM OVERHEATING", message: "Critical temperature threshold exceeded." },
    { title: "BLUE SCREEN", message: "Fatal exception 0xC000021A has occurred." },
    { title: "SYSTEM CRASH", message: "Unexpected system halt. All data may be lost." },
    { title: "MEMORY LEAK", message: "Uncontrolled memory allocation detected." },
    { title: "STACK OVERFLOW", message: "Process stack memory limit exceeded." },
    { title: "SYSTEM INSTABILITY", message: "Critical system files corrupted or missing." }
  ];

  // Create rainbow flash element with enhanced intensity
  function createRainbowFlash() {
    const rainbow = document.createElement('div');
    rainbow.className = 'rainbow-flash';
    rainbow.style.backgroundColor = getRandomColor();
    document.body.appendChild(rainbow);
    
    // Make flashes more intense
    rainbow.style.opacity = Math.random() * 0.5 + 0.5; // Between 0.5 and 1.0 opacity
    
    // Remove after a very short time for more rapid flashing
    setTimeout(() => {
      rainbow.style.opacity = '0';
      setTimeout(() => {
        rainbow.remove();
      }, 100);
    }, 50 + Math.random() * 100);
  }

  // Create strobe effect
  function createStrobeEffect() {
    const strobe = document.createElement('div');
    strobe.className = 'strobe-flash';
    strobe.style.backgroundColor = 'white';
    document.body.appendChild(strobe);
    
    strobe.style.opacity = '1';
    
    setTimeout(() => {
      strobe.style.opacity = '0';
      setTimeout(() => {
        strobe.remove();
      }, 50);
    }, 50);
  }

  // Create glitch overlay
  function createGlitchOverlay() {
    const glitch = document.createElement('div');
    glitch.className = 'glitch-overlay';
    
    // Create random glitch pattern
    const numGlitches = Math.floor(Math.random() * 5) + 3;
    for (let i = 0; i < numGlitches; i++) {
      const glitchLine = document.createElement('div');
      glitchLine.className = 'glitch-line';
      glitchLine.style.top = `${Math.random() * 100}%`;
      glitchLine.style.height = `${Math.random() * 10 + 2}px`;
      glitchLine.style.width = '100%';
      glitchLine.style.backgroundColor = getRandomColor();
      glitchLine.style.opacity = Math.random() * 0.7 + 0.3;
      glitch.appendChild(glitchLine);
    }
    
    document.body.appendChild(glitch);
    
    setTimeout(() => {
      glitch.remove();
    }, 200);
  }

  // Get random color
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Create error message with enhanced styling
  function createErrorMessage() {
    const error = document.createElement('div');
    error.className = 'error-message';
    
    // Random position
    error.style.top = `${Math.random() * 80}%`;
    error.style.left = `${Math.random() * 80}%`;
    
    // Random size for variety
    const size = Math.random() * 0.5 + 0.8; // Scale between 0.8 and 1.3
    error.style.transform = `scale(${size})`;
    
    // Random rotation for chaotic effect
    const rotation = (Math.random() - 0.5) * 10; // Between -5 and 5 degrees
    error.style.transform += ` rotate(${rotation}deg)`;
    
    // Random error template
    const template = errorTemplates[Math.floor(Math.random() * errorTemplates.length)];
    
    error.innerHTML = `
      <h3>${template.title}</h3>
      <p>${template.message}</p>
    `;
    
    // Apply glitch animation
    error.style.animation = 'glitch 0.2s infinite';
    
    errorMessages.appendChild(error);
    
    // Remove after random time
    setTimeout(() => {
      error.remove();
    }, 1000 + Math.random() * 2000);
  }

  // Create blue screen error
  function createBlueScreenError() {
    const blueScreen = document.createElement('div');
    blueScreen.className = 'blue-screen';
    blueScreen.innerHTML = `
      <div class="bsod-content">
        <h2>SYSTEM FAILURE</h2>
        <p>A problem has been detected and Windows has been shut down to prevent damage to your computer.</p>
        <p>CRITICAL_PROCESS_DIED</p>
        <p>If this is the first time you've seen this error screen, restart your computer. If this screen appears again, follow these steps:</p>
        <p>Technical information:</p>
        <p>*** STOP: 0x000000F4 (0x00000003, 0x85BF6F60, 0x85BF6FE0, 0x805D4E24)</p>
      </div>
    `;
    
    document.body.appendChild(blueScreen);
    
    setTimeout(() => {
      blueScreen.style.opacity = '0';
      setTimeout(() => {
        blueScreen.remove();
      }, 500);
    }, 800);
  }

  // Start prank sequence with enhanced effects
  function startPrankSequence() {
    // Hide download modal
    downloadModal.classList.remove('active');
    downloadModal.style.opacity = '0';
    downloadModal.style.visibility = 'hidden';
    
    // Show prank container
    prankContainer.classList.add('active');
    prankContainer.style.display = 'block';
    
    // Play initial explosion sound
    playExplosionSound();
    
    // Create initial error messages - more of them
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        createErrorMessage();
      }, i * 150);
    }
    
    // Start chaos with more intense effects
    let chaosInterval = setInterval(() => {
      // Create multiple error messages at once
      const numErrors = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < numErrors; i++) {
        createErrorMessage();
      }
      
      // More visual effects
      createRainbowFlash();
      
      // Add strobe effect occasionally
      if (Math.random() > 0.7) {
        createStrobeEffect();
      }
      
      // Add glitch overlay occasionally
      if (Math.random() > 0.6) {
        createGlitchOverlay();
      }
      
      // Add blue screen occasionally
      if (Math.random() > 0.9) {
        createBlueScreenError();
      }
      
      // Play random sound
      playRandomSound();
      
      // Shake the screen more violently
      const intensity = Math.random() * 15 + 10; // Between 10 and 25
      document.body.style.animation = `shake 0.5s ${intensity}px`;
      setTimeout(() => {
        document.body.style.animation = '';
      }, 500);
      
    }, 200); // Faster interval for more chaos
    
    // Stop chaos after 10 seconds and show countdown
    setTimeout(() => {
      clearInterval(chaosInterval);
      errorMessages.innerHTML = '';
      countdownScreen.classList.add('active');
      countdownScreen.style.opacity = '1';
      countdownScreen.style.visibility = 'visible';
      
      // Play alarm sound
      playAlarmSound();
      
      // Start countdown
      let count = 10;
      countdownElement.textContent = count;
      
      let countdownInterval = setInterval(() => {
        count--;
        countdownElement.textContent = count;
        
        // Play beep sound
        playBeepSound();
        
        // Flash the screen red
        const flash = document.createElement('div');
        flash.className = 'red-flash';
        document.body.appendChild(flash);
        
        setTimeout(() => {
          flash.remove();
        }, 500);
        
        if (count <= 0) {
          clearInterval(countdownInterval);
          
          // Final explosion sound
          playExplosionSound();
          
          // Show final message
          countdownScreen.classList.remove('active');
          countdownScreen.style.opacity = '0';
          countdownScreen.style.visibility = 'hidden';
          
          finalMessage.classList.add('active');
          finalMessage.style.opacity = '1';
          finalMessage.style.visibility = 'visible';
          
          // Play final sound
          playFinalSound();
        }
      }, 1000);
      
    }, 10000);
  }

  // Sound effects with increased volume
  function playRandomSound() {
    try {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();
      
      // Random oscillator type
      const types = ['sine', 'square', 'sawtooth', 'triangle'];
      oscillator.type = types[Math.floor(Math.random() * types.length)];
      
      // Random frequency for more chaotic sounds
      oscillator.frequency.value = Math.random() * 1000 + 200;
      
      // Louder volume
      gainNode.gain.value = 0.7; // Increased from default
      
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
      }, 100 + Math.random() * 200);
    } catch (e) {
      console.log('Audio play error:', e);
    }
  }

  function playBeepSound() {
    try {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.value = 800;
      
      // Louder volume
      gainNode.gain.value = 0.8;
      
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
      }, 200);
    } catch (e) {
      console.log('Audio play error:', e);
    }
  }

  function playAlarmSound() {
    try {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();
      
      oscillator.type = 'square';
      
      // Alarm effect with frequency modulation
      let phase = 0;
      const intervalId = setInterval(() => {
        oscillator.frequency.value = phase % 2 === 0 ? 800 : 600;
        phase++;
        
        if (phase > 10) {
          clearInterval(intervalId);
        }
      }, 300);
      
      // Louder volume
      gainNode.gain.value = 0.8;
      
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
      }, 3000);
    } catch (e) {
      console.log('Audio play error:', e);
    }
  }

  function playExplosionSound() {
    try {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();
      
      oscillator.type = 'sawtooth';
      oscillator.frequency.value = 100;
      
      // Very loud initially, then fade out
      gainNode.gain.value = 1.0; // Maximum volume
      gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 1.5);
      
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      
      // Add noise for explosion effect
      const noiseNode = context.createBufferSource();
      const bufferSize = context.sampleRate;
      const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
      const data = buffer.getChannelData(0);
      
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      noiseNode.buffer = buffer;
      const noiseGain = context.createGain();
      noiseGain.gain.value = 0.8;
      noiseGain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 1.5);
      
      noiseNode.connect(noiseGain);
      noiseGain.connect(context.destination);
      
      oscillator.start();
      noiseNode.start();
      
      setTimeout(() => {
        oscillator.stop();
        noiseNode.stop();
      }, 1500);
    } catch (e) {
      console.log('Audio play error:', e);
    }
  }

  function playFinalSound() {
    try {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();
      
      oscillator.type = 'sawtooth';
      oscillator.frequency.value = 150;
      
      // Louder volume
      gainNode.gain.value = 0.9;
      
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      
      oscillator.start();
      
      // Frequency drop effect
      let freq = 150;
      const freqInterval = setInterval(() => {
        freq -= 10;
        oscillator.frequency.value = freq;
        if (freq <= 30) {
          clearInterval(freqInterval);
          setTimeout(() => {
            oscillator.stop();
          }, 500);
        }
      }, 100);
    } catch (e) {
      console.log('Audio play error:', e);
    }
  }

  // Download button starts the prank
  downloadBtn.addEventListener('click', startPrankSequence);
  
  // Log to confirm script is loaded
  console.log('Script loaded successfully');
}); 