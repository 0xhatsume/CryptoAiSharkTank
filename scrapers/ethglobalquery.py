import requests
from bs4 import BeautifulSoup

def scrape_ethglobal_links(base_url, max_pages):
    all_links = []
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
    }

    for page in range(1, max_pages + 1):
        url = f"{base_url}?page={page}"
        print(f"Scraping page: {page}")
        
        # Fetch the page
        response = requests.get(url, headers=headers)
        if response.status_code != 200:
            print(f"Failed to fetch page {page}")
            continue
        
        # Parse the page
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Extract links using the correct selector
        project_links = soup.select('a.block.border-2.border-black.rounded.overflow-hidden.relative')
        for link in project_links:
            href = link.get('href')
            if href:
                all_links.append(f"https://ethglobal.com{href}")  # Ensure full URL
        
    return all_links

# Usage
base_url = "https://ethglobal.com/showcase"
max_pages = 1  # Adjust based on the number of pages to scrape
links = scrape_ethglobal_links(base_url, max_pages)

# Print or save the links
for link in links:
    print(link)