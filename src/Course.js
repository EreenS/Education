import React from 'react'

function Course({ title, description, onAddToCart, onCourseClick }) {
    return (
        // Tek bir kursu gösteren yeniden kullanılabilir kart.
        <div className="card course-card">
            <div className="card-content" style={{ cursor: 'pointer' }} onClick={onCourseClick}>
                <p className="title is-4">{title}</p>
                <p className="subtitle is-6">{description}</p>
            </div>
            <footer className="card-footer">
                {/* Bu buton üst bileşendeki sepete ekleme fonksiyonunu tetikler. */}
                <button className="button is-success is-fullwidth" onClick={onAddToCart}>
                    Sepete Ekle
                </button>
            </footer>
        </div>
    );
}

export default Course;