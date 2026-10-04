import { The_Nautigal } from "next/font/google";
import styles from '@/css/Overview.module.css'

const scriptFont = The_Nautigal({ weight: '400', subsets: ['latin'] });

export default function Overview() {
    return(
      <section className={`${styles.container}`}>
        <div style={{ display: 'flex', flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '50px 90px 0px 70px' }}>
          <p className={scriptFont.className}
             style={{ fontSize: '2.5rem',
                      textAlign: 'justify', margin: '10px 0px 0px 0px' }}>
               Your journey to greatness starts here
          </p>
          <svg className={styles.ornament} viewBox="0 0 180 40" fill="none" aria-hidden="true" focusable="false">
            <path d="M12 25C27 32 47 28 62 21C77 14 92 9 99 14C108 21 92 32 81 27C69 21 86 10 106 16C126 22 144 29 168 18M36 24C28 22 27 15 34 14C41 13 43 19 38 23M144 24C152 28 160 27 164 23" />
          </svg>
        </div>
      </section>
    )
}
