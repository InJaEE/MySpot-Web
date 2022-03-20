import React, { FC, useState, useMemo } from 'react';
import { useParams } from 'react-router';
import { useMutation } from 'react-query';

import { Container, Title } from './styles';
import { checkPrivateCode } from 'src/api/map';
import { useMapAccessible } from 'src/atoms';
import Modal from 'src/components/Modal';
import Button from 'src/components/Button';
import Input from 'src/components/Input';

const PrivateCodeModal: FC = () => {
    const { mapId } = useParams<{ mapId: string }>();
    const [inputValue, setInputValue] = useState('');

    const { setMapAccessible } = useMapAccessible();

    const isButtonDisabled = useMemo(() => !(Number(inputValue) && inputValue.length === 4), [inputValue]);

    const { mutate: fetchCheckPrivateCode } = useMutation(() => checkPrivateCode({ mapId: Number(mapId) }, { code: inputValue }), {
        onSuccess: accessible => {
            if (!accessible) {
                alert('잘못된 입력입니다.');
            }

            setMapAccessible(accessible);
        }
    });

    return (
        <Modal>
            <Container>
                <Title>접근이 제한되어 있는 지도</Title>
                <Input
                    maxLength={4}
                    placeholder='보안코드를 입력해주세요.'
                    style={{ margin: '1.25rem' }}
                    value={inputValue}
                    autoFocus
                    onChange={event => setInputValue(event.target.value)}
                    onEnterPress={() => !isButtonDisabled && fetchCheckPrivateCode()}
                />
                <Button disabled={isButtonDisabled} type='primary' onClick={() => fetchCheckPrivateCode()}>
                    입력완료
                </Button>
            </Container>
        </Modal>
    );
};

export default PrivateCodeModal;
