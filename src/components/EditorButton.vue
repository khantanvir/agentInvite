<template>
  <div class="editor-button-wrappper">
    <div v-if="editor">
      <button
        :class="{ 'is-active': editor.isActive('bold') }"
        @click.prevent="editor.chain().focus().toggleBold().run()"
      >
        bold
      </button>
      <button
        :class="{ 'is-active': editor.isActive('italic') }"
        @click.prevent="editor.chain().focus().toggleItalic().run()"
      >
        italic
      </button>
      <button
        :class="{ 'is-active': editor.isActive('strike') }"
        @click.prevent="editor.chain().focus().toggleStrike().run()"
      >
        strike
      </button>
      <button
        :class="{ 'is-active': editor.isActive('code') }"
        @click.prevent="editor.chain().focus().toggleCode().run()"
      >
        code
      </button>
      <button @click.prevent="editor.chain().focus().unsetAllMarks().run()">clear marks</button>
      <button @click.prevent="editor.chain().focus().clearNodes().run()">clear nodes</button>
      <button
        :class="{ 'is-active': editor.isActive('paragraph') }"
        @click.prevent="editor.chain().focus().setParagraph().run()"
      >
        paragraph
      </button>
      <button
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        @click.prevent="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      >
        h1
      </button>
      <button
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        @click.prevent="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      >
        h2
      </button>
      <button
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        @click.prevent="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      >
        h3
      </button>
      <button
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
        @click.prevent="editor.chain().focus().toggleHeading({ level: 4 }).run()"
      >
        h4
      </button>
      <button
        :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
        @click.prevent="editor.chain().focus().toggleHeading({ level: 5 }).run()"
      >
        h5
      </button>
      <button
        :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
        @click.prevent="editor.chain().focus().toggleHeading({ level: 6 }).run()"
      >
        h6
      </button>
      <button
        :class="{ 'is-active': editor.isActive('bulletList') }"
        @click.prevent="editor.chain().focus().toggleBulletList().run()"
      >
        bullet list
      </button>
      <button
        :class="{ 'is-active': editor.isActive('orderedList') }"
        @click.prevent="editor.chain().focus().toggleOrderedList().run()"
      >
        ordered list
      </button>
      <button
        :class="{ 'is-active': editor.isActive('codeBlock') }"
        @click.prevent="editor.chain().focus().toggleCodeBlock().run()"
      >
        code block
      </button>
      <button
        :class="{ 'is-active': editor.isActive('blockquote') }"
        @click.prevent="editor.chain().focus().toggleBlockquote().run()"
      >
        blockquote
      </button>
      <button @click.prevent="editor.chain().focus().setHorizontalRule().run()">
        horizontal rule
      </button>
      <button @click.prevent="editor.chain().focus().setHardBreak().run()">hard break</button>
      <button @click.prevent="editor.chain().focus().undo().run()">undo</button>
      <button @click.prevent="editor.chain().focus().redo().run()">redo</button>
    </div>
    <editor-content :editor="editor" />
  </div>
</template>

<script>
export default {
  props: {
    editor: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style lang="scss">
/* Basic editor styles */
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }
}
</style>
