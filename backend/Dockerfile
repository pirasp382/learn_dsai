# Verwende ein Python-Image
FROM python:latest

# Arbeitsverzeichnis setzen
WORKDIR /app  

# requirements.txt kopieren und Abhängigkeiten installieren
COPY ./resources/requirements.txt /app/ 
RUN pip install --no-cache-dir -r /app/requirements.txt

# Restliche Dateien kopieren
COPY . /app/ 

# FastAPI mit Uvicorn starten
# CMD ["uvicorn", "src.resources.main:app", "--host", "0.0.0.0", "--port", "8000"]  # 0.0.0.0 ermöglicht den Zugriff von außen

# CMD [ "python", "temp.py" ]

CMD ["python", "-m", "uvicorn", "src.resources.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
