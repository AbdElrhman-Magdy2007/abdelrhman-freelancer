export interface ScrollManagerProps {
  showProgressBar?: boolean;
  showScrollToTop?: boolean;
  scrollToTopOffset?: number;
  progressBarHeight?: number;
  className?: string;
  progressBarClassName?: string;
  scrollToTopClassName?: string;
}

export interface ScrollPosition {
  scrollY: number;
  scrollPercentage: number;
  isScrollingDown: boolean;
}

export interface ScrollState {
  scrollY: number;
  scrollPercentage: number;
  isVisible: boolean;
  isScrollingDown: boolean;
  documentHeight: number;
  viewportHeight: number;
}

export interface ScrollManagerConfig {
  progressBar: {
    enabled: boolean;
    height: number;
    className: string;
    zIndex: number;
  };
  scrollToTop: {
    enabled: boolean;
    offset: number;
    className: string;
    position: 'bottom-right' | 'bottom-left';
    size: 'sm' | 'md' | 'lg';
  };
  performance: {
    throttleMs: number;
    usePassiveListeners: boolean;
  };
}