# Setup

```
# npm install firebase-functions@latest firebase-admin@latest --save
# npm install -g firebase-tools

$ firebase login
$ firebase init functions
```

# Deployment

```
$ firebase deploy --only functions
$ firebase functions::log
```

# Development

```
$ firebase emulators:start
$ cd functions && npm run build
```
