const firebaseConfig = {
  apiKey: "AIzaSyCmaS0aFRmkXQPR_vnxDipo_OyKHirKXE4",
  authDomain: "draft-trainer-d22f0.firebaseapp.com",
  databaseURL: "https://draft-trainer-d22f0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "draft-trainer-d22f0",
  storageBucket: "draft-trainer-d22f0.firebasestorage.app",
  messagingSenderId: "949975758587",
  appId: "1:949975758587:web:00adf7088d01dc4ad5625e"
};

// Список персонажей CSC
const heroes = [
    { id: '1', name: 'Бомбер', img: 'icons/1.png' },
    { id: '2', name: 'Лучник', img: 'icons/2.png' },
    { id: '3', name: 'Мечник', img: 'icons/3.png' },
    { id: '4', name: 'Берсерк', img: 'icons/4.png' },
    { id: '5', name: 'Везунчик', img: 'icons/5.png' },
    { id: '6', name: 'Гладиатор', img: 'icons/6.png' },
    { id: '7', name: 'Алхимик', img: 'icons/7.png' },
    { id: '8', name: 'Титан', img: 'icons/8.png' },
    { id: '9', name: 'Ловкач', img: 'icons/9.png' },
    { id: '10', name: 'Мастер оружия', img: 'icons/10.png' },
    { id: '11', name: 'Асасин', img: 'icons/11.png' },
    { id: '12', name: 'Азартный', img: 'icons/12.png' },
    { id: '13', name: 'Бережный', img: 'icons/13.png' },
    { id: '14', name: 'Реинкарнатор', img: 'icons/14.png' },
    { id: '15', name: 'Собиратель', img: 'icons/15.png' },
    { id: '16', name: 'Охотник на монстров', img: 'icons/16.png' },
    { id: '17', name: 'Вампир', img: 'icons/17.png' },
    { id: '18', name: 'Иглогриф', img: 'icons/18.png' },
    { id: '19', name: 'Головорез', img: 'icons/19.png' },
    { id: '20', name: 'ОЗС', img: 'icons/20.png' },
    { id: '21', name: 'Кузнец', img: 'icons/21.png' },
    { id: '22', name: 'Джин', img: 'icons/22.png' },
    { id: '23', name: 'Барахольщик', img: 'icons/23.png' },
    { id: '24', name: 'Дубликант', img: 'icons/24.png' },
    { id: '25', name: 'Библиотекарь', img: 'icons/25.png' },
    { id: '26', name: 'Лекарь', img: 'icons/26.png' },
    { id: '27', name: 'Древний', img: 'icons/27.png' },
    { id: '28', name: 'Мясник', img: 'icons/28.png' },
    { id: '29', name: 'ОНД', img: 'icons/29.png' },
    { id: '30', name: 'Снежный человек', img: 'icons/30.png' },
    { id: '31', name: 'Мастер тетевы', img: 'icons/31.png' },
    { id: '32', name: 'Паладин', img: 'icons/32.png' },
    { id: '33', name: 'Пират', img: 'icons/33.png' },
    { id: '34', name: 'Горгона', img: 'icons/34.png' },
    { id: '35', name: 'Вурдалак', img: 'icons/35.png' },
    { id: '36', name: 'Голем', img: 'icons/36.png' },
    { id: '37', name: 'Громозверь', img: 'icons/37.png' },
    { id: '38', name: 'Наваха', img: 'icons/38.png' },
    { id: '39', name: 'Брик', img: 'icons/39.png' },
    { id: '40', name: 'Арес', img: 'icons/40.png' },
    { id: '41', name: 'Леший', img: 'icons/41.png' },
    { id: '42', name: 'Скаробей', img: 'icons/42.png' },
    { id: '43', name: 'Фенрир', img: 'icons/43.png' },
    { id: '44', name: 'Сетх', img: 'icons/44.png' },
    { id: '45', name: 'Хоккай', img: 'icons/45.png' },
    { id: '46', name: 'КП', img: 'icons/46.png' },
    { id: '47', name: 'Зехир', img: 'icons/47.png' },
    { id: '48', name: 'Ведьмак', img: 'icons/48.png' },
    { id: '49', name: 'Варден', img: 'icons/49.png' },
    { id: '50', name: 'Зелиген', img: 'icons/50.png' },
    { id: '51', name: 'Велес', img: 'icons/51.png' },
    { id: '52', name: 'Хранитель лаберинтов', img: 'icons/52.png' },
    { id: '53', name: 'Люр', img: 'icons/53.png' },
    { id: '54', name: 'Феникс', img: 'icons/54.png' },
    { id: '55', name: 'Сирена', img: 'icons/55.png' },
    { id: '56', name: 'Эреб', img: 'icons/56.png' },
    { id: '57', name: 'Ледяной король', img: 'icons/57.png' }
];

// Функция для отрисовки сетки
const grid = document.getElementById('heroes-grid');

heroes.forEach(hero => {
    const card = document.createElement('div');
    card.className = 'hero-card';
    card.style.backgroundImage = `url(${hero.img})`;
    card.title = hero.name;
    
    card.onclick = () => {
        console.log('Выбран герой:', hero.name);
        // Здесь будет логика отправки в Firebase
    };
    
    grid.appendChild(card);
});
