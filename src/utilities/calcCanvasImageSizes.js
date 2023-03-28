const calcX = () => {
    if (window.innerWidth < 600) {
      return 900;
    }
    if (window.innerWidth < 900) {
      return 600;
    }
    if (window.innerWidth > 900) {
      return 500;
    }
  };
  
  const calcY = () => {
    if (window.innerWidth < 600) {
      return 200;
    }
    if (window.innerWidth < 900) {
      return 300;
    }
    if (window.innerHeight > 900) {
      return 0;
    }
  };

  export {calcX, calcY}