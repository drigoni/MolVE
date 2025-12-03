# App service Dockerfile, copied from root Dockerfile but scoped to services/app.
FROM node:20

RUN apt-get update && apt-get install -y \
    python3 \
    python3-venv \
    make \
    g++ \
    gcc \
    libcairo2-dev \
    libjpeg-dev \
    libpango1.0-dev \
    libgif-dev \
    librsvg2-dev \
    postgresql-client \
    pkg-config \
    libfreetype6-dev \
    libpng-dev \
    gfortran \
    libopenblas-dev \
    liblapack-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy only app context (this folder already contains server, client, shared, configs at build time)
COPY . .

RUN python3 -m venv /venv

RUN /venv/bin/pip install --no-cache-dir "numpy<2" pandas pillow
RUN /venv/bin/pip install --no-cache-dir matplotlib cairocffi

ENV VIRTUAL_ENV=/venv
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

RUN npm install

RUN npm run build

RUN chmod +x /app/initial_configs/start.sh

CMD ["./initial_configs/start.sh"]
