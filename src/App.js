import './App.css';
import Course from './Course';

function App() {
  return (
    <div className="App">
      <section className="hero is-primary">
        <div className="hero-body">
          <p className="title">Eğitim Merkezi</p>
          <p className="subtitle">Kendini geliştirmek için doğru kursu seç.</p>
        </div>
      </section>
      <div className='course-section container'>
        <div className='columns'>
          <div className='column'>
            <Course
              title="React"
              description="Sıfırdan modern ve bileşen tabanlı arayüzler geliştirmeyi öğren. Props, state, hooks ve gerçek React uygulamalarının çalışma mantığını keşfet."
            />
          </div>
          <div className='column'>
            <Course
              title="Python"
              description="Python temelleriyle başlayıp pratik kod yazımına, veri işleme yöntemlerine ve günlük geliştirme görevlerinde problem çözmeye geçiş yap."
            />
          </div>
          <div className='column'>
            <Course
              title="Diferansiyel Denklemler"
              description="Mühendislik ve bilgisayar bilimlerinde değişimi modellemek için kullanılan temel yöntemleri öğren. Birinci dereceden sistemler ve uygulamalı çözüm tekniklerine hakim ol."
            />
          </div>
          <div className='column'>
            <Course
              title="Mat101"
              description="Algoritmaların, mantığın ve hesaplamanın arkasındaki matematik temeli güçlendir. Bilgisayar bilimi öğrencileri için gerekli konulara sağlam bir giriş yap."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
