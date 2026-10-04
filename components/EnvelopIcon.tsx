'use client';

import { BudgetIconProps } from "@/types/BudgetIconProps";
import { useAppSelector } from "@/lib/hooks";
import { useState } from "react";

export default function BudgetIcon({ title, fillIcons, onClick, allowHoverEffect = true }: BudgetIconProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isDark = useAppSelector((state) => state.theme.data.isDark);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "0px",
      cursor: allowHoverEffect ? 'pointer' : 'default'
    }}>
      <div onMouseEnter={() => setIsHovered(true)}
           onMouseLeave={() => setIsHovered(false)}
           onClick={onClick}
           onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onClick?.()
            }
           }}
           role="button"
           tabIndex={0}
           aria-label={title}
           style={{position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: 'transform 0.3s ease',
                    transform: isHovered && allowHoverEffect ? 'scale(1.09)' : 'scale(1)'}}>

        {/* Folder Icon */}
        { fillIcons ? (
          // Filled
          <svg
               xmlns="http://www.w3.org/2000/svg"
               width="88"
               height="88"
               fill="currentColor"
               className="bi bi-folder-fill"
               viewBox="0 0 16 16"
               style={{
                  opacity: fillIcons || isHovered ? '1': '0.7',
                  textShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                  filter: "drop-shadow(0px 3px 8px rgba(0,0,0,0.2))",
                }}
                role="img"
                aria-label="Folder icon">

            <defs>
              <linearGradient id="folderGradient2" x1="0%" y1="100%" x2="0%" y2="0%">
                {isDark ? (
                  <>
                    <stop offset="0%" stopColor="rgba(196, 196, 196, 1)" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="white" stopOpacity="1" />
                  </>
                ) : (
                  <>
                    <stop offset="0%" stopColor="hsl(208, 90%, 14%)" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="hsl(208, 90%, 37%)" stopOpacity="0.9" />
                  </>
                )}
              </linearGradient>
              <filter id="folderShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="rgba(0, 0, 0, 1)" />
              </filter>
            </defs>

            <path
                  fill="url(#folderGradient2)"
                  d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3m-8.322.12q.322-.119.684-.12h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981z"/>
          </svg>)
          :
          // Regular
          (<svg
            width="88"
            height="88"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              opacity: isHovered && allowHoverEffect ? '1': '0.7',
              textShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
              filter: "drop-shadow(0px 3px 8px rgba(0,0,0,0.2))"
            }}
            role="img"
            aria-label="Folder icon"
          >
            <defs>
              <linearGradient id="folderGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                {isDark ? (
                  <>
                    <stop offset="0%" stopColor="white" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="white" />
                  </>
                ) : (
                  <>
                    <stop offset="0%" stopColor="hsl(208, 90%, 38%)" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="hsl(208, 90%, 16%)" />
                  </>
                )}
              </linearGradient>
              <filter id="folderShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="rgba(0, 0, 0, 1)" />
              </filter>
            </defs>

            <path
              fill="url(#folderGradient)"
              d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139q.323-.119.684-.12h5.396z"
            />
        </svg>)}

        {/* Envelope Overlay */}
        {fillIcons ? (
          // Filled
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 16 16"
            style={{
              position: "absolute",
              transform: isHovered ? "scale(1.08)" : "scale(1)",
              opacity: fillIcons || isHovered ? "1" : "0.75",
              textShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
            role="img"
            aria-label="Envelope icon"
            onClick={() => onClick?.()}
          >
            <defs>
              <linearGradient id="envelopeGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                {isDark ? (
                  <>
                    <stop offset="0%" stopColor="hsl(208, 83%, 55%)" />
                    <stop offset="100%" stopColor="hsl(208, 83%, 18%)" />
                  </>
                ) : (
                  <>
                    <stop offset="0%" stopColor="white" />
                    <stop offset="100%" stopColor="#c2c2c2ff" />
                  </>
                )}
              </linearGradient>
            </defs>

            <path
              fill="url(#envelopeGradient2)"
              fillRule="evenodd"
              d="M6.5 9.5 3 7.5v-6A1.5 1.5 0 0 1 4.5 0h7A1.5 1.5 0 0 1 13 1.5v6l-3.5 2L8 8.75zM1.059 3.635 2 3.133v3.753L0 5.713V5.4a2 2 0 0 1 1.059-1.765M16 5.713l-2 1.173V3.133l.941.502A2 2 0 0 1 16 5.4zm0 1.16-5.693 3.337L16 13.372v-6.5Zm-8 3.199 7.941 4.412A2 2 0 0 1 14 16H2a2 2 0 0 1-1.941-1.516zm-8 3.3 5.693-3.162L0 6.873v6.5Z"
            />
          </svg>
        ) : (
          // Regular
          <svg
            width="26"
            height="26"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: "absolute",
              transform: "translateY(2px)",
              opacity: isHovered && allowHoverEffect ? "1" : "0.8",
              textShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
              transition: "opacity 0.3s ease",
            }}
            role="img"
            aria-label="Envelope icon"
          >
            <defs>
              <linearGradient id="envelopeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                {isDark ? (
                  <>
                    <stop offset="0%" stopColor="white" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="white" />
                  </>
                ) : (
                  <>
                    <stop offset="0%" stopColor="#0B2730" stopOpacity="0.65" />
                    <stop offset="100%" stopColor="#3693B3" />
                  </>
                )}
              </linearGradient>
            </defs>

            <path
              fill="url(#envelopeGradient)"
              fillRule="evenodd"
              d="M6.5 9.5 3 7.5v-6A1.5 1.5 0 0 1 4.5 0h7A1.5 1.5 0 0 1 13 1.5v6l-3.5 2L8 8.75zM1.059 3.635 2 3.133v3.753L0 5.713V5.4a2 2 0 0 1 1.059-1.765M16 5.713l-2 1.173V3.133l.941.502A2 2 0 0 1 16 5.4zm0 1.16-5.693 3.337L16 13.372v-6.5Zm-8 3.199 7.941 4.412A2 2 0 0 1 14 16H2a2 2 0 0 1-1.941-1.516zm-8 3.3 5.693-3.162L0 6.873v6.5Z"
            />
          </svg>
        )}

      </div>

      <p style={{ margin: '17px 0px 0px 0px',
                  transform: "translate(0px, -10px)" }}>{title}</p>
    </div>
  );
}
