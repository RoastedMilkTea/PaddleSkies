import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion";
import "./forecast.css";

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Forecast = ({ data }) => {
  const daysInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(daysInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, daysInAWeek));

  console.log(forecastDays);

  return (
    <>
      <label className="title">Daily</label>
      <Accordion allowZeroExpanded>
        {data.list.slice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className = "daily-item"> 
                  <img alt = "weather" className = "icon-small" src = {`weathericon/${item.weather[0].icon}.png`} />
                  <label className = "day">{forecastDays[idx]}</label>
                  <label className = "description">{item.weather[0].description}</label>
                  <label className = "min-max">{Math.round(item.main.temp_min)} °C / {Math.round(item.main.temp_max)} °C  </label> 

                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className = "daily-details-grid" >
                <div className = "daily-details-grid-item">
                  <label>Pressure</label>
                  <label>{item.main.pressure} hPa</label>
                </div>
                <div className = "daily-details-grid-item">
                    <label>Humidity</label>
                    <label>{item.main.humidity} %</label>
                </div>
                <div className = "daily-details-grid-item">
                    <label>Sea Level</label>
                    <label>{item.main.sea_level} m</label>
                </div>
                <div className = "daily-details-grid-item">
                    <label>Clouds</label>
                    <label>{item.clouds.all} %</label>
                </div>
                <div className = "daily-details-grid-item">
                    <label>Wild Speed:</label>
                    <label>{item.wind.speed} m/s</label>
                </div>
                <div className = "daily-details-grid-item">
                  <label>Rain</label>
                  <label>
                    {item.rain ? (
                      item.rain['1h'] ? `${item.rain['1h']} mm` :
                      item.rain['3h'] ? `${item.rain['3h']} mm` :
                    '0 mm'
                  ) : '0 mm'}
                  </label>
                </div>
                <div className = "daily-details-grid-item">
                  <label>Feels like</label>
                  <label>{Math.round(item.main.feels_like)} °C </label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;

