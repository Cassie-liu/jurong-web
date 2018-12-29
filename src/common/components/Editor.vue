<template>
  <div class="editor" :id="elementContainerId">
    <textarea class="form-control input-sm" :id="elementId" rows="5"
              v-model.trim="value" maxlength="20000"></textarea>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/inlite/theme';
import $ from 'jquery';

export default {
  name: 'editor',
  props: ['elementId', 'value', 'width'],
  data () {
    return {
      valuePopulated: false,
      focused: false
    };
  },
  computed: {
    elementContainerId () {
      return this.elementId + 'Editor';
    }
  },
  watch: {
    value () {
      // if (this.valuePopulated) {
      //   return
      // }
      setTimeout(() => {
        // If the editor is not focused, update the editor content with new value.
        // This is to prevent the updated value replaced the editor's content during
        // writing.
        if (!this.focused) {
          let editor = tinymce.get(this.elementId)
          // Prevent setting content to null dom
          if (editor.dom) {
            editor.setContent(this.value, { format: 'raw' });
          }
        }
      }, 200);
      // this.valuePopulated = true
    }
  },
  mounted () {
    const $editor = $('#' + this.elementContainerId).addClass('focus');
    tinymce.baseURL = '/static/lib/tinymce';
    tinymce.init({
      selector: '#' + this.elementId,
      elementpath: false,
      width: this.width || 600,
      resize: false,
      statusbar: false,
      menubar: false,
      plugins: ['link', 'paste', 'preview', 'table', 'code', 'textcolor', 'image', 'lists', 'wordcount'],
      toolbar: [
        'bold italic underline strikethrough | forecolor backcolor | bullist numlist | indent outdent | link image table | blockquote | removeformat preview code'
      ],
      setup: (ed) => {
        ed.on('change', (e) => {
          this.$emit('input', ed.getContent());
        });
        ed.on('focus', (e) => {
          $editor.addClass('focus');
          this.focused = true;
        });
        ed.on('blur', (e) => {
          $editor.removeClass('focus');
          this.focused = false;
        });
        setTimeout(() => {
          $editor.removeClass('focus');
          this.focused = false;
        }, 0);
      },
      content_css: '/lib/rich-content.css'
    });
  },
  beforeDestroy () {
    let editor = tinymce.get(this.elementId);
    if (editor) {
      editor.remove();
    }
  }
};
</script>
