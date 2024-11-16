import requests
from bs4 import BeautifulSoup
import json
import os
import signal

# Function to extract details from a project page
def scrape_project_details(link):
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
    }
    response = requests.get(link, headers=headers)
    if response.status_code != 200:
        print(f"Failed to fetch project page: {link}")
        return None

    soup = BeautifulSoup(response.text, 'html.parser')

    # Extract fields with fallbacks for missing elements
    try:
        title = soup.select_one('h1.text-4xl').text.strip() if soup.select_one('h1.text-4xl') else None
        brief_description = soup.select_one('p.lg\\:text-lg').text.strip() if soup.select_one('p.lg\\:text-lg') else None
        long_description = " ".join([p.text.strip() for p in soup.select('div.text-black-500 p')]) or None
        how_its_made = " ".join([p.text.strip() for p in soup.select('h3:-soup-contains("How it\'s Made") + div p')]) or None
        screenshots = [img['src'] for img in soup.select('div.swiper-slide img')] or []
        live_demo = soup.select_one('a[href*="vercel.app"]')['href'] if soup.select_one('a[href*="vercel.app"]') else None
        source_code = soup.select_one('a[href*="github.com"]')['href'] if soup.select_one('a[href*="github.com"]') else None

        return {
            "title": title,
            "brief_description": brief_description,
            "long_description": long_description,
            "how_its_made": how_its_made,
            "screenshots": screenshots,
            "live_demo": live_demo,
            "source_code": source_code,
            "link": link
        }
    except Exception as e:
        print(f"Error parsing project details from {link}: {e}")
        return None


# Function to save project details to a JSON file
def save_projects_to_json(json_file, projects):
    existing_projects = []
    if os.path.exists(json_file):
        with open(json_file, 'r') as f:
            existing_projects = json.load(f)
    # Combine existing projects with new ones
    existing_projects.extend(projects)
    with open(json_file, 'w') as f:
        json.dump(existing_projects, f, indent=4)

# Function to scrape project links and their details
def scrape_ethglobal_links_and_details(base_url, start_page, max_pages, json_file, metadata_file):
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
    }

    try:
        for page in range(start_page, max_pages + 1):
            url = f"{base_url}?page={page}"
            print(f"Scraping page: {page}")
            response = requests.get(url, headers=headers)
            if response.status_code != 200:
                print(f"Failed to fetch page {page}")
                break

            soup = BeautifulSoup(response.text, 'html.parser')
            project_links = [f"https://ethglobal.com{link['href']}" for link in soup.select('a.block.border-2.border-black')]

            projects = []
            for project_link in project_links:
                details = scrape_project_details(project_link)
                if details:
                    projects.append(details)

            save_projects_to_json(json_file, projects)
            with open(metadata_file, 'w') as f:
                f.write(str(page))

    except KeyboardInterrupt:
        print("\nScraping interrupted. Progress saved.")
    finally:
        print("\nScript exited. Data up to the last saved page has been written to files.")


# Usage
base_url = "https://ethglobal.com/showcase"
json_file = "ethglobal_projectsdata.json"
metadata_file = "scraping_metadata.txt"
start_page = 1  # Adjust based on where to start
max_pages = 369  # Adjust this based on how many pages to scrape # max is 369

scrape_ethglobal_links_and_details(base_url, start_page, max_pages, json_file, metadata_file)

print("Scraping completed.")