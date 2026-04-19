import Questionnaire from '../components/questionnaire/questionnaire'
import styles from './questionnairePage.module.css'

export default function QuestionnairePage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.logo}>intentra</h1>
        <p className={styles.tagline}>Decision support</p>
      </div>
      <div className={styles.card}>
        <Questionnaire />
      </div>
      <p className={styles.footer}>Mindful purchasing starts with intention</p>
    </div>
  )
}