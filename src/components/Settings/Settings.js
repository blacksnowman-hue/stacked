import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { ReactComponent as SettingsIcon } from '../../images/settings.svg';
import { resetButtonStyles } from '../../tools/stylesToolkit';
import { ModalDefault } from '../ModalDefault';
import './Settings.css';
import { ServiceWorkerUpdateChecker } from '../ServiceWorkerUpdateChecker';

function Settings({ className }) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      {isOpened ? (
        <SettingsModal setIsOpened={setIsOpened} />
      ) : (
        <SettingsOpenButton
          className={className}
          onClick={() => {
            setIsOpened(true);
          }}
        />
      )}
    </>
  );
}

function SettingsModal({ setIsOpened }) {
  return (
    <ModalDefault setIsOpened={setIsOpened}>
      <p style={{ margin: 0 }}>
        <span
          style={{
            background: '#c8c8c8',
            color: '#000',
            padding: '0.05rem 0.2rem',
            borderRadius: '0.4rem',
          }}
        >
          Development Build
        </span>
      </p>
      <ServiceWorkerUpdateChecker />
    </ModalDefault>
  );
}

function SettingsOpenButton({ className, onClick }) {
  const { theme } = useTheme();

  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      style={{
        ...resetButtonStyles,
        position: 'fixed',
        fontSize: 0,
        bottom: '4.8rem',
        right: '1.9rem',
      }}
    >
      {/* <SettingsIcon
        className="settings-button"
        height={45}
        width={45}
        style={{ '--theme-light-elements': theme.lightElements, cursor: 'pointer' }}
      /> */}
    </button>
  );
}

export { Settings, SettingsModal, SettingsOpenButton };