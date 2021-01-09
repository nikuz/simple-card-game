
import React, { useRef, useLayoutEffect } from 'react';
import cl from 'classnames';
import {
    SCREEN_BASE_WIDTH,
    SCREEN_BASE_HEIGHT,
    SCREEN_MIN_ASPECT_RATIO,
    SCREEN_MAX_ASPECT_RATIO,
} from '../../constants';
import './style.css';

const setContainerSize = (el: HTMLDivElement | null) => {
    const documentElement = document.documentElement;
    if (!el || !documentElement) {
        return;
    }

    const dWidth = window.innerWidth;
    const dHeight = window.innerHeight;
    const curAspectRatio = dWidth / dHeight;
    const style = {
        width: dWidth,
        height: dHeight,
    };
    if (curAspectRatio < SCREEN_MIN_ASPECT_RATIO) {
        style.width = dHeight * SCREEN_MIN_ASPECT_RATIO;
    } else if (curAspectRatio > SCREEN_MAX_ASPECT_RATIO) {
        style.width = dHeight * SCREEN_MAX_ASPECT_RATIO;
    }

    if (style.width > dWidth) {
        style.width = dWidth;
        style.height = dWidth / SCREEN_MIN_ASPECT_RATIO;
    }

    Object.keys(style).forEach((item) => {
        if (item === 'width' || item === 'height') {
            el.style.setProperty(item, `${style[item]}px`);
        }
    });

    const fontSize = Math.min((dWidth / SCREEN_BASE_WIDTH), (dHeight / SCREEN_BASE_HEIGHT));
    documentElement.style.fontSize = `${fontSize}px`;
};

interface Props {
    className?: string | { [className: string]: any },
    children: React.ReactNode,
}

export default function Wrap(props: Props) {
    const containerEl = useRef(null);
    const className = cl('resizable-container', props.className);

    useLayoutEffect(() => {
        const resizeHandler = () => {
            setContainerSize(containerEl.current);
        };
        resizeHandler();

        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    return (
        <div
            ref={containerEl}
            className={className}
        >
            { props.children }
        </div>
    );
}
