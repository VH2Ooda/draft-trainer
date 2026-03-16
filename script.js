// 1. Импорт функций Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// 2. Твои настройки
const firebaseConfig = {
  apiKey: "AIzaSyCmaS0aFRmkXQPR_vnxDipo_OyKHirKXE4",
  authDomain: "draft-trainer-d22f0.firebaseapp.com",
  databaseURL: "https://draft-trainer-d22f0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "draft-trainer-d22f0",
  storageBucket: "draft-trainer-d22f0.firebasestorage.app",
  messagingSenderId: "949975758587",
  appId: "1:949975758587:web:00adf7088d01dc4ad5625e"
};

// Инициализация
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 3. Твоя последовательность драфта (24 шага)
const draftSequence = [
    { cap: 1, type: 'ban' }, { cap: 1, type: 'ban' },
    { cap: 2, type: 'ban' }, { cap: 2, type: 'ban' },
    { cap: 2, type: 'pick' }, { cap: 1, type: 'pick' },
    { cap: 2, type: 'pick' }, { cap: 1, type: 'pick' },
    { cap: 1, type: 'ban' }, { cap: 2, type: 'ban' },
    { cap: 1, type: 'ban' }, { cap: 2, type: 'ban' },
    { cap: 1, type: 'pick' }, { cap: 1, type: 'pick' },
    { cap: 2, type: 'pick' }, { cap: 2, type: 'pick' },
    { cap: 1, type: 'ban' }, { cap: 1, type: 'ban' },
    { cap: 2, type: 'ban' }, { cap: 2, type: 'ban' },
    { cap: 2, type: 'pick' }, { cap: 1, type: 'pick' },
    { cap: 2, type: 'pick' }, { cap: 1, type: 'pick' }
];

// 4. Твой массив персонажей
const heroes = [
   { id: '1', name: 'Бомбер', img: 'images/1.png' },
    { id: '2', name: 'Лучник', img: 'images/2.png' },
    { id: '3', name: 'Мечник', img: 'images/3.png' },
    { id: '4', name: 'Берсерк', img: 'images/4.png' },
    { id: '5', name: 'Везунчик', img: 'images/5.png' },
    { id: '6', name: 'Гладиатор', img: 'images/6.png' },
    { id: '7', name: 'Алхимик', img: 'images/7.png' },
    { id: '8', name: 'Титан', img: 'images/8.png' },
    { id: '9', name: 'Ловкач', img: 'images/9.png' },
    { id: '10', name: 'Мастер оружия', img: 'images/10.png' },
    { id: '11', name: 'Асасин', img: 'images/11.png' },
    { id: '12', name: 'Азартный', img: 'images/12.png' },
    { id: '13', name: 'Бережный', img: 'images/13.png' },
    { id: '14', name: 'Реинкарнатор', img: 'images/14.png' },
    { id: '15', name: 'Собиратель', img: 'images/15.png' },
    { id: '16', name: 'Охотник на монстров', img: 'images/16.png' },
    { id: '17', name: 'Вампир', img: 'images/17.png' },
    { id: '18', name: 'Иглогриф', img: 'images/18.png' },
    { id: '19', name: 'Головорез', img: 'images/19.png' },
    { id: '20', name: 'ОЗС', img: 'images/20.png' },
    { id: '21', name: 'Кузнец', img: 'images/21.png' },
    { id: '22', name: 'Джин', img: 'images/22.png' },
    { id: '23', name: 'Барахольщик', img: 'images/23.png' },
    { id: '24', name: 'Дубликант', img: 'images/24.png' },
    { id: '25', name: 'Библиотекарь', img: 'images/25.png' },
    { id: '26', name: 'Лекарь', img: 'images/26.png' },
    { id: '27', name: 'Древний', img: 'images/27.png' },
    { id: '28', name: 'Мясник', img: 'images/28.png' },
    { id: '29', name: 'ОНД', img: 'images/29.png' },
    { id: '30', name: 'Снежный человек', img: 'images/30.png' },
    { id: '31', name: 'Мастер тетевы', img: 'images/31.png' },
    { id: '32', name: 'Паладин', img: 'images/32.png' },
    { id: '33', name: 'Пират', img: 'images/33.png' },
    { id: '34', name: 'Горгона', img: 'images/34.png' },
    { id: '35', name: 'Вурдалак', img: 'images/35.png' },
    { id: '36', name: 'Голем', img: 'images/36.png' },
    { id: '37', name: 'Громозверь', img: 'images/37.png' },
    { id: '38', name: 'Наваха', img: 'images/38.png' },
    { id: '39', name: 'Брик', img: 'images/39.png' },
    { id: '40', name: 'Арес', img: 'images/40.png' },
    { id: '41', name: 'Леший', img: 'images/41.png' },
    { id: '42', name: 'Скаробей', img: 'images/42.png' },
    { id: '43', name: 'Фенрир', img: 'images/43.png' },
    { id: '44', name: 'Сетх', img: 'images/44.png' },
    { id: '45', name: 'Хоккай', img: 'images/45.png' },
    { id: '46', name: 'КП', img: 'images/46.png' },
    { id: '47', name: 'Зехир', img: 'images/47.png' },
    { id: '48', name: 'Ведьмак', img: 'images/48.png' },
    { id: '49', name: 'Варден', img: 'images/49.png' },
    { id: '50', name: 'Зелиген', img: 'images/50.png' },
    { id: '51', name: 'Велес', img: 'images/51.png' },
    { id: '52', name: 'Хранитель лаберинтов', img: 'images/52.png' },
    { id: '53', name: 'Люр', img: 'images/53.png' },
    { id: '54', name: 'Феникс', img: 'images/54.png' },
    { id: '55', name: 'Сирена', img: 'images/55.png' },
    { id: '56', name: 'Эреб', img: 'images/56.png' },
    { id: '57', name: 'Ледяной король', img: 'images/57.png' }
];

let currentStep = 0;

// 5. Отрисовка героев
const grid = document.getElementById('heroes-grid');
heroes.forEach(hero => {
    const card = document.createElement('div');
    card.className = 'hero-card';
    card.style.backgroundImage = `url(${hero.img})`;
    card.title = hero.name;
    card.id = `hero-${hero.id}`;
    
    card.onclick = () => {
        if (currentStep < draftSequence.length) {
            const step = draftSequence[currentStep];
            // Отправляем выбор в базу
            set(ref(db, 'draft/history/' + currentStep), {
                heroId: hero.id,
                cap: step.cap,
                type: step.type
            });
            // Переходим к следующему шагу в базе
            set(ref(db, 'draft/currentStep'), currentStep + 1);
        }
    };
    grid.appendChild(card);
});

// 6. Слушатель изменений в базе (синхронизация)
onValue(ref(db, 'draft'), (snapshot) => {
    const data = snapshot.val();
    if (!data) return;

    currentStep = data.currentStep || 0;

    // Сбрасываем стили всех карточек перед обновлением
    document.querySelectorAll('.hero-card').forEach(c => c.className = 'hero-card');

    // Помечаем выбранных героев
    if (data.history) {
        Object.values(data.history).forEach(act => {
            const el = document.getElementById(`hero-${act.heroId}`);
            if (el) el.classList.add(act.type === 'ban' ? 'banned' : 'picked');
        });
    }

    // Обновляем текст хода
    const info = document.getElementById('turn-info');
    if (currentStep < draftSequence.length) {
        const next = draftSequence[currentStep];
        info.innerText = `Очередь: Капитан ${next.cap} (${next.type === 'ban' ? 'БАН' : 'ПИК'})`;
    } else {
        info.innerText = "Драфт окончен!";
    }
});
