import { Link } from "react-router-dom"
import s from "./style.module.css"

export const Header = ({title = 'MINI GAMES'}) => {
    return <header className={s.header}>{
        <Link to ='/'><span className={s.title}>{title}</span></Link>}</header>
}