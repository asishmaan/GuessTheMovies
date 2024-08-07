const movies = [
    {
        title: 'inception',
        poster: 'Images/Inception.webp',
        hint: 'A mind-bending thriller directed by Christopher Nolan.',
        director: 'Christopher Nolan',
        options: ['Inception', 'Avatar', 'Titanic', 'The Matrix']
    },
    {
        title: 'avatar',
        poster: 'Images/Avatar.webp',
        hint: 'A sci-fi epic set on the planet Pandora.',
        director: 'James Cameron',
        options: ['Avatar', 'Interstellar', 'Inception', 'Star Wars']
    },
    {
        title: 'titanic',
        poster: 'Images/Titanic.jpg',
        hint: 'A romance that takes place on a doomed ocean liner.',
        director: 'James Cameron',
        options: ['Titanic', 'Casablanca', 'The Godfather', 'Gone with the Wind']
    },
    {
        title: 'the godfather',
        poster: 'Images/TheGodfather.webp',
        hint: 'A classic crime drama directed by Francis Ford Coppola.',
        director: 'Francis Ford Coppola',
        options: ['The Godfather', 'Pulp Fiction', 'Goodfellas', 'Scarface']
    },
    {
        title: 'interstellar',
        poster: 'Images/Interstellar.webp',
        hint: 'A space exploration film directed by Christopher Nolan.',
        director: 'Christopher Nolan',
        options: ['Interstellar', 'Gravity', 'Arrival', '2001: A Space Odyssey']
    },
    {
        title: 'the dark knight',
        poster: 'Images/TheDarkKnight.jpg',
        hint: 'A superhero film featuring Batman, directed by Christopher Nolan.',
        director: 'Christopher Nolan',
        options: ['The Dark Knight', 'The Avengers', 'Spider-Man', 'Iron Man']
    },
    {
        title: 'casablanca',
        poster: 'Images/Casablanca.webp',
        hint: 'A romantic drama set during World War II.',
        director: 'Michael Curtiz',
        options: ['Casablanca', 'Gone with the Wind', 'The Maltese Falcon', 'Citizen Kane']
    },
    {
        title: 'pulp fiction',
        poster: 'Images/PulpFiction.webp',
        hint: 'A nonlinear crime film directed by Quentin Tarantino.',
        director: 'Quentin Tarantino',
        options: ['Pulp Fiction', 'Reservoir Dogs', 'Fight Club', 'The Big Lebowski']
    },
    {
        title: 'the matrix',
        poster: 'Images/TheMatrix.jpg',
        hint: 'A science fiction film that questions reality.',
        director: 'The Wachowskis',
        options: ['The Matrix', 'Inception', 'Dark City', 'Total Recall']
    },
    {
        title: 'star wars',
        poster: 'Images/StarWars.jpg',
        hint: 'A space opera franchise created by George Lucas.',
        director: 'George Lucas',
        options: ['Star Wars', 'Star Trek', 'Battlestar Galactica', 'Dune']
    },
    {
        title: 'fight club',
        poster: 'Images/FightClub.webp',
        hint: 'A psychological drama about a secret club.',
        director: 'David Fincher',
        options: ['Fight Club', 'American Psycho', 'Se7en', 'The Usual Suspects']
    },
    {
        title: 'the shawshank redemption',
        poster: 'Images/TheShawshankRedemption.png',
        hint: 'A film about friendship and hope in prison.',
        director: 'Frank Darabont',
        options: ['The Shawshank Redemption', 'Forrest Gump', 'The Green Mile', 'The Departed']
    },
    {
        title: 'forrest gump',
        poster: 'Images/ForrestGump.jpg',
        hint: 'A story of a man with a low IQ who accomplishes great things.',
        director: 'Robert Zemeckis',
        options: ['Forrest Gump', 'Cast Away', 'The Terminal', 'A Beautiful Mind']
    },
    {
        title: 'gladiator',
        poster: 'Images/Gladiator.webp',
        hint: 'A historical epic about a betrayed Roman general.',
        director: 'Ridley Scott',
        options: ['Gladiator', 'Troy', '300', 'Kingdom of Heaven']
    },
    {
        title: 'jurassic park',
        poster: 'Images/JurassicPark.jpg',
        hint: 'A film about dinosaurs brought back to life.',
        director: 'Steven Spielberg',
        options: ['Jurassic Park', 'King Kong', 'The Lost World', 'Godzilla']
    },
    {
        title: 'jaws',
        poster: 'Images/Jaws.jpg',
        hint: 'A thriller about a giant shark terrorizing a beach town.',
        director: 'Steven Spielberg',
        options: ['Jaws', 'Deep Blue Sea', 'The Meg', 'Piranha']
    }
];

let currentMovieIndex = 0;
let score = 0;
let timer;
const timeLimit = 30; // Time limit for each movie in seconds

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startTimer() {
    let timeRemaining = timeLimit;
    document.getElementById('timer').textContent = `Time: ${timeRemaining}s`;

    timer = setInterval(() => {
        timeRemaining--;
        document.getElementById('timer').textContent = `Time: ${timeRemaining}s`;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            handleTimeUp();
        }
    }, 1000);
}

function handleTimeUp() {
    const resultText = document.getElementById('result');
    resultText.textContent = 'Time is up!';
    resultText.style.color = 'red';
    
    document.getElementById('nextButton').style.display = 'block';

    // Automatically move to the next movie after a delay
    setTimeout(() => {
        currentMovieIndex++;
        if (currentMovieIndex < movies.length) {
            loadMovie();
        } else {
            endGame();
        }
    }, 2000); // 2 seconds delay before moving to the next movie
}

function loadMovie() {
    // Stop the timer and clear any previous result messages
    clearInterval(timer);
    document.getElementById('result').textContent = '';
    document.getElementById('result').style.color = '';

    if (currentMovieIndex === 0) {
        shuffleArray(movies);
    }

    const movie = movies[currentMovieIndex];
    document.getElementById('posterImage').src = movie.poster;

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    // Shuffle options
    shuffleArray(movie.options);

    movie.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option));
        optionsContainer.appendChild(button);
    });

    document.getElementById('hint').textContent = '';
    document.getElementById('nextButton').style.display = 'none';
    document.getElementById('endSection').style.display = 'none';

    startTimer(); // Start a new timer for the new movie
}

function checkAnswer(selectedOption) {
    const movie = movies[currentMovieIndex];
    const resultText = document.getElementById('result');

    if (selectedOption.toLowerCase() === movie.title) {
        resultText.textContent = 'Congratulations! You guessed it right!';
        resultText.style.color = 'green';
        score++;
    } else {
        resultText.textContent = 'Sorry, try again!';
        resultText.style.color = 'red';
    }

    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('nextButton').style.display = 'block';

    // Stop the timer when the answer is checked
    clearInterval(timer);

    // Optionally: Move to the next movie after a short delay
    setTimeout(() => {
        currentMovieIndex++;
        if (currentMovieIndex < movies.length) {
            loadMovie();
        } else {
            endGame();
        }
    }, 2000); // 2 seconds delay before moving to the next movie
}

function endGame() {
    document.getElementById('finalScore').textContent = `Your total score is: ${score}`;
    document.getElementById('endSection').style.display = 'block';
    document.getElementById('posterImage').style.display = 'none';
    document.getElementById('options').style.display = 'none';
    document.getElementById('hintButton').style.display = 'none';
    document.getElementById('score').style.display = 'none';
    document.getElementById('timer').style.display = 'none';
    document.getElementById('nextButton').style.display = 'none';
}

document.getElementById('nextButton').addEventListener('click', function() {
    currentMovieIndex++;
    if (currentMovieIndex < movies.length) {
        loadMovie();
    } else {
        endGame();
    }
});

document.getElementById('hintButton').addEventListener('click', function() {
    const movie = movies[currentMovieIndex];
    const hint = `${movie.hint} (Directed by: ${movie.director})`;
    document.getElementById('hint').textContent = hint;
});

document.getElementById('restartButton').addEventListener('click', function() {
    currentMovieIndex = 0;
    score = 0;
    loadMovie();
    document.getElementById('posterImage').style.display = 'block';
    document.getElementById('options').style.display = 'block';
    document.getElementById('hintButton').style.display = 'block';
    document.getElementById('score').style.display = 'block';
    document.getElementById('timer').style.display = 'block';
    document.getElementById('endSection').style.display = 'none';
});

window.onload = loadMovie;
