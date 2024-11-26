import re
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import instaloader
import spacy


def get_instagram_caption(post_url):
    # Initialize Instaloader
    loader = instaloader.Instaloader()

    shortcode = post_url.split("/")[-2]

    try:
        # Load the post using the shortcode
        post = instaloader.Post.from_shortcode(loader.context, shortcode)

        # Get the caption (description)
        caption = post.caption
        return caption if caption else "No caption found."

    except Exception as e:
        return f"An error occurred: {e}"


def convert_instagram_to_amazon(instagram_description, model_name="google/flan-t5-base"):
    # Load tokenizer and model
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForSeq2SeqLM.from_pretrained(model_name)

    # Initialize spaCy for additional NLP tasks
    nlp = spacy.load("en_core_web_sm")

    # Process the Instagram description to extract entities (optional)
    doc = nlp(instagram_description)
    entities = [ent.text for ent in doc.ents]  # Extract entities such as product names, brands, etc.

    # Construct the prompt with extracted entities (optional)
    prompt = (
        f"Given the following Instagram description, please generate an Amazon product listing:\n\n"
        f"Instagram Description:\n{instagram_description}\n\n"
        f"Extracted Entities: {', '.join(entities) if entities else 'No entities found'}\n\n"
        f"Please provide a well-crafted and professional product listing with the following components:\n\n"
        f"1. Title: A catchy and informative product title that highlights the main features.\n"
        f"2. Description: A compelling product description that emphasizes the benefits, key features, and the target audience. The description should sound like it’s from an Amazon product page.\n"
        f"3. Category: Choose the most appropriate category for this product on Amazon. Be specific and relevant.\n\n"
        f"Your response should be clear, descriptive, and avoid repeating the Instagram post. Make the product sound appealing and professional."
    )

    # Tokenize input
    inputs = tokenizer(prompt, return_tensors="pt", truncation=True, max_length=1024)

    # Generate output with increased max_length and length_penalty to encourage longer output
    outputs = model.generate(
        inputs.input_ids,
        max_length=2048,  # Increase output length
        num_beams=5,      # Use beam search for better quality output
        temperature=0.9,   # Slightly higher temperature for more diversity
        top_p=0.95,
        early_stopping=True,
        do_sample=True,
        num_return_sequences=1,  # Only one output sequence is required
        length_penalty=3.0  # Apply a penalty to avoid short responses
    )

    # Decode the generated text
    generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    print("Generated Text:", generated_text)  # Debugging step

    # Extract title (first line) and description (rest of the text)
    lines = generated_text.split(". ")
    
    # Extract the first line as title, and the rest as description
    product_title = lines[0].strip() if len(lines) > 0 else "Title not generated"
    product_description = " ".join(lines[1:]).strip() if len(lines) > 1 else "Description not generated"
    
    # Default category detection
    product_category = "Home"  # Default category
    if "chair" in product_title.lower() or "furniture" in product_description.lower():
        product_category = "Furniture"
    elif "home" in product_description.lower():
        product_category = "Home"
    else:
        product_category = "Uncategorized"
    if product_description == "Description not generated":
        product_description = instagram_description

    return product_title, product_description, product_category


if __name__ == "__main__":
    instagram_url = "https://www.instagram.com/p/DBbVm60oVIb/?utm_source=ig_web_copy_link"
    instagram_description = get_instagram_caption(instagram_url)

    print("\nGenerating Amazon product details...")
    title, description, category = convert_instagram_to_amazon(instagram_description)
    print("\nAmazon Product Details:")
    print("Product Title:", title)
    print("Product Description:", description)
    print("Product Category:", category)
