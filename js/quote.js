const quotes = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
  "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
];

// generate a random quote
function getRandomQuote() {
  var randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

const randomQuote = getRandomQuote();
console.log(randomQuote);
