import re
from bs4 import BeautifulSoup

def extract_books(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    books = []

    for idx, item in enumerate(soup.select('.listItem-box'), 1):
        try:
            # 提取書籍基本資訊
            title = item.select_one('h4 a')['title']
            author = item.select_one('.contributor-info a').text.strip()
            cover = item.select_one('img[itemprop="image"]')['src'].split('?')[0]  # 移除查詢參數
            description = item.select_one('p.description').text.strip()

            # 提取評分
            rating_elem = item.select_one('.avg-rating')
            rating = float(rating_elem.text.strip()) if rating_elem and rating_elem.text.strip() else 4.0

            # 提取價格
            price_elem = item.select_one('.price .price')
            price = float(price_elem.text.strip()) if price_elem and price_elem.text.strip() else 0

            # 建立書籍對象
            book = {
                'id': idx,
                'title': title,
                'author': author,
                'cover': cover,
                'description': description.replace('"', '\\"').replace('\n', '\\n'),
                'audioUrl': "'/src/audio/googleStitchUI_demo.wav'",
                'duration': 3600,  # 預設值
                'category': "'未分類'",
                'tags': "['未分類']",
                'rating': rating,
                'listenCount': 1000 + idx * 100,
                'language': "'中文'",
                'totalTimeSecs': 3600,  # 預設值
                'chapters': "["
                    "{ id: 1, title: '第一章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 1 },"
                    "{ id: 2, title: '第二章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 2 },"
                    "{ id: 3, title: '第三章', audioUrl: '/src/audio/googleStitchUI_demo.wav', duration: 1200, chapterNumber: 3 }"
                "]"
            }

            books.append(book)
        except Exception as e:
            print(f"處理第 {idx} 本書時出錯: {str(e)}")
            continue

    return books

def generate_ts_code(books):
    ts_code = "this.books = [\n"

    for book in books:
        ts_code += "  {\n"
        for key, value in book.items():
            if key == 'chapters':
                ts_code += f"    {key}: {value},\n"
            elif isinstance(value, str) and not value.startswith("'") and not value.startswith("["):
                ts_code += f"    {key}: '{value}',\n"
            else:
                ts_code += f"    {key}: {value},\n"
        ts_code += "  },\n"

    ts_code += "];"
    return ts_code

def main():
    # 讀取 HTML 文件
    with open('mock-data.html', 'r', encoding='utf-8') as f:
        html_content = f.read()

    # 提取書籍數據
    books = extract_books(html_content)

    # 生成 TypeScript 代碼
    ts_code = generate_ts_code(books)

    # 輸出到文件
    with open('book_data.ts', 'w', encoding='utf-8') as f:
        f.write(ts_code)

    print("TypeScript 代碼已生成到 book_data.ts")

if __name__ == "__main__":
    main()
