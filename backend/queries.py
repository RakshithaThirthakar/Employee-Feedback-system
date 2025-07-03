from backend.models import User, Feedback

def is_manager(user_id):
    user = User.query.get(user_id)
    return user and user.role == 'manager'

def get_latest_feedback_for_employee(employee_id):
    return Feedback.query.filter_by(employee_id=employee_id).order_by(Feedback.created_at.desc()).first()
