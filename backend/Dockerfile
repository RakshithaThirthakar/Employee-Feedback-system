FROM python:3.11-slim

WORKDIR /app

COPY backend/requirements.txt .       
 # only copy requirements first
RUN pip install --no-cache-dir -r requirements.txt

COPY . .                                
# copy entire root into container

EXPOSE 5000

CMD ["python", "app.py"]               
 # run root-level app.py
