import React from 'react';
import styles from './aboutSection.module.scss';

interface AboutPhone {
  title: string;
  text: string[];
}

interface Props {
  description: AboutPhone[];
}

export const AboutSection: React.FC<Props> = ({ description }) => {
  return (
    <section className={styles.about}>
      <div className={styles.aboutWrapper}>
        <div className={styles.titleBlock}>
          <h3 className={styles.title}>About</h3>
          <div className={styles.line} />
        </div>

        <div className={styles.descriptionBlock}>
          {description.map(item => (
            <article key={item.title} className={styles.description}>
              <h4 className={styles.descriptionTitle}>{item.title}</h4>

              {item.text.map((value, index) => (
                <div key={index} className={styles.textBlock}>
                  <p className={styles.text}>{value}</p>
                </div>
              ))}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
