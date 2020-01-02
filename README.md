# 概要
Google Cloud Functions for Firebase を使用した Apollo Serverの実装サンプル

# 環境構築
## Cloud Functions
### 認証情報を設定する
Firebase CLIをインストールし、ログインをする

```sh
$ firebase login
```

コンソールもしくは管理者からサービスアカウントを取得する

### 依存モジュールインストール
以降は `functions/` ディレクトリ配下で実施する

```sh
$ cd functions
$ npm install
```

### Apollo Serverの起動

```sh
$ npm run serve
```

### Google Cloud Functions for Firebaseへデプロイ

```sh
$ npm run deploy
or
$ firebase deploy --only functions
```
