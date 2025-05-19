import './Greeting.css';

import { useMemo, useState } from 'react';

import packageJson from '../../../package.json';
import { tapOrClickBefore } from '../../shared/texts';
import { repoUrl } from '../../shared/metaInfo';
import { useTheme } from '../../contexts/ThemeContext';
import { HowToPlay } from '../HowToPlay';
import { Settings } from '../Settings/Settings';
import { useIsFirstVisitInSession } from '../../features/firstVisitInSession';

export const sharedStyleProps = {
  textAlign: 'center',
  width: '100%',
  fontWeight: 100,
  letterSpacing: 0.3,
  textTransform: 'uppercase',
  position: 'fixed',
};

export function Greeting({ index, isStarted }) {
  const { theme } = useTheme();
  const [shouldDisplay, setShouldDisplay] = useState(true);

  if (!isStarted && !shouldDisplay) {
    setShouldDisplay(true);
  }
  if (!shouldDisplay) return null;
  if (index > 2) return null;

  if (isStarted || index) {
    if (shouldDisplay) {
      setTimeout(() => {
        setShouldDisplay(false);
      }, 500);
    }
  }

  const headingTop = 7.27;
  const headingSize = 4.66;

  const fadeOutClassName = isStarted || index ? 'fadeOut' : null;
  const className = ['greeting', fadeOutClassName].filter(Boolean).join(' ');

  return (
    <>
      <GreetingTitle
        fadeOutClassName={fadeOutClassName}
        headingSize={headingSize}
        headingTop={headingTop}
      />
      <div
        className={className}
        style={{
          ...sharedStyleProps,
          color: theme.lightElements,
          animationDelay: '0.2s',
          animationDuration: '0.25s',
          fontSize: '1.56rem',
          top: `${headingTop + headingSize + 1.62}rem`,
          letterSpacing: -0.15,
          pointerEvents: 'none',
        }}
      >
        {tapOrClickBefore} to start
      </div>
      {/* <HowToPlay className={className} />
      <GreetingLinks className={className} />
      <Settings className={className} /> */}
    </>
  );
}

function GreetingTitle({ fadeOutClassName, headingSize, headingTop }) {
  const { theme } = useTheme();
  const { isFirstVisitInSession } = useIsFirstVisitInSession();

  const title = 'stack';
  const slowDown = isFirstVisitInSession;

  return (
    <div
      className={['greetingTitleContainer', fadeOutClassName].filter(Boolean).join(' ')}
      style={{
        ...sharedStyleProps,
        width: undefined,
        left: '50%',
        transform: 'translateX(-50%)',
        color: theme.lightElements,
        fontSize: `${headingSize}rem`,
        top: `${headingTop}rem`,
        '--animationDuration': slowDown ? '4s' : undefined,
        pointerEvents: 'none',
      }}
    >
      <p>{title}</p>
      <span data-text={title}></span>
      <span data-text={title}></span>
    </div>
  );
}

const isOnSubDomain = true;

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

function GreetingLinks({ className }) {
  const { theme } = useTheme();

  const authorUrl = useMemo(() => {
    if (!isOnSubDomain) return new URL(new URL(packageJson.homepage).origin);

    const theUrl = new URL(packageJson.homepage);
    const separator = '.';
    const hostnameSplitByDot = theUrl.hostname.split(separator);
    hostnameSplitByDot.shift();
    theUrl.hostname = hostnameSplitByDot.join(separator);
    return theUrl;
  }, []);

  const repoDomainWithoutLevelOne = useMemo(() => getDomainWithoutLevel(repoUrl), []);

  const openInNewTabProps = {
    target: '_blank',
    rel: 'noreferrer',
  };

  return (
    <div
      className={className + ' links'}
      style={{
        ...sharedStyleProps,
        color: theme.lightElements,
        fontWeight: 300,
        letterSpacing: 0.5,
        textTransform: 'none',
        fontSize: '0.8rem',
        right: '1rem',
        bottom: '1rem',
        textAlign: 'right',
        zIndex: 1,
      }}
    >
      <a href={repoUrl.href} {...(isLocalhost ? openInNewTabProps : undefined)}>
        {repoDomainWithoutLevelOne}
      </a>{' '}
      /{' '}
      <a href={authorUrl.href} {...openInNewTabProps}>
        {authorUrl.hostname}
      </a>
    </div>
  );
}

function getDomainWithoutLevel(url, stripLevel = 1) {
  return (url instanceof URL ? url.hostname : url).split('.').slice(0, -stripLevel).join('.');
}

export default Greeting;