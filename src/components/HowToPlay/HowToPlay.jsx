import { useCallback, useEffect, useState } from 'react';

import { ModalDefault } from '../ModalDefault';

import './HowToPlay.css';

export function HowToPlay({ isOpen, onClose }) {
  const [animation, setAnimation] = useState('');
  const [zeroPointY, setZeroPointY] = useState(0);
  const [mainTileY, setMainTileY] = useState(0);
  const [mainTileWidth, setMainTileWidth] = useState(0);
  const [mainTileHeight, setMainTileHeight] = useState(0);
  const [slideNumber, setSlideNumber] = useState(0);

  const resetAnimation = useCallback(() => {
    setAnimation('');
    setZeroPointY(0);
    setMainTileY(0);
    setMainTileWidth(0);
    setMainTileHeight(0);
    setSlideNumber(0);
  }, []);

  const startAuto = () => {
    setAnimation('main-animation');
  };

  const stopAuto = () => {
    resetAnimation();
  };

  useEffect(() => {
    resetAnimation();

    if (isOpen) {
      const timeout = setTimeout(() => {
        startAuto();
      }, 200);

      return () => clearTimeout(timeout);
    }
  }, [isOpen, resetAnimation]);

  return (
    <ModalDefault
      isOpen={isOpen}
      onClose={onClose}
      showClose
      className="how-to-play-modal"
      sizeClass="modal-size-big"
    >
      <div className="How-to-play">
        <div className="how-to-play-header">
          <h1 className="how-to-play-heading">How to play</h1>
        </div>
        <div className="how-to-play-box" onClick={animation ? stopAuto : startAuto}>
          <div className="how-to-play-canvas">
            <div className="how-to-play-scene">
              <div className={`plane ${animation}`} />
              <div
                className={`main-tile ${animation}`}
                style={{
                  '--zero-point-y': `${zeroPointY}px`,
                  '--main-tile-y': `${mainTileY}px`,
                  '--main-tile-width': `${mainTileWidth}px`,
                  '--main-tile-height': `${mainTileHeight}px`,
                }}
                onAnimationIteration={(e) => {
                  if (e.animationName !== 'main-tile-animation') return;

                  setSlideNumber((n) => (n + 1) % 7);
                }}
              />
              <div className={`active-tile ${animation}`} />
              <div className={`corner ${animation}`} />
              <div className={`exploded-corner ${animation}`} />
              <div className={`perfect ${animation}`} />
            </div>
          </div>
          <div className="how-to-play-explanation">
            <div className={`how-to-play-explanation-text-container ${animation}`}>
              <div className="how-to-play-explanation-slide">
                <h2>Welcome!</h2>
                <p>
                  Tap or click anywhere to place the moving block on top of the base. Try to align
                  it as perfectly as possible.
                </p>
              </div>
              <div className="how-to-play-explanation-slide">
                <h2>Not perfect...</h2>
                <p>
                  When the blocks aren't perfectly aligned, the excess portion will fall off. Your
                  next block will have this reduced size.
                </p>
              </div>
              <div className="how-to-play-explanation-slide">
                <h2>Make a comeback</h2>
                <p>
                  After each mistake, you'll have to work with a smaller block. Try to get back to a
                  larger size by placing blocks perfectly.
                </p>
              </div>
              <div className="how-to-play-explanation-slide">
                <h2>Perfect!</h2>
                <p>
                  When you place a block with perfect alignment, you'll see a special effect. Nice
                  job!
                </p>
              </div>
              <div className="how-to-play-explanation-slide">
                <h2>Combo streaks</h2>
                <p>
                  Get a combo by placing multiple perfect blocks in a row. For each combo, your
                  block will grow larger, up to its original size.
                </p>
              </div>
              <div className="how-to-play-explanation-slide">
                <h2>Game over</h2>
                <p>
                  If you miss the block completely or the block size reaches zero in any direction,
                  the game is over.
                </p>
              </div>
              <div className="how-to-play-explanation-slide">
                <h2>Challenge yourself</h2>
                <p>
                  The block moves faster as you progress. How high can you stack? Try to beat your
                  high score!
                </p>
                <p>Click to watch the animation again</p>
              </div>
            </div>
            <div className="how-to-play-explanation-slide-counter">
              <div className={`how-to-play-explanation-slide-counter-inner ${animation}`}>
                {slideNumber + 1}/7
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalDefault>
  );
} 