# Brainstorm

Brainstorm is a simple app written in Vue.js. It's a brainstorming app which allow user to input words and then download resulting text. It supports word count limit and time limit modes.

[Demo](https://zezic.github.io/brainstorm/)

## Usage

Add Vue dependency to your site:

```html
<script src="https://unpkg.com/vue@2.6.10/dist/vue.min.js"></script>
```

Upload file [Brainstorm.umd.min.js](dist/Brainstorm.umd.min.js) somewhere to your site and load it with the next code:
```html
<script src="/path/to/the/Brainstorm.umd.min.js"></script>
```

Prepare an element in the desired place of your page like this:
```html
<div id="brainstorm">
  <brainstorm></brainstorm>
</div>
```
And finally to activate plugin mount it to that element:
```html
<script>
new Vue({
  components: {
    brainstorm: Brainstorm
  }
}).$mount('#brainstorm')
</script>
```

## Development

[Vue CLI](https://cli.vuejs.org/) is required to develop/build this app.

Clone the repository and cd into it:
```bash
git clone git@github.com:zezic/brainstorm.git
cd brainstorm
```

Install dependencies:
```bash
npm install # or yarn
```

Serve Vue with hot reload:
```bash
vue serve src/Brainstorm.vue
```

Generate distributive:
```bash
vue build --target lib --name Brainstorm src/Brainstorm.vue
cp demo-template.html dist/index.html
```

Push changes to repository and demo to gh-pages branch:
```bash
git commit -a -m "Commit title"
git push
git subtree push --prefix dist origin gh-pages
```
