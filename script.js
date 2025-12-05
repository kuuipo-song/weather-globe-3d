/**
 * 위도/경도를 지도 좌표(픽셀 또는 퍼센트)로 변환
 * 등장방형도법(Equirectangular Projection) 공식 사용
 *
 * @param {number} lat - 위도 (-90 ~ +90)
 * @param {number} lon - 경도 (-180 ~ +180)
 * @param {number} width - 지도 너비
 * @param {number} height - 지도 높이
 * @returns {object} { x, y } 좌표
 */
function latLonToXY(lat, lon, width, height) {
  var x = ((lon + 180) / 360) * width;
  var y = ((90 - lat) / 180) * height;
  return { x: x, y: y };
}

// 도시 데이터 - 오직 위도/경도만 정의 (수동 offset 없음)
var CITIES = [
  // 아시아
  { id: 'seoul', name: '서울', nameEn: 'Seoul', country: 'KR', continent: 'asia', flag: '🇰🇷', lat: 37.5665, lon: 126.978 },
  { id: 'tokyo', name: '도쿄', nameEn: 'Tokyo', country: 'JP', continent: 'asia', flag: '🇯🇵', lat: 35.6762, lon: 139.6503 },
  { id: 'beijing', name: '베이징', nameEn: 'Beijing', country: 'CN', continent: 'asia', flag: '🇨🇳', lat: 39.9042, lon: 116.4074 },
  { id: 'shanghai', name: '상하이', nameEn: 'Shanghai', country: 'CN', continent: 'asia', flag: '🇨🇳', lat: 31.2304, lon: 121.4737 },
  { id: 'hongkong', name: '홍콩', nameEn: 'Hong Kong', country: 'HK', continent: 'asia', flag: '🇭🇰', lat: 22.3193, lon: 114.1694 },
  { id: 'singapore', name: '싱가포르', nameEn: 'Singapore', country: 'SG', continent: 'asia', flag: '🇸🇬', lat: 1.3521, lon: 103.8198 },
  { id: 'bangkok', name: '방콕', nameEn: 'Bangkok', country: 'TH', continent: 'asia', flag: '🇹🇭', lat: 13.7563, lon: 100.5018 },
  { id: 'dubai', name: '두바이', nameEn: 'Dubai', country: 'AE', continent: 'asia', flag: '🇦🇪', lat: 25.2048, lon: 55.2708 },
  { id: 'mumbai', name: '뭄바이', nameEn: 'Mumbai', country: 'IN', continent: 'asia', flag: '🇮🇳', lat: 19.076, lon: 72.8777 },
  { id: 'delhi', name: '델리', nameEn: 'Delhi', country: 'IN', continent: 'asia', flag: '🇮🇳', lat: 28.7041, lon: 77.1025 },

  // 유럽
  { id: 'london', name: '런던', nameEn: 'London', country: 'GB', continent: 'europe', flag: '🇬🇧', lat: 51.5074, lon: -0.1278 },
  { id: 'paris', name: '파리', nameEn: 'Paris', country: 'FR', continent: 'europe', flag: '🇫🇷', lat: 48.8566, lon: 2.3522 },
  { id: 'berlin', name: '베를린', nameEn: 'Berlin', country: 'DE', continent: 'europe', flag: '🇩🇪', lat: 52.52, lon: 13.405 },
  { id: 'rome', name: '로마', nameEn: 'Rome', country: 'IT', continent: 'europe', flag: '🇮🇹', lat: 41.9028, lon: 12.4964 },
  { id: 'madrid', name: '마드리드', nameEn: 'Madrid', country: 'ES', continent: 'europe', flag: '🇪🇸', lat: 40.4168, lon: -3.7038 },
  { id: 'moscow', name: '모스크바', nameEn: 'Moscow', country: 'RU', continent: 'europe', flag: '🇷🇺', lat: 55.7558, lon: 37.6173 },

  // 북미
  { id: 'newyork', name: '뉴욕', nameEn: 'New York', country: 'US', continent: 'north_america', flag: '🇺🇸', lat: 40.7128, lon: -74.006 },
  { id: 'losangeles', name: 'LA', nameEn: 'Los Angeles', country: 'US', continent: 'north_america', flag: '🇺🇸', lat: 34.0522, lon: -118.2437 },
  { id: 'chicago', name: '시카고', nameEn: 'Chicago', country: 'US', continent: 'north_america', flag: '🇺🇸', lat: 41.8781, lon: -87.6298 },
  { id: 'toronto', name: '토론토', nameEn: 'Toronto', country: 'CA', continent: 'north_america', flag: '🇨🇦', lat: 43.6532, lon: -79.3832 },
  { id: 'vancouver', name: '밴쿠버', nameEn: 'Vancouver', country: 'CA', continent: 'north_america', flag: '🇨🇦', lat: 49.2827, lon: -123.1207 },
  { id: 'miami', name: '마이애미', nameEn: 'Miami', country: 'US', continent: 'north_america', flag: '🇺🇸', lat: 25.7617, lon: -80.1918 },
  { id: 'mexico', name: '멕시코시티', nameEn: 'Mexico City', country: 'MX', continent: 'north_america', flag: '🇲🇽', lat: 19.4326, lon: -99.1332 },

  // 남미
  { id: 'saopaulo', name: '상파울루', nameEn: 'São Paulo', country: 'BR', continent: 'south_america', flag: '🇧🇷', lat: -23.5505, lon: -46.6333 },
  { id: 'rio', name: '리우', nameEn: 'Rio', country: 'BR', continent: 'south_america', flag: '🇧🇷', lat: -22.9068, lon: -43.1729 },
  { id: 'buenosaires', name: '부에노스', nameEn: 'Buenos Aires', country: 'AR', continent: 'south_america', flag: '🇦🇷', lat: -34.6037, lon: -58.3816 },
  { id: 'lima', name: '리마', nameEn: 'Lima', country: 'PE', continent: 'south_america', flag: '🇵🇪', lat: -12.0464, lon: -77.0428 },
  { id: 'bogota', name: '보고타', nameEn: 'Bogotá', country: 'CO', continent: 'south_america', flag: '🇨🇴', lat: 4.711, lon: -74.0721 },

  // 아프리카
  { id: 'cairo', name: '카이로', nameEn: 'Cairo', country: 'EG', continent: 'africa', flag: '🇪🇬', lat: 30.0444, lon: 31.2357 },
  { id: 'lagos', name: '라고스', nameEn: 'Lagos', country: 'NG', continent: 'africa', flag: '🇳🇬', lat: 6.5244, lon: 3.3792 },
  { id: 'johannesburg', name: '요하네스버그', nameEn: 'Johannesburg', country: 'ZA', continent: 'africa', flag: '🇿🇦', lat: -26.2041, lon: 28.0473 },
  { id: 'nairobi', name: '나이로비', nameEn: 'Nairobi', country: 'KE', continent: 'africa', flag: '🇰🇪', lat: -1.2921, lon: 36.8219 },
  { id: 'casablanca', name: '카사블랑카', nameEn: 'Casablanca', country: 'MA', continent: 'africa', flag: '🇲🇦', lat: 33.5731, lon: -7.5898 },

  // 오세아니아
  { id: 'sydney', name: '시드니', nameEn: 'Sydney', country: 'AU', continent: 'oceania', flag: '🇦🇺', lat: -33.8688, lon: 151.2093 },
  { id: 'melbourne', name: '멜버른', nameEn: 'Melbourne', country: 'AU', continent: 'oceania', flag: '🇦🇺', lat: -37.8136, lon: 144.9631 },
  { id: 'perth', name: '퍼스', nameEn: 'Perth', country: 'AU', continent: 'oceania', flag: '🇦🇺', lat: -31.9505, lon: 115.8605 },
  { id: 'auckland', name: '오클랜드', nameEn: 'Auckland', country: 'NZ', continent: 'oceania', flag: '🇳🇿', lat: -36.8485, lon: 170 },
];

var CONTINENTS = {
  all: { id: 'all', name: '전체', nameEn: 'All', emoji: '🌐', color: '#6366F1' },
  asia: { id: 'asia', name: '아시아', nameEn: 'Asia', emoji: '🌏', color: '#4ECDC4' },
  europe: { id: 'europe', name: '유럽', nameEn: 'Europe', emoji: '🌍', color: '#9E9E9E' },
  north_america: { id: 'north_america', name: '북미', nameEn: 'N. America', emoji: '🌎', color: '#4CAF50' },
  south_america: { id: 'south_america', name: '남미', nameEn: 'S. America', emoji: '🌎', color: '#FF9800' },
  africa: { id: 'africa', name: '아프리카', nameEn: 'Africa', emoji: '🌍', color: '#FFC107' },
  oceania: { id: 'oceania', name: '오세아니아', nameEn: 'Oceania', emoji: '🌏', color: '#E91E63' },
};

var WEATHER_TYPES = {
  Clear: { emoji: '😊', icon: '☀️', label: '맑음', labelEn: 'Clear', message: '야외 활동하기 좋아요!', messageEn: 'Great for outdoor!', gradient: ['#FFE082', '#FFA726'], emojiAnim: 'anim-bounce', iconAnim: 'anim-pulse' },
  Clouds: { emoji: '😐', icon: '☁️', label: '흐림', labelEn: 'Cloudy', message: '구름이 많아요', messageEn: 'Cloudy skies', gradient: ['#90A4AE', '#607D8B'], emojiAnim: 'anim-wobble', iconAnim: 'anim-bounce' },
  Rain: { emoji: '😰', icon: '🌧️', label: '비', labelEn: 'Rain', message: '우산을 챙기세요!', messageEn: 'Bring umbrella!', gradient: ['#5C6BC0', '#3949AB'], emojiAnim: 'anim-rain', iconAnim: 'anim-rain' },
  Drizzle: { emoji: '😕', icon: '🌦️', label: '이슬비', labelEn: 'Drizzle', message: '가벼운 비가 내려요', messageEn: 'Light rain', gradient: ['#90CAF9', '#64B5F6'], emojiAnim: 'anim-rain', iconAnim: 'anim-rain' },
  Thunderstorm: { emoji: '😱', icon: '⚡', label: '뇌우', labelEn: 'Storm', message: '외출을 삼가세요!', messageEn: 'Stay indoors!', gradient: ['#7B1FA2', '#4A148C'], emojiAnim: 'anim-shake', iconAnim: 'anim-pulse' },
  Snow: { emoji: '🥶', icon: '❄️', label: '눈', labelEn: 'Snow', message: '따뜻하게 입으세요!', messageEn: 'Bundle up!', gradient: ['#E3F2FD', '#BBDEFB'], emojiAnim: 'anim-snow', iconAnim: 'anim-snow' },
  Mist: { emoji: '😶', icon: '🌫️', label: '안개', labelEn: 'Mist', message: '시야가 흐려요', messageEn: 'Low visibility', gradient: ['#CFD8DC', '#B0BEC5'], emojiAnim: 'anim-wobble', iconAnim: 'anim-pulse' },
  Fog: { emoji: '😶', icon: '🌫️', label: '안개', labelEn: 'Fog', message: '운전 주의하세요', messageEn: 'Drive carefully', gradient: ['#CFD8DC', '#B0BEC5'], emojiAnim: 'anim-wobble', iconAnim: 'anim-pulse' },
  Haze: { emoji: '😶', icon: '🌫️', label: '연무', labelEn: 'Haze', message: '마스크 착용 권장', messageEn: 'Wear mask', gradient: ['#D7CCC8', '#BCAAA4'], emojiAnim: 'anim-wobble', iconAnim: 'anim-pulse' },
  Hot: { emoji: '🥵', icon: '🔥', label: '폭염', labelEn: 'Hot', message: '수분 섭취하세요!', messageEn: 'Stay hydrated!', gradient: ['#FF8A65', '#E64A19'], emojiAnim: 'anim-hot', iconAnim: 'anim-pulse' },
  Cold: { emoji: '🥶', icon: '🧊', label: '한파', labelEn: 'Cold', message: '동파 주의하세요!', messageEn: 'Freezing cold!', gradient: ['#4FC3F7', '#0288D1'], emojiAnim: 'anim-cold', iconAnim: 'anim-snow' },
};

var AQI_LEVELS = {
  1: { label: '좋음', labelEn: 'Good', emoji: '😄', color: '#4CAF50', percent: 20 },
  2: { label: '보통', labelEn: 'Fair', emoji: '🙂', color: '#8BC34A', percent: 40 },
  3: { label: '나쁨', labelEn: 'Poor', emoji: '😕', color: '#FF9800', percent: 60 },
  4: { label: '매우나쁨', labelEn: 'Bad', emoji: '😷', color: '#F44336', percent: 80 },
  5: { label: '위험', labelEn: 'Hazard', emoji: '☠️', color: '#9C27B0', percent: 100 },
};

var UV_LEVELS = [
  { max: 2, label: '낮음', labelEn: 'Low', color: '#4CAF50' },
  { max: 5, label: '보통', labelEn: 'Moderate', color: '#FFEB3B' },
  { max: 7, label: '높음', labelEn: 'High', color: '#FF9800' },
  { max: 10, label: '매우높음', labelEn: 'Very High', color: '#F44336' },
  { max: 99, label: '위험', labelEn: 'Extreme', color: '#9C27B0' },
];

var currentLanguage = 'ko';
var selectedContinent = 'all';
var selectedCity = null;
var weatherData = [];
var apiSuccessCount = 0;
var apiFailCount = 0;

// Map zoom and pan state
var mapState = {
  scale: 1,
  translateX: 0,
  translateY: 0,
  isDragging: false,
  startX: 0,
  startY: 0,
  lastTranslateX: 0,
  lastTranslateY: 0,
  minScale: 1,
  maxScale: 4
};

function t(ko, en) { return currentLanguage === 'ko' ? ko : en; }

function getWeatherType(main, temp) {
  if (temp >= 35) return WEATHER_TYPES.Hot;
  if (temp <= -10) return WEATHER_TYPES.Cold;
  return WEATHER_TYPES[main] || WEATHER_TYPES.Clear;
}

function formatCoord(lat, lon) {
  return Math.abs(lat).toFixed(2) + '°' + (lat >= 0 ? 'N' : 'S') + ', ' + Math.abs(lon).toFixed(2) + '°' + (lon >= 0 ? 'E' : 'W');
}

function getUVLevel(uv) {
  for (var i = 0; i < UV_LEVELS.length; i++) {
    if (uv <= UV_LEVELS[i].max) return UV_LEVELS[i];
  }
  return UV_LEVELS[UV_LEVELS.length - 1];
}

async function fetchWeather(lat, lon) {
  try {
    var res = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + OPENWEATHER_API_KEY + '&units=metric&lang=' + currentLanguage);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch (e) { return null; }
}

async function fetchAirPollution(lat, lon) {
  try {
    var res = await fetch('https://api.openweathermap.org/data/2.5/air_pollution?lat=' + lat + '&lon=' + lon + '&appid=' + OPENWEATHER_API_KEY);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch (e) { return null; }
}

async function loadWeatherData() {
  var loading = document.getElementById('loading');
  var loadingBar = document.getElementById('loadingBar');
  loading.classList.remove('hide');
  document.getElementById('loadingText').textContent = t('실시간 날씨 데이터 로딩중...', 'Loading weather data...');

  apiSuccessCount = 0;
  apiFailCount = 0;
  weatherData = [];

  for (var i = 0; i < CITIES.length; i++) {
    var city = CITIES[i];
    try {
      var results = await Promise.all([fetchWeather(city.lat, city.lon), fetchAirPollution(city.lat, city.lon)]);
      var w = results[0];
      var a = results[1];
      if (w && w.main) {
        apiSuccessCount++;
        weatherData.push({
          id: city.id, name: city.name, nameEn: city.nameEn, country: city.country,
          continent: city.continent, flag: city.flag, lat: city.lat, lon: city.lon,
          isReal: true,
          weather: {
            temp: Math.round(w.main.temp),
            feelsLike: Math.round(w.main.feels_like),
            humidity: w.main.humidity,
            windSpeed: Math.round((w.wind ? w.wind.speed : 0) * 10) / 10,
            weather: w.weather[0] ? w.weather[0].main : 'Clear',
            aqi: (a && a.list && a.list[0] && a.list[0].main) ? a.list[0].main.aqi : 1,
            pm25: Math.round((a && a.list && a.list[0] && a.list[0].components) ? a.list[0].components.pm2_5 : 0),
            visibility: Math.round((w.visibility || 10000) / 1000),
            pressure: w.main.pressure,
            clouds: w.clouds ? w.clouds.all : 0,
          }
        });
      } else throw new Error();
    } catch (e) {
      apiFailCount++;
      weatherData.push({
        id: city.id, name: city.name, nameEn: city.nameEn, country: city.country,
        continent: city.continent, flag: city.flag, lat: city.lat, lon: city.lon,
        isReal: false, weather: null
      });
    }
    loadingBar.style.width = ((i + 1) / CITIES.length * 100) + '%';
    if (i < CITIES.length - 1) await new Promise(function(r) { setTimeout(r, 80); });
  }

  updateApiStatus();
  renderMarkers();
  renderSidebar();
  renderContinentInfo();
  setTimeout(function() { loading.classList.add('hide'); }, 400);
}

// 드래그 스크롤 기능 초기화
function initDragScroll(element) {
  var isDown = false;
  var startX;
  var scrollLeft;

  element.addEventListener('mousedown', function(e) {
    if (e.target.tagName === 'BUTTON') return;
    isDown = true;
    element.classList.add('dragging');
    startX = e.pageX - element.offsetLeft;
    scrollLeft = element.scrollLeft;
    e.preventDefault();
  });

  element.addEventListener('mouseleave', function() {
    isDown = false;
    element.classList.remove('dragging');
  });

  element.addEventListener('mouseup', function() {
    isDown = false;
    element.classList.remove('dragging');
  });

  element.addEventListener('mousemove', function(e) {
    if (!isDown) return;
    e.preventDefault();
    var x = e.pageX - element.offsetLeft;
    var walk = (x - startX) * 1.5;
    element.scrollLeft = scrollLeft - walk;
  });
}

function renderContinentSelector() {
  var html = '';
  var keys = Object.keys(CONTINENTS);
  for (var i = 0; i < keys.length; i++) {
    var c = CONTINENTS[keys[i]];
    var isActive = selectedContinent === c.id;
    var style = isActive ? 'background: ' + c.color + '; color: #fff;' : '';
    html += '<button class="continent-btn ' + (isActive ? 'active' : '') + '" style="' + style + '" onclick="selectContinent(\'' + c.id + '\')">';
    html += '<span>' + c.emoji + '</span><span>' + t(c.name, c.nameEn) + '</span>';
    html += '</button>';
  }
  document.getElementById('continentSelector').innerHTML = html;
}

function renderMarkers() {
  var mapWrapper = document.getElementById('mapWrapper');
  var mapWidth = mapWrapper.clientWidth;
  var mapHeight = mapWrapper.clientHeight;

  var cities = selectedContinent === 'all' ? CITIES : CITIES.filter(function(c) { return c.continent === selectedContinent; });
  var html = '';

  for (var i = 0; i < cities.length; i++) {
    var city = cities[i];
    var data = null;
    for (var j = 0; j < weatherData.length; j++) {
      if (weatherData[j].id === city.id) { data = weatherData[j]; break; }
    }
    var weather = data ? data.weather : null;
    var type = weather ? getWeatherType(weather.weather, weather.temp) : WEATHER_TYPES.Clear;
    var isSelected = selectedCity && selectedCity.id === city.id;

    // 순수 공식 기반 좌표 계산
    var pos = latLonToXY(city.lat, city.lon, mapWidth, mapHeight);

    html += '<div class="city-marker ' + (isSelected ? 'selected' : '') + '" ';
    html += 'style="left: ' + pos.x + 'px; top: ' + pos.y + 'px; transform: translate(-50%, -50%);" ';
    html += 'onclick="onCityClick(\'' + city.id + '\')">';
    html += '<div class="marker-bubble" style="background: linear-gradient(135deg, ' + type.gradient[0] + ', ' + type.gradient[1] + ')">';
    html += '<span class="marker-emoji">' + type.emoji + '</span>';
    html += '<span class="marker-icon">' + type.icon + '</span>';
    html += '</div>';
    html += '<div class="marker-label">' + city.flag + ' ' + t(city.name, city.nameEn) + '</div>';
    if (weather) {
      html += '<div class="marker-temp ' + (data.isReal ? 'real' : 'mock') + '">' + weather.temp + '°C</div>';
    } else {
      html += '<div class="marker-temp mock">--</div>';
    }
    html += '</div>';
  }
  document.getElementById('markersContainer').innerHTML = html;
}

function renderSidebar() {
  var realData = weatherData.filter(function(d) { return d.weather && d.isReal; });

  var hotCities = realData.filter(function(d) { return d.weather.temp >= 28; });
  hotCities.sort(function(a, b) { return b.weather.temp - a.weather.temp; });
  hotCities = hotCities.slice(0, 3);

  var coldCities = realData.filter(function(d) { return d.weather.temp <= 10; });
  coldCities.sort(function(a, b) { return a.weather.temp - b.weather.temp; });
  coldCities = coldCities.slice(0, 3);

  var airCities = realData.filter(function(d) { return d.weather.aqi >= 3; }).slice(0, 3);

  var rainCities = realData.filter(function(d) {
    return ['Rain', 'Snow', 'Thunderstorm', 'Drizzle'].indexOf(d.weather.weather) >= 0;
  }).slice(0, 3);

  var topics = [
    { id: 'hot', title: t('🔥 폭염', '🔥 Heat'), cities: hotCities, color: '#FF5722' },
    { id: 'cold', title: t('🧊 한파', '🧊 Cold'), cities: coldCities, color: '#2196F3' },
    { id: 'air', title: t('😷 대기질', '😷 Air'), cities: airCities, color: '#FF9800' },
    { id: 'rain', title: t('🌧️ 강수', '🌧️ Rain'), cities: rainCities, color: '#3F51B5' },
  ].filter(function(topic) { return topic.cities.length > 0; });

  var html = '<h3 class="sidebar-title">📌 ' + t('주요 토픽', 'Topics') + '</h3>';
  if (topics.length > 0) {
    for (var i = 0; i < topics.length; i++) {
      var topic = topics[i];
      html += '<div class="topic-card" style="border-left: 4px solid ' + topic.color + '">';
      html += '<div class="topic-header" style="color: ' + topic.color + '">' + topic.title + '</div>';
      for (var j = 0; j < topic.cities.length; j++) {
        var city = topic.cities[j];
        var value = '';
        if (topic.id === 'hot' || topic.id === 'cold') value = city.weather.temp + '°';
        else if (topic.id === 'air') value = 'AQI ' + city.weather.aqi;
        else value = city.weather.weather;
        html += '<button class="topic-city" onclick="onCityClick(\'' + city.id + '\')">';
        html += '<span>' + city.flag + ' ' + t(city.name, city.nameEn) + '</span>';
        html += '<span style="color: ' + topic.color + '; font-weight: 700;">' + value + '</span>';
        html += '</button>';
      }
      html += '</div>';
    }
  } else {
    html += '<div class="topic-card"><div class="topic-header">⏳ ' + t('로딩...', 'Loading...') + '</div></div>';
  }
  document.getElementById('sidebar').innerHTML = html;
}

function renderContinentInfo() {
  var cont = CONTINENTS[selectedContinent];
  var count = selectedContinent === 'all' ? CITIES.length : CITIES.filter(function(c) { return c.continent === selectedContinent; }).length;
  document.getElementById('continentInfo').innerHTML = '<span class="emoji">' + cont.emoji + '</span><span class="name">' + t(cont.name, cont.nameEn) + '</span><span class="count">' + count + t('개 도시', ' cities') + '</span>';
}

function updateApiStatus() {
  var el = document.getElementById('apiStatus');
  el.classList.remove('success', 'error', 'loading');
  if (apiSuccessCount > 0 && apiFailCount === 0) {
    el.classList.add('success');
    el.innerHTML = '<span>✓</span><span>' + t('실시간', 'Live') + ' (' + apiSuccessCount + ')</span>';
  } else if (apiSuccessCount > 0) {
    el.classList.add('success');
    el.innerHTML = '<span>⚠</span><span>' + apiSuccessCount + '/' + (apiSuccessCount + apiFailCount) + '</span>';
  } else {
    el.classList.add('error');
    el.innerHTML = '<span>✗</span><span>' + t('오류', 'Error') + '</span>';
  }
}

function selectContinent(id) {
  selectedContinent = id;
  selectedCity = null;
  renderContinentSelector();
  renderMarkers();
  renderContinentInfo();
}

function onCityClick(cityId) {
  for (var i = 0; i < CITIES.length; i++) {
    if (CITIES[i].id === cityId) {
      openCard(cityId);
      return;
    }
  }
}

function openCard(cityId) {
  var city = null, data = null;
  for (var i = 0; i < CITIES.length; i++) {
    if (CITIES[i].id === cityId) { city = CITIES[i]; break; }
  }
  for (var j = 0; j < weatherData.length; j++) {
    if (weatherData[j].id === cityId) { data = weatherData[j]; break; }
  }
  if (!city || !data) return;

  selectedCity = city;
  renderMarkers();

  var weather = data.weather;
  var type = weather ? getWeatherType(weather.weather, weather.temp) : WEATHER_TYPES.Clear;

  document.getElementById('mainWeatherCard').style.background = 'linear-gradient(135deg, ' + type.gradient[0] + '40 0%, ' + type.gradient[1] + '40 100%)';

  document.getElementById('cardCityName').textContent = t(city.name, city.nameEn);
  document.getElementById('cardCountry').textContent = city.country;
  document.getElementById('cardCoords').textContent = formatCoord(city.lat, city.lon);

  if (weather) {
    var emojiEl = document.getElementById('cardEmoji');
    var iconEl = document.getElementById('cardWeatherIcon');
    emojiEl.textContent = type.emoji;
    iconEl.textContent = type.icon;
    emojiEl.className = 'main-emoji ' + type.emojiAnim;
    iconEl.className = 'weather-icon-badge ' + type.iconAnim;

    document.getElementById('cardTemp').textContent = weather.temp;
    document.getElementById('cardFeels').textContent = t('체감', 'Feels') + ' ' + weather.feelsLike + '°C';
    document.getElementById('messageTitle').textContent = t(type.label, type.labelEn);
    document.getElementById('messageSub').textContent = t(type.message, type.messageEn);

    document.getElementById('statHumidityLabel').textContent = t('습도', 'Humidity');
    document.getElementById('statHumidity').textContent = weather.humidity;
    document.getElementById('statWindLabel').textContent = t('바람', 'Wind');
    document.getElementById('statWind').textContent = weather.windSpeed;
    document.getElementById('statRainLabel').textContent = t('강수확률', 'Rain');
    document.getElementById('statRain').textContent = weather.clouds || 0;
    document.getElementById('statVisLabel').textContent = t('가시거리', 'Visibility');
    document.getElementById('statVis').textContent = weather.visibility;

    var aqi = AQI_LEVELS[weather.aqi] || AQI_LEVELS[1];
    document.getElementById('aqiEmoji').textContent = aqi.emoji;
    document.getElementById('aqiLabel').textContent = t('대기질', 'Air Quality');
    document.getElementById('aqiValue').textContent = weather.pm25;
    document.getElementById('aqiStatus').textContent = t(aqi.label, aqi.labelEn);
    document.getElementById('aqiStatus').style.color = aqi.color;
    document.getElementById('aqiBarFill').style.width = aqi.percent + '%';
    document.getElementById('aqiBarFill').style.background = aqi.color;

    var uvIndex = Math.floor(Math.random() * 8) + 1;
    var uvLevel = getUVLevel(uvIndex);
    document.getElementById('uvLabel').textContent = t('자외선', 'UV Index');
    document.getElementById('uvValue').textContent = uvIndex;
    document.getElementById('uvStatus').textContent = t(uvLevel.label, uvLevel.labelEn);
    document.getElementById('uvStatus').style.color = uvLevel.color;

    document.getElementById('hourlyTitle').textContent = t('시간별 예보', 'Hourly Forecast');
    var hours = [];
    var now = new Date().getHours();

    // Generate hourly icons based on current weather condition
    var baseWeather = weather.weather;
    var baseTemp = weather.temp;

    for (var h = 0; h < 10; h++) {
      var hour = (now + h) % 24;
      var hourlyTemp = baseTemp + Math.floor(Math.random() * 5) - 2;

      // Determine hourly weather type based on current conditions with slight variations
      var hourlyWeather = baseWeather;
      var isNight = hour >= 20 || hour < 6;

      // Slight weather variations throughout the day
      if (h > 0) {
        var variation = Math.random();
        if (baseWeather === 'Clear' && variation > 0.8) {
          hourlyWeather = 'Clouds';
        } else if (baseWeather === 'Clouds' && variation > 0.85) {
          hourlyWeather = variation > 0.92 ? 'Rain' : 'Clear';
        } else if (baseWeather === 'Rain' && variation > 0.7) {
          hourlyWeather = variation > 0.85 ? 'Thunderstorm' : 'Drizzle';
        } else if (baseWeather === 'Drizzle' && variation > 0.8) {
          hourlyWeather = variation > 0.9 ? 'Rain' : 'Clouds';
        }
      }

      // Get the appropriate icon for this hour's weather
      var hourlyType = getWeatherType(hourlyWeather, hourlyTemp);
      var hourlyIcon = hourlyType.icon;

      // Adjust icon for night time (Clear -> Moon)
      if (isNight && hourlyWeather === 'Clear') {
        hourlyIcon = '🌙';
      } else if (isNight && hourlyWeather === 'Clouds') {
        hourlyIcon = '☁️';
      }

      hours.push('<div class="hourly-item"><span class="hourly-time">' + hour + t('시', ':00') + '</span><span class="hourly-icon">' + hourlyIcon + '</span><span class="hourly-temp">' + hourlyTemp + '°</span></div>');
    }
    document.getElementById('hourlyScroll').innerHTML = hours.join('');
    initDragScroll(document.getElementById('hourlyScroll'));
  }

  document.getElementById('cardOverlay').classList.add('show');
  document.getElementById('weatherCard').classList.add('show');
}

function closeCard() {
  document.getElementById('cardOverlay').classList.remove('show');
  document.getElementById('weatherCard').classList.remove('show');
  selectedCity = null;
  renderMarkers();
}

function toggleLanguage() {
  currentLanguage = currentLanguage === 'ko' ? 'en' : 'ko';
  document.getElementById('langBtn').textContent = currentLanguage === 'ko' ? 'EN' : '한국어';
  document.getElementById('refreshText').textContent = t('새로고침', 'Refresh');
  renderContinentSelector();
  renderMarkers();
  renderSidebar();
  renderContinentInfo();
  updateApiStatus();
  updateSearchPlaceholder();
  if (selectedCity) openCard(selectedCity.id);
}

function refreshData() { loadWeatherData(); }

// Search functionality
function initSearch() {
  var searchInput = document.getElementById('citySearch');
  var searchResults = document.getElementById('searchResults');

  searchInput.addEventListener('input', function() {
    var query = this.value.trim().toLowerCase();
    if (query.length === 0) {
      searchResults.classList.remove('show');
      return;
    }

    var results = CITIES.filter(function(city) {
      var nameMatch = city.name.toLowerCase().includes(query) || city.nameEn.toLowerCase().includes(query);
      var countryMatch = city.country.toLowerCase().includes(query);
      return nameMatch || countryMatch;
    });

    renderSearchResults(results, query);
  });

  searchInput.addEventListener('focus', function() {
    if (this.value.trim().length > 0) {
      var query = this.value.trim().toLowerCase();
      var results = CITIES.filter(function(city) {
        var nameMatch = city.name.toLowerCase().includes(query) || city.nameEn.toLowerCase().includes(query);
        var countryMatch = city.country.toLowerCase().includes(query);
        return nameMatch || countryMatch;
      });
      renderSearchResults(results, query);
    }
  });

  // Close search results when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-container')) {
      searchResults.classList.remove('show');
    }
  });

  // Update placeholder based on language
  updateSearchPlaceholder();
}

function updateSearchPlaceholder() {
  var searchInput = document.getElementById('citySearch');
  if (searchInput) {
    searchInput.placeholder = t('도시/국가 검색...', 'Search city/country...');
  }
}

function renderSearchResults(results, query) {
  var searchResults = document.getElementById('searchResults');
  var html = '';

  if (results.length === 0) {
    html = '<div class="search-no-results">' + t('검색 결과가 없습니다', 'No results found') + '</div>';
  } else {
    for (var i = 0; i < results.length; i++) {
      var city = results[i];
      var data = null;
      for (var j = 0; j < weatherData.length; j++) {
        if (weatherData[j].id === city.id) { data = weatherData[j]; break; }
      }
      var temp = (data && data.weather) ? data.weather.temp + '°' : '--';

      html += '<button class="search-result-item" onclick="onSearchResultClick(\'' + city.id + '\')">';
      html += '<span class="search-result-flag">' + city.flag + '</span>';
      html += '<div class="search-result-info">';
      html += '<div class="search-result-name">' + t(city.name, city.nameEn) + '</div>';
      html += '<div class="search-result-country">' + city.country + ' · ' + t(CONTINENTS[city.continent].name, CONTINENTS[city.continent].nameEn) + '</div>';
      html += '</div>';
      html += '<span class="search-result-temp">' + temp + '</span>';
      html += '</button>';
    }
  }

  searchResults.innerHTML = html;
  searchResults.classList.add('show');
}

function onSearchResultClick(cityId) {
  var searchInput = document.getElementById('citySearch');
  var searchResults = document.getElementById('searchResults');

  searchInput.value = '';
  searchResults.classList.remove('show');
  openCard(cityId);
}

// 창 크기 변경 시 마커 위치 재계산
window.addEventListener('resize', function() {
  renderMarkers();
});

// Map zoom and pan functionality
function clampTranslation() {
  var mapContainer = document.querySelector('.map-container');
  if (!mapContainer) return;

  var rect = mapContainer.getBoundingClientRect();
  var containerWidth = rect.width;
  var containerHeight = rect.height;

  // Calculate scaled image dimensions
  var scaledWidth = containerWidth * mapState.scale;
  var scaledHeight = containerHeight * mapState.scale;

  // Calculate boundaries
  var minX = containerWidth - scaledWidth;
  var maxX = 0;
  var minY = containerHeight - scaledHeight;
  var maxY = 0;

  // If zoomed out (image smaller than container), center it
  if (scaledWidth <= containerWidth) {
    mapState.translateX = (containerWidth - scaledWidth) / 2;
  } else {
    mapState.translateX = Math.max(minX, Math.min(maxX, mapState.translateX));
  }

  if (scaledHeight <= containerHeight) {
    mapState.translateY = (containerHeight - scaledHeight) / 2;
  } else {
    mapState.translateY = Math.max(minY, Math.min(maxY, mapState.translateY));
  }
}

function applyMapTransform() {
  var mapImage = document.getElementById('mapImage');
  var markersContainer = document.getElementById('markersContainer');

  clampTranslation();

  var transform = 'translate(' + mapState.translateX + 'px, ' + mapState.translateY + 'px) scale(' + mapState.scale + ')';
  mapImage.style.transform = transform;
  markersContainer.style.transform = transform;
}

function initMapZoomPan() {
  var mapContainer = document.querySelector('.map-container');
  var mapWrapper = document.getElementById('mapWrapper');

  // Mouse wheel zoom
  mapContainer.addEventListener('wheel', function(e) {
    e.preventDefault();

    var rect = mapContainer.getBoundingClientRect();
    var mouseX = e.clientX - rect.left;
    var mouseY = e.clientY - rect.top;

    var delta = e.deltaY > 0 ? -0.1 : 0.1;
    var newScale = mapState.scale + delta;
    newScale = Math.max(mapState.minScale, Math.min(mapState.maxScale, newScale));

    if (newScale !== mapState.scale) {
      // Zoom toward mouse position
      var scaleRatio = newScale / mapState.scale;
      var centerX = rect.width / 2;
      var centerY = rect.height / 2;

      // Adjust translate to zoom toward mouse position
      mapState.translateX = mouseX - (mouseX - mapState.translateX) * scaleRatio;
      mapState.translateY = mouseY - (mouseY - mapState.translateY) * scaleRatio;
      mapState.scale = newScale;

      applyMapTransform();
    }
  }, { passive: false });

  // Mouse drag to pan
  mapContainer.addEventListener('mousedown', function(e) {
    // Only start drag if not clicking on a marker
    if (e.target.closest('.city-marker')) return;

    mapState.isDragging = true;
    mapState.startX = e.clientX;
    mapState.startY = e.clientY;
    mapState.lastTranslateX = mapState.translateX;
    mapState.lastTranslateY = mapState.translateY;

    mapContainer.classList.add('grabbing');
    e.preventDefault();
  });

  document.addEventListener('mousemove', function(e) {
    if (!mapState.isDragging) return;

    var dx = e.clientX - mapState.startX;
    var dy = e.clientY - mapState.startY;

    mapState.translateX = mapState.lastTranslateX + dx;
    mapState.translateY = mapState.lastTranslateY + dy;

    applyMapTransform();
  });

  document.addEventListener('mouseup', function() {
    if (mapState.isDragging) {
      mapState.isDragging = false;
      var mapContainer = document.querySelector('.map-container');
      if (mapContainer) {
        mapContainer.classList.remove('grabbing');
      }
    }
  });

  // Double-click to reset zoom
  mapContainer.addEventListener('dblclick', function(e) {
    if (e.target.closest('.city-marker')) return;

    mapState.scale = 1;
    mapState.translateX = 0;
    mapState.translateY = 0;
    applyMapTransform();
  });
}

document.addEventListener('DOMContentLoaded', function() {
  renderContinentSelector();
  loadWeatherData();
  initMapZoomPan();
  initSearch();
});

document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeCard(); });
