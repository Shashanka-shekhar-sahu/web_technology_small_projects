const toggleBtn = document.getElementById('modeToggle');
    const brightnessRange = document.getElementById('brightnessRange');
    const contrastRange = document.getElementById('contrastRange');

    let isDark = false;

    toggleBtn.addEventListener('click', () => {
      isDark = !isDark;
      document.documentElement.style.setProperty('--bg-color', isDark ? '#121212' : '#ffffff');
      document.documentElement.style.setProperty('--text-color', isDark ? '#f1f1f1' : '#000000');
    });

    brightnessRange.addEventListener('input', () => {
      const value = brightnessRange.value + '%';
      document.documentElement.style.setProperty('--brightness', value);
    });

    contrastRange.addEventListener('input', () => {
      const value = contrastRange.value + '%';
      document.documentElement.style.setProperty('--contrast', value);
    });