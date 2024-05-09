"use client"

import { useEffect } from "react";
import { Logo } from "./logo";
import { HeaderNavigationMenu } from "./nav-menu";
import StaggeredDropDown from "./menu-dropdown";
import { SearchDragModal } from "./search-modal";

export const Header = (): React.ReactNode => {
    let headerBounds: DOMRect | DOMRectReadOnly | null = null;
    let header: Element | null = null;
    let currentScrollTop = 0;
    let preventReveal = false;

    useEffect(() => {
        window.addEventListener("scroll", onScrollHandler, false);

        header = document.querySelector('.header-section');
        createObserver(header);

        const hideOnScrollUp = () => preventReveal = true;
        header?.addEventListener("preventHeaderReveal", hideOnScrollUp)

    }, []);

    function createObserver(header: Element | null) {
        let observer = new IntersectionObserver((entries, observer) => {
            headerBounds = entries[0].intersectionRect;
            observer.disconnect();
        })
        if (header) {
            observer.observe(header);
        }
    }

    function onScrollHandler() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        onScroll(scrollTop);
    }

    function onScroll(scrollTop: number) {
        if (!headerBounds || !header) {
            return;
        }

        if (scrollTop > currentScrollTop && scrollTop > headerBounds.bottom) {
            header.classList.add('scrolled-past-header', 'header-sticky');
            requestAnimationFrame(hide);
        } else if (scrollTop < currentScrollTop && scrollTop > headerBounds.bottom) {
            header.classList.add('scrolled-past-header', 'header-sticky');
            requestAnimationFrame(reveal);
        } else if (scrollTop <= headerBounds.top) {
            header.classList.remove('scrolled-past-header')
            requestAnimationFrame(reset);
        }

        currentScrollTop = scrollTop;
    }

    function hide() {
        if (!header) return;
        header.classList.add('header-hidden');
    }

    function reveal() {
        if (!header) return;
        header.classList.add('header-sticky', 'animate');
        header.classList.remove('header-hidden');
    }

    function reset() {
        if (!header) return;
        header.classList.remove('header-hidden', 'header-sticky', 'animate')
    }

    return (
        <div className='section-header header-section'>
          <div className='header-wrapper'>
            <StaggeredDropDown/>
            <header className='header flex justify-center'>
                <Logo/>
                <SearchDragModal/>
                <HeaderNavigationMenu/>
            </header>
          </div>
        </div>
      );
}