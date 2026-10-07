import { format } from 'date-fns';

export default function Footer() {
    const currentYear = format(new Date(), 'yyyy');

    return(
        <footer className="footer bg-[ #ededed]/60 backdrop-blur-md z-50"
                style={{ textAlign: 'center', fontSize: '0.9rem',
                         padding: '25.5px 0px 30px 0px',
                         boxShadow: '0 4px 70px rgba(0,0,0,0.1)',
                         marginTop: '0' }}>
            © {currentYear} Mariano Frias. All rights reserved.
        </footer>
    );
}
