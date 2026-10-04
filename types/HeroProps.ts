
export default interface HeroProps {
    title: string;
    subtitle: string;
    imageSrc: string;
    imageAlt: string;
    imageSize?: number;
    marginT?: string | number;
    translateY?: string;
    imageMode?: 'cover' | 'contain';
    headerTranslateY?: string;
}