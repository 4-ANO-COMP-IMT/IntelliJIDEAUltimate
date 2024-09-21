cd "$(dirname "$(dirname "${BASH_SOURCE[0]}")")"

npm run build
docker build -t auth-service .