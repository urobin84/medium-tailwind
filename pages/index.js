import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, {useEffect, useRef, useState} from "react";
import Link from "next/link";
import TrendingPosts from '../data/trending.json'
import TrendingItem from '../components/Items/Trending'
import Tags from '../data/discover.json'
import Menus from '../data/menu.json'
import LatestPosts from '../data/latest.json'
import {RandomDelay} from "../utils/delay";
import LatestItem from "../components/Items/Latest";



export default function Home() {
    const [trendingPosts, setTrendingPosts] = useState(null)
    const [latestPosts, setLatestPosts] = useState(null)
    const navbarRef = useRef(null)
    const actionButtonRef = useRef(null)

    const ChangeNavbarBackground = (scrollY) => {
        const navbar = navbarRef.current
        if (scrollY > 500) {
            navbar.classList.remove('blue')
            navbar.classList.add('white')
        } else {
            navbar.classList.remove('white')
            navbar.classList.add('blue')
        }
    }

    const ChangeActionButtonBackground = (scrollY) => {
        const actionButton = actionButtonRef.current
        if (scrollY > 500) {
            actionButton.classList.remove('bg-black')
            actionButton.classList.add('bg-green-700')
        } else {
            actionButton.classList.remove('bg-green-700')
            actionButton.classList.add('bg-black')
        }
    }


    function WindowOnScroll() {
        const { scrollY } = window
        ChangeNavbarBackground(scrollY)
        ChangeActionButtonBackground(scrollY)
    }

    const GetTrendingPosts = async () => {
        // get data dari database trending posts
        await RandomDelay()
        setTrendingPosts(TrendingPosts)
    }

    const GetLatestPosts = async () => {
        // get data dari database trending posts
        await RandomDelay()
        setLatestPosts(LatestPosts)
    }

    useEffect(() => {
        GetTrendingPosts()
        GetLatestPosts()
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', WindowOnScroll)
        return () => window.removeEventListener('scroll', WindowOnScroll)
    }, []);

  return (
      <>
        <Head>
            <title>Medium - Where good ideas  find you.</title>
            <meta
                name="description"
                content="Medium is an open platform where readers find dynamic thinking, and where expert and undiscovered voices can share their writing on any topic."
            />
            <link rel="icon" href="/favicon.png" />
        </Head>

        <nav ref={navbarRef} className="nav blue">
          <div className="main-container justify-between h-full w-full gap-x-6">
              <div>
                <Link href="/" passHref>
                    <Image
                        src="/medium.svg"
                        alt="Medium Logo"
                        height="25"
                        width="160"
                    />
                </Link>
              </div>
              <div>
                  <ul className="flex items-center gap-x-5">
                      <li className="hidden md:list-item text-sm">
                          <Link href="#" passHref>
                              Our Story
                          </Link>
                      </li>
                      <li className="hidden md:list-item text-sm">
                          <Link href="#" passHref>
                              Membership
                          </Link>
                      </li>
                      <li className="hidden md:list-item text-sm">
                          <Link href="#" passHref>
                              Write
                          </Link>
                      </li>
                      <li className="hidden sm:list-item text-sm">
                          <Link href="#" passHref>
                              Sign In
                          </Link>
                      </li>
                      <li>
                          <Link href="#" passHref>
                              <button
                                  ref={actionButtonRef}
                                  className="btn-rounded bg-black text-white transition-colors"
                              >
                                  Get started
                              </button>
                          </Link>

                      </li>
                  </ul>
              </div>
          </div>
        </nav>

        <header className="header">
            <div className="main-container header-bg p-10">
                <div className="w-3/4 md:w-3/6">
                    <h1 className="hidden sm:inline-block font-serif text-6xl lg:text-7xl mb-2">Medium is a place to write, read, and connect</h1>
                    <h1 className="sm:hidden font-serif text-5xl mb-2">Write, read, and connect</h1>
                    <h2 className="font-semibold text-lg">Discover stories, thinking, and expertise from writers on any topic.</h2>
                    <button className="btn-rounded border border-black bg-white text-black mt-6">
                        Start Reading
                    </button>
                </div>
            </div>
        </header>

          <section className="border-b border-slate-200">
              <div className="main-container py-10">
                  <div className="w-full">
                      <div className="flex items-center gap-x-1 mb-4">
                          <Image
                            unoptimized
                            src="/icons/trending.svg"
                            width="28"
                            height="28"
                            alt="Trending Icon"
                            layout="fixed"
                          />
                          <h2 className="uppercase font-bold text-sm tracking-wider">TRENDING ON MEDIUM</h2>
                      </div>

                      <TrendingItem data={trendingPosts} />

                  </div>
              </div>
          </section>

          <section>
              <div className="main-container py-10">
                  <div className="w-full flex flex-col lg:flex-row gap-x-24">
                      {/* Latest Post*/}
                      <LatestItem data={latestPosts} />

                      {/* Tags */}
                      <div className="w-full order-1 lg:w-1/3 lg:order-2 lg:self-start lg:sticky" style={{ top: '12%' }}>
                          <h2 className="uppercase font-bold text-sm tracking-wider mb-4">
                              DISCOVER MORE OF WHAT MATTERS TO YOU
                          </h2>
                          <div className="flex flex-wrap gap-2">
                              {Tags.map((tag) => {
                                  return (
                                      <div key={tag} className="py-1 px-3 text-slate-500 border border-slate-200">
                                          <Link href="#" passHref>
                                              {tag}
                                          </Link>
                                      </div>
                                  )
                              })}
                          </div>
                          <div className="mt-8 mb-12 lg:mb-6 border-b border-slate-200"></div>
                          <div className="hidden lg:flex flex-wrap gap-2">
                              {Menus.map((menu) => {
                                  return (
                                      <div key={menu} className="px-2 text-slate-500">
                                          <Link href="#" passHref>
                                              {menu}
                                          </Link>
                                      </div>
                                  )
                              })}
                          </div>
                      </div>
                  </div>
              </div>
          </section>

      </>
  )
}
