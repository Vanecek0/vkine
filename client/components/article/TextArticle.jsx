import ProgressiveLoader from '../progressive-loader/ProgressiveLoader'
import articleStyle from "./article.module.css"
import config from '../../pages/api/config'
import noImage from '../../assets/image.svg';

const TextArticle = (props) => {
    return (
        <div className={`${articleStyle.textArticle} ${props.containerClass}`}>
            <div className={props.innerContainerClass}>
                <ProgressiveLoader
                    isBackground={true}
                    isVisible={props.isBackgroundVisible}
                    otherClass={`${articleStyle.banner_img}`}
                    highRes={(props.backdrop_path) != null ? config.staticImage(props.backdrop_path).src : config.noImage(noImage).src}
                    blur={2}
                />
                <div className={props.contentContainerClass}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default TextArticle