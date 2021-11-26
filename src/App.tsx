/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import Popup from '@components/Popup';
import { useDispatch, useSelector } from 'react-redux';
import { selectPopup, selectWeather } from './store/store';
import { fetchWeatherData } from '@features/weatherSlice';
import { open, close } from '@features/popupSlice';
import Loader from '@components/Loader';
import { City } from '@components/City/City';
import styled from 'styled-components';


function App() {
  const weather = useSelector(selectWeather);
  const { active } = useSelector(selectPopup);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWeatherData(weather.city))
  }, [weather.city])

  const showPopup = () => {
    dispatch(open());
  };
  const closePopup = () => {
    dispatch(close());
  };

  return (
    <Wrapper>
      {weather.status === 'loading' && <Loader />}
      <Popup active={active} closePopup={closePopup} />
      {weather.status === 'success' && <City {...weather} openPopup={showPopup} />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 480px;
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  min-height: 480px;
`

export default App;
