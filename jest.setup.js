module.exports = {
	bail: 1,//何回テストが失敗したときにテストを中止させるか
	testEnvironment: 'node',//Jestのテスト実行環境を設定するためのオプション。フロントエンドのテストをする場合はjsdomを通してブラウザのような環境でテストをすることもできる
	testMatch: [
		'**/__tests__/**/*.js'//どのファイルがテストが書かれたファイルかを設定する。正規表現。
		//   "**/?(*.)+(spec|test).[tj]s?(x)"
	],
	testPathIgnorePatterns: ['/node_modules/', '/src/'],//テスト対象外となるパスのパターン
	transform: { '\\.jsx?$': 'babel-jest' },//ソースコードを何で変換するかを設定
	verbose: true//テスト実行時のエラーを都度表示するか
};
