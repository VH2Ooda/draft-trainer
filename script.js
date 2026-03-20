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

const heroes = Array.from({ length: 59 }, (_, i) => ({
    id: (i + 1).toString(),
    name: '', 
    img: `images/${i + 1}.png`
}));

let currentStep = 0;
let lastData = null;

const grid = document.getElementById('heroes-grid');
const tooltip = document.getElementById('hero-tooltip');
const tooltipImg = document.getElementById('tooltip-img');

if (grid) {
    heroes.forEach(hero => {
        const card = document.createElement('div');
        card.className = 'hero-card';
        card.style.backgroundImage = `url(${hero.img})`;
        card.id = `hero-${hero.id}`;

        card.onmouseenter = () => {
            if (tooltipImg) tooltipImg.src = `images/desc/${hero.id}.png`;
            if (tooltip) tooltip.style.display = 'block';
        };

        card.onmousemove = (e) => {
            if (tooltip) {
                const gap = 20;
                const tWidth = tooltip.offsetWidth;
                const tHeight = tooltip.offsetHeight;
                let top = e.clientY - (tHeight / 2); 
                let left = e.clientX + gap;

                if (left + tWidth > window.innerWidth) left = e.clientX - tWidth - gap;
                if (top + tHeight > window.innerHeight) top = window.innerHeight - tHeight - 10;
                if (top < 10) top = 10;

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
    
    document.querySelectorAll('.hero-card').forEach(card => card.classList.remove('banned', 'picked'));
    ['cap1-picks', 'cap1-bans', 'cap2-picks', 'cap2-bans'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = '';
    });

    if (!data || !data.history) {
        currentStep = 0;
    } else {
        currentStep = data.currentStep || 0;
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
    const actionEl = document.getElementById('current-action');
    const infoEl = document.getElementById('turn-info');
    const nextInfoEl = document.getElementById('next-turn-info');

    if (currentStep < draftSequence.length) {
        const current = draftSequence[currentStep];
        const typeRu = current.type === 'ban' ? 'БАН' : 'ПИК';
        
        if (actionEl) actionEl.innerText = "Идет выбор...";
        if (infoEl) {
            infoEl.innerText = `Сейчас выбирает: Капитан ${current.cap} (${typeRu})`;
            infoEl.style.color = current.type === 'ban' ? '#ff4d4d' : '#4dff4d';
        }

        if (nextInfoEl) {
            const next = draftSequence[currentStep + 1];
            if (next) {
                const nextTypeRu = next.type === 'ban' ? 'БАН' : 'ПИК';
                nextInfoEl.innerText = `Следующий: Капитан ${next.cap} (${nextTypeRu})`;
            } else {
                nextInfoEl.innerText = "Последний выбор!";
            }
        }
    } else {
        if (actionEl) actionEl.innerText = "ДРАФТ ОКОНЧЕН";
        if (infoEl) {
            infoEl.innerText = "Все герои распределены";
            infoEl.style.color = "white";
        }
        if (nextInfoEl) nextInfoEl.innerText = "";
    }
}

// Кнопка сброса
const resetBtn = document.getElementById('reset-btn');
if (resetBtn) {
    resetBtn.onclick = () => {
        if (confirm("Сбросить весь драфт?")) {
            set(ref(db, 'draft'), { currentStep: 0, history: {} });
        }
    };
}
