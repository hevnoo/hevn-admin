<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
    />
    <Editor
      style="height: 400px; overflow-y: hidden"
      v-model="content"
      :defaultConfig="editorConfig"
      @onCreated="handleCreated"
      @on-change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css"; // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted, watch } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { createEditor, createToolbar } from "@wangeditor/editor";

const props = defineProps({
  content: {
    type: String,
    default: "hello",
  },
});
const emits = defineEmits(["sendContentEmit", "sendHtml"]);

// 编辑器实例，必须用 shallowRef
const editorRef: any = shallowRef();

// 内容 HTML
// const valueHtml: any = ref("<p>hello</p>");
let content: any = ref("");
//默认样式
const mode: any = ref("default"); // 或 'simple'

const toolbarConfig = {};
const editorConfig = { placeholder: "请输入内容..." };

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

// 模拟 ajax 异步获取内容
// onMounted(() => {
//   setTimeout(() => {
//     valueHtml.value = "<p>模拟 Ajax 异步设置内容</p>";
//   }, 1500);
// });

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

//onChange监听文本框内容，类似于watch
const handleChange = (editor: any) => {
  // console.log("change:", editor.getHtml());
  // console.log("change:", editor.getText());
  let html = ref(editor.getHtml());
  // content.value = editor.getText();
  emits("sendContentEmit", html.value);
  emits("sendHtml", html.value);
};

//判断父组件传过来的是否为空，不为空则赋值
const isEmpty = () => {
  if (props.content) {
    content.value = props.content;
  }
};
isEmpty();

watch(
  content,
  (val: any) => {
    // emits("sendContentEmit", content.value);
  }
  // {immediate: true, deep: true}
);
</script>

<style scoped lang="scss"></style>
