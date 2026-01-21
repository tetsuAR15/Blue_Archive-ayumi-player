# manager.py
import os
import json

# 設定
MUSIC_DIR = 'music'
OUTPUT_JS = 'playlist.js'

def main():
    """
    musicフォルダ内のmp3を探して、
    HTMLが読み込める形式(JavaScript)で保存するツール
    """
    print("--- プレイリスト作成ツール ---")

    # フォルダの確認
    if not os.path.exists(MUSIC_DIR):
        print(f"'{MUSIC_DIR}' フォルダを作成しました。")
        os.makedirs(MUSIC_DIR)
        return

    # mp3ファイルを探す
    files = [f for f in os.listdir(MUSIC_DIR) if f.endswith('.mp3')]
    
    if not files:
        print("mp3ファイルが見つかりません。musicフォルダに入れてください。")
        # 空のリストを作成しておく
        files = []

    # パス付きのリストにする（Web用）
    # リストの中身例: ["music/song1.mp3", "music/song2.mp3"]
    song_paths = [f"{MUSIC_DIR}/{file}" for file in files]

    # JavaScriptファイルとして書き込む
    # playlist.js というファイルの中に、変数定義を書き込みます
    js_content = f"const playlist = {json.dumps(song_paths, ensure_ascii=False)};"

    with open(OUTPUT_JS, 'w', encoding='utf-8') as f:
        f.write(js_content)
        
    print(f"完了: {len(files)} 曲を '{OUTPUT_JS}' に登録しました。")
    print("HTMLファイルを開いて確認してください。")

if __name__ == "__main__":
    main()