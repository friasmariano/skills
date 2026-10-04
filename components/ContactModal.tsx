'use client'

import Modal from "./Modal"
import { useBreakpoint } from "@/hooks/useBreakpoint";
import EnvelopeIcon from '@/components/EnvelopIcon';
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { useFormik } from "formik";
import * as Yup from 'yup';
import Image from "next/image";
import ContactCardModalProps from "@/types/ContactModalProps";
import { setToast } from "@/lib/features/toast/store/toast-slice";

export default function ContactModal({ isOpen, onClosing }: ContactCardModalProps) {
    const breakpoint = useBreakpoint();
    const isDark = useAppSelector((state) => state.theme.data.isDark);

    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            message: '',
            subject: "Let's talk!",
        },
        validationSchema: Yup.object({
            name: Yup.string()
            .required('Name is required')
            .min(3, 'Name must be at least 3 characters long')
            .max(50, 'Name must be at most 50 characters long'),

            email: Yup.string()
            .required('Email is required')
            .email('Please enter a valid email address'),
            message: Yup.string()
                .required('Message is required')
                .min(10, 'Message must be at least 10 characters'),
            subject: Yup.string()
                .required('Subject is required')
                .min(3, 'Subject must be at least 3 characters')
                .max(100, 'Subject must be at most 100 characters'),
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values)
                })

                if (!response.ok) {
                    dispatch(setToast({ message: "Failed to send message. Please try again later.", type: "error" }));

                    return;
                }

                dispatch(setToast({ message: 'Message sent successfully!', type: 'success' }));

                onClosing();
            } catch (err) {
                console.error(err);
                dispatch(setToast({ message: 'Something went wrong.', type: 'error' }));
            } finally {
                setSubmitting(false);
                resetForm();
            }
        },
    });

    return(
        <Modal
            isOpen={isOpen}
            onClose={onClosing}
            title='Get in touch'
            hasButtons={true}
            size='full'
            onSave={formik.handleSubmit}
            savingButtonText="Send"
            hasCancelButton={false}
            isSaving={formik.isSubmitting}
            savingDisabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
            saveButtonSubmittingText="Sending...">

        <form style={{ display: 'flex', flexDirection: 'column', width: '100%'}}>
            {/* User Data + Header */}
            <div style={{ display: 'flex',
                        flexDirection: breakpoint === 'mobile' ? 'column' : 'row',
                        justifyContent: 'left',
                        alignItems: 'left',
                        width: '100%',
                        minHeight: '200px !important',
                        margin: '30px 0px 0px 0px',
                        padding: `${breakpoint === 'mobile' ? '35px' : '0px'} 0px 50px 0px`,
                        flexWrap: breakpoint === 'mobile' ? 'wrap' : 'nowrap' }}>
                {/* Folder & Icon */}
                {breakpoint !== 'mobile' &&  (<div style={{ padding: '48px 30px 0px 50px' }}>
                    <EnvelopeIcon
                        title=""
                        fillIcons={true}
                        allowHoverEffect={false}
                    />
                </div>)}

                {/* Fields + info */}
                <div style={{ display: 'flex',
                            flexDirection: 'column',
                            padding: `${breakpoint === 'mobile' ? '0px' : '44.5px' } 0px 0px 10px`,
                            width: '100%',
                            borderLeft: breakpoint === 'mobile' ? 'none'
                                        : isDark ? '1px solid rgba(255, 255, 255, 0.3)'
                                        : '1px solid rgba(24, 83, 102, 0.2)' }}>


                    <div style={{ display: 'flex',
                                justifyContent: 'space-between',
                                margin: '0px 0px 0px 0px',
                                width: '100%',
                                height: '100px',
                                padding: '0px 0px 0px 30px', }}>

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>

                                {/* Name */}
                                <div className="mt-2" style={{display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'center' }}>
                                    <label className="text-xl font-semibold" htmlFor="name">Name</label>
                                    <input id="name" type="text" className="customInput" {...formik.getFieldProps("name")} />
                                    {formik.touched.name && formik.errors.name && (
                                        <p className={`text-sm ${isDark ? "text-red-400" : "text-red-500"}`}>{formik.errors.name}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div style={{display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'center',
                                            margin: '13px 0px 20px 0px' }}>
                                    <label className="text-xl font-semibold" htmlFor="email">Email</label>
                                    <input id="email" type="email" className="customInput" {...formik.getFieldProps("email")} />
                                    {formik.touched.email && formik.errors.email && (
                                    <p className={`text-sm ${isDark ? "text-red-400" : "text-red-500"}`}>{formik.errors.email}</p>
                                    )}
                                </div>
                            </div>
                    </div>
                </div>
            </div>

            {/* TextArea */}
            <div style={{  display: 'flex',
                            width: '100%',
                            height: '50vh',
                            alignItems: 'center',
                            flexDirection: 'column',
                            justifyContent: 'center',}}>

                            <div
                                className="white-bg"
                                style={{
                                    width: '100%',
                                    borderRadius: '0px',
                                    color: 'var(--text)',
                                    padding: '10px 20px 10px 20px',
                                    fontSize: '0.95rem',
                                    lineHeight: '1.4',
                                    maxHeight: '60px',
                                }}>
                                    <div
                                        className="text-medium"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            maxHeight: '45px',
                                            overflowY: 'auto',
                                            width: '100%',
                                        }}>
                                        <div style={{ whiteSpace: 'nowrap' }}>
                                            <Image
                                                src='/Lightbulb.webp'
                                                alt="Profile Picture"
                                                width={25}
                                                height={25}
                                                priority
                                                style={{ objectFit: 'contain' }} />
                                        </div>
                                        <p style={{ marginLeft: '8px' }}>
                                            <span style={{ fontWeight:'600' }}>Tip</span>: Feel free to share as much detail as you want — context helps a lot
                                        </p>
                                    </div>
                            </div>
                <textarea className="mb-3"
                        id="message"
                        name="message"
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Write your message here…"
                        style={{
                            width: '100%',
                            height: '100%',
                            padding: '42px 85px 20px 73px',
                            textAlign: 'justify',
                            marginBottom: '12px',
                            userSelect: 'none',
                            outline: 'none'
                        }}
                />

                {formik.touched.message && formik.errors.message && (
                    <p className={`text-sm mt-2 mb-3 ${isDark ? "text-red-400" : "text-red-500"}`}>
                        {formik.errors.message}
                    </p>
                )}
            </div>
        </form>

    {/* End of form */}

    </Modal>
    )
}