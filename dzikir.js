const header = document.getElementById('header')
const arabic = document.getElementById('arabic')
const counter = document.getElementById('counter')
const arabic_read = document.getElementById('arabic_read')
const translation = document.getElementById('translation')
const faedah = document.getElementById('faedah')
const note = document.getElementById('note')
const p = document.getElementById('page')

const loadData = (e) => {
  header.textContent = ''
  arabic.textContent = ''
  counter.textContent = ''
  arabic_read.textContent = ''
  translation.textContent = ''
  faedah.textContent = ''
  note.textContent = ''

  p.textContent = currentIdx;

  fetch('/data/'+pageName+'/'+currentIdx+'.json')
    .then(res => res.json())
    .then(dzikir => {
      if (dzikir.header) {
        header.innerHTML = dzikir.header;
      }
      arabic.textContent = dzikir.arabic
      if (dzikir.counter) {
        counter.innerHTML = '<small>dibaca ' + dzikir.counter + 'x</small>'
      }
      arabic_read.textContent = dzikir.arabic_read
      
      if (dzikir.translation) {
        translation.innerHTML = '<b>Artinya:</b><p class="translation">'+dzikir.translation+'</p>'
      }
      
      if (dzikir.faedah) {
        faedah.innerHTML = '<b>Faedah</b><p>'+dzikir.faedah+'</p>'
      }

      dzikir.sources.forEach(source => {
        note.innerHTML += '<sup>'+source+'</sup>'
      })

    })
  }

let mouseEvent = { timer: 0, intervalId: null };
function handleKeydown(event) {
  let key = event.key;
  if (key === "ArrowRight") next();
  if (key === "ArrowLeft") prev();
}

function handleClick(event) {
  const centerXScreenPos = window.innerWidth / 2;

  event.x > centerXScreenPos ? next() : prev();
}

function handleMouseDown(event) {
  mouseEvent.intervalId = setInterval(() => {
    mouseEvent.timer = mouseEvent.timer + 1;
  }, 1);
}

function handleMouseUp(event) {
  let isHoldClick = mouseEvent.timer > 50;
  if (!isHoldClick) handleClick(event);

  clearInterval(mouseEvent.intervalId);
  mouseEvent.timer = 0;
}

const prev = () => {
  if (currentIdx > 1) {
    currentIdx = currentIdx - 1;
    loadData()
  }
};

const next = () => {
  if (currentIdx < maxPage) {
    currentIdx = currentIdx + 1;
    loadData()
  }
};
window.addEventListener("load", loadData);
window.addEventListener("click", handleClick);
window.addEventListener("mouseDown", handleMouseDown);
window.addEventListener("mouseUp", handleMouseUp);
