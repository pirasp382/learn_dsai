FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    ca-certificates \
    && update-ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY ./resources/requirements.txt .
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

COPY ./src ./src

RUN useradd -m appuser
USER appuser

EXPOSE 8000

HEALTHCHECK CMD curl --fail http://localhost:8000/ || exit 1

CMD ["gunicorn", "-k", "uvicorn.workers.UvicornWorker", "src.resources.main:app", "--bind", "0.0.0.0:8000", "--workers", "3"]

# CMD ["python", "-m", "uvicorn", "src.resources.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]