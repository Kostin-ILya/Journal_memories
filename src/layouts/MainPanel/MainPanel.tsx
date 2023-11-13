import styles from './MainPanel.module.scss'

interface MainPanelProps {
  children: React.ReactNode
}

const MainPanel = ({ children }: MainPanelProps) => {
  return <main className={styles.main}>{children}</main>
}

export default MainPanel
