import React from 'react';
import Image from "next/image";
import Link from "next/link";


const SkeletonItem = () => {
    return (
        <div className="animate-pulse flex gap-x-4">
            <div className="bg-slate-200 w-[32px] h-[32px]" />
            <div className="flex-1">
                <div className="flex items-center gap-x-2 mb-4">
                    <div className="rounded-full bg-slate-200 h-5 w-5" />
                    <div className="h-2 w-7/12 bg-slate-200 rounded" />
                </div>
                <div className="h-5 w-full rounded bg-slate-200 mb-2" />
                <div className="h-5 w-8/12 rounded bg-slate-200 mb-4" />
                <div className="h-2 w-4/12 rounded bg-slate-200" />
            </div>
        </div>
    );
}

const Skeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
        </div>
    );
}

function TrendingItem(props) {
    const trendingIndex = `0${ props.index + 1 }`
    const minReadText = `${props.min_read} min read`
    return (
        <div key={props.id} className="flex gap-x-4">
            <p className="text-4xl font-extrabold text-slate-300">{trendingIndex}</p>
            <div>
                <div className="flex items-center gap-x-2 mb-4">
                    <Image
                        unoptimized
                        src={props.avatar}
                        width="20"
                        height="20"
                        alt={props.username}
                        layout="fixed"
                    />
                    <h4 className="text-sm">
                                                <span>
                                                    <Link href="#" passHref>
                                                        {props.username}
                                                    </Link>
                                                </span>
                        {props.group_name && (
                            <>
                                                        <span className="mx-1 text-slate-400">
                                                        in
                                                        </span>
                                <span>
                                                            <Link href="#" passHref>
                                                                {props.group_name}
                                                            </Link>
                                                        </span>
                            </>
                        )}
                    </h4>
                </div>
                <Link href="#" passHref>
                    <h3 className="font-bold mb-2 line-clamp-2">{props.title}</h3>
                </Link>
                <div className="flex items-center gap-x-1">
                    <p className="text-slate-500 text-sm">{props.date}</p>
                    <span className="text-slate-500 text-sm -mt-2">.</span>
                    <p className="text-slate-500 text-sm">{minReadText}</p>
                    {props.star && (
                        <Image unoptimized
                               src="/icons/star.svg"
                               alt="Star icon"
                               width={15}
                               height={15}
                               layout="fixed"
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

function Trending({ data }) {
    if(!data){
        return <Skeleton />
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((trending, index) => {
                return (
                    <TrendingItem key={trending.id} {...trending} index={index} />
                )
            })
            }
        </div>
    )
}

export default Trending;
