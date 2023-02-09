import { NavLink } from "react-router-dom"


const AfterUploadVideo = () => {
    return(
        <div className="box" style={{margin: "70px"}}>
            <h5>Произошла загрузка видео!</h5>
            <div className="field">
                <button className="button">Загрузить еще видео</button>
                <NavLink className="button" to={'/'}>Вернуться на главную</NavLink>
            </div>
        </div>
    )
}

export default AfterUploadVideo;