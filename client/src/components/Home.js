import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <section className="hero-section">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1 className="hero-title">
                        ברוכים הבאים לחנות שלנו
                    </h1>
                    <p className="hero-subtitle">
                        גלה את המוצרים הטובים ביותר במחירים הכי משתלמים
                    </p>
                    <p className="hero-description">
                        מבחר ענק של מוצרים איכותיים, משלוח מהיר ושירות אמין
                    </p>
                    <Button 
                        label="לקנייה עכשיו" 
                        icon="pi pi-shopping-cart"
                        className="hero-cta-button"
                        size="large"
                        onClick={() => navigate('/allProduct')}
                    />
                </div>
            </section>

            <section className="features-section">
                <div className="features-container">
                    <div className="feature-card">
                        <i className="pi pi-box feature-icon"></i>
                        <h3>משלוח מהיר</h3>
                        <p>משלוח עד הבית תוך 2-3 ימי עסקים</p>
                    </div>
                    <div className="feature-card">
                        <i className="pi pi-shield feature-icon"></i>
                        <h3>תשלום מאובטח</h3>
                        <p>מערכת תשלומים מאובטחת ומוגנת</p>
                    </div>
                    <div className="feature-card">
                        <i className="pi pi-check-circle feature-icon"></i>
                        <h3>אחריות מלאה</h3>
                        <p>החזרה והחלפה ללא עלות תוך 30 יום</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
