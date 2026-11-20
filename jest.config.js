module.exports = {
  bail: 1, //何回テストが失敗したときにテストを中止させるか
  testEnvironment: "jest-environment-jsdom", //Jestのテスト実行環境を設定するためのオプション。デフォルトではNode.js。フロントエンドのテストをする場合はjsdomを通してブラウザのような環境でテストをすることもできる
  testMatch: [
    "**/__tests__/**/*.js", //どのファイルがテストが書かれたファイルかを設定する。正規表現。
    //   "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  }, //@/app/... を <プロジェクトルート>/app/... に読み替える。<rootDir> は jest.config.js がある場所
  transform: {
    //どのファイルを何で変換するか。.js / .jsx を babel-jest で変換する
    "^.+\\.jsx?$": [
      "babel-jest",
      {
        configFile: false, // babel.config.js を探さない
        babelrc: false, // .babelrc を探さない
        presets: [
          //babel/preset-envは、import/export、新しい文法を翻訳するが
          //targetsを指定しないと古いブラウザでも動くように、何でも古い書き方へ変換してしまう。
          // でもテストが動くのはNodeの中だけで、ブラウザは関係ないので、「node: "current"」で今のNodeで読めない部分だけ変換する設定にしている。
          ["@babel/preset-env", { targets: { node: "current" } }],
          //babel/preset-reactは、JSX（<コンポーネント名　/>のやつ）を翻訳する
          //runtime: "automatic"は、変換に必要な部品(Reactの関数)を、Babelが自動でimportしてくれる
          //Next.jsのコンポーネントは、普通 import React を書かないので、この設定にしないと動かない
          ["@babel/preset-react", { runtime: "automatic" }],
        ],
      },
    ],
  },
  testPathIgnorePatterns: ["/node_modules/", "/src/"], //テスト対象外となるパスのパターン
  verbose: true, //各テストの結果を一覧表示する
};
