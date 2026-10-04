import MainSectionProps from "@/types/MainSectionProps";

export default function MainSection({ children, minHeight = '1500px', centered, paddingBottom }: MainSectionProps ) {
    return(
        <div className={`main-section panel-background
                            ${centered ? 'centered-flex': ''}
                            ${paddingBottom ? 'pb-32': ''}`}
             style={{ marginTop: '22px', minHeight: minHeight, backdropFilter: 'blur(15px)' }}>
            { children }
        </div>
    )
}