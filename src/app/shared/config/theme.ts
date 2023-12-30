/* istanbul ignore file */
export interface Theme {
  name: string;
  properties: any;
}

export const primary: Theme = {
  name: 'primary',
  properties: {
    '--color-white': '#ffffff',
    '--color-primary': '#92ddf6',
    '--color-light-primary': '#c9e9e9',
    '--color-text-primary': '#003a60',
    '--color-secondary': '#4cb6b6',
    '--color-text-secondary': '#fff',
    '--color-button': '#ea2353',
    '--color-stroke': '#bfecfb',
    '--color-primary-shade1': '#ddf3ff',
    '--color-primary-shade2': '#f7fcff',
    '--color-primary-shade3': '#f9feff',
  },
};
