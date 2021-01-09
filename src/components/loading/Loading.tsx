// @flow

import * as React from 'react';
import cl from 'classnames';
import loadingIcon from './loading.svg';
import './style.css';

interface Props {
    size?: string,
    className?: string | { [className: string]: any },
}

export default function Loading(props: Props) {
    const className = cl(
        'loading-icon',
        {
            small: props.size === 'small',
            big: props.size === 'big',
        },
        props.className
    );

    return (
        <img src={loadingIcon} alt="" className={className} />
    );
}
