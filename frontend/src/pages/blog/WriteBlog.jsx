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


const FormS = ({ data, close, setList }) => {
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

    const schema = yup.object().shape({
        title: yup.string().required("Vui lòng nhập"),
        description: yup.string().required("Vui lòng nhập"),
        image: yup.string().required("Vui lòng nhập")
    });

    const onSubmitForm = async (values) => {
        let response;
        console.log(values)
        response = await axios.post('http://localhost:4000/api/blog/update', values);
        setList(values)
        alert('Sửa bài viết thành công');
        close()
        return
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
                    validationSchema={schema}
                    onSubmit={onSubmitForm}
                    initialValues={data}
                >
                    {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
                        <Form noValidate onSubmit={handleSubmit} className="w-75 d-flex flex-column justify-content-center">

                            <Form.Group as='div' className="position-relative mb-5 cf-title-12">
                                <Form.Label className="w-100 text-center h1" >Sửa bài viết</Form.Label>
                            </Form.Group>

                            <Row>
                                <Form.Group className="position-relative mb-3">
                                    <Form.Label>Tiêu đề</Form.Label>

                                    <Form.Control name="title"
                                        required
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.title}
                                    />

                                </Form.Group>
                            </Row>


                            <Row>
                                <Form.Group className="position-relative mb-3">
                                    <Form.Label>Nội dung</Form.Label>

                                    <Form.Control name="description"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.description}
                                    />

                                </Form.Group>
                            </Row>

                            <Row>
                                <Form.Group className="position-relative mb-3">
                                    <Form.Label>Image URL</Form.Label>

                                    <Form.Control name="image"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.image}
                                    />

                                </Form.Group>
                            </Row>

                            <Form.Group className="position-relative mt-5 w-100 d-flex justify-content-center">
                                <button className="button-89" type="submit" onClick={handleSubmit}>Submit</button>
                            </Form.Group>

                        </Form>
                    )}
                </Formik>
            </motion.div>
        </motion.div>
    );
};

export default FormS;