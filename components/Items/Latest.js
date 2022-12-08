import React from 'react';
import Image from "next/image";
import Link from "next/link";

const LatestSkeletonItem = () => {
    return (
        <div className="animate-pulse flex gap-x-8 mb-12">
            <div className="flex-1">
                <div className="flex items-center gap-x-2 mb-4">
                    <div className="rounded-full bg-slate-200 h-5 w-5" />
                    <div className="h-2 w-7/12 bg-slate-200 rounded" />
                </div>
                <div className="h-5 w-full rounded bg-slate-200 mb-4" />
                <div className="h-3 w-9/12 rounded bg-slate-200 mb-2" />
                <div className="h-3 w-5/12 rounded bg-slate-200 mb-4" />
                <div className="h-2 w-4/12 rounded bg-slate-200" />
            </div>
            <div className="bg-slate-200 w-[200px] h-[135px]" />
        </div>
    );
}

const LatestSkeleton = () => {
    return (
        <div className="w-full order-2 lg:order-1 lg:w-2/3">
            <LatestSkeletonItem />
            <LatestSkeletonItem />
            <LatestSkeletonItem />
            <LatestSkeletonItem />
            <LatestSkeletonItem />
        </div>
    );
}

const LatestItem = (props) => {
    const minReadText = `${props.min_read} min read`
    return (
        <div className="flex gap-x-6 mb-10 md:mb-16">
            <div className="flex-1">
                <div className="flex items-center gap-x-2 mb-2">
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
                    <h3 className="text-md md:text-2xl font-bold mb-2 line-clamp-2">{props.title}</h3>
                </Link>
                <p className="hidden text-slate-500 md:line-clamp-2 mb-2">{props.description}</p>
                <div className="flex items-center gap-x-1">
                    <p className="text-slate-500 text-xs md:text-sm">{props.date}</p>
                    <span className="text-slate-500 text-xs md:text-sm -mt-2">.</span>
                    <p className="text-slate-500 text-xs md:text-sm">{minReadText}</p>
                    <span className="text-slate-500 text-xs md:text-sm -mt-2">.</span>
                    <div className="hidden sm:block py-1 px-3 text-slate-500 text-xs md:text-sm bg-slate-100 hover:bg-slate-200 transition-colors rounded-full">
                        <Link href="#" passHref>
                            {props.tag}
                        </Link>
                    </div>
                    {props.star && (
                        <Image unoptimized
                               src="/icons/star.svg"
                               alt="Star icon"
                               width={15}
                               height={15}
                               layout="fixed"
                        />
                    )}
                    <div className="ml-auto cursor-pointer">
                        <Image unoptimized
                               src="/icons/bookmark.svg"
                               alt="Bookmark icon"
                               width={28}
                               height={28}
                               layout="fixed"
                        />
                    </div>
                    <div className="cursor-pointer">
                        <Image unoptimized
                               src="/icons/dots.svg"
                               alt="Choices icon"
                               width={28}
                               height={28}
                               layout="fixed"
                        />
                    </div>
                </div>
            </div>
            <div className="latest-thumbnail">
                <Link href="#" passHref>
                    <Image
                        src={props.thumbnail}
                        alt={props.title}
                        layout="fill"
                        objectFit="cover"
                    />
                </Link>
            </div>
        </div>
    );
}


function Latest({data}) {
    if (!data) {
        return <LatestSkeleton />
    }
    return (
        <div className="w-full order-2 lg:order-1 lg:w-2/3">
            {data.map((latest, index) => {
                return <LatestItem key={latest.id} {...latest} />
            })}
        </div>
    );
}

export default Latest;
