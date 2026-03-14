"use client"

import React, { forwardRef } from 'react';

interface ITitle {
    id: string;
    title: string;
}

interface TitleRefs {
    titleRef: HTMLHeadingElement | null;
    spanRef: HTMLSpanElement | null;
}

const Title = forwardRef<TitleRefs, ITitle>(({ id, title }, ref) => {
    const titleRef = React.useRef<HTMLHeadingElement>(null);
    const spanRef = React.useRef<HTMLSpanElement>(null);

    React.useImperativeHandle(ref, () => ({
        titleRef: titleRef.current,
        spanRef: spanRef.current,
    }));

    return (
        <>
            <div id={id} className="max-w-7xl mx-auto overflow-hidden">
                <h2 ref={titleRef} className="text-4xl relative z-0 text-gray-600 text-center tracking-wide">
                    {title}
                </h2>
            </div>
            <span ref={spanRef} className="block relative z-2 w-2/3 h-1 mx-auto bg-linear-to-r from-transparent via-[#5A7B6E] to-transparent"></span>
        </>
    );
});

Title.displayName = 'Title';

export default Title;