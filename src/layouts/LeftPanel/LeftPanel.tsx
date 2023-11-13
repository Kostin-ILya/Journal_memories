import styles from './LeftPanel.module.scss'
interface LeftPanelProps {
  children: React.ReactNode
}

const LeftPanel = ({ children }: LeftPanelProps) => {
  return <aside className={styles.leftPanel}>{children}</aside>
}

export default LeftPanel
