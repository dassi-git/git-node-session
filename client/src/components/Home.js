import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <section className="hero-section">
                <div className="hero-content">
                    <div className="hero-badge">🍓 🍊 🍇 🥝</div>
                    <h1 className="hero-title">
                        happily - עיצובי פירות לאירועים
                    </h1>
                    <p className="hero-subtitle">
                        להוסיף יופי, שמחה וטעם לכל אירוע
                    </p>
                    <Button 
                        label="גלו את הקולקציה" 
                        icon="pi pi-arrow-left"
                        className="hero-cta-button"
                        size="large"
                        onClick={() => navigate('/allProduct')}
                    />
                </div>
                <div className="hero-image-decoration">
                    <div className="decoration-circle circle-1"></div>
                    <div className="decoration-circle circle-2"></div>
                    <div className="decoration-circle circle-3"></div>
                </div>
            </section>

            <section className="features-section">
                <div className="features-container">
                    <div className="feature-card">
                        <div className="feature-icon-wrapper">
                            <i className="pi pi-heart-fill feature-icon"></i>
                        </div>
                        <h3>עיצובים מושלמים</h3>
                        <p>כל מגש הוא יצירת אומנות עם תשומת לב לכל פרט</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon-wrapper">
                            <i className="pi pi-sparkles feature-icon"></i>
                        </div>
                        <h3>פירות טריים ואיכותיים</h3>
                        <p>נבחרים בקפידה מהספקים הטובים ביותר</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon-wrapper">
                            <i className="pi pi-gift feature-icon"></i>
                        </div>
                        <h3>מתאים לכל אירוע</h3>
                        <p>ימי הולדת, חתונות, אירועי חברה ועוד</p>
                    </div>
                </div>
            </section>

            <section className="contact-section">
                <div className="contact-content">
                    <h2 className="contact-title">בואו ליצור ביחד משהו מיוחד</h2>
                    <p className="contact-subtitle">נשמח לעזור לכם להפוך את האירוע שלכם למושלם</p>
                    <div className="contact-details">
                        <a href="tel:0583215865" className="contact-item">
                            <i className="pi pi-phone"></i>
                            <span>058-3215865</span>
                        </a>
                        <a href="mailto:100happily@gmail.com" className="contact-item">
                            <i className="pi pi-envelope"></i>
                            <span>100happily@gmail.com</span>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
