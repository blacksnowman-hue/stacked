import { createTheme } from '../utils';

export const themeStack = createTheme({
  name: 'Stack',
  background: () => '#000',
  lightElements: '#fff',
  tile: (index) => getBaseTileColor((index + 1) * 5),
});

function getBaseTileColor(hue) {
  return `hsl(${hue}, 50%, 50%)`;
}
