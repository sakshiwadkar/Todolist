from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from sqlalchemy import func


app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:123456@localhost/todo'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)


class Articles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    assigned_to = db.Column(db.String(100))
    status = db.Column(db.String(50))  
    due_date = db.Column(db.Date)  
    priority = db.Column(db.String(50)) 
    comments = db.Column(db.Text)
    
    def __init__(self, assigned_to, status, due_date, priority, comments):
    
 
        self.assigned_to = assigned_to
        self.status = status
        self.due_date = due_date
        self.priority = priority
        self.comments = comments


class ArticleSchema(ma.Schema):
    class Meta:
        fields = ('id', 'assigned_to', 'status', 'due_date', 'priority', 'comments')


article_schema = ArticleSchema()
articles_schema = ArticleSchema(many=True)


@app.route('/get', methods=['GET'])
def get_articles():
    all_articles = Articles.query.all()
    results = articles_schema.dump(all_articles)
    return jsonify(results)


@app.route('/get/<id>/', methods=['GET'])
def post_details(id):
    article = Articles.query.get(id)
    return article_schema.jsonify(article)


@app.route('/add', methods=['POST'])
def add_article():
    assigned_to = request.json.get('assigned_to')
    status = request.json.get('status')
    due_date = datetime.datetime.strptime(request.json.get('due_date'), '%Y-%m-%d') if request.json.get('due_date') else None
    priority = request.json.get('priority')
    comments = request.json.get('comments')

    articles = Articles(  assigned_to=assigned_to,
        status=status,
        due_date=due_date,
        priority=priority,
        comments=comments)
    db.session.add(articles)
    db.session.commit()
    return article_schema.jsonify(articles)


@app.route('/update/<id>/', methods=['PUT'])
def update_article(id):
    article = Articles.query.get(id)
    assigned_to = request.json.get('assigned_to')
    status = request.json.get('status')
    due_date = datetime.datetime.strptime(request.json.get('due_date'), '%Y-%m-%d') if request.json.get('due_date') else None
    priority = request.json.get('priority')
    comments = request.json.get('comments')

   
    article.assigned_to = assigned_to
    article.status = status
    article. due_date= due_date 
    article.priority = priority
    article.comments= comments

    db.session.commit()
    return article_schema.jsonify(article)


@app.route('/delete/<id>/', methods=['DELETE'])
def article_delete(id):
    article = Articles.query.get(id)
    db.session.delete(article)
    db.session.commit()

    return article_schema.jsonify(article)




if __name__ == "__main__":
     with app.app_context():
        db.create_all() 
     app.run(debug=True)