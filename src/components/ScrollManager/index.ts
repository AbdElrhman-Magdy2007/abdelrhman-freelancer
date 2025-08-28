// Export the standard version as default (with SimpleScrollbar)
export { default } from './ScrollManager';

// Export all versions
export { default as ScrollManager } from './ScrollManager';
export { default as ScrollManagerPro } from './ScrollManagerPro';
export { default as ScrollManagerDemo } from './ScrollManagerDemo';
export { default as ScrollbarTest } from './ScrollbarTest';

// Export individual components
export { default as ScrollProgressBar } from './components/ScrollProgressBar';
export { default as ScrollToTopButton } from './components/ScrollToTopButton';
export { default as ScrollbarStyles } from './ScrollbarStyles';
export { default as ForceScrollbar } from './ForceScrollbar';
export { default as SimpleScrollbar } from './SimpleScrollbar';
export { default as InstantScrollbar } from './InstantScrollbar';
export { default as QuickScrollbarTest } from './QuickScrollbarTest';
export { default as FinalScrollbar } from './FinalScrollbar';

// Export hooks
export { useScrollPosition } from './hooks/useScrollPosition';
export { useThrottle } from './hooks/useThrottle';

// Export types
export type { ScrollManagerProps, ScrollPosition, ScrollState } from './types';