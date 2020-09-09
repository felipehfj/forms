import React, { Fragment, FC, useState, useEffect } from 'react';
import { FaTrash, FaImage } from 'react-icons/fa';
import Modal from 'react-modal';
import ImageUploader from 'react-images-upload';

import './styles.css';
import image from '../../../assets/midia/images/camera.svg';

//import image from '../../../assets/midia/images/PeHeitor.jpg';
interface ImageElement {
    imgSrc?: string,
    onChange?: Function
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        minWidth: '400px',
        minHeight: '400px'
    }
};

const ImageElement: FC<ImageElement> = (props: ImageElement) => {
    const [show, setShow] = useState(false);
    const [picture, setPicture] = useState<File[]>([]);
    const [pictureUrl, setPictureUrl] = useState<string>("");    

    useEffect(() => {
        if (picture && picture.length > 0) {
            let url = URL.createObjectURL(picture[0]);
            setPictureUrl(url);
        }
    }, [picture])

    useEffect(() => {
        if (props.imgSrc) {
            setPictureUrl(props.imgSrc);
        }
    }, [props.imgSrc])

    useEffect(() => {
        if (pictureUrl) {
            if (props.onChange)
                props.onChange(pictureUrl);
        }
    }, [pictureUrl])

    const showModal = () => {
        setShow(show => true)
    }

    const closeModal = () => {
        setShow(show => false)
    }

    const onDrop = (picture: File[]) => {        
        setPicture(picture);
    }

    const removeImage = () => {
        setPictureUrl(url => "");
        setPicture([]);
        if (props.onChange)
            props.onChange("");
    }
    return (
        <Fragment>
            <div className="image-container">
                <img src={pictureUrl ? pictureUrl : image} alt="" style={pictureUrl ? {}:{width:200, height: 200}} />
                <div className="btn-container">
                    <button className="btn" onClick={() => removeImage()}><FaTrash /></button>
                    <button className="btn" onClick={() => showModal()}><FaImage /></button>
                </div>
            </div>


            <Modal
                isOpen={show}
                //onAfterOpen={afterOpenModal}
                ariaHideApp={false}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <ImageUploader
                    //withIcon                
                    onChange={(e) => { onDrop(e) }}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                    singleImage
                    withPreview
                    //label={"Escolha uma imagem"}
                    buttonText="Escolha uma imagem"
                    fileSizeError="Imagem é maior que o limite permitido"
                    fileTypeError="Arquivo não suportado"
                    label="Tamanho máximo permitido: 5MB."
                    fileContainerStyle={{ maxWidth: '300px', maxHeight: '300px' }}
                />
                <button type="button" className="btn btn-secondary" style={{width:"100%"}} onClick={closeModal}>ok</button>                
            </Modal>
        </Fragment>
    );
}

export default ImageElement;