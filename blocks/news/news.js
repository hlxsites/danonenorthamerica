export default async function decorate(block) {
  block.querySelectorAll('a').forEach(a => {
    a.innerHTML = 'Read more';
    a.parentElement.classList.remove('button-container');
    a.classList.remove('button', 'primary');
  });
}