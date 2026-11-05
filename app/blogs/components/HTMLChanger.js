//無理矢理HTMLに変えて返す(ユーザー投稿機能をつけると、xssの危険性あり)
export function HTMLChanger({text}) {
    return <span dangerouslySetInnerHTML={{__html:text}} />
}