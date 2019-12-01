const init = () => {
  const headerEl = document.querySelector('.js-header');
  headerEl.addEventListener('click', () => {
    console.log('clicked');
  });
};

export default init;
