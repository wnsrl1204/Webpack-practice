# Entry
## Single Entry (Shorthand) Syntax
진입점이 한개일때 or 축약형

<code>entry: string | [string]</code>

축약형
```javascript
module.exports = {
  entry: './path/to/my/entry/file.js',
};
```
실제 코드
```javascript
module.exports = {
  entry: {
    main: './path/to/my/entry/file.js',
  },
};
```
또는 배열도 가능하다.
```
module.exports = {
  entry: ['./src/file_1.js', './src/file_2.js'],
  output: {
    filename: 'bundle.js',
  },
};
```
라이브러리 같은곳에서는 편리하지만, 진입점 이름이 하나면 <code>output</code>유연성이 떨어진다.


## Object Syntex
Entry이름(entryChunkName)이 2개 이상일때

<code> entry: { <entryChunkName> string | [string] } | {}</code>

```javascript
module.exports = {
  entry: {
    app: './src/app.js',
    adminApp: './src/adminApp.js',
  },
};
```
코드가 복잡해보이지만, 확장하기 쉬워진다.
  
> "확장 가능한 Webpack 설정"은 재사용 가능하고 설정의 다른 부분과 결합할 수 있는 것이다.
>
> 환경, 빌드 대상, 런타임 별 관심사를 구분하는데 인기있는 기술이다.
>  
> webpack-merge와 같은 특수 도구들을 사용항 병합된다.

플러그인에 의해 만들어진 진입점만 있는경우 빈 객체를 entry에 전달할 수 있다. <code>entry: {}</code>


## EntryDescription object
entry 설명하는 객체
+ <code>dependOn</code> - "현재 엔트리 포인트"가 의존하는 "엔트리 포인트", 의존하는 "엔트리 포인트"가 먼저 로드되야함을 알려줌
+ <code>filename</code> - 디스크에 있는 각 출력파일의 이름을 지정
+ <code>import</code> - 시작시 로드되는 모듈
+ <code>library</code> - 현재 진입점에서 라이브러리를 번들링하려면 지정
+ <code>runtime</code> - 이 이름의 런타임 청크가 생성되고, 그렇지 않으면 기존의 엔트리 포인트의 이름이 사용됨
+ <code>publicPatch</code> - 브라우저에서 참조할 때 이 엔트리의 출력 파일에 대한 공용 URL 주소를 지정하세요. 또한 output.publicPath도 참고하세요.

**사용 예**
```javascript
module.exports = {
  entry: {
    main: './src/app.js',
    vendor: './src/vendor.js',
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
  },
};
```
  
## Mulit-Page Application
```javascript
module.exports = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js',
  },
};
```
  
