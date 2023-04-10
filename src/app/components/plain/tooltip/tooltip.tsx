/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';

import { TooltipProps } from './tooltip-types';
import styles from './tooltip.module.scss';
import { useOnClickOutside } from 'usehooks-ts';
import classNames from 'classnames';

export const Tooltip = ({
  type = 'both',
  children,
  content,
  position = 'bottom',
  className,
  delay = 400,
  ...props
}: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const [timer, setTimer] = useState<number>();
  const containerRef = useRef(null);

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  const handleMouseEnter = () => {
    if (type === 'hover' || type === 'both') {
      setTimer(window.setTimeout(show, delay));
    }
  };

  const handleMouseLeave = () => {
    if (type === 'hover' || type === 'both') {
      clearTimeout(timer);
      hide();
    }
  };

  const handleClick = () => {
    if (type === 'click' || type === 'both') {
      setVisible((prev) => !prev);
    }
  };

  useEffect(() => {
    return () => window.clearTimeout(timer);
  }, []);

  useOnClickOutside(containerRef, hide);

  return (
    <div
      ref={containerRef}
      className={styles.wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      aria-haspopup='true'
      aria-expanded={visible}
    >
      {children}
      <div
        style={visible ? {} : { display: 'none' }}
        className={classNames(styles.tooltip, styles[`${position}`])}
        {...props}
      >
        {content}
      </div>
    </div>
  );
};
