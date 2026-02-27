import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const ErrorMessagesHandler = (props) => {
    const { t } = useTranslation('translations')
    return (
        props.message && (
            <div className={`ErrorHandler ${props.wrapperClass}`}>
                <div className={`errorMessage ${props.errorMessageClass}`}>
                    {t(`errors.${props.message}`)}
                </div>
                {props.children && (
                    <div className={`errorContent ${props.errorContentClass}`}>
                        {props.children}
                    </div>
                )}
            </div>
        )
    )
}

ErrorMessagesHandler.propTypes = {
    message: PropTypes.string,
    wrapperClass: PropTypes.string,
    errorMessageClass: PropTypes.string,
    errorContentClass: PropTypes.string
}

export default ErrorMessagesHandler