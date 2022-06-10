# Webpack-practice
webpack을 사용하는 방법을 알아보자.

## Webpack이 무엇인가?
**Webpack은 자바스크립트 애플리케이션을 위한 정적 모듈 번들러 이다.**

하나 이상의 entry를 통해서 내부적으로 dependency graph를 만들고

그리고 나서 프로젝트에 필요한 모든 모듈을 하나 이상의 번들로 결합한다.

위의 정의를 동작 순서로 나타내보자.

**동작 순서**

1. <code>entry</code>에서 설정한 진입점에서 파일을 읽기 시작한다.
2. javascript파일의 <code>import</code>,<code>require()</code> 등을 통해 어떤 파일이 연관이 있는지 파악한다.
3. dependency graph를 만든다.
4. <code>output</code>에서 설정한 결과로 파일을 나눈다. 나눈 파일을 번들이라고 한다.

이때 <code>entry</code>와 <code>output</code>은 뒤에나오는 webpack.config.js의 속성이다.


## Webpack 아무런 설정없이 설치 및 실행

설치
```
npm i -D webpack webpack-cli
```

실행
```
npx webpack ./index.js
```

위에서 처럼, Webpack 버전 4.0.0부터는 config 파일을 만들지 않고 사용이 가능하지만,

우리가 커스터마이징 하려면 config 파일을 관리해야 한다.


## Webpack 컨셉
6가지의 컨셉을 기본으로 하고있다.

<code>Entry</code>, <code>Output</code>, <code>Loaders</code>, <code>Plugins</code>, <code>Mode</code>, <code>Browser Compatibility</code>

### Entry
dependency graph를 구축하기 위해, 어디서 시작할지 시작점을 정의하는 구간

entry가 없으면 기본값으로 <code>./src/index.js</code>가 된다.
```javascript
module.exports = {
  entry: './path/to/my/entry/file.js',
}
```
[practiceentry]: https://github.com/wnsrl1204/Webpack-practice/Entry.md
[Entry 더보기][practiceentry]


### Output
Webpack이 생성하는 번들을 어디에 보내고, 어떤 이름을 지정할지 정의하는 구간

output이 없으면 기본값으로 메인파일은 <code>./dist/main.js</code>, 나머지 파일의 경우 <code>./dist</code> 된다.

```javascript
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js',
  }
}
```

**참고**
> <code>path</code>모듈은 core Node.js module로 노드가 기본으로 가지는 모듈이다.
> 
> <code>__dirname</code>은 Node 전역변수이다.

[practiceoutput]: https://github.com/wnsrl1204/Webpack-practice/Output.md
[Output 더보기][practiceoutput]


### Loaders
기본적으로 Webpack은 javascript, json 파일만 이해한다.

Loaders를 사용하면, 다른 유형의 파일들도 dependency graph에 추가할 수 있다.

**Webpack 이외의 다른 번들러 쓸때 참고**
> Webpack에서는 되는 기능(ex. css를 import하는 기능)이 다른 번들러나 테스크 러너에서는 지원하지 않을 수 있다.

기본적으로 2가지 속성을 가진다.
1. <code>test</code> - 변환할 파일을 찾는다. 주로 정규식을 사용
2. <code>use</code> - 변환을 수행할때 사용할 loader을 배열형태로 가진다.

```javascript
const path = require('path');

module.exports = {
  output: {
    filename: 'my-first-webpack.bundle.js',
  },
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
};
```
**Webpack 컴파일러 순서**
1. <code>module</code>이 들어오면 <code>rules</code>를 가진다.
2. 테스트 <code>/\.txt$/</code>를 통과한 모듈들은
3. <code>'raw-loader'</code>를 수행해서 변환.

공식문서 설명
> "이봐 webpack 컴파일러, require ()/import 문 내에서 '.txt' 파일로 확인되는 경로를 발견하면 번들에 추가하기 전에 raw-loader를 사용하여 변환해."

[practiceloaders]: https://github.com/wnsrl1204/Webpack-practice/Loaders.md
[Loaders 더보기][practiceloaders]


### Plugins
Loaders는 특정 유형의 모듈을 변환하는데 사용, Plugins는 번들을 최적화하거나, 에셋을 관리하고

환경변수 주입하는 광범위한 작업을 수행할 수 있다.

<code>require()</code>을 통해 플러그인 요청하고 <code>plugins</code>배열에 추가해야 한다.

**플러그인의 경우 여러번 사용될 수 있도록 new연산자를 사용해 인스턴스를 만들어야 한다.**

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); // 내장 plugin에 접근하는 데 사용

module.exports = {
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
};
```
<code>html-webpack-plugin</code>은 생성된 모든 번들을 자동으로 삽입한 

애플리케이션용 HTML파일을 만든다.

webpack은 설치 없이 사용할 수 있는 다양한 플러그인을 제공한다.

[practiceplugins]: https://github.com/wnsrl1204/Webpack-practice/Plugins.md
[Plugins 더보기][practiceplugins]


### Mode
mode는 development, production 또는 none로 설정이 가능하다.

webpack에 내장된 환경별로 최적화를 활성화할때 사용된다.

```javascript
module.exports = {
  mode: 'production',
};
```

### Browser Compatibility
Webpack은 ES5이 호환되는 모든 브라우저를 지원된다.

만약 <code>import()</code>, <code>require.ensure()</code> 같은

dynamic import를 사용한다면 <code>Promise</code>가 요구되는데

구버전 브라우저를 사용한다면 Webpack 사용전에 폴리필을 로드해야 한다.


## 출처 및 참고
[webpack]: https://webpack.js.org/
[Webpack 공식문서][webpack]
