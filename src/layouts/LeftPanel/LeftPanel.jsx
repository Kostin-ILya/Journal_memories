import styles from './LeftPanel.module.scss'

const LeftPanel = ({ children }) => {
  return <aside className={styles.leftPanel}>{children}</aside>
}

export default LeftPanel
