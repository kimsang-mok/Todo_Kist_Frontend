import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/LandingPage.scss"

function LandingPage() {
    return (
        <main className="landing-page">
            <section className='img-section'>
                <img src="./images/storyset.png" alt="Landing page Image by Storyset" />
            </section>
            <section className="content-section">
                <h1>Todo-Kist</h1>
                <p>With only the features you need, Todo-Kist is customized for individuals seeking a stress-free way to stay focused on their goals, projects, and tasks.</p>
                <div className="landing-btn">
                    <Link to="/todos/today" className="button button-green">Get Started</Link>
                </div>
            </section>
        </main>
    )
}

export default LandingPage