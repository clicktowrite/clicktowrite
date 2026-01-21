const questionsData = {
    "questions": [
        {
            "id": 1,
            "category": "verb",
            "sentence": "She ___ to school every day.",
            "choices": ["go", "goes", "going", "gone"],
            "correctAnswer": "goes",
            "explanation": "Third-person singular subjects (like 'She') require the verb to end in -s in the simple present tense."
        },
        {
            "id": 2,
            "category": "verb",
            "sentence": "They ___ watching a movie right now.",
            "choices": ["is", "are", "am", "be"],
            "correctAnswer": "are",
            "explanation": "The subject 'They' is plural, so it requires the plural form of the verb 'to be', which is 'are' in the present continuous tense."
        },
        {
            "id": 3,
            "category": "verb",
            "sentence": "I ___ finished my homework.",
            "choices": ["has", "have", "had", "am"],
            "correctAnswer": "have",
            "explanation": "The subject 'I' uses 'have' to form the present perfect tense."
        },
        {
            "id": 4,
            "category": "preposition",
            "sentence": "He is interested ___ learning Spanish.",
            "choices": ["in", "on", "at", "with"],
            "correctAnswer": "in",
            "explanation": "The adjective 'interested' is followed by the preposition 'in'."
        },
        {
            "id": 5,
            "category": "verb",
            "sentence": "There isn't ___ milk in the fridge.",
            "choices": ["some", "any", "a", "much"],
            "correctAnswer": "any",
            "explanation": "'Any' is used in negative sentences to indicate the absence of something."
        },
        {
            "id": 6,
            "category": "verb",
            "sentence": "My brother ___ a doctor.",
            "choices": ["is", "are", "am", "be"],
            "correctAnswer": "is",
            "explanation": "The subject 'My brother' is a third-person singular noun, which takes the verb 'is'."
        },
        {
            "id": 7,
            "category": "verb",
            "sentence": "We went to the store ___ buy some bread.",
            "choices": ["for", "at", "to", "so"],
            "correctAnswer": "to",
            "explanation": "The infinitive of purpose ('to' + verb) is used to explain why an action is done."
        },
        {
            "id": 8,
            "category": "preposition",
            "sentence": "The cat is sleeping ___ the table.",
            "choices": ["in", "at", "under", "with"],
            "correctAnswer": "under",
            "explanation": "The preposition 'under' is used to indicate a position below or beneath something."
        },
        {
            "id": 9,
            "category": "verb",
            "sentence": "She ___ to London last year.",
            "choices": ["go", "goes", "went", "gone"],
            "correctAnswer": "went",
            "explanation": "The phrase 'last year' indicates a past action, so the simple past tense 'went' is required."
        },
        {
            "id": 10,
            "category": "verb",
            "sentence": "What ___ you do yesterday?",
            "choices": ["did", "do", "does", "have"],
            "correctAnswer": "did",
            "explanation": "To form a question in the simple past, we use the auxiliary verb 'did'."
        },
        {
            "id": 11,
            "category": "preposition",
            "sentence": "He has been working here ___ 2010.",
            "choices": ["for", "since", "at", "in"],
            "correctAnswer": "since",
            "explanation": "'Since' is used with a specific point in time to indicate the starting point of an action."
        },
        {
            "id": 12,
            "category": "verb",
            "sentence": "If you heat water, it ___.",
            "choices": ["boil", "boils", "boiled", "is boiling"],
            "correctAnswer": "boils",
            "explanation": "This is a zero conditional sentence, used for general truths. The simple present tense is used in both clauses."
        },
        {
            "id": 13,
            "category": "verb",
            "sentence": "I would like ___ apple, please.",
            "choices": ["a", "an", "the", "some"],
            "correctAnswer": "an",
            "explanation": "The article 'an' is used before a singular noun that begins with a vowel sound."
        },
        {
            "id": 14,
            "category": "verb",
            "sentence": "Listen! Someone ___ the piano.",
            "choices": ["play", "plays", "is playing", "played"],
            "correctAnswer": "is playing",
            "explanation": "The word 'Listen!' indicates an action happening now, so the present continuous tense is used."
        },
        {
            "id": 15,
            "category": "verb",
            "sentence": "There are many ___ on the tree.",
            "choices": ["leaf", "leafs", "leaves", "leavs"],
            "correctAnswer": "leaves",
            "explanation": "The plural form of the noun 'leaf' is 'leaves'."
        },
        {
            "id": 16,
            "category": "verb",
            "sentence": "My keys ___ on the desk.",
            "choices": ["is", "are", "was", "be"],
            "correctAnswer": "are",
            "explanation": "The subject 'keys' is plural, so it requires the plural verb 'are'."
        },
        {
            "id": 17,
            "category": "verb",
            "sentence": "The train ___ at 8:00 AM.",
            "choices": ["leave", "leaves", "left", "is leaving"],
            "correctAnswer": "leaves",
            "explanation": "The simple present tense is used for scheduled events or timetables."
        },
        {
            "id": 18,
            "category": "verb",
            "sentence": "While I was studying, the phone ___.",
            "choices": ["ring", "rings", "rang", "rung"],
            "correctAnswer": "rang",
            "explanation": "When a short action interrupts a longer ongoing action in the past, the short action takes the simple past tense."
        },
        {
            "id": 19,
            "category": "verb",
            "sentence": "You ___ not be late for the exam.",
            "choices": ["should", "must", "can", "may"],
            "correctAnswer": "must",
            "explanation": "The modal verb 'must' is used to express a strong obligation or necessity."
        },
        {
            "id": 20,
            "category": "verb",
            "sentence": "This is the ___ movie I have ever seen.",
            "choices": ["good", "better", "best", "most good"],
            "correctAnswer": "best",
            "explanation": "The superlative form 'best' is used to compare three or more things and is often used with the present perfect tense."
        },
        {
            "id": 21,
            "category": "wrong word",
            "sentence": "Here’s a key, so you can let yourself into.",
            "choices": ["Here’s", "into", "let", "yourself"],
            "correctAnswer": "into",
            "explanation": "The preposition 'into' is unnecessary here. The sentence should be '...let yourself in'."
        },
        {
            "id": 22,
            "category": "wrong word",
            "sentence": "He is very good in playing the guitar.",
            "choices": ["is", "very", "in", "the"],
            "correctAnswer": "in",
            "explanation": "The correct preposition to use with 'good' in this context is 'at'. 'He is good at playing...'"
        },
        {
            "id": 23,
            "category": "wrong word",
            "sentence": "I have been waiting for you since two hours.",
            "choices": ["have been", "for", "since", "hours"],
            "correctAnswer": "since",
            "explanation": "'Since' is used for a point in time. 'For' should be used to denote a duration of time."
        },
        {
            "id": 24,
            "category": "wrong word",
            "sentence": "Despite of the rain, we went to the park.",
            "choices": ["Despite of", "the", "went", "to"],
            "correctAnswer": "Despite of",
            "explanation": "'Despite' does not take the preposition 'of'. The correct phrase is 'Despite the rain...' or 'In spite of the rain...'"
        },
        {
            "id": 25,
            "category": "preposition",
            "sentence": "The book is ___ the table.",
            "choices": ["on", "in", "at", "with"],
            "correctAnswer": "on",
            "explanation": "Use 'on' to indicate that something is in a position on a surface."
        },
        {
            "id": 26,
            "category": "preposition",
            "sentence": "I'll meet you ___ the bus stop.",
            "choices": ["on", "in", "at", "by"],
            "correctAnswer": "at",
            "explanation": "Use 'at' to refer to a specific point or location."
        }
    ]
};
