from backend.extensions import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False, unique=True)
    password = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(20), nullable=False)  # 'manager' or 'employee'

    feedbacks = db.relationship('Feedback', backref='employee', lazy=True)

class Feedback(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    strengths = db.Column(db.Text)
    areas_to_improve = db.Column(db.Text)
    sentiment = db.Column(db.String(20))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Ratings
    communication = db.Column(db.Integer)
    leadership = db.Column(db.Integer)
    punctuality = db.Column(db.Integer)
    skill = db.Column(db.Integer)
    teamwork = db.Column(db.Integer)
