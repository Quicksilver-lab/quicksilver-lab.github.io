document.addEventListener('DOMContentLoaded', () => {
    const repoContainer = document.querySelector('.repo-container');
    
    // List of repositories
    const repositories = [
        { name: 'Repo 1', link: 'https://github.com/Quicksilver-lab/repo1' },
        { name: 'Repo 2', link: 'https://github.com/Quicksilver-lab/repo2' },
        { name: 'Repo 3', link: 'https://github.com/Quicksilver-lab/repo3' },
        // Add more repositories here
    ];
    
    // Create buttons for each repository
    repositories.forEach(repo => {
        const button = document.createElement('button');
        button.classList.add('repo-button');
        button.textContent = repo.name;
        button.onclick = () => window.open(repo.link, '_blank');
        repoContainer.appendChild(button);
    });

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
