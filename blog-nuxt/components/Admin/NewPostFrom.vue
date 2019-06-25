<template>
  <section class="new-post">
    <div class="container">
      <form @submit.prevent="onSubmit">
        <AppInput v-model="post.title">Title:</AppInput>
        <AppInput v-model="post.descr">Descr:</AppInput>
        <AppInput v-model="post.img">Img Link:</AppInput>

        <div class="content-label">
          <div class="switch">
            <span>HTML</span>

            <input v-model="isMD" @click="changeLang" class="hide" id="toggle" type="checkbox">
            <label for="toggle" class="toggle_label"></label>

            <span>MD</span>
          </div>

          <label class="label">Content:</label>
        </div>
        <div class="editor">
          <!-- <AppTextArea v-show="isMD" class="editor_block" v-model="post.content"> Content: </AppTextArea> -->
          <!-- <textarea class="editor_block" v-model="post.content"></textarea> -->

          <!-- HTML -->
          <no-ssr placeholder="Codemirror Loading...">
            <codemirror
              v-if="!isMD"
              class="editor_block"
              v-model="textHtml"
              :options="cmOption"
            ></codemirror>
          </no-ssr>

          <!-- MD -->
          <no-ssr placeholder="Codemirror Loading...">
            <codemirror
              v-if="isMD"
              class="editor_block"
              v-model="textMd"
              :options="cmOptionMd"
            ></codemirror>
          </no-ssr>


          <div class="preview editor_block" v-html="toMd(post.content)"></div>
        </div>
        <!-- buttons -->
        <div class="controls">
          <AppButton class="btnDanger" @click.prevent="cancel">Cancel</AppButton>
          <AppButton @click="onSubmit">Save</AppButton>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
const marked = require('marked');

// if (process.client){
//           const TurndownService = require('turndown');
//           let turndownService = new TurndownService();
//         }
// if (process.client) {


//   console.log('123');
// }


// if (process.client) {
//   const TurndownService = require('turndown');
// let turndownService = new TurndownService();

// // Use the turndown method from the created instance
// // to convert the first argument (HTML string) to Markdown
// let markdown = turndownService.turndown('<h1>Hello world!</h1>');

// }
    // console.log('2', html);
// let TurndownService;

// if (process.browser) {
//   TurndownService = require('turndown');
// }

export default {
  props: {
    postEdit: {
      type: Object,
      requreid: false
    }
  },
  mounted () {
    // let turndownService = new TurndownService();

    // let markdown = turndownService.turndown('<h1>Hello world!</h1>');

    // console.log(markdown);
  },
  data() {
    return {
      post: this.postEdit ? { ...this.postEdit } : {
        title: "",
        descr: "",
        img: "",
        content: ""
      },
      isMD: false,
      textHtml: '',
      textMd: '',
      cmOption: {
        tabSize: 2,
        foldGutter: true,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        keyMap: "sublime",
        mode: "htmlmixed",
        theme: "default"
      },
      cmOptionMd: {
        tabSize: 2,
        foldGutter: true,
        styleActiveLine: true,
        line: true,
        lineNumbers: true,
        lineWrapping: false,
        keyMap: "sublime",
        mode: "text/x-markdown",
        theme: "default"
      }
    };
  },
  // <div style="padding: 40px"><h1>Header</h1></div>
  watch: {
    textHtml(val) {
      this.post.content = this.textHtml
    },
    textMd(val) {
      this.post.content = marked(val);
    },
  },
  methods: {
    onSubmit() {
      this.$emit("submit", this.post);
    },
    cancel() {
      this.$router.push("/admin/");
    },
    toMd(val) {
      // console.log(marked(val));
      return marked(val);
    },
    changeLang() {
      if(this.isMD) {
        this.textHtml = marked(this.textMd);
        this.post.content = this.textHtml
      } else {
          // this.textMd = turndownService.turndown(this.textHtml);
        this.textMd = this.textHtml;
        console.log('123');
        this.post.content = this.textHtml
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.controls {
  margin: 20px 0;

  text-align: center;
}
.editor {
  display: flex;
  justify-content: space-between;
}
.editor_block {
  width: 50%;
  border-radius: 0;
  resize: none;
}
.content-label {
  display: flex;
  margin-bottom: 14px;
  .label {
    margin-bottom: 0;
    flex-grow: 0.8;
  }
}
.switch {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
}
.preview {
  overflow-y: auto;
  height: 300px !important;
  padding: 20px !important;

  background-color: #ffffff;
  border: 1px solid #dcdfe6;
}

// Пеpеключатель
$circ: 28px;
$color: #4b40e3;
$switch-height: 28px;

.hide {
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  padding: 0;
  position: absolute;
  width: 1px;
}

.toggle_label {
  display: inline-block;
  position: relative;
  cursor: pointer;
  outline: none;
  user-select: none;
  padding: 2px;
  width: $switch-height * 2.3;
  height: $switch-height;
  border-radius: $switch-height/2;
  background: #ffffff;
  border: 1px solid #dcdfe6;
  transition: box-shadow 0.4s;
  margin-bottom: 0;

  &:after {
    display: block;
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    bottom: 0;
    margin: auto 0;
    width: $circ;
    height: $circ;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    transition: background 0.4s, left 0.4s, height 0.2s, width 0.2s;
  }
}

input:checked + label {
  box-shadow: inset 0 0 0 $switch-height tint($color, 50%);
}

label:active:after,
input:checked + label:active:after {
  height: $switch-height/1.1;
  width: $switch-height * 1.2;
}

input:checked + label:after {
  left: calc(100% - #{$circ});
  background: $color;
}
</style>
