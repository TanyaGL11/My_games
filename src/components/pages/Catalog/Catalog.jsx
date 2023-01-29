import { CardGameList } from "../../CardGameList/CardGameList"
import { GAMES } from "../../utils/consts"

export const Catalog = () => {
    return <CardGameList games={ GAMES } />
}