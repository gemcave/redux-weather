import { useRef } from "react";
import Input from "@components/UI/Input";
import { useDispatch, useSelector } from "react-redux";
import { selectWeather } from "@store/store";
import { setCity } from "@features/weatherSlice";
import styled from "styled-components";

interface Props {
    active: boolean | undefined;
    closePopup: () => void;
}


export const Popup = ({ active, closePopup }: Props) => {
    const { city } = useSelector(selectWeather);
    const cityInputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null)
    const dispatch = useDispatch();

    const input = {
        id: 'city',
        type: 'text',
        className: "form-input",
        placeholder: city
    }

    const submitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();

        const enteredCity = cityInputRef.current?.value;

        if (enteredCity && enteredCity?.length < 1) {
            return;
        }

        dispatch(setCity(enteredCity));
        formRef.current?.reset();
        closePopup();
    }

    return (
        <StyledPopup active={active}>
            <Form onSubmit={submitHandler} ref={formRef}>
                <FormGroup>
                    <Input
                        ref={cityInputRef}
                        input={input}
                        required
                    />
                    <SubmitButton type="submit" className="form-submit">
                        OK
                    </SubmitButton>
                </FormGroup>
            </Form>

            <PopupClose onClick={closePopup}>
                <span></span>
            </PopupClose>
        </StyledPopup>
    )
}


const Form = styled.form`
    width: 100%;
`

const FormGroup = styled.div`
    display: flex;
    padding: 0 15px;
    justify-content: space-between;
`


const SubmitButton = styled.button`
    background: #000;
    color: #fff;
    width: 18%;
    cursor: pointer;
    border: none;
    border-radius: 8px;
    outline: none;
`
interface PopupProps {
    active: boolean | undefined;
}

const StyledPopup = styled.div<PopupProps>`
    position: fixed;
    left: 0;
    top: 0;
    width: 480px;
    transform: translateX(-200%);
    background: #8781c5;
    border-radius: 4px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease-in-out;
    z-index: 9;
    transform: ${(props) => props.active ? "translateX(0)" : ""};
`

const PopupClose = styled.div`
    position: absolute;
    top: 20px;
    right: 15px;
    cursor: pointer;
    width: 22px;
    height: 22px;
    
    & span {
        display: block;
        margin-top: 10px;
        width: 22px;
        height: 2px;
        background: #fff;
        transform: rotate(45deg);
        position: relative;
    }

    & span:after {
        content: "";
        display: block;
        width: 22px;
        height: 2px;
        background: #fff;
        transform: rotate(-90deg);
        position: absolute;
        top: 0;
        left: 0;
    }
`