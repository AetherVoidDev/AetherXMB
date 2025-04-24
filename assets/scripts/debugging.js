(() => {
  const triggerKey = 'd';
  let popupVisible = false;
  let secondPopupVisible = false;

  let popup = null;
  let secondPopup = null;

  function createPopup() {
    if (popupVisible) {
      closePopup();
      return;
    }

    if (document.getElementById('custom-popup')) return;

    popup = document.createElement('div');
    popup.id = 'custom-popup';
    popup.innerHTML = `
      <p style="font-weight: bold;">DEBUG INFORMATION:</p>
      <p>HostName: 0.0.0.0</p>
      <p>Connected from: 0.0.0.0</p>
    `;

    Object.assign(popup.style, {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: '#1a1a1a',
      color: 'white',
      borderRadius: '8px',
      padding: '12px 16px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
      fontFamily: 'Segoe UI, sans-serif',
      zIndex: '9999',
      maxWidth: '250px',
      animation: 'fadeSlideIn 0.4s ease-out'
    });

    Array.from(popup.children).forEach(p => {
      p.style.margin = '4px 0';
      p.style.textAlign = 'left';
    });

    document.body.appendChild(popup);

    popupVisible = true;

    createSecondPopup();
  }

  function createSecondPopup() {
    if (secondPopupVisible) return;

    secondPopup = document.createElement('div');
    secondPopup.id = 'second-popup';
    secondPopup.innerHTML = `
      <p style="font-weight: bold;">SYSTEM STATUS:</p>
      <p id="temperature-line">Temperature: 45°C</p>
      <p>System Status: OK</p>
      <p>Network: Stable</p>
      <p>Power: Active</p>
    `;

    Object.assign(secondPopup.style, {
      position: 'fixed',
      bottom: '120px',
      right: '20px',
      backgroundColor: '#1a1a1a',
      color: 'white',
      borderRadius: '8px',
      padding: '12px 16px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
      fontFamily: 'Segoe UI, sans-serif',
      zIndex: '9998',
      maxWidth: '250px',
      animation: 'fadeSlideIn 0.4s ease-out'
    });

    Array.from(secondPopup.children).forEach(p => {
      p.style.margin = '4px 0';
      p.style.textAlign = 'left';
    });

    document.body.appendChild(secondPopup);

    secondPopupVisible = true;

    updateTemperature();
  }

  function updateTemperature() {
    const tempLine = document.getElementById('temperature-line');
    setInterval(() => {
      const newTemp = Math.floor(Math.random() * (62 - 45 + 1)) + 45;
      tempLine.textContent = `Temperature: ${newTemp}°C`;
    }, 2000);
  }

  function closePopup() {
    if (!popup) return;

    popup.style.animation = 'fadeSlideOut 0.4s ease-in';
    popup.addEventListener('animationend', () => {
      popup.remove();
      popupVisible = false;
      popup = null;
    });
  }

  function closeSecondPopup() {
    if (!secondPopup) return;

    secondPopup.style.animation = 'fadeSlideOut 0.4s ease-in';
    secondPopup.addEventListener('animationend', () => {
      secondPopup.remove();
      secondPopupVisible = false;
      secondPopup = null;
    });
  }

  function injectPopupStyles() {
    if (document.getElementById('popup-style')) return;

    const style = document.createElement('style');
    style.id = 'popup-style';
    style.textContent = `
      @keyframes fadeSlideIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes fadeSlideOut {
        from {
          opacity: 1;
          transform: translateY(0);
        }
        to {
          opacity: 0;
          transform: translateY(20px);
        }
      }
    `;
    document.head.appendChild(style);
  }

  document.addEventListener('DOMContentLoaded', () => {
    injectPopupStyles();

    document.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === triggerKey.toLowerCase()) {
        createPopup();
      }
    });
  });
})();