const starRating = document.getElementById('rating')
const textArea = document.getElementById('text-area')
const reviewForm = document.getElementById('reviewForm')

let userReview = {
    rating: 0,
    text: '',
    date: new Date(),
}

const startLength = 5;

function starsAvailable() {
    for (let i = 0; i < startLength; i++) {
        const star = document.createElement('i')
        star.classList.add('fa-regular', 'fa-star', 'star_icon')
        star.id = `star-${i + 1}`
        starRating.appendChild(star)
    }
}

starsAvailable();

const allStars = document.querySelectorAll('.star_icon')
// console.log(allStars);

let currentRating = 0;
updateStars = (totalStars) => {
    userReview.rating = totalStars;
    
    allStars.forEach((star, index) => {
            star.classList.toggle('fa-solid', index < totalStars);
            star.classList.toggle('fa-regular', index >= totalStars);
    })    
}

allStars.forEach((star, index) => {
    star.addEventListener('click', () => {
        currentRating = currentRating === index + 1 ? 0 : index + 1;
        updateStars(currentRating);
    })
})

formatDateTime = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    console.log(formattedDate);
    
    const formatter = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const formattedTime = formatter.format(date);
    return `${formattedDate} ${formattedTime}`
}

reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if(currentRating === 0 || textArea.value === '') {
        return ;
    }
    userReview = {
        rating: currentRating,
        text: textArea.value,
        date: formatDateTime()
    }


    const userReviewHTML = `
        <div class="review_content">
            <div class="review_date">
                <img width="15px" src="calender.svg" alt="Calender">
                <span class="date_time_text">${userReview.date}</span>
            </div>
            <div class="review_display">
                <p class="review_paragraph">${userReview.text}</p>
                <span class="rating_number">${userReview.rating}</span>
            </div>
        </div>
    `

    const reviewContainer = document.querySelector('.review-container');
    reviewContainer.insertAdjacentHTML('afterbegin', userReviewHTML);

    textArea.value = '';
    updateStars(0);

    console.log("userReview: ", userReview);

    
})

