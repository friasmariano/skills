import Link from "next/link";
import styles from '@/css/Overview.module.css'

export default function Overview() {
    return(
      <section className={`${styles.container}`}>
        <div style={{ display: 'flex', flexDirection: 'column',
                      padding: '50px 90px 0px 70px' }}>
          <p style={{ fontSize: '1.1rem', textAlign: 'justify', margin: '10px 0px 0px 0px' }}>
               {/* Front End Engineer with a strong foundation in system design and a background in graphic design. I build scalable, user-centered interfaces using React and Next.js, collaborating closely with robust backend systems powered by Spring Boot. Driven by curiosity, continuous learning, and a passion for creating experiences that feel as good as they work. */}

          </p>
        </div>
      </section>
    )
}