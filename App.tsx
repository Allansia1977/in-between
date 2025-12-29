
import React, { useState } from 'react';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';
import { audio } from './utils/audio';

enum Screen {
  START,
  GAME
}

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.START);
  const [deckCount, setDeckCount] = useState<number>(1);

  const handleStartGame = (decks: number) => {
    setDeckCount(decks);
    audio.init();
    setCurrentScreen(Screen.GAME);
  };

  const handleRestart = () => {
    setCurrentScreen(Screen.START);
  };

  return (
    <div className="h-screen w-screen casino-felt overflow-hidden relative flex flex-col items-center justify-center">
      {currentScreen === Screen.START ? (
        <StartScreen onStart={handleStartGame} />
      ) : (
        <GameScreen deckCount={deckCount} onRestart={handleRestart} />
      )}
    </div>
  );
};

export default App;
