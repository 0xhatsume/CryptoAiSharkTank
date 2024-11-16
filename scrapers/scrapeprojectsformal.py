import json
import requests
from bs4 import BeautifulSoup
import os

# Function to read metadata for resuming
def read_metadata(metadata_file):
    if os.path.exists(metadata_file):
        with open(metadata_file, 'r') as f:
            data = f.read().strip()
            if data:
                return int(data)  # Return the last scraped page
    return 0  # Start from page 1 if no metadata exists


# Function to save metadata
def save_metadata(metadata_file, page):
    with open(metadata_file, 'w') as f:
        f.write(str(page))  # Save the last successfully scraped page


# Function to append links to the JSON file
def append_to_json(json_file, new_links):
    existing_links = []
    if os.path.exists(json_file):
        with open(json_file, 'r') as f:
            existing_links = json.load(f)
    # Append new links and save
    existing_links.extend(new_links)
    with open(json_file, 'w') as f:
        json.dump(existing_links, f, indent=4)



# Function to scrape links
def scrape_ethglobal_links(base_url, start_page, max_pages, json_file, metadata_file):
    all_links = []
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
    }

    for page in range(start_page, max_pages + 1):
        url = f"{base_url}?page={page}"
        print(f"Scraping page: {page}")
        
        # Fetch the page
        response = requests.get(url, headers=headers)
        if response.status_code != 200:
            print(f"Failed to fetch page {page}")
            break  # Stop on error, metadata will save the last successful page
        
        # Parse the page
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Extract links
        project_links = soup.select('a.block.border-2.border-black.rounded.overflow-hidden.relative')
        for link in project_links:
            href = link.get('href')
            if href:
                all_links.append(f"https://ethglobal.com{href}")  # Ensure full URL
        
        # Append links to JSON
        append_to_json(json_file, all_links)
        all_links = []  # Clear the list after saving
        
        # Save metadata for the current page
        save_metadata(metadata_file, page)

# Usage
base_url = "https://ethglobal.com/showcase"
json_file = "ethglobal_projects.json"
metadata_file = "scraping_metadata.txt"
start_page = read_metadata(metadata_file) + 1  # Start from the next page
max_pages = 10  # Adjust this based on how many pages to scrape

scrape_ethglobal_links(base_url, start_page, max_pages, json_file, metadata_file)

print("Scraping completed.")