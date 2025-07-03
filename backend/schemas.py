from backend.extensions import ma
from backend.models import User, Feedback

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True
        exclude = ("password",)

class FeedbackSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Feedback
        load_instance = True
        include_fk = True

    created_at = ma.DateTime(format="%Y-%m-%d %H:%M:%S")  # Optional formatting

user_schema = UserSchema()
users_schema = UserSchema(many=True)

feedback_schema = FeedbackSchema()
feedbacks_schema = FeedbackSchema(many=True)
