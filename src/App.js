import { useState } from 'react';
import './App.css';
import Course from './Course';
import CourseDialog from './CourseDialog';
import { coursesData } from './coursesData';

function App() {
  // Sepete eklenen kursları ve sepet penceresinin durumunu tutuyoruz.
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Dialog state'i: selectedCourse hangi dersin detaylandığını, isDialogOpen ise dialog açık mı kapalı mı tutuyor
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Her dersin yorumlarını tutuyoruz. Örnek: { 1: [...], 2: [...] }
  const [courseComments, setCourseComments] = useState({});

  // Aynı kurs tekrar eklenirse adetini artır, yoksa yeni satır olarak ekle.
  const addToCart = (course) => {
    setCartItems((prevCartItems) => {
      const existingCourse = prevCartItems.find((item) => item.id === course.id);

      if (existingCourse) {
        return prevCartItems.map((item) => (
          item.id === course.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      }

      return [...prevCartItems, { id: course.id, title: course.title, quantity: 1 }];
    });
  };

  // Sepetteki seçili kursun adetini artır.
  const increaseQuantity = (courseId) => {
    setCartItems((prevCartItems) => (
      prevCartItems.map((item) => (
        item.id === courseId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    ));
  };

  // Sepetteki seçili kursun adetini azalt; 0 olursa tamamen sil.
  const decreaseQuantity = (courseId) => {
    setCartItems((prevCartItems) => (
      prevCartItems
        .map((item) => (
          item.id === courseId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ))
        .filter((item) => item.quantity > 0)
    ));
  };

  // Sepetten tek bir kursu kaldır.
  const removeFromCart = (courseId) => {
    setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== courseId));
  };

  // Sepeti tamamen temizle.
  const clearCart = () => {
    setCartItems([]);
  };

  // Sepetteki toplam kurs adedini hesapla.
  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Dialog açma fonksiyonu
  const openDialog = (course) => {
    setSelectedCourse(course);
    setIsDialogOpen(true);
  };

  // Dialog kapama fonksiyonu
  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedCourse(null);
  };

  // Yorum ekleme fonksiyonu - courseId'ye göre yorumları gruplayıp sakla
  const handleCommentSubmit = (courseId, newComment) => {
    setCourseComments((prev) => ({
      ...prev,
      [courseId]: [...(prev[courseId] || []), newComment]
    }));
  };

  return (
    <div className="App">
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="hero-actions">
            <button className="button is-warning" onClick={() => setIsCartOpen(true)}>
              Genel Sepet ({totalCartCount})
            </button>
          </div>
          <p className="title">Eğitim Merkezi</p>
          <p className="subtitle">Kendini geliştirmek için doğru kursu seç.</p>
        </div>
      </section>

      {/* Kurs kartlarını grid düzeninde gösteriyoruz. */}
      <div className='course-section container'>
        <div className='columns is-multiline'>
          {coursesData.map((course) => (
            <div className='column is-12-mobile is-6-tablet is-3-desktop' key={course.id}>
              <Course
                title={course.title}
                description={course.description}
                onAddToCart={() => addToCart(course)}
                onCourseClick={() => openDialog(course)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Ders detayları dialog'u */}
      <CourseDialog
        course={selectedCourse}
        isOpen={isDialogOpen}
        onClose={closeDialog}
        comments={selectedCourse ? (courseComments[selectedCourse.id] || []) : []}
        onCommentSubmit={handleCommentSubmit}
      />

      {/* Sepet penceresi: sadece isCartOpen true olduğunda görünür. */}
      <div className={`modal ${isCartOpen ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={() => setIsCartOpen(false)}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Sepetim</p>
            <button className="delete" aria-label="close" onClick={() => setIsCartOpen(false)}></button>
          </header>
          <section className="modal-card-body has-text-left">
            {cartItems.length === 0 ? (
              <p>Sepetiniz boş. Kurs kartlarındaki Sepete Ekle butonunu kullanabilirsiniz.</p>
            ) : (
              <ul className="cart-list">
                {cartItems.map((item) => (
                  <li key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <strong>{item.title}</strong>
                      <span>Adet: {item.quantity}</span>
                    </div>
                    <div className="cart-item-actions">
                      <button className="button is-small" onClick={() => decreaseQuantity(item.id)}>-</button>
                      <button className="button is-small" onClick={() => increaseQuantity(item.id)}>+</button>
                      <button className="button is-small is-danger" onClick={() => removeFromCart(item.id)}>
                        Sil
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <footer className="modal-card-foot is-justify-content-space-between">
            <button className="button is-danger" onClick={clearCart} disabled={cartItems.length === 0}>
              Sepeti Temizle
            </button>
            <button className="button" onClick={() => setIsCartOpen(false)}>Kapat</button>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
