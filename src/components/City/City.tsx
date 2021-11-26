import { Partly, Cloud, Fog, Sunny, Begin } from '@images/index';
import { WeatherState } from '@features/weatherSlice';
import styled from 'styled-components';
import Night from "../../images/figure1.svg";
import Day from "../../images/figure2.svg";

interface Props {
    openPopup: () => void;
}

export const City = (props: Props & WeatherState) => {
    const { city, description, observationTime, temperature, isDay, properties, openPopup } = props;
    const containerClass = isDay === "yes" ? true : false;


    const getImage = (description: any) => {
        const value = description.toLowerCase();

        switch (value) {
            case "partly cloudy":
                return Partly;
            case "cloud":
                return Cloud;
            case "fog":
                return Fog;
            case "sunny":
                return Sunny;
            default:
                return Begin;
        }
    };

    const renderProperty = (properties: any) => {
        return Object.values(properties)
            .map(({ title, value, icon }: any) => {
                return (
                    <div key={title} className="property">
                        <div className="property-icon">
                            <img src={`icons/${icon}`} alt="" />
                        </div>
                        <div className="property-info">
                            <div className="property-info__value">{value}</div>
                            <div className="property-info__description">{title}</div>
                        </div>
                    </div>)
            });
    };

    return (
        <Wrapper isDay={containerClass}>
            <div className="top">
                <div className="city">
                    <div className="city-subtitle">Weather Today in</div>
                    <div className="city-title" onClick={openPopup}>
                        <span>{city}</span>
                    </div>
                </div>
                <div className="city-info">
                    <div className="top-left">
                        <img className="icon" src={getImage(description)} alt="" />
                        <div className="description">{description.split(', ')}</div>
                    </div>

                    <div className="top-right">
                        <div className="city-info__subtitle">as of {observationTime}</div>
                        <div className="city-info__title">{temperature}°</div>
                    </div>
                </div>
            </div>
            <Properties>{renderProperty(properties)}</Properties>
        </Wrapper>
    )
}
interface WrapperProps {
    isDay: boolean;
}

const Wrapper = styled.div<WrapperProps>`
    &:before {
        content: "";
        display: block;
        background: url(${props => props.isDay ? Day : Night}) no-repeat center / cover;
        width: 100%;
        height: 52%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
    }
        
    .top {
        position: relative;
        padding: 18px;
    }
    
    .city-info {
        display: flex;
        justify-content: space-between;
    }
    
    .top-left {
        max-width: 60%;
    }
    
    .city {
        width: max-content;
    }
    
    .city-subtitle {
        font-size: 15px;
        line-height: 18px;
        color: #ffffff;
    }
    
    .city-title {
        background: #8781c5;
        border-radius: 8px;
        font-weight: 700;
        font-size: 35px;
        line-height: 41px;
        color: #ffffff;
        padding: 1px 8px;
        margin-top: 6px;
        cursor: pointer;
        width: max-content;
    }
    
    .city-info {
        margin-top: 28px;
    }
    
    .city-info__subtitle {
        font-size: 13px;
        line-height: 15px;
        color: #ffffff;
    }
    
    .city-info__title {
        font-weight: 500;
        font-size: 53px;
        line-height: 77px;
        color: #ffffff;
    }
    
    .description {
        font-weight: 500;
        font-size: 20px;
        line-height: 36px;
        color: #ffffff;
    }
    
    .top-right {
        text-align: right;
    }
`;

const Properties = styled.div`
    position: relative;
    z-index: 1;
    padding: 18px;
    margin-top: 32px;
    display: flex;
    flex-wrap: wrap;
    row-gap: 20px;
    justify-content: space-between;

    
    .property {
        width: 50%;
        display: flex;
        align-items: center;
    }
    
    .property-icon {
        width: 30px;
        margin-right: 6px;
    }
    
    .property-info__value {
        font-weight: 700;
        font-size: 16px;
        line-height: 18px;
        color: #000000;
    }
    
    .property-info__description {
        font-weight: 300;
        font-size: 12px;
        line-height: 12px;
        text-transform: uppercase;
        color: #6b6b6b;
        margin-top: 3px;
    }
`
