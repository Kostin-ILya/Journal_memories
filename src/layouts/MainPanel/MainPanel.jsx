import styles from './MainPanel.module.scss'

const MainPanel = ({ children }) => {
  return <main className={styles.main}>{children}</main>
}

export default MainPanel
