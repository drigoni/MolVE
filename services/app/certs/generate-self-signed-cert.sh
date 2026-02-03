#!/bin/bash
# Generate a self-signed SSL certificate for development
# Output: cert.pem (certificate), key.pem (private key)

CERT_DIR="$(dirname "$0")"
cd "$CERT_DIR"

openssl req -x509 -newkey rsa:4096 -sha256 -days 365 \
  -nodes -keyout key.pem -out cert.pem \
  -subj "/CN=localhost" \
  -addext "subjectAltName=DNS:localhost,IP:127.0.0.1"

echo "Self-signed certificate and key generated in $CERT_DIR:"
echo "  cert.pem"
echo "  key.pem"
