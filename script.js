
const paragraf = [
  "Hai ka Melania Azmita",
  "Aku cuma mau bilang sesuatu, mungkin kakak sudah tau perasaan ku ke kakak.",
  "Tapi belakangan ini hati ku lebih berbinar lagi, ya walaupun kata kata tidak mempan pada kakak ku.",
  "Aku juga ga tau proses nya kakak ku, entah dari kapan aku mulai menyukai mu kakak ku sayang.",
  "Tapi aku cuman mau bilang I LOVE YOU ka Mel",
  "Jadi yaaa mungkin ini beresiko besar, cuman aku mau menyatakan perasaan ku ke kamu kakak ku sayang",
  "Maukah kamu jadi pacarku? ❤️"
];

const startButton = document.getElementById("startButton");
const paragrafContainer = document.getElementById("paragraf-container");
const playMusic = document.getElementById("playMusic");
const backgroundMusic = document.getElementById("backgroundMusic");

startButton.addEventListener("click", async () => {
  startButton.style.display = "none";
  playMusic.style.display = "none";

  for (let i = 0; i < paragraf.length; i++) {
    paragrafContainer.style.opacity = 0;
    await new Promise(r => setTimeout(r, 300));
    paragrafContainer.innerHTML = paragraf[i];
    paragrafContainer.style.opacity = 1;
    await new Promise(r => setTimeout(r, 5000));
  }

  showConfessionPopup();
});

playMusic.addEventListener("click", () => {
  fadeInMusic(backgroundMusic);
});

function showConfessionPopup() {
  Swal.fire({
    title: 'Maukah Kamu Menjadi Pacarku Kakak?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Ya, aku mau 💖',
    denyButtonText: 'Belum waktunya 😔',
    cancelButtonText: 'Maaf, tidak bisa 🙁',
    allowOutsideClick: false,
    allowEscapeKey: false
  }).then((result) => {
    if (result.isConfirmed) {
      sendToWhatsApp("Ya, aku mau jadi pacarmu 💖");
      restartPage();
    } else if (result.isDenied) {
      getAlasan("Belum waktunya, alasanku: ");
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      getAlasan("Maaf, aku tidak bisa. Alasanku: ");
    }
  });
}

function getAlasan(prefix) {
  Swal.fire({
    title: 'Tulis alasanmu ya 😢',
    input: 'textarea',
    inputPlaceholder: 'Alasanku...',
    showCancelButton: false,
    confirmButtonText: 'Kirim ke WhatsApp',
    allowOutsideClick: false,
    allowEscapeKey: false,
    preConfirm: (value) => {
      if (!value || value.trim() === "") {
        Swal.showValidationMessage('Alasan tidak boleh kosong 🙏');
        return false;
      }
      return value;
    }
  }).then((res) => {
    if (res.isConfirmed) {
      sendToWhatsApp(prefix + res.value);
      restartPage();
    }
  });
}

function sendToWhatsApp(pesan) {
  const nomor = "6281275751928"; // Ganti dengan nomormu
  const url = `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;
  window.open(url, '_blank');
}

function restartPage() {
  setTimeout(() => {
    location.reload();
  }, 1000);
}

function createLoveRain() {
  const loveRain = document.getElementById('loveRain');

  setInterval(() => {
    const love = document.createElement('div');
    love.classList.add('love');
    love.style.left = Math.random() * 100 + "vw";
    love.style.animationDuration = (Math.random() * 2 + 3) + "s";
    loveRain.appendChild(love);

    setTimeout(() => {
      love.remove();
    }, 5000);
  }, 300);
}

function fadeInMusic(audio) {
  let volume = 0.0;
  audio.volume = volume;
  audio.play();

  const fade = setInterval(() => {
    if (volume < 1.0) {
      volume += 0.02;
      audio.volume = Math.min(volume, 1.0);
    } else {
      clearInterval(fade);
    }
  }, 100);
}

document.addEventListener("DOMContentLoaded", () => {
  createLoveRain();
});
