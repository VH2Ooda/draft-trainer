import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCmaS0aFRmkXQPR_vnxDipo_OyKHirKXE4",
    authDomain: "draft-trainer-d22f0.firebaseapp.com",
    databaseURL: "https://draft-trainer-d22f0-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "draft-trainer-d22f0",
    storageBucket: "draft-trainer-d22f0.firebasestorage.app",
    messagingSenderId: "949975758587",
    appId: "1:949975758587:web:00adf7088d01dc4ad5625e"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

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

const heroes = [
    { id: '1', name: '', img: 'images/1.png' },
    { id: '2', name: '', img: 'images/2.png' },
    { id: '3', name: '', img: 'images/3.png' },
    { id: '4', name: '', img: 'images/4.png' },
    { id: '5', name: '', img: 'images/5.png' },
    { id: '6', name: '', img: 'images/6.png' },
    { id: '7', name: '', img: 'images/7.png' },
    { id: '8', name: '', img: 'images/8.png' },
    { id: '9', name: '', img: 'images/9.png' },
    { id: '10', name: '', img: 'images/10.png' },
    { id: '11', name: '', img: 'images/11.png' },
    { id: '12', name: '', img: 'images/12.png' },
    { id: '13', name: '', img: 'images/13.png' },
    { id: '14', name: '', img: 'images/14.png' },
    { id: '15', name: '', img: 'images/15.png' },
    { id: '16', name: '', img: 'images/16.png' },
    { id: '17', name: '', img: 'images/17.png' },
    { id: '18', name: '', img: 'images/18.png' },
    { id: '19', name: '', img: 'images/19.png' },
    { id: '20', name: '', img: 'images/20.png' },
    { id: '21', name: '', img: 'images/21.png' },
    { id: '22', name: '', img: 'images/22.png' },
    { id: '23', name: '', img: 'images/23.png' },
    { id: '24', name: '', img: 'images/24.png' },
    { id: '25', name: '', img: 'images/25.png' },
    { id: '26', name: '', img: 'images/26.png' },
    { id: '27', name: '', img: 'images/27.png' },
    { id: '28', name: '', img: 'images/28.png' },
    { id: '29', name: '', img: 'images/29.png' },
    { id: '30', name: '', img: 'images/30.png' },
    { id: '31', name: '', img: 'images/31.png' },
    { id: '32', name: '', img: 'images/32.png' },
    { id: '33', name: '', img: 'images/33.png' },
    { id: '34', name: '', img: 'images/34.png' },
    { id: '35', name: '', img: 'images/35.png' },
    { id: '36', name: '', img: 'images/36.png' },
    { id: '37', name: '', img: 'images/37.png' },
    { id: '38', name: '', img: 'images/38.png' },
    { id: '39', name: '', img: 'images/39.png' },
    { id: '40', name: '', img: 'images/40.png' },
    { id: '41', name: '', img: 'images/41.png' },
    { id: '42', name: '', img: 'images/42.png' },
    { id: '43', name: '', img: 'images/43.png' },
    { id: '44', name: '', img: 'images/44.png' },
    { id: '45', name: '', img: 'images/45.png' },
    { id: '46', name: '', img: 'images/46.png' },
    { id: '47', name: '', img: 'images/47.png' },
    { id: '48', name: '', img: 'images/48.png' },
    { id: '49', name: '', img: 'images/49.png' },
    { id: '50', name: '', img: 'images/50.png' },
    { id: '51', name: '', img: 'images/51.png' },
    { id: '52', name: '', img: 'images/52.png' },
    { id: '53', name: '', img: 'images/53.png' },
    { id: '54', name: '', img: 'images/54.png' },
    { id: '55', name: '', img: 'images/55.png' },
    { id: '56', name: '', img: 'images/56.png' },
    { id: '57', name: '', img: 'images/57.png' },
    { id: '58', name: '', img: 'images/58.png' },
    { id: '59', name: '', img: 'images/59.png' }
];

let currentStep = 0;
let lastData = null;

// Элементы для тултипа (описания)
const grid = document.getElementById('heroes-grid');
const tooltip = document.getElementById('hero-tooltip');
const tooltipImg = document.getElementById('tooltip-img');

if (grid) {
    heroes.forEach(hero => {
        const card = document.createElement('div');
        card.className = 'hero-card';
        card.style.backgroundImage = `url(${hero.img})`;
        card.id = `hero-${hero.id}`;
        card.title = hero.name;

        // Логика наведения мыши
        card.onmouseenter = (e) => {
            if (tooltipImg) tooltipImg.src = `images/desc/${hero.id}.png`;
            if (tooltip) tooltip.style.display = 'block';
        };

      card.onmousemove = (e) => {
            if (tooltip) {
                const gap = 20; // Отступ по горизонтали
                const tWidth = tooltip.offsetWidth;
                const tHeight = tooltip.offsetHeight;

                // 1. Центрируем по вертикали относительно курсора
                let top = e.clientY - (tHeight / 2); 
                
                // 2. Позиция по горизонтали (справа от курсора)
                let left = e.clientX + gap;

                // --- ПРОВЕРКИ ГРАНИЦ ---

                // Если уходит за ПРАВЫЙ край — перекидываем влево
                if (left + tWidth > window.innerWidth) {
                    left = e.clientX - tWidth - gap;
                }

                // Если уходит за НИЖНИЙ край — прижимаем к низу
                if (top + tHeight > window.innerHeight) {
                    top = window.innerHeight - tHeight - 10;
                }

                // Если уходит за ВЕРХНИЙ край — прижимаем к верху
                if (top < 10) {
                    top = 10;
                }

                tooltip.style.left = left + 'px';
                tooltip.style.top = top + 'px';
            }
        };

        card.onmouseleave = () => {
            if (tooltip) tooltip.style.display = 'none';
        };

        card.onclick = () => {
            if (currentStep < draftSequence.length) {
                const isTaken = lastData && lastData.history && 
                                Object.values(lastData.history).some(a => a.heroId === hero.id);
                if (isTaken) return;

                const step = draftSequence[currentStep];
                set(ref(db, 'draft/history/' + currentStep), {
                    heroId: hero.id,
                    cap: step.cap,
                    type: step.type
                });
                set(ref(db, 'draft/currentStep'), currentStep + 1);
            }
        };
        grid.appendChild(card);
    });
}

onValue(ref(db, 'draft'), (snapshot) => {
    const data = snapshot.val();
    lastData = data; 
    
    document.querySelectorAll('.hero-card').forEach(card => {
        card.classList.remove('banned', 'picked');
    });
    
    ['cap1-picks', 'cap1-bans', 'cap2-picks', 'cap2-bans'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = '';
    });

    if (!data) {
        currentStep = 0;
        updateUI();
        return;
    }

    currentStep = data.currentStep || 0;

    if (data.history) {
        Object.values(data.history).forEach(act => {
            const el = document.getElementById(`hero-${act.heroId}`);
            if (el) el.classList.add(act.type === 'ban' ? 'banned' : 'picked');

            const heroData = heroes.find(h => h.id === act.heroId);
            if (heroData) {
                const miniIcon = document.createElement('div');
                miniIcon.className = `mini-card ${act.type}`;
                miniIcon.style.backgroundImage = `url(${heroData.img})`;
                const container = document.getElementById(`cap${act.cap}-${act.type}s`);
                if (container) container.appendChild(miniIcon);
            }
        });
    }
    updateUI();
});

function updateUI() {
    const info = document.getElementById('turn-info');
    const action = document.getElementById('current-action');
    
    if (!info || !action) return;

    if (currentStep < draftSequence.length) {
        const next = draftSequence[currentStep];
        const isBan = next.type === 'ban';
        const typeClass = isBan ? 'type-ban' : 'type-pick';
        const typeText = isBan ? 'БАН' : 'ПИК';

        // Формируем HTML через классы CSS
        let html = `
            <div class="turn-main">
                Очередь: Капитан ${next.cap} 
                <span class="${typeClass}">(${typeText})</span>
            </div>
        `;
        
        if (currentStep + 1 < draftSequence.length) {
            const future = draftSequence[currentStep + 1];
            const fTypeText = future.type === 'ban' ? 'БАН' : 'ПИК';
            const fTypeClass = future.type === 'ban' ? 'type-ban' : 'type-pick';

            html += `
                <div class="turn-next">
                    Далее: Капитан ${future.cap} <span class="${fTypeClass}" style="font-size: 0.9em;">(${fTypeText})</span>
                </div>
            `;
        } else {
            html += `<div class="turn-next" style="color: gold;">Финальный ход!</div>`;
        }

        info.innerHTML = html;
        action.innerText = "Идет выбор...";
    } else {
        action.innerText = "ДРАФТ ЗАВЕРШЕН";
        info.innerHTML = "<div class='turn-main' style='color: #4dff4d;'>УДАЧИ В ИГРЕ!</div>";
    }
}

const rb = document.getElementById('reset-btn');
if (rb) {
    rb.onclick = () => {
        if (confirm("Сбросить драфт?")) {
            set(ref(db, 'draft'), { currentStep: 0, history: {} });
        }
    };
}
