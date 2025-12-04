# 🌍 Global Weather Globe

실시간 글로벌 날씨 대시보드

## 📦 포함 파일

- `index.html` - 메인 웹 애플리케이션
- `globe.png` - 세계 지도 이미지
- `run_server.py` - Python 로컬 서버

## 🚀 실행 방법

### 방법 0: API 키 설정 (필수)
`config.js` 파일을 생성하여 `OPENWEATHER_API_KEY` 변수 명으로 API 키를 만들어 넣으시면 됩니다.

### 방법 1: Python 서버 (권장)
```bash
python run_server.py
```
브라우저가 자동으로 열립니다.

### 방법 2: PyCharm
1. 프로젝트 폴더 열기
2. `run_server.py` 우클릭 → Run
3. http://localhost:8000 접속

### 방법 3: VS Code
1. Live Server 확장 설치
2. `index.html` 우클릭 → Open with Live Server

## 🎮 사용법

| 동작 | 기능 |
|------|------|
| 마우스 휠 | 확대/축소 |
| 우클릭 드래그 | 지도 이동 |
| 좌클릭 (핀) | 날씨 상세 보기 |
| ESC | 팝업 닫기 |

## ✨ 기능

- 🌡️ 37개 도시 실시간 날씨
- 🗺️ 대륙별 필터링
- 🌐 한국어/영어 전환
- 📊 대기질, 자외선 정보
- ⏰ 시간별 예보

## 🔧 요구사항

- Python 3.x
- 인터넷 연결 (OpenWeather API)

## 📝 라이선스

MIT License
