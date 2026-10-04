'use client';

import Image from "next/image";
import Link from "next/link";
import { useAppDispatch } from "@/lib/hooks";
import { useAppSelector } from "@/lib/hooks";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { toggle, setLight, setDark, setDeviceSettingOn, setDeviceSettingOff, setThemeFromDevice } from '../../lib/features/theme/store/theme-slice';
import OverlayPortal from "./OverlayPortal";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faGear } from "@fortawesome/free-solid-svg-icons";
import styles from '@/css/Navbar.module.css'
import Select from "../Select";
import ThemeOptions from "@/types/ThemeOptions";
import Icon from "../Icon";
import DeviceTheme from "@/types/DeviceTheme";
import selectStyles from '@/css/Select.module.css'
import ContactModal from "../ContactModal";
import { hideToast, showToast } from "@/lib/features/toast/store/toast-slice";

export default function Navbar() {
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const breakpoint = useBreakpoint();
    const isDark = useAppSelector((state) => state.theme.data.isDark);
    const [ctaDark, setctaDark] = useState('');
    const [ctaTextColor, setctaTextColor] = useState('');


    const toastVisible = useAppSelector((state) => state.toast.data.isVisible);
    const toastMessage = useAppSelector((state) => state.toast.data.message);
    const toastType = useAppSelector((state) => state.toast.data.type);
    const toastDuration = useAppSelector((state) => state.toast.data.duration);

    const [isContactOpen, setIsContactOpen] = useState(false);

    const deviceSetting = useAppSelector((state) => state.theme.data.deviceSetting);

    const [selectActive, setSelectActive] = useState(false);

    const themeSettings: ThemeOptions[] = [
        {
            id: 1,
            name: 'Dark',
            hasIcon: true,
            iconData: {
                type: 'FontAwesome',
                icon: faSun,
                size: '1rem',
                translateY: '-7px'
            },
            status: false
        },
        {
            id: 2,
            name: 'Light',
            hasIcon: true,
            iconData: {
                type: 'FontAwesome',
                icon: faMoon,
                size: '1rem',
                translateY: '-7px'
            },
            status: false
        },
        {
            id: 3,
            name: 'Device Setting',
            hasIcon: true,
            iconData: {
                type: 'FontAwesome',
                icon: faGear,
                size: '1rem',
                translateY: '-7px'
            },
            status: true
        },
    ];

    const [menuOpen, setMenuOpen] = useState(false);

    const linkClass = (href: string) =>
        `transition ${
            pathname === href
                ? "text-white font-bold"
                : "text-white/55 hover:text-white"
    }`;

    const linkClassMobile = (href: string) =>
        `transition ${
            pathname === href
                ? "text-white font-bold"
                : "text-white/80 hover:text-white"
    }`;

    // Device Setting
    const handleThemeSettingSelect = (item: ThemeOptions) => {
        if (item.id === 3) {
            dispatch(setDeviceSettingOn());

            return;
        }

        if (item.id == 1) {
            dispatch(setDark());

            return;
        }

        if (item.id === 2) {
            dispatch(setLight());
        }
    }

    const isOptionActive = (id: number) => {
        if (id === 3) return deviceSetting;
        if (id === 1) return !deviceSetting && isDark;
        if (id === 2) return !deviceSetting && !isDark;

        return false;
    };

    useEffect(() => {
        if (!menuOpen) {
            setSelectActive(false);
        }
    }, [menuOpen]);

    useEffect(() => {
        setSelectActive(false);
    }, [pathname]);


    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : ""
            return() => {
                document.body.style.overflow = '';
            }
    }, [menuOpen]);

    useEffect(() => {
        if (breakpoint === 'desktop-sm' || breakpoint === 'desktop-md' || breakpoint === 'desktop' || breakpoint === 'large') {
            setMenuOpen(false);
        }
    }, [breakpoint]);

    useEffect(() => {
        if (breakpoint === 'mobile' || breakpoint === 'tablet' || breakpoint === 'desktop-sm') {
            setctaTextColor('#ffffff');
            setctaDark('linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 40%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0.3) 80%, rgba(255, 255, 255, 0.8) 100%)');
        } else {
            setctaTextColor('#021627');
            setctaDark('linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 40%, rgba(255, 255, 255, 1) 70%, rgba(255, 255, 255, 1) 80%, rgba(255, 255, 255, 1) 100%)');
        }
    }, [breakpoint])

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const applyTheme = (e: MediaQueryListEvent | MediaQueryList) => {
            if (!deviceSetting) return;

            dispatch(setThemeFromDevice(e.matches));
        };

        applyTheme(mediaQuery);
        mediaQuery.addEventListener('change', applyTheme);

        return () => {
            mediaQuery.removeEventListener('change', applyTheme);
        };
    }, [dispatch, deviceSetting]);

    useEffect(() => {
            if (toastVisible) {
                const timer = setTimeout(() => {
                    dispatch(hideToast());
                }, toastDuration);

                return () => clearTimeout(timer);
            }
        }, [toastVisible, dispatch, toastDuration]);

    return (
        <>
            <OverlayPortal>
                <div
                    className={`portal-backdrop ${menuOpen ? 'is-active' : ''}`}
                    onClick={() => {
                        setMenuOpen(false);
                        setSelectActive;
                    }}
                    aria-hidden>

                    <div className={`portal-content ${menuOpen ? 'is-active' : ''}`}>
                        <Link href="/projects" className={`portal-item ${linkClassMobile("/projects")}`}>
                            Item1
                        </Link>
                        <Link href="/experience" className={`portal-item ${linkClassMobile("/experience")}`}>
                            Item2
                        </Link>
                        <Link href="/about" className={`portal-item ${linkClassMobile("/about")}`}>
                            Item3
                        </Link>
                        <div className={`portal-item ${linkClassMobile("/contact")}`}
                             onClick={(e) => e.stopPropagation()}>
                            <div className={`${styles.container} `}>
                                {/* Overlay version */}
                                <Select<ThemeOptions>
                                    active={selectActive}
                                    onActiveChange={setSelectActive}
                                    width="80px"
                                    options={themeSettings.map(option => ({
                                        ...option,
                                        status: isOptionActive(option.id),
                                    }))}
                                    onSelect={handleThemeSettingSelect}
                                    placeholderText="Mode"
                                    selectedIcon={
                                        <Icon
                                            type="FontAwesome"
                                            icon={isDark ? faSun : faMoon}
                                        />
                                    }
                                    iconNoPlaceholder={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </OverlayPortal>

            <header className="fixed left-0 w-full z-50"
                    style={{ gridArea: 'navbar',
                             boxShadow: '0 4px 50px rgba(0,0,0,0.13)' }}>

                {/* Backdrop */}
                <div className="navbar-backdrop" aria-hidden></div>

                <nav className="navbar">
                    <div className="nav-brand">
                        <Link href="/" className="font-bold text-xl">
                            <Image
                                src='/Logo-dark.webp'
                                alt="MF Logo"
                                width={52}
                                height={52}
                                loading="eager"
                                priority
                                className="object-contain"
                            />
                        </Link>
                        <h1 style={{ fontSize: '1.1rem',
                                     margin: '5px 0px 0px 10px', }}>Portfolio Base</h1>
                    </div>

                    <ul className="navbar-list flex gap-10 list-none">
                        <li><Link href="/projects" className={`nav-link ${linkClass("/projects")}`}>Item</Link></li>
                        <li><Link href="/experience" className={`nav-link ${linkClass("/experience")}`}>Item</Link></li>
                        <li><Link href="/about" className={`nav-link ${linkClass("/about")}`}>Item</Link></li>
                    </ul>

                    <div className="nav-end">
                        {/* Action Button */}
                        {/* <button className="nav-cta cursor-pointer"
                                style={{ background: isDark ? ctaDark :
                                                                'linear-gradient(to bottom, hsl(208, 90%, 10%) 0%, hsl(208, 90%, 17%) 50%, hsl(208, 90%, 10%) 100%)',
                                            color: isDark ? ctaTextColor :  'rgba(255, 255, 255, 0.9)',
                                            boxShadow: isDark ? '0 2px 2px rgba(0, 0, 0, 0.7)' : '0 2px 15px rgba(0, 0, 0, 0.3)'  }}
                                onClick={() => setIsContactOpen(true) }>
                            <i className="nav-cta-icon bi bi-chat-right"></i>
                            <p className="nav-cta-text">Let’s talk</p>
                        </button> */}
                        <ul className="navbar-list flex gap-10 list-none">
                            <li>
                                <Select<ThemeOptions>
                                    active={selectActive}
                                    onActiveChange={setSelectActive}
                                    width="80px"
                                    options={themeSettings.map(option => ({
                                        ...option,
                                        status: isOptionActive(option.id),
                                    }))}
                                    onSelect={handleThemeSettingSelect}
                                    placeholderText="Mode"
                                    iconNoPlaceholder={true}
                                />

                            </li>

                        </ul>
                        {/* Burger */}
                        <button className="nav-burger"
                            onClick={() => setMenuOpen(!menuOpen)}>
                            {menuOpen ?
                                        <i className="bi bi-x" style={{ fontSize: '2rem', margin: 0, padding: 0 }}></i>
                                        :
                                        <i className="bi bi-list" style={{ padding: '0px 4px 0px 4px' }}></i>
                            }
                        </button>
                    </div>
                </nav>
            </header>

            <ContactModal
                isOpen={isContactOpen}
                onClosing={() => {
                    setIsContactOpen(false)
                }}
            />
        </>
    );
}