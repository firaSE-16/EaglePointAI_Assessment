import re

def analyze_text(text):
    # remove special characters except spaces and letters/numbers
    clean_text = re.sub(r'[^A-Za-z0-9\s]', '', text)
    
    words = clean_text.lower().split()
    word_count = len(words)

    # calculate average word length
    avg_word_length = round((len(clean_text) - (word_count - 1)) / word_count, 2) if word_count > 0 else 0

    # find longest words
    max_length = 0
    for word in words:
        if len(word) > max_length:
            max_length = len(word)

    longest_words = [word for word in words if len(word) == max_length]

    # count word frequency
    word_frequency = {}
    for word in words:
        word_frequency[word] = word_frequency.get(word, 0) + 1

    result = {
        "word_count": word_count,
        "average_word_length": avg_word_length,
        "longest_words": longest_words,
        "word_frequency": word_frequency
    }
    return result

text = input("Enter your sentence: ")
output = analyze_text(text)
print(output)
