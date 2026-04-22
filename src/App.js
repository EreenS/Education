import { useState } from 'react';
import './App.css';
import Course from './Course';

function App() {
  const [courses, setCourses] = useState([
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
    }
  ]);

  const randomCoursePool = [
    {
      title: 'Veri Yapıları',
      description: 'Diziler, bağlı listeler, ağaçlar ve grafikler gibi temel veri yapılarını öğrenerek daha verimli algoritmalar tasarlamayı öğren.'
    },
    {
      title: 'Algoritmalar',
      description: 'Sıralama, arama ve optimizasyon problemlerini farklı yaklaşımlarla çözmeyi öğren. Zaman ve bellek karmaşıklığını doğru analiz et.'
    },
    {
      title: 'Web Geliştirme',
      description: 'HTML, CSS ve JavaScript temelleriyle başlayıp modern web uygulamalarının nasıl planlandığını ve geliştirildiğini adım adım keşfet.'
    },
    {
      title: 'Nesne Yönelimli Programlama',
      description: 'Sınıflar, kalıtım, kapsülleme ve polimorfizm gibi kavramlarla daha modüler ve bakımı kolay yazılımlar geliştirmeyi öğren.'
    },
    {
      title: 'Veritabanı Temelleri',
      description: 'İlişkisel veritabanı mantığını, SQL sorgularını ve veri modellemeyi öğrenerek uygulamaların veri katmanını sağlamlaştır.'
    }
  ];

  const addRandomCourse = () => {
    const randomIndex = Math.floor(Math.random() * randomCoursePool.length);
    const selectedCourse = randomCoursePool[randomIndex];

    setCourses((prevCourses) => [
      ...prevCourses,
      {
        id: `${Date.now()}-${Math.random()}`,
        title: selectedCourse.title,
        description: selectedCourse.description
      }
    ]);
  };

  return (
    <div className="App">
      <section className="hero is-primary">
        <div className="hero-body">
          <p className="title">Eğitim Merkezi</p>
          <p className="subtitle">Kendini geliştirmek için doğru kursu seç.</p>
        </div>
      </section>
      <div className='course-section container'>
        <div className='button-wrapper'>
          <button className='button is-link is-medium' onClick={addRandomCourse}>
            Rastgele Kurs Ekle
          </button>
        </div>

        <div className='columns is-multiline'>
          {courses.map((course) => (
            <div className='column is-12-mobile is-6-tablet is-3-desktop' key={course.id}>
              <Course
                title={course.title}
                description={course.description}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
