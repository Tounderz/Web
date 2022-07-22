import React, { useContext } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { removeType } from '../../../http/typeApi';
import { useInput } from '../../../http/validateApi';
import { Context } from '../../../index';

const RemoveType = ({show, onHide}) => {
    const {product} = useContext(Context)
    const typeId = useInput(0)

    const click = async () => {
        await removeType(typeId.value);
            typeId.onChange(0);
            onHide();
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Remove a Type
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {(typeId.isDirty && typeId.isNumberError) && <div className='mt-3' style={{color: 'red'}}>{typeId.messageError}</div>}
                <Form.Select
                    className='mt-3'
                    onChange={e => typeId.onChange(e)}
                    onBlur={e => typeId.onBlur(e)}
                >
                    <option value=''>
                        Select a type
                    </option>
                    {product.types.map(type => (
                        <option
                            value={type.id}
                            key={type.id}
                        >
                            {type.name}
                        </option>
                    ))}
                </Form.Select>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className="btn-primary m-2"
                    variant={'outline-success'}
                    style={{
                        cursor: 'pointer',
                        borderRadius: '5px'
                    }}
                    disabled={!typeId.inputValid}
                    onClick={click}
                >
                    Remove
                </button>
                <button 
                    className="btn-danger"
                    variant={'outline-success'}
                    style={{
                        cursor: 'pointer',
                        borderRadius: '5px'
                    }}
                    onClick={onHide}
                >
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default RemoveType;