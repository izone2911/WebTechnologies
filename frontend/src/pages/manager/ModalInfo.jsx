import React, { useMemo } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import * as formik from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { IoCloseCircleOutline } from "react-icons/io5";
import moment from 'moment'
import './ModalInfo.css'


const FormS = ({ data, close }) => {
    console.log(data)
    const variants = {
        open: { backgroundColor: "rgba(0,0,0,0.6)" },
        closed: { backgroundColor: "rgba(0,0,0,0)" },
    };
    const modalVariants = {
        open: {
            opacity: 1,
            transition: { staggerChildren: 0.5, delayChildren: 0.2 },
        },
        closed: { opacity: 0 },
    };

    const { Formik } = formik;
    const onSubmitForm = (values) => {
        console.log("submit")
    }

    return (
        <motion.div className="overlay" key="overlay"
            variants={variants} initial={"closed"}
            onClick={close} animate={"open"} exit={"closed"}
        >
            <motion.div className="modal" variants={modalVariants} onClick={(e) => e.stopPropagation()} >

                <motion.button className="modal__close-wrapper" whileHover={{ scale: 1.2 }} onClick={close} >
                    <IoCloseCircleOutline className="modal__close-icon" />
                </motion.button>

                <Formik
                    onSubmit={onSubmitForm}
                    initialValues={data}
                >
                    {({ handleChange, handleBlur, values, touched, errors }) => (
                        <Form noValidate onSubmit={(e) => close()} className="w-75 d-flex flex-column justify-content-center">
                            <Form.Group as='div' className="position-relative mb-5 cf-title-12">
                                <Form.Label className="w-100 text-center h1" >Chi tiết tài khoản</Form.Label>
                            </Form.Group>

                            <Row>
                                <Form.Group className="position-relative mb-3">
                                    <Form.Label>Email</Form.Label>

                                    <Form.Control name="email"
                                        type="text"
                                        disabled
                                        value={values.email}
                                    />
                                </Form.Group>

                                <Form.Group className="position-relative mb-3">
                                    <Form.Label>Tên người dùng</Form.Label>

                                    <Form.Control name="name"
                                        type="text"
                                        disabled
                                        value={values.name}
                                    />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className="position-relative mb-3">
                                    <Form.Label>Vai trò</Form.Label>

                                    <Form.Control name="role"
                                        type="text"
                                        disabled
                                        value={values.role}
                                    />
                                </Form.Group>

                                <Form.Group className="position-relative mb-3">
                                    <Form.Label>Giới tính</Form.Label>

                                    <Form.Control name="gender"
                                        type="text"
                                        disabled
                                        value={values.gender}
                                    />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className="position-relative mb-3">
                                    <Form.Label>Ngày sinh</Form.Label>

                                    <Form.Control name="birthDay"
                                        type="text"
                                        disabled
                                        value={values.birthday}
                                    />
                                </Form.Group>

                                <Form.Group className="position-relative mb-3">
                                    <Form.Label>Số điện thoại</Form.Label>

                                    <Form.Control name="phone"
                                        type="text"
                                        disabled
                                        value={values.phone}
                                    />
                                </Form.Group>
                            </Row>
                        </Form>
                    )}
                </Formik>
            </motion.div>
        </motion.div>
    );
};

export default FormS;