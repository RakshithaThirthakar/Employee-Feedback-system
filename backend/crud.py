from backend.models import Feedback
from backend.extensions import db

# ✅ Create feedback with all fields
def create_feedback(
    employee_id,
    strengths,
    areas_to_improve,
    sentiment,
    communication,
    leadership,
    punctuality,
    skill,
    teamwork
):
    new_feedback = Feedback(
        employee_id=employee_id,
        strengths=strengths,
        areas_to_improve=areas_to_improve,
        sentiment=sentiment,
        communication=communication,
        leadership=leadership,
        punctuality=punctuality,
        skill=skill,
        teamwork=teamwork
    )
    db.session.add(new_feedback)
    db.session.commit()
    return new_feedback

# ✅ Get latest feedback for employee (used in dashboard)
def get_latest_feedback_by_employee_id(employee_id):
    return (
        Feedback.query
        .filter_by(employee_id=employee_id)
        .order_by(Feedback.created_at.desc())
        .first()
    )

# ✅ (Optional) Get all feedbacks for timeline
def get_all_feedbacks_by_employee_id(employee_id):
    return Feedback.query.filter_by(employee_id=employee_id).order_by(Feedback.created_at.desc()).all()
