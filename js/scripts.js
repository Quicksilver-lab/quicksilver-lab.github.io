document.addEventListener('DOMContentLoaded', () => {
    const repoContainer = document.querySelector('.repo-container');
    const username = 'Quicksilver-lab'; // Your GitHub username

    // Fetch repositories from GitHub
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                repoContainer.innerHTML = '<p>No repositories found.</p>';
            } else {
                data.forEach(repo => {
                    createRepoCard(repo);
                });
            }
        })
        .catch(error => console.error('Error fetching repositories:', error));

    function createRepoCard(repo) {
        const card = document.createElement('div');
        card.classList.add('repo-card');
        
        const cardTitle = document.createElement('h3');
        cardTitle.textContent = repo.name;
        card.appendChild(cardTitle);
        
        const cardDescription = document.createElement('p');
        cardDescription.textContent = repo.description || 'No description available';
        card.appendChild(cardDescription);
        
        const cardLink = document.createElement('a');
        cardLink.href = repo.html_url;
        cardLink.textContent = 'View Repository';
        cardLink.target = '_blank';
        card.appendChild(cardLink);
        
        repoContainer.appendChild(card);
    }

    // Intersection Observer for scroll animations
    const elementsToAnimate = document.querySelectorAll('header, .intro, #search-bar, .repo-container, footer');
    const observerOptions = {
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elementsToAnimate.forEach(element => observer.observe(element));
});

function filterRepos() {
    const input = document.getElementById('search-bar').value.toLowerCase();
    const cards = document.querySelectorAll('.repo-card');
    
    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        if (title.includes(input) || description.includes(input)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}
