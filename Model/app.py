from flask import Flask, request, jsonify
from pydantic import BaseModel, ValidationError
import instaloader
import spacy
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from flask_cors import CORS

# Initialize Flask app and CORS
app = Flask(__name__)
CORS(app)  # This enables CORS for all routes

# Load model and tokenizer globally to avoid reloading them for every request
MODEL_NAME = "google/flan-t5-base"
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)

# Load the spaCy model
nlp = spacy.load("en_core_web_sm")

def get_instagram_caption(post_url: str) -> str:
    # Initialize Instaloader
    loader = instaloader.Instaloader()
    shortcode = post_url.split("/")[-2]

    try:
        # Load the post using the shortcode
        post = instaloader.Post.from_shortcode(loader.context, shortcode)
        caption = post.caption
        return caption if caption else "No caption found."
    except Exception as e:
        return f"An error occurred: {e}"

def process_instagram_caption(caption: str) -> str:
    # Use spaCy to process the Instagram caption
    doc = nlp(caption)
    
    # Extract relevant entities like product name, brand, and other important details
    product_entities = []
    for ent in doc.ents:
        if ent.label_ in ["PRODUCT", "ORG", "MONEY", "GPE"]:
            product_entities.append(ent.text)
    
    # Optionally, create a more structured description based on entities found
    processed_caption = caption
    if product_entities:
        processed_caption = f"Product-related information found: {', '.join(product_entities)}. Description: {caption}"
    
    return processed_caption

def convert_instagram_to_amazon(instagram_description: str):
    # Process the Instagram caption with spaCy
    processed_description = process_instagram_caption(instagram_description)

    # Construct the prompt
    prompt = (
        f"Given the following Instagram description, please generate an Amazon product listing:\n\n"
        f"Instagram Description:\n{processed_description}\n\n"
        f"Please provide a well-crafted and professional product listing with the following components:\n\n"
        f"1. Title: A catchy and informative product title that highlights the main features.\n"
        f"2. Description: A compelling product description that emphasizes the benefits, key features, and the target audience.\n"
        f"3. Category: Choose the most appropriate category for this product on Amazon.\n\n"
        f"Your response should be clear, descriptive, and avoid repeating the Instagram post."
    )

    # Tokenize input
    inputs = tokenizer(prompt, return_tensors="pt", truncation=True, max_length=1024)

    # Generate output
    outputs = model.generate(
        inputs.input_ids,
        max_length=1024,
        num_beams=5,
        temperature=1.0,
        top_p=0.95,
        early_stopping=True,
        do_sample=True,
        num_return_sequences=1,
    )

    # Decode the generated text
    generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    lines = generated_text.split("\n")
    print(generated_text)

    # Extract title, description, and set category
    product_title = lines[0].strip() if len(lines) > 0 else "Title not generated"
    product_description = " ".join(lines[1:]).strip() if len(lines) > 1 else "Description not generated"

    # Default category logic
    product_category = "Home"
    if "chair" in product_title.lower() or "furniture" in product_description.lower():
        product_category = "Furniture"
    elif "home" in product_description.lower():
        product_category = "Home"
    else:
        product_category = "Uncategorized"

    return {
        "title": product_title,
        "description": product_description if product_description != "Description not generated" else instagram_description,
        "category": product_category,
    }

class InstagramRequest(BaseModel):
    url: str

@app.route("/generate_amazon_listing/", methods=["POST"])
def generate_amazon_listing():
    try:
        # Parse JSON request
        data = request.get_json()
        instagram_request = InstagramRequest(**data)
        instagram_url = instagram_request.url
    except ValidationError as e:
        return jsonify({"error": "Invalid input", "details": e.errors()}), 400

    # Get Instagram description
    instagram_description = get_instagram_caption(instagram_url)

    if "An error occurred" in instagram_description:
        return jsonify({"error": instagram_description}), 400

    # Convert Instagram caption to Amazon product listing
    result = convert_instagram_to_amazon(instagram_description)

    return jsonify(result), 200

# Run the application (this is required only if running directly as a script)
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
