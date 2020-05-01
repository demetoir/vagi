# Vagi


![GitHub release (latest by date)](https://img.shields.io/github/v/release/demetoir/vagi) [![Build Status](https://travis-ci.org/demetoir/2019-21.svg?branch=master)](https://travis-ci.org/demetoir/2019-21)
<p>
<a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/3fc8384246adb849bdc8a39fc7cc95164f9cb090/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e6f64652e6a732d677261793f6c6f676f3d4e6f64652e6a73266c6f676f436f6c6f723d677265656e"><img alt="Node.js" src="https://camo.githubusercontent.com/3fc8384246adb849bdc8a39fc7cc95164f9cb090/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e6f64652e6a732d677261793f6c6f676f3d4e6f64652e6a73266c6f676f436f6c6f723d677265656e" data-canonical-src="https://img.shields.io/badge/Node.js-gray?logo=Node.js&amp;logoColor=green" style="max-width:100%;"></a>
<a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/260026eff932ac17205eb2caffb4af919abae4a9/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4772617068514c2d677261793f6c6f676f3d4772617068514c266c6f676f436f6c6f723d453130303938"><img alt="GraphQ:" src="https://camo.githubusercontent.com/260026eff932ac17205eb2caffb4af919abae4a9/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4772617068514c2d677261793f6c6f676f3d4772617068514c266c6f676f436f6c6f723d453130303938" data-canonical-src="https://img.shields.io/badge/GraphQL-gray?logo=GraphQL&amp;logoColor=E10098" style="max-width:100%;"></a>
<a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/1a43bf3f61dcfb33888aefc1e77c44f54f1f5e53/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f446f636b65722d677261793f6c6f676f3d446f636b6572266c6f676f436f6c6f723d313438384336"><img alt="Docker" src="https://camo.githubusercontent.com/1a43bf3f61dcfb33888aefc1e77c44f54f1f5e53/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f446f636b65722d677261793f6c6f676f3d446f636b6572266c6f676f436f6c6f723d313438384336" data-canonical-src="https://img.shields.io/badge/Docker-gray?logo=Docker&amp;logoColor=1488C6" style="max-width:100%;"></a>
<a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/193d7edd8b658e1976fbb35056b057bb05f80b3f/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f52656163742e6a732d677261793f6c6f676f3d5265616374266c6f676f436f6c6f723d363144414642"><img alt="React" src="https://camo.githubusercontent.com/193d7edd8b658e1976fbb35056b057bb05f80b3f/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f52656163742e6a732d677261793f6c6f676f3d5265616374266c6f676f436f6c6f723d363144414642" data-canonical-src="https://img.shields.io/badge/React.js-gray?logo=React&amp;logoColor=61DAFB" style="max-width:100%;"></a>
</p>





# 배포 상황(중단됨)
- [배포 링크]()

- 크레딧 전부 소진으로 인한 NCP를 이용한 배포 중단, 개인 서버로 배포 준비중

## 데모 영상

-   [데모영상](https://www.youtube.com/watch?v=jErevbCtdF0&feature=youtu.be)

## [바글바글](https://github.com/connect-foundation/2019-21) 유지보수 및 백엔드 재개발 프로젝트

- [2019 부스트캠프 맴버쉽](http://boostcamp.connect.or.kr/) 팀 프로젝트 [바글바글](https://github.com/connect-foundation/2019-21)을 기반으로 진행
- 컨퍼런스, 세미나, 수업 중 청중과 발표자와 소통을 유도하기 위한 실시간 질의응답 및 투표 공유 웹서비스
- 기존 frontend 및 node.js backend 유지보수 및 리펙토링
- 백엔드를 Spring Boot 기반으로 재개발
- (maybe?) 백엔드를 Python Django 기반으로 재개발

  
## 기술 스택

-   Frontend: React, GraphQL-Apollo, Axios, Material-UI, Styled-component 
-   Node.js Backend: Nodejs, MySQL, Sequelize, GraphQL, Socket.io, Oauth2.0, Docker, Nginx, Redis
-   Java Backend: Java, Spring boot, Spring MVC, Spring security, JPA(Hibernate), Nginx, Docker, MySQL, Redis, Gradle, Oauth2.0 
-   Env & etc: Eslint, babel, webpack, prettier, yarn, github, slack


## 새로 추가된(또는 될) 기능 + etc
- Nginx 구성 
- Travis-CI 구성
- 통계 기능
- https
- (maybe?) 구글 광고
- 마이너한 버그 수정



## 이전 버전 기능

- 2가지 사용자 app 제공 (Host: 이벤트를 주관하는 사용자, Guest: 이벤트에 참가하여 질문하는 사용자)
- 실시간 질의응답(Guest app)
   - 실시간 질문 
   - 질문에 좋아요를 누를 수 있음 (좋아요가 많으면 인기질문 Tab 상단쪽에 노출됨)
   - 질문에 이모지를 추가할 수 있음
   - 질문에 댓글을 달 수 있음
- 실시간 질의응답 (Host 모드)
   - 실시간 질문을 검열하여 특정 질문은 삭제할 수 있음
   - 특정 질문을 상단에 고정시킬 수 있음
   - 답변한 질문은 실시간질문 Tab에서 질문저장소로 이동시킬 수 있음
- 실시간 투표
   - 투표 종류: N지선다(복수선택 지원), 별점주기
   - Host는 투표를 생성하여 Guest들에게 실시간 투표 참여를 요청할 수 있음
   - Guest들은 투표를 할 수 있고, 투표 상황은 실시간 공유됨

