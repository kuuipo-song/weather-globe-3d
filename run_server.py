#!/usr/bin/env python3
"""
Global Weather Globe - Local HTTP Server
=========================================
이 스크립트를 실행하면 로컬 웹 서버가 시작되고 브라우저가 자동으로 열립니다.

실행 방법:
  python run_server.py

또는:
  python3 run_server.py

서버 종료: Ctrl+C
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from functools import partial

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class CORSHandler(http.server.SimpleHTTPRequestHandler):
    """CORS 헤더를 추가하는 핸들러"""
    
    def __init__(self, *args, directory=None, **kwargs):
        super().__init__(*args, directory=directory, **kwargs)
    
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

def main():
    os.chdir(DIRECTORY)
    
    # 필요한 파일 확인
    required_files = ['index.html', 'globe.png']
    for f in required_files:
        if not os.path.exists(f):
            print(f"⚠️  Warning: {f} not found!")
    
    handler = partial(CORSHandler, directory=DIRECTORY)
    
    try:
        with socketserver.TCPServer(("", PORT), handler) as httpd:
            url = f"http://localhost:{PORT}"
            print("=" * 50)
            print("🌍 Global Weather Globe Server")
            print("=" * 50)
            print(f"📂 Directory: {DIRECTORY}")
            print(f"🌐 URL: {url}")
            print("=" * 50)
            print("Press Ctrl+C to stop the server")
            print()
            
            # 브라우저 자동 열기
            webbrowser.open(url)
            
            httpd.serve_forever()
            
    except OSError as e:
        if e.errno == 98 or e.errno == 48:  # Address already in use
            print(f"❌ Port {PORT} is already in use!")
            print(f"   Try: kill -9 $(lsof -t -i:{PORT})")
        else:
            raise
    except KeyboardInterrupt:
        print("\n👋 Server stopped.")

if __name__ == "__main__":
    main()
