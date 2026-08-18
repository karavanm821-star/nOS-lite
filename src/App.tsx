import { useState, useEffect } from 'react';
import BootScreen from './components/BootScreen';
import SetupScreen from './components/SetupScreen';
import Desktop from './components/Desktop';
import { OsProvider } from './os/OsProvider';

export default function App() {
  const [bootState, setBootState] = useState<'booting' | 'setup' | 'desktop'>('booting');

  useEffect(() => {
    const timer = setTimeout(() => {
      const isSetupComplete = localStorage.getItem('nos_setup_complete');
      if (isSetupComplete) {
        setBootState('desktop');
      } else {
        setBootState('setup');
      }
    }, 2000); // 2s boot
    return () => clearTimeout(timer);
  }, []);

  if (bootState === 'booting') return <BootScreen />;
  if (bootState === 'setup') return <SetupScreen onComplete={() => setBootState('desktop')} />;
  
  return (
    <OsProvider>
      <Desktop />
    </OsProvider>
  );
}

