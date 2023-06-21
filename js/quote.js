const quotes = [
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "In three words I can sum up everything I've learned: Keep moving forward. - Martin Luther King Jr.",
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Success is not final, failure is not fatal: It's the courage to continue that counts. - Winston Churchill",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
  "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
  "The only thing we have to fear is fear itself. - Franklin D. Roosevelt",
  "The best way to predict the future is to create it. - Peter Drucker",
  "The secret of getting ahead is getting started. - Mark Twain",
  "A journey of a thousand miles begins with a single step. - Lao Tzu",
  "The harder I work, the luckier I get. - Gary Player",
  "It does not matter how slowly you go, as long as you do not stop. - Confucius",
  "Change your thoughts and you change your world. - Norman Vincent Peale",
  "Success is not the key to happiness. Happiness is the key to success. - Albert Schweitzer",
  "The best revenge is massive success. - Frank Sinatra",
  "It's not whether you get knocked down, it's whether you get up. - Vince Lombardi",
  "Dream big and dare to fail. - Norman Vaughan",
  "The way to get started is to quit talking and begin doing. - Walt Disney",
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
];
const quoteContainer = document.querySelector(".quotes-data");
// generate a random quote
function getRandomQuote() {
  var randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

const randomQuote = getRandomQuote();
quoteContainer.innerHTML = `&quot; ${randomQuote} &quot;`;
