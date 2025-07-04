from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from backend.models import User, Feedback
from backend.schemas import user_schema, users_schema, feedback_schema
from backend.extensions import db
from backend.crud import create_feedback, get_latest_feedback_by_employee_id
from sqlalchemy import func  # needed for ilike

api_bp = Blueprint("api", __name__)

@api_bp.route("/", methods=["GET"])
def home():
    return jsonify({"message": "🎉 API is working"})

# Signup
@api_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    role = data.get("role", "").lower()
    if not all([username, password, role]):
        return jsonify({"message": "Missing fields"}), 400
    if role == "manager" and User.query.filter(func.lower(User.role) == "manager").first():
        return jsonify({"message": "A manager already exists"}), 403
    hashed_pw = generate_password_hash(password)
    new_user = User(username=username, password=hashed_pw, role=role)
    try:
        db.session.add(new_user)
        db.session.commit()
        return user_schema.jsonify(new_user), 201
    except:
        db.session.rollback()
        return jsonify({"message": "Username may exist"}), 409

# Login
@api_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data.get("username")).first()
    if not user or not check_password_hash(user.password, data.get("password")):
        return jsonify({"message": "Invalid credentials"}), 401
    return jsonify({"user": user_schema.dump(user)}), 200

# All employees (for manager)
@api_bp.route("/employees", methods=["GET"])
def get_all_employees():
    emps = User.query.filter_by(role="employee").all()
    return users_schema.jsonify(emps)

# Add feedback
@api_bp.route("/feedback", methods=["POST"])
def add_feedback():
    data = request.get_json()
    fb = create_feedback(
        data["employee_id"],
        data["strengths"], data["areas_to_improve"], data["sentiment"],
        data.get("communication", 0),
        data.get("leadership", 0),
        data.get("punctuality", 0),
        data.get("skill", 0),
        data.get("teamwork", 0)
    )
    return feedback_schema.jsonify(fb), 201

# ✅ Latest feedback for employee
@api_bp.route("/employee/<int:employee_id>/latest-feedback", methods=["GET"])
def get_latest(employee_id):
    user = User.query.get(employee_id)
    if not user:
        return jsonify({"message": "User not found"}), 404
    latest = get_latest_feedback_by_employee_id(employee_id)
    if not latest:
        return jsonify({"message": "No feedback available"}), 404
    return jsonify({
        "employee": {"id": user.id, "username": user.username},
        "strengths": latest.strengths,
        "areas_to_improve": latest.areas_to_improve,
        "sentiment": latest.sentiment,
        "created_at": latest.created_at.isoformat(),
        "communication": latest.communication,
        "leadership": latest.leadership,
        "punctuality": latest.punctuality,
        "skill": latest.skill,
        "teamwork": latest.teamwork
    }), 200

# ✅ Get manager info
@api_bp.route("/manager", methods=["GET"])
def get_manager():
    manager = User.query.filter(func.lower(User.role) == "manager").first()
    if not manager:
        return jsonify({"message": "No manager found"}), 404
    return user_schema.jsonify(manager), 200

# 🧪 Get all users (for debugging)
@api_bp.route("/users", methods=["GET"])
def get_all_users():
    users = User.query.all()
    return users_schema.jsonify(users), 200
