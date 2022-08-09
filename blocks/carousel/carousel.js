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
  const imgDiv = block.querySelector(':scope>div>div:nth-child(1)');
  const textDiv = block.querySelector(':scope>div>div:nth-child(2)');

  imgDiv.querySelectorAll(':scope ol>picture').forEach((item) => {
    const parent = item.parentNode;
    const wrapper = document.createElement('li');
    parent.replaceChild(wrapper, item);
    wrapper.appendChild(item);
  });

  const selectControl = document.createElement('ol');
  selectControl.classList.add('select-control');
  let idx = 0;
  imgDiv.querySelectorAll(':scope ol>li').forEach((item) => {
    idx += 1;
    item.classList.add('invisible');
    item.setAttribute('data-idx', idx);
    const selectControlItem = document.createElement('li');
    selectControlItem.classList.add('dot');
    selectControlItem.setAttribute('data-control-idx', idx);
    selectControlItem.addEventListener('click', switchCorouselIdx);
    selectControl.appendChild(selectControlItem);
  });

  idx = 0;
  textDiv.querySelectorAll(':scope ol>li').forEach((item) => {
    idx += 1;
    item.classList.add('invisible');
    item.setAttribute('data-idx', idx);
  });
  imgDiv.querySelector(':scope ol>li:nth-child(1)').classList.remove('invisible');
  textDiv.querySelector(':scope ol>li:nth-child(1)').classList.remove('invisible');
  imgDiv.querySelector(':scope ol>li:nth-child(1)').classList.add('visible');
  textDiv.querySelector(':scope ol>li:nth-child(1)').classList.add('visible');
  selectControl.querySelector(':scope li:nth-child(1)').classList.add('selected');

  textDiv.appendChild(selectControl);
}
