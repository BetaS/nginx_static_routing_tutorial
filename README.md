# NGINX Static router turorial
Static file (html, css, js) router example for NGINX

# Introduction

이 자료는 NGINX를 이용하여 static 파일을 제공할때 re-routing을 통하여

1. 확장자를 숨김으로써 보안성 증가
2. 파일구조는 그대로 두고 **Semantic URL**을 지원
3. **Semantic URL** 을 통한 검색엔진 최적화 (SEO)

를 위하여 작성된 자료입니다.

# Background

이번에 구현하는 시스템에서는 다국어 지원을 위한 Web static resource를 적절한 빌드환경 구성을 통하여 다음과 같은 폴더구조로 제작하였습니다.

```
/www/
     pc/
          css/
              index.css
          js/
              lib.js
              index.js
          res/
              image/
                  ...
              video/
                  ...
          html/
              index.ko.html
              index.en.html
              index.jp.html
              ....
     mobile/
          css/
              index.css
          js/
              lib.js
              index.js
          res/
              image/
                  ...
              video/
                  ...
          html/
              index.ko.html
              index.en.html
              index.jp.html
              ....
     404.html
```
본 환경을 위해셔 "pug.js"를 통해 pug로 작성된 파일을 각각의 language로 컴파일 하여 적용하였고,
이를 다음과 같은 URL로 접근하고자 하였습니다.

### Mobile, PC Routing
```
http://ko.abc.xyz/       ------->      /www/pc/index.ko.html

http://ko.abc.xyz/m/     ------->      /www/mobile/index.ko.html
```

### Language Routing
```
http://abc.xyz/          ------->      /www/pc/index.ko.html
http://www.abc.xyz/      ------->      /www/pc/index.ko.html
http://ko.abc.xyz/       ------->      /www/pc/index.ko.html
http://en.abc.xyz/       ------->      /www/pc/index.en.html
http://jp.abc.xyz/       ------->      /www/pc/index.jp.html
```

또한 허용되지 않은 URL 규칙을 이용한다면 404.html을 호출하고자 하였습니다.


# Requirements

1. 단순한 static resource를 serving 하므로, 순수 NGINX만 사용하여 단순하게 구현하여야 했습니다.
2. DNS레벨의 Load-balancing을 수행하거나, Proxy를 통한 Load-balancing을 수행하는데에 지장이 없어야 합니다.
3. restful한 URL규칙을 지켜야 하며, GET / POST Parameter의 사용을 최소화 하여야 합니다.
4. 허용되지 않은 접근이라면 404 Not Found Error를 정확하게 띄워야 합니다.
5. ubuntu 16.04 환경에서 동작합니다.
6. 본 예제에서의 default language는 **ko** 입니다.

# Implementing

## 1. NGINX 설치

`sudo apt-get install nginx`

설치가 완료되면, 다음과 같은 경로에 html root가 생성됩니다.

`/var/www/html/`

이곳을 HTML ROOT로 정의하고, 본 repository의 /www/안의 내용을 모두 복사해서 다음의 경로로 옮겨둡니다.

`/var/www/example/`

이동이 완료되었다면 `example`폴더 안에 `mobile`, `pc` 두개의 폴더만 위치하여야 합니다.

## 2.
To be continue...
