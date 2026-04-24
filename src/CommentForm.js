import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Formik yapısı: 
// - initialValues: formu başlangıç değerleri
// - validationSchema: Yup ile doğrulama kuralları
// - onSubmit: form gönderildiğinde çalışacak fonksiyon

const commentValidationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Adınız gereklidir')
        .min(2, 'Ad en az 2 karakter olmalıdır'),
    email: Yup.string()
        .email('Geçerli bir email giriniz')
        .required('Email gereklidir'),
    comment: Yup.string()
        .required('Yorum gereklidir')
        .min(5, 'Yorum en az 5 karakter olmalıdır')
        .max(500, 'Yorum 500 karakterden fazla olamaz')
});

function CommentForm({ onCommentSubmit, courseTitle }) {
    const handleSubmit = (values, { resetForm }) => {
        // Yorum objesini oluştur ve parent'e gönder
        const newComment = {
            name: values.name,
            email: values.email,
            comment: values.comment,
            timestamp: new Date().toLocaleDateString('tr-TR')
        };

        onCommentSubmit(newComment);
        resetForm(); // Formu sıfırla
    };

    return (
        <div className="comment-form">
            <h4 className="subtitle is-5">Yorum Yap</h4>

            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    comment: ''
                }}
                validationSchema={commentValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, isValid, dirty }) => (
                    <Form>
                        {/* Ad alanı */}
                        <div className="field">
                            <label className="label">Adınız</label>
                            <div className="control">
                                <Field
                                    className="input"
                                    type="text"
                                    name="name"
                                    placeholder="Adınızı giriniz"
                                />
                            </div>
                            <ErrorMessage name="name">
                                {msg => <p className="help is-danger">{msg}</p>}
                            </ErrorMessage>
                        </div>

                        {/* Email alanı */}
                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control">
                                <Field
                                    className="input"
                                    type="email"
                                    name="email"
                                    placeholder="email@ornek.com"
                                />
                            </div>
                            <ErrorMessage name="email">
                                {msg => <p className="help is-danger">{msg}</p>}
                            </ErrorMessage>
                        </div>

                        {/* Yorum alanı */}
                        <div className="field">
                            <label className="label">Yorum</label>
                            <div className="control">
                                <Field
                                    className="textarea"
                                    name="comment"
                                    placeholder="Yorumunuzu yazınız..."
                                    as="textarea"
                                />
                            </div>
                            <ErrorMessage name="comment">
                                {msg => <p className="help is-danger">{msg}</p>}
                            </ErrorMessage>
                        </div>

                        {/* Gönder butonu */}
                        <div className="field is-grouped">
                            <div className="control">
                                <button
                                    type="submit"
                                    className={`button is-primary ${isSubmitting ? 'is-loading' : ''}`}
                                    disabled={!isValid || !dirty || isSubmitting}
                                >
                                    Yorumu Gönder
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default CommentForm;
