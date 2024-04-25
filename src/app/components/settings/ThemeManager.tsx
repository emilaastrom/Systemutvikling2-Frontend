class ThemeManager {
    private static currentTheme: 'dark' | 'light' = 'light';
    private static isAuto: boolean = false;
  
    // Getter for the current theme
    static getCurrentTheme(): 'dark' | 'light' {
      return ThemeManager.currentTheme;
    }
  
    // Setter for changing theme
    static setTheme(newTheme: 'dark' | 'light' | 'auto') {
      if (newTheme === 'auto') {
        // Enable auto mode and listen to system changes
        ThemeManager.isAuto = true;
        ThemeManager.handleSystemChange();
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ThemeManager.handleSystemChange);
      } else {
        // Disable auto mode and remove the event listener if necessary
        if (ThemeManager.isAuto) {
          window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', ThemeManager.handleSystemChange);
          ThemeManager.isAuto = false;
        }
        ThemeManager.updateTheme(newTheme);
      }
    }
  
    private static handleSystemChange(e?: MediaQueryListEvent) {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      ThemeManager.updateTheme(systemPrefersDark ? 'dark' : 'light');
    }
  
    private static updateTheme(newTheme: 'dark' | 'light') {
      ThemeManager.currentTheme = newTheme;
      const classList = document.documentElement.classList;
      if (newTheme === 'dark') {
        classList.add('dark');
      } else {
        classList.remove('dark');
      }
      localStorage.setItem('theme', newTheme);
    }
  
    static initialize() {
      const storedTheme = localStorage.getItem('theme') || 'auto';
      ThemeManager.setTheme(storedTheme as 'dark' | 'light' | 'auto');
    }
  }
  
  export default ThemeManager;
  