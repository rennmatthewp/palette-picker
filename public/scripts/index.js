const blocks = [
  { color: '#FFF', locked: false },
  { color: '#FFF', locked: false },
  { color: '#FFF', locked: false },
  { color: '#FFF', locked: false },
  { color: '#FFF', locked: false }
];

const generateHexCode = () => {
  const chars = '0123456789ABCDEF';
  let hexCode = '#';
  for (let i = 0; i < 6; i++) {
    hexCode += chars[Math.floor(Math.random() * 16)];
  }
  return hexCode;
};

const generatePalette = () => {
  blocks.forEach((block, index) => {
    if (block.locked === false) {
      const hexCode = generateHexCode();
      block.color = hexCode;
      $(`.block-${index}`).css('background-color', hexCode);
      $(`.block-${index}-hex`).text(hexCode);
    }
  });
};

const toggleLock = ({ target }) => {
  blocks[target.id].locked = !blocks[target.id].locked;
  $(target).find('i').toggleClass('fa-unlock fa-lock');
};

$(document).keyup(e => {
  if (e.which === 32 && e.target === document.body) {
    generatePalette();
  }
});

$('.color-block').click(toggleLock);
