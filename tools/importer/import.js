/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-console, class-methods-use-this */

const createMetadata = (main, document) => {
  const meta = {};

  const title = document.querySelector('title');
  if (title) {
    meta.Title = title.innerHTML.replace(/[\n\t]/gm, '');
  }

  const desc = document.querySelector('[property="og:description"]');
  if (desc) {
    meta.Description = desc.content;
  }

  const date = document.querySelector('[property="article:published_time"]');
  if (date) {
    meta['Publication Date'] = date.content.substring(0, date.content.indexOf('T'));
  }

  const author = main.querySelector('[rel="author"]');
  if (author) {
    meta.Author = author;
  }
  
  const img = document.querySelector('[property="og:image"]');
  if (img) {
    const el = document.createElement('img');
    el.src = img.content;
    meta.Image = el;
  }

  const block = WebImporter.Blocks.getMetadataBlock(document, meta);
  main.append(block);

  return meta;
};

const createNewsBlocks = (main, document) => {
  main.querySelectorAll('.brackets_news').forEach((news) => {
    const rows = [];

    rows.push(['News']);

    news.querySelectorAll('li').forEach((li) => {
      const a = li.querySelector('a');
      if (a) {
        const date = li.querySelector('label');
        if (date) {
          a.before(date);
        }
        const p = li.querySelector('p');
        if (p) {
          a.before(p);
        }
        a.innerHTML = a.href;
      }
      rows.push([li.innerHTML]);
    });

    news.replaceWith(WebImporter.DOMUtils.createTable(rows, document));
  });

};

const makeAbsoluteLinks = (main) => {
  main.querySelectorAll('a').forEach((a) => {
    if (a.href.startsWith('/')) {
      const ori = a.href;
      const u = new URL(WebImporter.FileUtils.sanitizePath(a.href), 'https://main--danonenorthamerica--hlxsites.hlx.live/');

      a.href = u.toString().replace('wp-content', 'pdf');
      if (ori.endsWith('/')) {
        a.href += '/';
      }

      if (a.textContent === ori) {
        a.textContent = a.href;
      }
    }
  });
};

export default {
  /**
   * Apply DOM operations to the provided document and return
   * the root element to be then transformed to Markdown.
   * @param {HTMLDocument} document The document
   * @returns {HTMLElement} The root element
   */
  transformDOM: ({ document}) => {
    WebImporter.DOMUtils.remove(document, [
      '.main-nav',
      'footer',
      '.cta-block'
    ]);

    const main = document.querySelector('main');
    if (!main) { 
      return document.body;
    }

    createMetadata(main, document);
    createNewsBlocks(main, document);
    makeAbsoluteLinks(main);

    return main;
  },

  /**
   * Return a path that describes the document being transformed (file name, nesting...).
   * The path is then used to create the corresponding Word document.
   * @param {String} url The url of the document being transformed.
   * @param {HTMLDocument} document The document
   */
  // eslint-disable-next-line arrow-body-style
  generateDocumentPath: ({ url }) => {
    const path = new URL(url).pathname;
    const sanitized = WebImporter.FileUtils.sanitizePath(path);

    if (path.endsWith('/')) {
      return `${sanitized}/index`;
    }
    return sanitized;
  },
};