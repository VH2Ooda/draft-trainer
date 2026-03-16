// Список персонажей CSC
const heroes = [
    { id: '1', name: 'Бомбер', img: '1' },
    { id: '2', name: 'Лучник', img: '2' },
    { id: '3', name: 'Мечник', img: '3' },
    { id: '4', name: 'Берсерк', img: '4' },
    { id: '5', name: 'Везунчик', img: '5' },
    { id: '6', name: 'Гладиатор', img: '6' },
    { id: '7', name: 'Алхимик', img: '7' },
    { id: '8', name: 'Титан', img: '8 },
  { id: '9', name: 'Ловкач', img: '9' },
  { id: '10', name: 'Мастер оружия', img: '10' },
  { id: '11', name: 'Асасин', img: '11' },
  { id: '12', name: 'Азартный', img: '12' },
  { id: '13', name: 'Бережный', img: '13' },
  { id: '14', name: 'Реинкарнатор', img: '14' },
  { id: '15', name: 'Собиратель', img: '15' },
  { id: '16', name: 'Охотник на монстров', img: '16' },
  { id: '17', name: 'Вампир', img: '17' },
  { id: '18', name: 'Иглогриф', img: '18' },
  { id: '19', name: 'Головорез', img: '19' },
  { id: '20', name: 'ОЗС', img: '20' },
  { id: '21', name: 'Кузнец', img: '21' },
  { id: '22', name: 'Джин', img: '22' },
  { id: '23', name: 'Барахольщик', img: '23' },
  { id: '24', name: 'Дубликант', img: '24' },
  { id: '25', name: 'Библиотекарь', img: '25' },
  { id: '26', name: 'Лекарь', img: '26' },
  { id: '27', name: 'Древний', img: '27' },
  { id: '28', name: 'Мясник', img: '28' },
  { id: '29', name: 'ОНД', img: '29' },
  { id: '30', name: 'Снежный человек', img: '30' },
  { id: '31', name: 'Мастер тетевы', img: '31' },
  { id: '32', name: 'Паладин', img: '32' },
  { id: '33', name: 'Пират', img: '33' },
  { id: '34', name: 'Горгона', img: '34' },
  { id: '35', name: 'Вурдалак', img: '35' },
  { id: '36', name: 'Голем', img: '36' },
  { id: '37', name: 'Громозверь', img: '37' },
  { id: '38', name: 'Наваха', img: '38' },
  { id: '39', name: 'Брик', img: '39' },
  { id: '40', name: 'Арес', img: '40' },
  { id: '41', name: 'Леший', img: '41' },
  { id: '42', name: 'Скаробей', img: '42' },
  { id: '43', name: 'Фенрир', img: '43' },
  { id: '44', name: 'Сетх', img: '44' },
  { id: '45', name: 'Хоккай', img: '45' },
  { id: '46', name: 'КП', img: '46' },
  { id: '47', name: 'Зехир', img: '47' },
  { id: '48', name: 'Ведьмак', img: '48' },
  { id: '49', name: 'Варден', img: '49' },
  { id: '50', name: 'Зелиген', img: '50' },
  { id: '51', name: 'Велес', img: '51' },
  { id: '52', name: 'Хранитель лаберинтов', img: '52' },
  { id: '53', name: 'Люр', img: '53' },
  { id: '54', name: 'Феникс', img: '54' },
  { id: '55', name: 'Сирена', img: '55' },
  { id: '56', name: 'Эреб', img: '56' },
  { id: '57', name: 'Ледяной король', img: '57' },
    // Добавьте сюда всех остальных по аналогии
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
