import React, { useContext } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { removeType } from '../../../http/typeApi';
import { useInput } from '../../../http/validateApi';
import { Context } from '../../../index';
import '../../../css/remove/RemoveType.css'

const RemoveType = ({show, onHide}) => {
    const {type} = useContext(Context);
    const typeId = useInput(0, {isNumberId: {name: 'Type'}});

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
                <Modal.Title 
                    id='contained-modal-title-vcenter'
                >
                    Remove a Type
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {(typeId.isDirty && typeId.isNumberError) && 
                    <div className='error-message'>
                        {typeId.messageError}
                    </div>}
                <Form.Select
                    className='form-type-remove'
                    onChange={e => typeId.onChange(e)}
                    onBlur={e => typeId.onBlur(e)}
                >
                    <option value=''>
                        Select a type
                    </option>
                    {type.types.map(type => (
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
                    className='button-type-remove'
                    variant='outline-primary'
                    disabled={!typeId.inputValid}
                    onClick={click}
                >
                    Remove
                </Button>
                <Button 
                    className='button-type-remove'
                    variant='outline-danger'
                    onClick={onHide}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RemoveType;