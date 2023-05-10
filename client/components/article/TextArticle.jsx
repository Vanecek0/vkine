import React from 'react'
import ProgressiveLoader from '../progressive-loader/ProgressiveLoader'
import articleStyle from "./article.module.css"
import config from '../../pages/api/config'
import noImage from '../../assets/image.svg';

const TextArticle = (props) => {
    var bg = config.noImage(noImage).src;
    return (
        <div className={`${articleStyle.textArticle} mb-3 mt-5`}>
            <ProgressiveLoader
                isBackground={true}
                isVisible={props.isBackgroundVisible}
                otherClass={`${articleStyle.banner_img}`}
                highRes={(props.backdrop_path) != null ? config.staticImage(props.backdrop_path).src : bg}
                blur={2}
            />
            {props.children}
        </div>
    )
}

export default TextArticle