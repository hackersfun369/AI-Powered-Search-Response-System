import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS  # Importing CORS
from bs4 import BeautifulSoup
from googlesearch import search
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from a .env file

app = Flask(__name__)
CORS(app)
MISTRAL_API_KEY = os.getenv("MISTRAL_API_KEY")  

def extract_text(url):
    """Extracts text from a given webpage URL."""
    try:
        response = requests.get(url, headers={"User-Agent": "Mozilla/5.0"}, timeout=5)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, 'html.parser')
        text = soup.get_text(separator='\n', strip=True)
        return text[:2000]  # Limit the length of the extracted text

    except requests.exceptions.RequestException:
        return ""  # Return empty string in case of an error

def google_search_and_scrape(query, num_results=5):
    """Performs a Google search and extracts text from the top search results."""
    merged_text = ""

    for url in search(query, num_results=num_results):
        page_text = extract_text(url)
        if page_text:
            merged_text += f"\n--- Extracted from {url} ---\n{page_text}\n"

    return merged_text

@app.route("/search", methods=["POST"])
def search_and_scrape():
    """Handles search and web scraping."""
    data = request.json
    query = data.get("query", "")

    if not query:
        return jsonify({"error": "Query is required"}), 400

    # Perform Google search and web scraping
    merged_text = google_search_and_scrape(query)

    return jsonify({"merged_text": merged_text})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
