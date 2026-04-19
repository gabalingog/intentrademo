import styles from './optionButton.module.css'

export default function OptionButton({ label, onClick }) {
  return (
    <button onClick={onClick} className={styles.btn}>
      <span>{label}</span>
      <span className={styles.arrow}>›</span>
    </button>
  )
}