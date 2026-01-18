import Card from "../components/shared/Card"
import {Link} from 'react-router-dom'

function AboutPage() {
  return <Card>

    <div className="about">
        <h1>About This Project</h1>
        <p>This is a React app to leave feedback for a product or service</p>
        <p>Demo Project Created by Keval Bharda</p>

        <p>Copyright &copy; 2026</p>

        <Link to="/">Back To Home</Link>
    </div>

  </Card>
}

export default AboutPage
