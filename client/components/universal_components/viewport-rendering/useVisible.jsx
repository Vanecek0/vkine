import { useState, useEffect } from "react";

const OPTIONS = {
  root: null,
  rootMargin: process.env.LOADING_MARGIN,
  threshold: parseFloat(process.env.LOADING_THRESHOLD),
};

const useVisible = (elementRef) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (elementRef.current) {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(elementRef.current);
          }
        });
      }, OPTIONS);
      observer.observe(elementRef.current);
    }
  }, [elementRef]);

  return isVisible;
};

export default useVisible;