import { useState } from 'react'
import Questionnaire from './../components/questionnaire/questionnaire'
import ResultsPage from './../components/results/resultsPage'
import styles from './questionnairePage.module.css'

export default function QuestionnairePage() {
  const [answers, setAnswers] = useState(null)
  const [showResults, setShowResults] = useState(false)

  if (showResults) {
    return <ResultsPage onBack={() => setShowResults(false)} />
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h1 className={styles.logo}>intentra</h1>
          <p className={styles.tagline}>Decision support</p>
        </div>
        <div className={styles.card}>
          <Questionnaire
            onComplete={(a) => setAnswers(a)}
            onViewResults={() => setShowResults(true)}
          />
        </div>
      </div>
    </div>
  )
}