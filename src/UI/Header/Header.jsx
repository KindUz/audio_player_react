import React from 'react'
import style from "./Header.module.css"

const Header = () => {
  return (
    <div className={style.Header}>
       <div className={style.Header__item}>
            <div className={style.header__avatar}>
                <img className={style.header__img} src={'../../../files/img/posters/profile.jpg'} alt="" />
            </div>
            <div className={style.header__body}>
                <div className={style.header__name}>Egor Shvedov</div>
                <div className={style.header__playlists}>4 playlist</div>
                <div className={style.header__tracks}>43 tracks</div>
            </div>
        </div>
    </div>
  )
}

export default Header