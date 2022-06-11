# Output
컴파일 된 파일을 디스크에 쓰는 방법을 webpack에 알려준다.

<code>entry</code>는 여러개의 설정이 가능하지만,

<code>output</code>은 하나의 설정만 가능하다.


## 사용법
<code>output</code>는 객체이어야 하며,

<code>output.filename</code>이 필수적으로 제공되어야 한다.

```javascript
module.exports = {
  output: {
    filename: 'bundle.js',
  },
};
```


## Multiple Entry Points
하나 이상의 <code>entryChunkName</code>를 사용할 경우

예를들어 아래와 같이 <code>app</code>, <code>search</code>라는 청크 이름을 지정
```javascript
module.exports = {
  entry: {
    app: './src/app.js',
    search: './src/search.js',
  },
};
```
[substitution]: https://webpack.js.org/configuration/output/#template-strings
이때 <code>output.filename</code>에 [substitution][substitution]을 사용할 수 있다.

예를들어 <code>[name]</code>, <code>[id]</code>, <code>[contenthash]</code>

```javascript
module.exports = {
  entry: {
    app: './src/app.js',
    search: './src/search.js',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
  },
};
```

> Webpack에 <code>TemplatedPathPlugin</code>이 내장되어 있기 때문에 substitution을 사용할 수 있다.


## Advanced
cdn과 hash를 이용한 복잡한 예제
```javascript
module.exports = {
  //...
  output: {
    path: '/home/proj/cdn/assets/[fullhash]',
    publicPath: 'https://cdn.example.com/assets/[fullhash]/',
  },
};
```

출력 파일의 최종 <code>publicPath</code>를 컴파일 시점에 알 수 없는 경우,

공백으로 남겨두고 런타임에 엔트리 포인트 파일의 

<code>\_\_webpack_public_path__</code> 를 통해 동적으로 설정할 수 있다.

```javascript
__webpack_public_path__ = myRuntimePublicPath;

// rest of your application entry
```
