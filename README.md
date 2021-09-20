# Node.js 교과서(개정 2판) 스터디

## npm 명령어

### npm install packages
```shell
$ npm install {package-name}

$ npm i {package-name}
```

### npm install packages dev only
```shell
$ npm i --save-dev {package-name}

$ npm i -D {package-name}
```

### npm install packages globally
```shell
$ npm i --global {package-name}

$ npm i -g {package-name}
```

## npm SemVer 기호
| 기호  | 설명  | 예시  | 예시 설명  | 예시 동치(대체로)  |
| --- | ---   | ---  | ------  | -------  |
| @^  | minor 버전까지  | express@^1.1.1  | 1.1.1 <= SemVer < 2.0.0  | 1.x.x  |
| @~  | patch 버전까지  | express@~1.1.1  | 1.1.1 <= SemVer < 1.2.0  | 1.1.x  |
| @latest  | 최산 안정화 버전  | express@latest  | -  | @x  |

