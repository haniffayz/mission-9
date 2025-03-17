const cardContainer = document.querySelector(".card-container");
const card = document.querySelector(".card");
const audio = new Audio("mission-audio.mp3"); // Ganti dengan path file audio yang sesuai
const ttsButton = document.querySelector(".speak-btn"); // Tombol Text-to-Speech
let isSpeaking = false;

// Memastikan audio diputar terus-menerus
audio.loop = true;

// Fungsi untuk membalik kartu
function flipCard() {
    // Jangan balik kartu jika sedang menjalankan Text-to-Speech
    if (isSpeaking) return;

    card.classList.toggle("flipped");

    if (card.classList.contains("flipped")) {
        audio.play();
    } else {
        audio.pause();
        audio.currentTime = 0; // Reset audio saat kartu kembali ke depan
    }
}

// Fungsi untuk Text-to-Speech
function speakText(event) {
    event.stopPropagation(); // Mencegah event klik dari elemen lain (mencegah kartu balik)

    if (isSpeaking) {
        window.speechSynthesis.cancel(); // Hentikan suara lama sebelum memulai yang baru
    }

    const text = document.querySelector(".question").innerText;
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "id-ID";
    speech.rate = 1;

    isSpeaking = true;
    audio.pause(); // Pause backsound saat Text-to-Speech mulai

    // Event ketika suara selesai berbicara
    speech.onend = function () {
        isSpeaking = false;
        audio.play(); // Putar kembali backsound setelah selesai
    };

    window.speechSynthesis.speak(speech);
}

// Event Listener untuk tombol Text-to-Speech
ttsButton.addEventListener("click", speakText);
