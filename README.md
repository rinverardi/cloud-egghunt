# Setup

```
# npm install firebase-functions@latest firebase-admin@latest --save
# npm install -g firebase-tools

$ firebase login
$ firebase init functions
```

# Debugging

```
$ firebase emulators:start
$ cd functions && npm run build
```

# Deployment

```
$ firebase deploy --only functions
$ firebase functions::log
```
