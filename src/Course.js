import React from 'react'

function Course({ title, description, onAddToCart }) {
    return (
        <div className="card course-card">
            <div className="card-content">
                <p className="title is-4">{title}</p>
                <p className="subtitle is-6">{description}</p>
            </div>
            <footer className="card-footer">
                <button className="button is-success is-fullwidth" onClick={onAddToCart}>
                    Sepete Ekle
                </button>
            </footer>
        </div>
    );
}

export default Course;