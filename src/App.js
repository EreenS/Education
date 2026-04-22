import { useState } from 'react';
import './App.css';
import Course from './Course';

function App() {
  const [courses] = useState([
    {
      id: 1,
      title: 'React',
      description: 'Sıfırdan modern ve bileşen tabanlı arayüzler geliştirmeyi öğren. Props, state, hooks ve gerçek React uygulamalarının çalışma mantığını keşfet.'
    },
    {
      id: 2,
      title: 'Python',
      description: 'Python temelleriyle başlayıp pratik kod yazımına, veri işleme yöntemlerine ve günlük geliştirme görevlerinde problem çözmeye geçiş yap.'
    },
    {
      id: 3,
      title: 'Diferansiyel Denklemler',
      description: 'Mühendislik ve bilgisayar bilimlerinde değişimi modellemek için kullanılan temel yöntemleri öğren. Birinci dereceden sistemler ve uygulamalı çözüm tekniklerine hakim ol.'
    },
    {
      id: 4,
      title: 'Mat101',
      description: 'Algoritmaların, mantığın ve hesaplamanın arkasındaki matematik temeli güçlendir. Bilgisayar bilimi öğrencileri için gerekli konulara sağlam bir giriş yap.'
    },
    {
      id: 5,
      title: 'Veri Yapıları',
      description: 'Diziler, bağlı listeler, ağaçlar ve grafikler gibi temel veri yapılarını öğrenerek daha verimli algoritmalar tasarlamayı öğren.'
    },
    {
      id: 6,
      title: 'Algoritmalar',
      description: 'Sıralama, arama ve optimizasyon problemlerini farklı yaklaşımlarla çözmeyi öğren. Zaman ve bellek karmaşıklığını doğru analiz et.'
    },
    {
      id: 7,
      title: 'Web Geliştirme',
      description: 'HTML, CSS ve JavaScript temelleriyle başlayıp modern web uygulamalarının nasıl planlandığını ve geliştirildiğini adım adım keşfet.'
    },
    {
      id: 8,
      title: 'Nesne Yönelimli Programlama',
      description: 'Sınıflar, kalıtım, kapsülleme ve polimorfizm gibi kavramlarla daha modüler ve bakımı kolay yazılımlar geliştirmeyi öğren.'
    },
    {
      id: 9,
      title: 'Veritabanı Temelleri',
      description: 'İlişkisel veritabanı mantığını, SQL sorgularını ve veri modellemeyi öğrenerek uygulamaların veri katmanını sağlamlaştır.'
    },
    {
      id: 10,
      title: 'Makine Öğrenmesi Temelleri',
      description: 'Denetimli öğrenme, model eğitimi ve temel değerlendirme metrikleriyle veri odaklı tahmin sistemleri kurmaya giriş yap.'
    }
  ]);

  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

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

  const increaseQuantity = (courseId) => {
    setCartItems((prevCartItems) => (
      prevCartItems.map((item) => (
        item.id === courseId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    ));
  };

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

  const removeFromCart = (courseId) => {
    setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== courseId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

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

      <div className='course-section container'>
        <div className='columns is-multiline'>
          {courses.map((course) => (
            <div className='column is-12-mobile is-6-tablet is-3-desktop' key={course.id}>
              <Course
                title={course.title}
                description={course.description}
                onAddToCart={() => addToCart(course)}
              />
            </div>
          ))}
        </div>
      </div>

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
                      <button className="button is-small is-danger is-light" onClick={() => removeFromCart(item.id)}>
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
