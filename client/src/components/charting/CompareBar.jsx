import React, { Component } from 'react';
import { VictoryChart, VictoryBar, VictoryStack, VictoryTheme, VictoryAxis, VictoryTooltip, VictoryVoronoiContainer } from 'victory'

class CompareBar extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     cities: [
  //       { avg_high_temp: 55,
  //         avg_rent_index: 48.4,
  //         by_lake: "FALSE",
  //         by_mountains: "FALSE",
  //         by_ocean: "FALSE",
  //         city_name_long: "Minneapolis-St. Paul-Bloomington, MN-WI Metro Area",
  //         city_name_short: "Minneapolis",
  //         city_size: "medium",
  //         climate: "cold",
  //         id: 16,
  //         image_url: "https://www.sixt.com/fileadmin/files/global/user_upload/pictures-city-page/minneapolis-citypage-new-03.jpg",
  //         population: 3600618,
  //         region: "Midwest",
  //         rent: "medium",
  //         rent_cost: "1,217.11",
  //         state: "MN",
  //         yahoo_weather_id: 2452078,
  //         zip_code: 10001,
  //         _id: "5ace7e1e95a24220f04467dd"},
  //       {
  //         avg_high_temp: 72,
  //         avg_rent_index: 80.4,
  //         by_lake: "FALSE",
  //         by_mountains: "FALSE",
  //         by_ocean: "FALSE",
  //         city_name_long: "New York, New York, Metro New York Area",
  //         city_name_short: "New York",
  //         city_size: "large",
  //         climate: "temperate",
  //         id: 26,
  //         image_url: "https://www.sixt.com/fileadmin/files/global/user_upload/pictures-city-page/minneapolis-citypage-new-03.jpg",
  //         population: 3600618,
  //         region: "Northeast",
  //         rent: "high",
  //         rent_cost: "3,217.11",
  //         state: "NY",
  //         yahoo_weather_id: 2452078,
  //         zip_code: 10001,
  //         _id: "5ace7e1e95a24220f04467dd",
  //       }
  //     ]
  //   };
  // }

  render() {
    let cities = this.props.cities;

    return (
      <div>
        <div style={{ width: `500px`, margin: `auto`, paddingTop: '20' }}>
          <div>
            <VictoryChart
              domainPadding={20}
              theme={VictoryTheme.material}
              animate={{ duration: 500, easing: "bounce"}}
              containerComponent={<VictoryVoronoiContainer/>}
              >
              <VictoryAxis
                tickValues={cities.map((city) => city.city_name_short)}
                tickFormat={(x) => {
                  return '';
                }}
                label={"Cities"}
                />
              <VictoryAxis
                dependentAxis
                tickFormat={(y) => {
                  return `$${y}`;
                }}
                fixLabelOverlap={true}
                label={"Median Rent"}
              />
              <VictoryBar
                barRatio={0.8}
                labelComponent={
                  <VictoryTooltip
                    cornerRadius={(d) => d.x > 6 ? 0 : 20}
                    pointerLength={(d) => d.y > 0 ? 5 : 20}
                    flyoutStyle={{
                      stroke: (d) => d.x === 10 ?
                        "tomato" : "black"
                    }}
                  />}
                data={cities.map((city) => { return { city: city.city_name_short, rent: typeof city.rent_cost === 'string' ? Math.floor(city.rent_cost.replace(/[,\s]/,"")) : city.rent_cost, label: `${city.city_name_short}`} })}
                x={"city"}
                y={"rent"}
                animate={{
                  onExit: {
                    duration: 100,
                    before: () => ({ opacity: 0.3, _y: 0 })
                  },
                  onEnter: {
                    duration: 100,
                    before: () => ({ opacity: 0.3, _y: 0 }),
                    after: (datum) => ({ opacity: 1, _y: datum._y })
                  }
                }}
                style={{
                  data: {fill: "tomato"}, labels: {fill: "tomato"}
                }}
                size={(datum, active) => active ? 5 : 3}
              />
            </VictoryChart>
          </div>
        </div>
      </div>
    );
  }
}

export default CompareBar;
