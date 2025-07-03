from flask import Flask
from flask_cors import CORS
from backend.routes import api_bp
from backend.extensions import db, ma

def create_app():
    app = Flask(__name__)
    
    # CORS config for frontend access
    CORS(app, origins=["http://localhost:3000", "http://localhost:3001"], supports_credentials=True)

    # Database config
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///feedback.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Initialize extensions
    db.init_app(app)
    ma.init_app(app)

    # Register routes
    app.register_blueprint(api_bp, url_prefix="/api")

    # Create tables
    with app.app_context():
        db.create_all()

    return app

# Entry point
if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)
