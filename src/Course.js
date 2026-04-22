import React from 'react'

function Course({ title, description }) {
    return (
        <div className="card">
            <div className="card-content">
                <p className="title is-4">{title}</p>
                <p className="subtitle is-6">{description}</p>
            </div>
        </div>
    );
}

export default Course;