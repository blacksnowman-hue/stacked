import { useDocumentTitle } from 'usehooks-ts';

import { ThemeInitializer } from './contexts/ThemeContext';
import { getNonProductionDocumentTitle } from './shared/documentTitle';
import { Games } from './components/Game';



function Stacker() {
  const isNotProduction = process.env.NODE_ENV !== 'production';

  if (isNotProduction) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useDocumentTitle(getNonProductionDocumentTitle());
  }

  return (
    <>
      {/* {isNotProduction && <DevOnlyFeatures />} */}
      <ThemeInitializer>
        <Games/>
      </ThemeInitializer>
    </>
  );
}

// Commented out DevOnlyFeatures for future use
// function DevOnlyFeatures() {
//   useEventListener('keydown', (event) => {
//     if (
//       event.code === 'KeyA' &&
//       !(event.metaKey || event.ctrlKey || event.altKey || event.shiftKey)
//     ) {
//       console.log('Autoplay toggled (placeholder)');
//     }
//   });
//
//   return null;
// }

export default Stacker;