# Vagi


![GitHub release (latest by date)](https://img.shields.io/github/v/release/demetoir/vagi) 
[![Build Status](https://travis-ci.org/demetoir/2019-21.svg?branch=master)](https://travis-ci.org/demetoir/2019-21)


# 배포 상황(중단됨)
- [배포 링크](https://www.vaagle.com)

- 크레딧 전부 소진으로 인한 NCP를 이용한 배포 중단, 개인 서버로 배포 준비중

## 데모 영상

-   [데모영상](https://www.youtube.com/watch?v=jErevbCtdF0&feature=youtu.be)

## [바글바글](https://github.com/connect-foundation/2019-21) 유지보수 및 백엔드 재개발 프로젝트

- [2019 부스트캠프 맴버쉽](http://boostcamp.connect.or.kr/) 팀 프로젝트 바글바글을 기반으로 진행
- 컨퍼런스, 세미나, 수업 중 청중과 발표자와 소통을 유도하기 위한 실시간 질의응답 및 투표 공유 웹서비스
- 기존 frontend 및 node.js backend 유지보수 및 리펙토링
- 백엔드를 Spring Boot 기반으로 재개발

  
## 기술 스택

#### Frontend 
-   Frontend: React, Material-UI, Styled-Component
 
#### Backend
-   Node.js Backend: Nodejs, MySQL, Sequelize, GraphQL, Socket.IO
-   Java Backend: Spring boot, Spring MVC, Spring security, JPA(Hibernate)
-   Infra: Docker, Nginx
-   DB: MySql, Redis
-   CI/CD: Travis-CI

#### Env & Etc
-   Javascript env & etc: Es6, Eslint, Babel, Webpack, Prettier, Yarn, Mocha, Jest
-   Java env & etc: Java 11, Gradle


## 새로 추가된(또는 될) 기능 
- [*] Nginx 구성 
- [*] Travis-CI 구성
- [*] https
- [ ] 통계 기능
- [ ] (maybe?) 구글 광고
- [ ] Naver, github, kakao, facebook oauth2 login



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

