# React에서 Webpack
## 설치
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

## Configuration
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = (env) => {
  const isProd = env.production;
  const PORT = env.port ?? 3000;

  return {
  mode: isProd ? 'production' : 'development',
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[contenthash:8].css',
      chunkFilename: 'assets/css/[name].[contenthash:8].chunk.css',
    }),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, './public/index.html')})
  ],
  devServer: {
    port: PORT,
    hot: true,
    static: {
      directory: path.resolve(__dirname, './public'),
    },
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'assets/js/[name].[contenthash:8].js',
  }

}};
```
<code>env</code>: webpack.config.js는 객체를 리턴하는 함수나, 객체를 반환해야 한다. webpack-cli로 --env 명령어가 있다. 이때 입력한 환경변수를 쓰려면, env라는 매개변수를 가지는 함수를 반환해야 한다.

<code>mode</code>: <code>'development' | 'production' | 'none'</code> 이렇게 세 가지 값을 받는다. 값이 <code>production</code>인 경우 webpack 자체에서 최적화를 한다.

<code>entry</code>: 코드의 의존성을 파악하는 시작점이다.

<code>module</code>: 모듈을 처리하는 방법을 정의한다.

<code>module.rules</code>: Rule을 같는 배열이다. <code>Rule[]</code>

> <code>Rule</code>: 모듈에 규칙을 적용하는 객체이다.

<code>Rule.test</code>: 테스트를 통과한 모듈만 규칙을 수행하게 한다.

<code>Rule.exclude</code>: 해당 예외에 속하는 모듈은 규칙을 무시한다.

<code>Rule.use</code>: 파일을 사전처리하는 <code>loader</code>를 추가하는 프로퍼티이다. <code>UseEntry[]</code>배열을 가지는 구조이며, **오른쪽에서 왼쪽, 아래서 위 순서로 로더를 적용한다.** 위의 경우 <code>css-loader</code>가 먼저 적용되고 난 뒤, <code>style-loader</code>가 적용된다. 아래 <code>Rule.loader</code>도 마찬가지다.

> <code>UseEntry</code>: <code>loader</code>, <code>options</code> 프로퍼티를 가지며, <code>loader</code>의 종류와 옵션을 정해줄 수 있다.

<code>Rule.loader</code>: <code>Rule.use</code>의 Shortcut으로 <code>UseEntry.loader</code>외에 다른 프로퍼티를 사용하지 않을 때, <code>['style-loader','css-loader']</code>

<code>plugins</code>: 플러그인은 로더가 할 수 없는 다양한 것들을 수행하게 해준다.

<code>HtmlWebpackPlugin</code>: <code>HtmlWebpackPlugin.template</code>에 경로가 지정된 html파일에, entry에서 나온 chunk(파일)을 합쳐주는 플러그인이다.

**HtmlWebpackPlugin 사용시 필수**
```
npm i -D html-webpack-plugin
```

<code>MiniCssExtractPlugin</code>: css를 파일로 묶는 플러그인이다.

**MiniCssExtractPlugin 사용시 필수**
```
npm i -D mini-css-extract-plugin
```

<code>devServer</code>: 개발용 서버의 구성을 설정한다. <code>webpack serve</code>명령어로 실행가능하다. 파일을 따로 생성하지 않고 메모리에서 자원을 사용하므로 속도가 더 빠르다.

**devServer 사용시 필수**
```
npm i -D webpack-dev-server
```

<code>devServer.port</code>: port를 설정한다. <code>string | number | 'auto'</code>

<code>devServer.hot</code>: 파일이 변경되면 자동으로 추적해서 재실행한다.

<code>devServer.static</code>: 개발서버가 작동할때, 정적 영역을 설정해준다.

<code>output</code>: <code>webpack</code>명령어 실행시, 파일을 처리하는 방식을 설정한다.

추가적으로 babel의 경우 <code>.babelrc</code> 파일을 만들지 않고 <code>babel-loader</code>의 옵션을 적용해서 처리할 수 있다.

## 실행 명령어
**package.json**
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