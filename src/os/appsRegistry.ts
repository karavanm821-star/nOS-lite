import { Folder, Globe, Settings, FileText, Calculator, Terminal, Info, Bot, Activity, Gamepad2, Music } from 'lucide-react';
import { AppDefinition } from '../types';

import FilesApp from '../apps/FilesApp';
import BrowserApp from '../apps/BrowserApp';
import NotesApp from '../apps/NotesApp';
import CalculatorApp from '../apps/CalculatorApp';
import TerminalApp from '../apps/TerminalApp';
import SettingsApp from '../apps/SettingsApp';
import AboutApp from '../apps/AboutApp';
import AiAssistantApp from '../apps/AiAssistantApp';
import SysMonApp from '../apps/SysMonApp';
import TicTacToeApp from '../apps/TicTacToeApp';
import MediaPlayerApp from '../apps/MediaPlayerApp';

export const appsRegistry: AppDefinition[] = [
  { id: 'browser', name: 'Browser', icon: Globe, component: BrowserApp, defaultWidth: 800, defaultHeight: 600 },
  { id: 'files', name: 'Files', icon: Folder, component: FilesApp, defaultWidth: 600, defaultHeight: 450 },
  { id: 'notes', name: 'Notes', icon: FileText, component: NotesApp, defaultWidth: 500, defaultHeight: 400 },
  { id: 'calculator', name: 'Calculator', icon: Calculator, component: CalculatorApp, defaultWidth: 300, defaultHeight: 450, canMaximize: false },
  { id: 'media', name: 'Media', icon: Music, component: MediaPlayerApp, defaultWidth: 320, defaultHeight: 520, canMaximize: false },
  { id: 'sysmon', name: 'System', icon: Activity, component: SysMonApp, defaultWidth: 350, defaultHeight: 450, canMaximize: false },
  { id: 'tictactoe', name: 'Games', icon: Gamepad2, component: TicTacToeApp, defaultWidth: 350, defaultHeight: 450, canMaximize: false },
  { id: 'terminal', name: 'Terminal', icon: Terminal, component: TerminalApp, defaultWidth: 600, defaultHeight: 400 },
  { id: 'ai', name: 'Aura AI', icon: Bot, component: AiAssistantApp, defaultWidth: 400, defaultHeight: 600 },
  { id: 'settings', name: 'Settings', icon: Settings, component: SettingsApp, defaultWidth: 500, defaultHeight: 500 },
  { id: 'about', name: 'About', icon: Info, component: AboutApp, defaultWidth: 350, defaultHeight: 300, canMaximize: false },
];
