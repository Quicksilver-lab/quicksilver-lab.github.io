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
                    createRepoButton(repo);
                });
            }
        })
        .catch(error => console.error('Error fetching repositories:', error));

    function createRepoButton(repo) {
        const button = document.createElement('button');
        button.classList.add('repo-button');
        button.textContent = repo.name;
        button.onclick = () => window.open(repo.html_url, '_blank');
        repoContainer.appendChild(button);
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
    const buttons = document.querySelectorAll('.repo-button');
    
    buttons.forEach(button => {
        const text = button.textContent.toLowerCase();
        if (text.includes(input)) {
            button.style.display = '';
        } else {
            button.style.display = 'none';
        }
    });
}
