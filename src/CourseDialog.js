import React from 'react';
import CommentForm from './CommentForm';
import './CourseDialog.css';

function CourseDialog({ course, isOpen, onClose, comments = [], onCommentSubmit }) {

    if (!isOpen || !course) return null;

    const handleCommentSubmit = (newComment) => {
        // Yorum ekleme fonksiyonunu courseId ile çağır
        onCommentSubmit(course.id, newComment);
    };

    return (
        <>
            {/* Dialog arka planı - tıklanırsa dialog kapanır */}
            <div className="modal is-active">
                <div className="modal-background" onClick={onClose}></div>

                <div className="modal-card">
                    {/* Dialog başlığı */}
                    <header className="modal-card-head">
                        <p className="modal-card-title">{course.title}</p>
                        <button
                            className="delete"
                            aria-label="close"
                            onClick={onClose}
                        ></button>
                    </header>

                    {/* Dialog içeriği */}
                    <section className="modal-card-body">
                        <div className="content">
                            {/* Ders açıklaması */}
                            <p>{course.description}</p>
                        </div>

                        {/* Yorum listesi */}
                        <div className="comments-section">
                            <h4 className="subtitle is-5">Yorumlar ({comments.length})</h4>

                            {comments.length === 0 ? (
                                <p className="has-text-grey">Henüz yorum yapılmamış. İlk yorumu sen yap!</p>
                            ) : (
                                <div className="comments-list">
                                    {comments.map((comment, index) => (
                                        <div key={index} className="box comment-item">
                                            <p>
                                                <strong>{comment.name}</strong>
                                                <span className="has-text-grey-light"> • {comment.timestamp}</span>
                                            </p>
                                            <p>{comment.comment}</p>
                                            <p className="has-text-grey-light is-size-7">{comment.email}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Yorum yapma formu */}
                        <div className="form-section">
                            <CommentForm
                                onCommentSubmit={handleCommentSubmit}
                                courseTitle={course.title}
                            />
                        </div>
                    </section>

                    {/* Dialog footer */}
                    <footer className="modal-card-foot">
                        <button className="button" onClick={onClose}>
                            Kapat
                        </button>
                    </footer>
                </div>
            </div>
        </>
    );
}

export default CourseDialog;
