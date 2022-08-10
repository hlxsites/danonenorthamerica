function switchCorouselIdx(event) {
  const { target } = event;
  const parent = target.parentNode;
  parent.querySelectorAll(':scope li').forEach((item) => {
    item.classList.remove('selected');
  });
  target.classList.add('selected');
  const idx = target.getAttribute('data-control-idx');
  const block = target.closest('.block.carousel');
  block.querySelectorAll(':scope .visible').forEach((item) => {
    item.classList.remove('visible');
    item.classList.add('invisible');
  });
  block.querySelectorAll(`:scope [data-idx="${idx}"]`).forEach((item) => {
    item.classList.remove('invisible');
    item.classList.add('visible');
  });
}
export default function decorate(block) {
  const mainDiv = document.createElement('div');
  const imgDiv = document.createElement('div');
  const textDiv = document.createElement('div');
  const imgOl = document.createElement('ol');
  const textOl = document.createElement('ol');
  const selectControl = document.createElement('ol');
  selectControl.classList.add('select-control');

  block.querySelectorAll(':scope>div').forEach((divItem, idx) => {
    if (idx == 0) {
      textDiv.appendChild(divItem.querySelector(':scope picture'));
      textDiv.appendChild(divItem.querySelector(':scope h2'));
      textDiv.appendChild(divItem.querySelector(':scope h4'));
    } else {
      const imgItem = document.createElement('li');
      if (idx == 1) {
        imgItem.classList.add('visible');
      } else {
        imgItem.classList.add('invisible');
      }

      imgItem.setAttribute('data-idx', idx);
      imgItem.appendChild(divItem.querySelector(':scope picture'));
      imgOl.appendChild(imgItem);

      const txtItem = document.createElement('li');
      if (idx == 1) {
        txtItem.classList.add('visible');
      } else {
        txtItem.classList.add('invisible');
      }

      txtItem.setAttribute('data-idx', idx);
      txtItem.appendChild(divItem.querySelector(':scope div:last-of-type'));
      textOl.appendChild(txtItem);

      const selectControlItem = document.createElement('li');
      selectControlItem.classList.add('dot');
      if (idx == 1) {
        selectControlItem.classList.add('selected');
      }
      selectControlItem.setAttribute('data-control-idx', idx);
      selectControlItem.addEventListener('click', switchCorouselIdx);
      selectControl.appendChild(selectControlItem);
    }
  });

  imgDiv.appendChild(imgOl);
  textDiv.appendChild(textOl);
  textDiv.appendChild(selectControl);
  mainDiv.appendChild(imgDiv);
  mainDiv.appendChild(textDiv);
  block.innerHTML = '';
  block.appendChild(mainDiv);
}
