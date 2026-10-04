
export default interface ContactCardProps {
    action: ()=> void;
    imageSrc: string;
    title: string;
    tagline: string;
    cardClass?: string;
}