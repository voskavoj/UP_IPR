import time

import requests
import sys


def get_response_from_url(url):
    print(f"Connecting to {url}")

    try:
        response = requests.get(url)
    except requests.exceptions.ConnectionError:
        print("Server could not be reached.")
        return

    # server info
    print("Server responded with response", response.status_code)
    try:
        print("Server software:", response.headers['Server'])
    except KeyError:
        print("Server did not provide information about its software")

    # headers
    headers = response.headers
    print(f"Server provided {len(headers)} headers:")
    for item in headers.items():
        print("\t", item)

    # cookies
    cookies = response.cookies
    print(f"Site uses {len(cookies)} cookie(s)")
    for c in cookies:
        if c.expires is not None:
            expires = time.strftime("%H:%M:%S %d.%m.%Y", time.localtime(c.expires))
        else:
            expires = "N/A"
        print(f"\t {c.name}, expires on {expires}")


if __name__ == "__main__":
    # get URL
    if len(sys.argv) == 2:
        url = sys.argv[1]
        print(f"Url given as an argument: {url}")
    else:
        url = input("Please input url: ")

    get_response_from_url(url)

