import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';

function remarkPreserveCodeMeta() {
  return (tree) => {
    const walk = (node) => {
      if (!node || typeof node !== 'object') {
        return;
      }

      if (node.type === 'code' && typeof node.meta === 'string' && node.meta.length > 0) {
        node.data = node.data || {};
        node.data.meta = node.meta;
        node.data.hProperties = node.data.hProperties || {};
        node.data.hProperties.metastring = node.meta;
      }

      if (Array.isArray(node.children)) {
        node.children.forEach(walk);
      }
    };

    walk(tree);
  };
}

function rehypeFixSplitEntities() {
  return (tree) => {
    const walk = (node) => {
      if (!node || typeof node !== 'object') {
        return;
      }

      if (
        node.type === 'element' &&
        node.tagName === 'span' &&
        node.properties &&
        'data-line' in node.properties &&
        Array.isArray(node.children)
      ) {
        for (let index = 0; index < node.children.length - 1; index += 1) {
          const current = node.children[index];
          const next = node.children[index + 1];
          const currentText = current?.children?.[0];
          const nextText = next?.children?.[0];

          if (!currentText || !nextText || currentText.type !== 'text' || nextText.type !== 'text')
            continue;

          if (currentText.value !== '&' || typeof nextText.value !== 'string')
            continue;

          if (nextText.value.startsWith('lt;')) {
            currentText.value = '&lt;';
            nextText.value = nextText.value.slice(3);
          }

          else if (nextText.value.startsWith('gt;')) {
            currentText.value = '&gt;';
            nextText.value = nextText.value.slice(3);
          }

          else if (nextText.value.startsWith('amp;')) {
            currentText.value = '&amp;';
            nextText.value = nextText.value.slice(4);
          }

          else if (
            nextText.value === '#' &&
            node.children[index + 2]?.children?.[0]?.type === 'text' &&
            /^\d+$/.test(node.children[index + 2].children[0].value) &&
            node.children[index + 3]?.children?.[0]?.type === 'text' &&
            node.children[index + 3].children[0].value === ';'
          ) {
            const code = node.children[index + 2].children[0].value;
            currentText.value = `&#${code};`;
            nextText.value = '';
            node.children[index + 2].children[0].value = '';
            node.children[index + 3].children[0].value = '';
          }
        }
      }

      if (Array.isArray(node.children))
        node.children.forEach(walk);
    };

    walk(tree);
  };
}

const mdsvexConfig = {
  extensions: ['.md', '.svx'],
  highlight: false,
  remarkPlugins: [remarkGfm, remarkPreserveCodeMeta],
  rehypePlugins: [
    [
      rehypePrettyCode,
      {
        theme: 'github-dark',
        langs: ['javascript', 'typescript', 'cpp', 'bash', 'json', 'plaintext', 'svelte', 'html', 'css'],
        keepBackground: false,
        defaultLang: {
          block: 'plaintext',
          inline: 'plaintext'
        },
        onVisitLine(node) {
          if (node.children.length === 0) {
            node.children = [{ type: 'text', value: ' ' }];
          }
        }
      }
    ],
    rehypeFixSplitEntities
  ]
};


/** @type {import('@sveltejs/kit').Config} */
const config = {

  extensions: ['.svelte', '.md', '.svx'],

  preprocess: [
    vitePreprocess(),
    mdsvex(mdsvexConfig),
  ],

  kit: {
    adapter: adapter()
  },

};

export default config;
