import Header from '../../components/Header'
import './styles.css'

export default function Default({ children }) {
  return (
    <div className="wrapper">
      <Header/>
      {children}
    </div>
  )
}
