# Documentation

## Task 1 Smart Text Analyzer using Python

### Steps I followed
1. First thing I decided to remove special characters and split the text using space " " and store it in words(list). This helps me to reuse it later in the code for all the problems. The time complexity will be O(n) when n is word length.
2. After splitting I just used len(words) from the list we created earlier.
3. The next part was the average word length. My first thought was to loop through all words and add their lengths but that means an extra loop which becomes O(n) again. I wanted something cleaner.  
   Then I realized that total characters = length of the entire sentence minus the spaces.  
   If there are k words then there are k−1 spaces.  
   So total_characters = len(text) – (word_count – 1). Then I divide by word_count.  
   This avoids doing another loop.
4. Finding the longest word originally I thought to use one loop to find the max length then another to collect all words matching that length. That is still fine and simple. The time complexity will be O(n).
5. For counting frequency I used a dictionary. For every word if it exists I increase the count; if not I create it. Time complexity will be O(n).
6. After that I put everything into one dictionary and returned it.  
   I chose this approach because it is readable and the time complexity stays linear O(n) which is the best possible because we must at least read every character once.

---

## Task 2 Async Data Fetcher with Retry using JavaScript

### Steps I followed
1. First thing I wrote a helper function wait(ms) to pause execution for a given number of milliseconds. This helps simulate network delays and also lets me wait between retries. The time complexity is O(1) for each call.
2. Next I created fakeApiCall(url) to simulate an API request that can randomly succeed or fail. I used await wait to mimic network latency and Math.random() to decide success (65% chance) or failure. If successful it returns a simple object with the data if not it throws an error.
3. Then I implemented fetchDataWithRetry(url, maxAttempts) to handle retry logic. I initialized lastError to store the last failure in case all retries fail.
4. I used a for loop from 1 to maxAttempts. In each iteration I tried to fetch data using fakeApiCall(url).  
   • If it succeeds, I immediately return the data.  
   • If it fails, I save the error to lastError.  
   • If it is not the last attempt I wait for 1 second before retrying using await wait(1000).  
   This ensures the retries happen at a controlled pace. The time complexity is O(maxAttempts).
5. If all attempts fail I throw an error with the message from the last failed attempt. This allows the caller to know the fetch completely failed.
6. Finally I used an immediately invoked async function to test the retry logic. I wrapped it in a try catch to print the final result or the error if all attempts failed.  
   I chose this approach because the retry logic is flexible and ensures that even if the API fails intermittently we still have a chance to get the data.

---

## Task 3 Rate Limiter using JavaScript

### Steps I followed
1. First I created a Map called rateLimiter to store requests for each user. The key is the userId and the value is an array of timestamps representing when requests were made. Using a Map makes lookups and updates fast.
2. I wrote the function isRateLimited(userId) to check if a user has exceeded the limit of 5 requests per 60 seconds. I get the current time using Date.now() and define the window as 60 * 1000 milliseconds. The request limit is set to 5.
3. I retrieve the previous request timestamps for the user from the map. If there are none I initialize it as an empty array.
4. I filter the timestamps array to remove any entries older than the 60 second window. This ensures only recent requests are counted. The time complexity is O(n) where n is the number of requests stored for that user.
5. If the remaining timestamps length is greater than or equal to the limit I return true to indicate the user is blocked. Otherwise I add the current timestamp to the array and update the map then return false to allow the request.
6. I created a helper function request(userId) to simulate making a request. It calls isRateLimited and logs whether the request is ALLOWED or BLOCKED.
7. Finally I wrote a demo() function to test the rate limiter. I simulate 8 quick requests to the same user to show blocking in action then wait 61 seconds before sending 6 more requests to show the window reset.  
   I chose this approach because it is efficient for small scale in memory rate limiting. Using a Map ensures fast lookups and filtering timestamps keeps memory usage reasonable.

---

## Searches I used
1. To choose the best data structure for storing a rate limiter in JavaScript:  
   From Google search "best data structure to store rate limiter per user javascript". I found Map() as a solution because it allows fast access, insertion, and deletion by userId.
2. To remove special characters in Python without importing regex:  
   From Google search "python remove special characters regex site:docs.python.org". Python re documentation: https://docs.python.org/3/library/re.html#re.sub. I got re.sub(r'[^A-Za-z0-9\s]', '', text) to remove all special characters except letters, numbers, and spaces.
