(() => {
  const triggerKey = 'd';

  function createPopup() {
    if (document.getElementById('custom-popup')) return;

    const popup = document.createElement('div');
    popup.id = 'custom-popup';
    popup.innerHTML = `
      <p>DEBUG INFORMATION:</p>
      <p>HostName: 0.0.0.0</p>
      <p>Connected from: 0.0.0.0</p>
    `;

    Object.assign(popup.style, {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: '#1a1a1a',
      color: 'white',
      borderRadius: '10px',
      padding: '16px 20px',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
      fontFamily: 'Segoe UI, sans-serif',
      zIndex: '9999',
      maxWidth: '300px',
      animation: 'fadeSlideIn 0.4s ease-out'
    });

    Array.from(popup.children).forEach(p => {
      p.style.margin = '4px 0';
      p.style.textAlign = 'left';
    });

    document.body.appendChild(popup);

    setTimeout(() => {
      popup.style.animation = 'fadeSlideOut 0.4s ease-in';
      popup.addEventListener('animationend', () => popup.remove());
    }, 5000);
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