import { CardGameList } from "../../CardGameList/CardGameList"
import { GAMES } from "../../utils/consts"
//import s from './style.module.css'

export const Catalog = () => {
    return <CardGameList games={ GAMES } />
}