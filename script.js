// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ID Store Data
const idData = [
    {
        id: 1,
        name: "Heroic Grandmaster Account",
        thumbnail: "https://i.imgur.com/JXjDLsK.png",
        rank: "Heroic",
        price: "₹2,499",
        features: ["Grandmaster Rank", "100+ Skins", "Diamonds: 50K+"]
    },
    {
        id: 2,
        name: "Elite Pass Account",
        thumbnail: "https://i.imgur.com/8XKaDSr.png",
        rank: "Grandmaster",
        price: "₹1,999",
        features: ["Elite Pass S24", "80+ Skins", "Diamonds: 30K+"]
    },
    {
        id: 3,
        name: "Pro Player Account",
        thumbnail: "https://i.imgur.com/JXjDLsK.png",
        rank: "Master",
        price: "₹1,499",
        features: ["Master Rank", "60+ Skins", "Diamonds: 20K+"]
    },
    {
        id: 4,
        name: "Diamond Account",
        thumbnail: "https://i.imgur.com/8XKaDSr.png",
        rank: "Diamond",
        price: "₹999",
        features: ["Diamond Rank", "40+ Skins", "Diamonds: 15K+"]
    },
    {
        id: 5,
        name: "Platinum Account",
        thumbnail: "https://i.imgur.com/JXjDLsK.png",
        rank: "Platinum",
        price: "₹699",
        features: ["Platinum Rank", "25+ Skins", "Diamonds: 10K+"]
    },
    {
        id: 6,
        name: "Gold Account",
        thumbnail: "https://i.imgur.com/8XKaDSr.png",
        rank: "Gold",
        price: "₹499",
        features: ["Gold Rank", "15+ Skins", "Diamonds: 5K+"]
    }
];

// Populate ID Store
function populateIDStore() {
    const idGrid = document.getElementById('idGrid');
    
    idData.forEach(id => {
        const idCard = document.createElement('div');
        idCard.className = 'id-card';
        idCard.innerHTML = `
            <img src="${id.thumbnail}" alt="${id.name}" class="id-thumbnail">
            <div class="id-info">
                <h3>${id.name}</h3>
                <span class="rank-badge">${id.rank}</span>
                <div class="id-price">${id.price}</div>
                <ul class="id-features">
                    ${id.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <button class="btn btn-primary buy-now" data-id="${id.id}">Buy Now</button>
            </div>
        `;
        idGrid.appendChild(idCard);
    });
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const idGrid = document.getElementById('idGrid');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const idCards = idGrid.querySelectorAll('.id-card');

        idCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const rank = card.querySelector('.rank-badge').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || rank.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Sort functionality
function setupSort() {
    const sortSelect = document.getElementById('sortBy');
    const idGrid = document.getElementById('idGrid');

    sortSelect.addEventListener('change', (e) => {
        const sortBy = e.target.value;
        const idCards = Array.from(idGrid.querySelectorAll('.id-card'));

        idCards.sort((a, b) => {
            const priceA = parseInt(a.querySelector('.id-price').textContent.replace(/[^0-9]/g, ''));
            const priceB = parseInt(b.querySelector('.id-price').textContent.replace(/[^0-9]/g, ''));
            const rankA = a.querySelector('.rank-badge').textContent;
            const rankB = b.querySelector('.rank-badge').textContent;

            switch (sortBy) {
                case 'price-low':
                    return priceA - priceB;
                case 'price-high':
                    return priceB - priceA;
                case 'rank':
                    const rankOrder = { 'Heroic': 1, 'Grandmaster': 2, 'Master': 3, 'Diamond': 4, 'Platinum': 5, 'Gold': 6 };
                    return rankOrder[rankA] - rankOrder[rankB];
                default:
                    return 0;
            }
        });

        idGrid.innerHTML = '';
        idCards.forEach(card => idGrid.appendChild(card));
    });
}

// Form submission
function setupForm() {
    const inquiryForm = document.getElementById('inquiryForm');
    
    inquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate form submission
        alert('Thank you for your inquiry! We will get back to you soon.');
        inquiryForm.reset();
    });
}

// Live chat functionality
function setupLiveChat() {
    const liveChatBtn = document.getElementById('liveChatBtn');
    const chatWidget = document.getElementById('chatWidget');
    const closeChat = document.getElementById('closeChat');
    const chatInput = document.getElementById('chatInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');

    liveChatBtn.addEventListener('click', () => {
        chatWidget.style.display = 'flex';
    });

    closeChat.addEventListener('click', () => {
        chatWidget.style.display = 'none';
    });

    sendMessage.addEventListener('click', sendChatMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });

    function sendChatMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            const userMessage = document.createElement('div');
            userMessage.className = 'message user';
            userMessage.innerHTML = `<p>${message}</p>`;
            chatMessages.appendChild(userMessage);

            // Simulate bot response
            setTimeout(() => {
                const botMessage = document.createElement('div');
                botMessage.className = 'message bot';
                botMessage.innerHTML = `<p>Thanks for your message! Our team will respond shortly.</p>`;
                chatMessages.appendChild(botMessage);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);

            chatInput.value = '';
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    populateIDStore();
    setupSearch();
    setupSort();
    setupForm();
    setupLiveChat();
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// Add CSS for loading animation
const style = document.createElement('style');
style.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .id-card {
        animation: fadeInUp 0.6s ease forwards;
        opacity: 0;
        transform: translateY(20px);
    }
    
    .id-card:nth-child(1) { animation-delay: 0.1s; }
    .id-card:nth-child(2) { animation-delay: 0.2s; }
    .id-card:nth-child(3) { animation-delay: 0.3s; }
    .id-card:nth-child(4) { animation-delay: 0.4s; }
    .id-card:nth-child(5) { animation-delay: 0.5s; }
    .id-card:nth-child(6) { animation-delay: 0.6s; }
    
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.id-card, .feature, .review-card').forEach(el => {
    observer.observe(el);
});

// Add CSS for scroll animations
const scrollStyle = document.createElement('style');
scrollStyle.textContent = `
    .animate {
        animation: slideInUp 0.6s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(scrollStyle);

// Performance optimization
window.addEventListener('load', () => {
    // Lazy load images
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
});

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';
