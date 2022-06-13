# React에서 Webpack
--설치--
```
npm i -D @babel/preset-env @babel/preset-react babel-loader html-webpack-plugin style-loader mini-css-extract-plugin css-loader webpack webpack-cli webpack-dev-server
```
<code>@babel/preset-env</code>: ES6+문법을 ES5로 바꿔준다.

<code>@babel/preset-react</code>: jsx 해석해준다.

<code>html-webpack-plugin</code>: html파일에 파일들을 붙여준다.

<code>style-loader</code>: 스타일을 DOM에 넣어준다.

<code>mini-css-extract-plugin</code>: css를 별도의 파일로 추출한다. css가 사용될때 불러와지므로 최적화에 용의하다.

<code>css-loader</code>: js에서 css를 import할 수 있게 해준다.

<code>webpack</code>: webpack 내장 객체이용, webpack을 js로 만들때 필요하다.( 현재는 webpack없어도 돌아간다. )

<code>webpack-cli</code>: webpack을 cli환경에서 사용할 수 있게 해준다.

<code>webpack-dev-server</code>: webpack 개발용 서버를 사용할 수 있게 해준다.

--package.json--
```javascript
  "scripts": {
    "dev": "webpack serve",
    "build": "webpack --env port=3000 --env production"
  }
```

## 참고
[Webpack 공식](https://webpack.js.org/)
[Babel 공식](https://babeljs.io/)
[Webpack 러닝 가이드](https://yamoo9.gitbook.io/webpack/)
[Poiemaweb](https://poiemaweb.com/)