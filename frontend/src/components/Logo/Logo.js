// src/components/Logo/Logo.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { classNames } from '../../utils/styleUtils';
import styles from './Logo.module.css';

/**
 * Logo component with animation effects
 * 
 * @param {Object} props - Component props
 * @param {Function} [props.onLogoClick] - Click handler
 * @param {boolean} [props.isCollapsed=false] - Whether sidebar is collapsed
 */
const Logo = ({ onLogoClick, isCollapsed = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

  // Occasionally pulse the logo to draw attention
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setIsPulsing(true);
        setTimeout(() => setIsPulsing(false), 1000);
      }
    }, 15000); // 15 seconds

    return () => clearInterval(interval);
  }, [isHovered]);

  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    }
  };

  return (
    <div onClick={handleLogoClick} className={styles.logoContainer}>
      <div
        className={styles.logoWrapper}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Logo Icon Container */}
        <div
          className={classNames(
            styles.logoIcon,
            isHovered ? styles.logoIconHovered : '',
            isPulsing ? styles.logoIconPulsing : ''
          )}
        >
          {/* Glow effect */}
          <div
            className={classNames(
              styles.logoGlow,
              isHovered ? styles.logoGlowVisible : ''
            )}
          ></div>

          {/* Infinity SVG */}
          <svg
            viewBox="0 0 24 24"
            className={classNames(
              styles.logoSvg,
              isHovered ? styles.logoSvgHovered : ''
            )}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 12c0-1.657-1.343-3-3-3-2.5 0-5 6-7.5 6-1.657 0-3-1.343-3-3s1.343-3 3-3c2.5 0 5 6 7.5 6 1.657 0 3-1.343 3-3z" />
          </svg>
        </div>

        {/* Logo Text + Tagline (Conditionally Rendered) */}
        {!isCollapsed && (
          <div className={styles.logoText}>
            {/* Main title */}
            <span
              className={classNames(
                styles.logoTitle,
                isHovered ? styles.logoTitleHovered : ''
              )}
            >
              Qurius.ai
            </span>

            {/* Tagline */}
            <span
              className={classNames(
                styles.logoTagline,
                isHovered ? styles.logoTaglineVisible : styles.logoTaglineHidden
              )}
            >
              Learn. Practice. Apply.
            </span>
          </div>
        )}

        {/* Decorative dot (Conditionally Rendered) */}
        {!isCollapsed && (
          <div
            className={classNames(
              styles.logoDot,
              isHovered ? styles.logoDotHovered : ''
            )}
          ></div>
        )}
      </div>
    </div>
  );
};

export default Logo;