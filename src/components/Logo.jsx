import { useConfig } from '../shared/hooks';

export function Logo({ className = '', isLogoLink = false, testid, ...wrapperProps }) {
  const config = useConfig();

  const logo = (
    <div className={`logo ${className}`} data-testid={testid}>
      <h1 className="logo-title">STACK</h1>
      <span className="logo-version">{config.version}</span>
    </div>
  );

  if (isLogoLink) {
    return (
      <a
        href={config.routes.HOME}
        className={`logo-wrapper ${className}`}
        aria-label="Go to home page"
        {...wrapperProps}
      >
        {logo}
      </a>
    );
  }

  return (
    <div className={`logo-wrapper ${className}`} {...wrapperProps}>
      {logo}
    </div>
  );
} 