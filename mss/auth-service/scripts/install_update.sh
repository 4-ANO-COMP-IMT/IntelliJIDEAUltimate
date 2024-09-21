cd "$(dirname "$(dirname "${BASH_SOURCE[0]}")")"

npm update
npx npm-check-updates -u
npm install