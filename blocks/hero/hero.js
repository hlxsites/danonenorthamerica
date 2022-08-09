export default async function decorate(block) {
    block.querySelectorAll('picture').forEach((picture) => {
      // remove parent p for next p search to find real first p.
      const parent = picture.parentElement;
      if (parent.tagName === 'P') {
        parent.before(picture);
        parent.remove();
      }
    });
}