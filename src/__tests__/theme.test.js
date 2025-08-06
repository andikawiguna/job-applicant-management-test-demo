import { createAppTheme } from '../theme/theme';

describe('Theme', () => {
  test('creates light theme correctly', () => {
    const lightTheme = createAppTheme('light');

    expect(lightTheme.palette.mode).toBe('light');
    expect(lightTheme.palette.background.default).toBe('#f8fafc');
    expect(lightTheme.palette.background.paper).toBe('#ffffff');
    expect(lightTheme.palette.text.primary).toBe('#1e293b');
  });

  test('creates dark theme correctly', () => {
    const darkTheme = createAppTheme('dark');

    expect(darkTheme.palette.mode).toBe('dark');
    expect(darkTheme.palette.background.default).toBe('#121212');
    expect(darkTheme.palette.background.paper).toBe('#1e1e1e');
    expect(darkTheme.palette.text.primary).toBe('#ffffff');
  });

  test('has consistent primary colors across themes', () => {
    const lightTheme = createAppTheme('light');
    const darkTheme = createAppTheme('dark');

    expect(lightTheme.palette.primary.main).toBe(darkTheme.palette.primary.main);
    expect(lightTheme.palette.secondary.main).toBe(darkTheme.palette.secondary.main);
  });

  test('has proper typography configuration', () => {
    const theme = createAppTheme('light');

    expect(theme.typography.fontFamily).toContain('Inter');
    expect(theme.typography.h4.fontWeight).toBe(600);
    expect(theme.typography.button.textTransform).toBe('none');
  });
});