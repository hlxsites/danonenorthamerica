export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`backgroundimagecolumns-${cols.length}-cols`);

  let idx = 0;
  [...block.children].forEach((row) => {
    [...row.children].forEach((cell) => {
      if (idx % 2 != 0) {
        cell.classList.add('with-background');
        const backPic = cell.querySelector('picture:first-of-type');
        backPic.classList.add('background-image');
        const parent = backPic.parentElement;
        if (parent.tagName === 'P') {
          parent.before(backPic);
          parent.remove();
        }
      }
      idx += 1;
    });
  });
}
