import { useState, useEffect } from 'react';
import { debounce } from '../helpers/commons';

const deviceConfigs = (width) => {
  if(width < 320) {
    return 'xs'
  } else if(width >= 320 && width < 720 ) {
    return 'sm'
  } else if(width >= 720 && width < 1024) {
    return 'md'
  } else if(width >= 1024) {
    return 'lg'
  }
}

const Breakpoint = () => {
  const [breakpoint, setBreakpoint] = useState(() => deviceConfigs(window.innerWidth));
  
  useEffect(() => {
    const calcInnerWidth = () => {
      debounce(() => {
        setBreakpoint(deviceConfigs(window.innerWidth))
      }, 100)();
    };

    window.addEventListener('resize', calcInnerWidth);
    return () => window.removeEventListener('resize', calcInnerWidth);
  }, []);

  return breakpoint;
}

export default Breakpoint;
