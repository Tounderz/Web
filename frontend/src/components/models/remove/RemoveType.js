import React, { useContext } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { removeType } from '../../../http/typeApi';
import { useInput } from '../../../http/validateApi';
import { Context } from '../../../index';

const RemoveType = ({show, onHide}) => {
    const {product} = useContext(Context)
    const typeId = useInput(0, {isNumberId: {name: 'Type'}})

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
                {(typeId.isDirty && typeId.isNumberError) && <div className='m-1' style={{color: 'red'}}>{typeId.messageError}</div>}
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
                <Button
                    variant='outline-primary'
                    style={{
                        cursor: 'pointer',
                        borderRadius: '5px',
                        margin: '2px'
                    }}
                    disabled={!typeId.inputValid}
                    onClick={click}
                >
                    Remove
                </Button>
                <Button 
                    variant='outline-danger'
                    style={{
                        cursor: 'pointer',
                        borderRadius: '5px',
                        margin: '2px'
                    }}
                    onClick={onHide}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RemoveType;