import json
import random
import string

def generate_tracking_number(length=8):
    """Generate a random alphanumeric tracking number."""
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))

def generate_distractors(correct_answer):
    """Generate three unique distractors for the correct answer."""
    distractors = set()
    while len(distractors) < 3:
        answer_list = list(correct_answer)
        # Introduce a random modification
        pos1, pos2 = random.sample(range(len(answer_list)), 2)
        answer_list[pos1], answer_list[pos2] = answer_list[pos2], answer_list[pos1]
        distractor = "".join(answer_list)

        if distractor != correct_answer:
            distractors.add(distractor)
    return list(distractors)

def create_cognitive_test_data(num_questions=50):
    """Create a list of cognitive test questions."""
    questions = []
    for _ in range(num_questions):
        tracking_number = generate_tracking_number()
        distractors = generate_distractors(tracking_number)
        choices = [tracking_number] + distractors
        random.shuffle(choices)

        question = {
            "tracking_number": tracking_number,
            "choices": choices,
            "correct_answer": tracking_number
        }
        questions.append(question)
    return {"questions": questions}

# Generate the questions and save to a JSON file
cognitive_test_data = create_cognitive_test_data(50)
with open('cognitive_test.json', 'w') as f:
    json.dump(cognitive_test_data, f, indent=4)

print("cognitive_test.json file created successfully.")
