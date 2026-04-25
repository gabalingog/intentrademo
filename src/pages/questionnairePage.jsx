import { useState } from 'react'
import Questionnaire from './../components/questionnaire/questionnaire'
import ResultsPage from './../components/results/resultsPage'

export default function QuestionnairePage() {
  const [answers, setAnswers] = useState(null)
  const [showResults, setShowResults] = useState(false)

  if (showResults) {
    return <ResultsPage onBack={() => setShowResults(false)} />
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md py-12">
        <Questionnaire
          onComplete={(a) => setAnswers(a)}
          onViewResults={() => setShowResults(true)}
        />
      </div>
    </div>
  )
}