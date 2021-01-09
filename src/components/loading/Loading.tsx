// @flow

import React from 'react';
import cl from 'classnames';
import loadingIcon from './loading.svg';
import { SizeEnum } from '../../types';
import './style.css';

interface Props {
    size?: string,
    className?: string | { [className: string]: any },
}

export default function Loading(props: Props) {
    const className = cl(
        'loading-icon',
        {
            small: props.size === SizeEnum.small,
            big: props.size === SizeEnum.big,
        },
        props.className
    );

    return (
        <img src={loadingIcon} alt="" className={className} />
    );
}
