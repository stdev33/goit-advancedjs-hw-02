const refs = {
  body: document.body,
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

const colorSwitchInterval = 1000;
let colorSwitchTimerId = -1;

toggleButtonsState(true);
refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  colorSwitchTimerId = startColorSwitcher();
  toggleButtonsState(false);
}

function onStopBtnClick() {
  stopColorSwitcher(colorSwitchTimerId);
  colorSwitchTimerId = -1;
  toggleButtonsState(true);
}

function startColorSwitcher() {
  return setInterval(setRandomBackgroundColor, colorSwitchInterval, refs.body);
}

function stopColorSwitcher(timerId) {
  if (timerId < 0) {
    return;
  }

  clearInterval(timerId);
}

function toggleButtonsState(enabled) {
  refs.startBtn.disabled = !enabled;
  refs.stopBtn.disabled = enabled;
}

function setRandomBackgroundColor(element) {
  element.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
