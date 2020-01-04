import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { formateDate } from '../../utils/api';
import { ThemeConsumer } from '../../contexts/theme';

const PostMetaInfo = ({ by, time, id, descendants }) => {
    return (
        <ThemeConsumer>
            {({ theme }) => (
                <div className={`meta-info${ theme }`}>
                    <span>by <Link to={ `/user?id=${ by }`}>{ by }</Link></span>
                    <span>on { formateDate(time)}</span>
                    {typeof descendants === 'number' && (
                        <span>
                            with <Link to={`/post?id=${ id }`}>{ descendants }</Link>/>
                        </span>
                    )}
                </div>
            )}
        </ThemeConsumer>
    );
};

PostMetaInfo.propTypes = {
    by: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    descendants: PropTypes.number
};

export default PostMetaInfo;