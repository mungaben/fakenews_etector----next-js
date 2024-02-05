from flask import Flask, request
from flask_cors import CORS
import pandas as pd
import sklearn
import itertools
import numpy as np
import seaborn as sb
import re
import nltk
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from matplotlib import pyplot as plt
from sklearn.linear_model import PassiveAggressiveClassifier
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords

app = Flask(__name__)
CORS(app)


# Load the trained machine learning model and the vectorizer
loaded_model = pickle.load(open("model.pkl", 'rb'))
# loaded_model = pickle.load(open("model.pkl", 'rb'))
vector = pickle.load(open("vector.pkl", 'rb'))

# Create a lemmatizer object and a set of English stopwords
lemmatizer = WordNetLemmatizer()
stpwrds = set(stopwords.words('english'))

# Initialize an empty list to hold the processed text data
corpus = []


def fake_news_det(news):
    """
    Function to predict whether a news article is fake or real.
    The function preprocesses the input, vectorizes it and then uses a trained model to make the prediction.
    """
    print("news : ", news)
    # Preprocess the input
    review = news
    # Remove non-alphabetic characters
    review = re.sub(r'[^a-zA-Z\s]', '', review)
    review = review.lower()  # Convert to lowercase
    review = nltk.word_tokenize(review)  # Tokenize the words
    print(f"review : {review}")

    # Remove stopwords and lemmatize the words
    corpus = [lemmatizer.lemmatize(y) for y in review if y not in stpwrds]
    print(corpus)

    # Vectorize the input data and make a prediction
    input_data = [' '.join(corpus)]
    print("input data ", input_data)
    vectorized_input_data = vector.transform(input_data)
    print("vectorized input data ", vectorized_input_data)
    prediction = loaded_model.predict(vectorized_input_data)
    print("prediction ", prediction)

    return prediction


todos = []
todo_id_counter = 1


@app.route("/api/todos", methods=["GET"])
def get_all_todo_items():
    return todos


@app.route("/api/predict", methods=["POST", "GET"])
def predict():
    """
    Function to predict whether a news article is fake or real based on the input from the user.
    If the request method is POST, the function gets the news article from the form, makes a prediction and renders the prediction page with the result.
    If the request method is not POST, the function renders the prediction page with an error message.
    """
    print("request method : ", request.method)

    if request.method == 'POST':
        data = request.get_json()
        print("data posted", data, type(data))

        extracted_data = data.get("text")
        print(f"extracted_data : {extracted_data}")
       

        pred = fake_news_det(extracted_data)
        
        print(pred)

        def predi(pred):
            if pred[0] == 0:
                #   print("Fake News")
                res = "Prediction of the News :  Looking Fake News📰"
            else:
                #   print("Real News")
                res = "Prediction of the News : Looking Real News📰 "
            print(f'Prediction of the News : {res}')
            return res
        print(f"pred : {pred}")
        result = predi(pred)
        print(f" results  : {result}")

        if result:
            reponse_data = {
                "result": result,

            }

            return reponse_data

    else:
        respond_data = {
            "error": "Invalid request method"
        }
        return respond_data


@app.route("/api/todos/<int:todo_id>", methods=["GET"])
def get_todo_item(todo_id):
    todo = next((todo for todo in todos if todo["id"] == todo_id), None)
    if todo:
        return todo
    return {"error": "Todo item not found"}, 404


@app.route("/api/todos", methods=["POST"])
def create_todo_item():
    data = request.get_json()
    title = data.get("title")
    if not title:
        return {"error": "Title is required"}, 400

    global todo_id_counter
    todo = {
        "id": todo_id_counter,
        "title": title,
        "completed": False
    }
    todos.append(todo)
    todo_id_counter += 1
    return todo, 201


@app.route("/api/todos/<int:todo_id>", methods=["PATCH"])
def update_todo_item(todo_id):
    data = request.get_json()
    title = data.get("title")
    completed = data.get("completed")

    todo = next((todo for todo in todos if todo["id"] == todo_id), None)
    if todo:
        if title is not None:
            todo["title"] = title
        if completed is not None:
            todo["completed"] = completed
        return todo
    return {"error": "Todo item not found"}, 404


@app.route("/api/todos/<int:todo_id>", methods=["DELETE"])
def delete_todo_item(todo_id):
    global todos
    todos = [todo for todo in todos if todo["id"] != todo_id]
    return {"message": "Todo item deleted"}


@app.route("/api/healthchecker", methods=["GET"])
def healthchecker():
    return {"status": "success", "message": "Integrate Flask Framework with Next.js"}


if __name__ == "__main__":
    app.run()
