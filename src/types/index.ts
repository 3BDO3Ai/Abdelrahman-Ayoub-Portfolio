export interface Theme {
  name: string;
  background: string;
  backgroundSecondary: string;
  text: string;
  primary: string;
  secondary: string;
  accent: string;
}

export type ThemeName = 'dark' | 'light';