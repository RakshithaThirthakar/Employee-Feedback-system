from flask import Flask
from flask_cors import CORS
from backend.routes import api_bp
from backend.extensions import db, ma

def create_app():
    app = Flask(__name__)

    # Enable CORS for local frontend apps
    CORS(app, origins=["http://localhost:3000", "http://localhost:3001"], supports_credentials=True)

    # Configure SQLite database
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///feedback.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Initialize database and marshmallow
    db.init_app(app)
    ma.init_app(app)

    # Register API blueprint
    app.register_blueprint(api_bp, url_prefix="/api")

    # Create all tables
    with app.app_context():
        db.create_all()

    return app
