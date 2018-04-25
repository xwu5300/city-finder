import React, { Component } from 'react';
import { VictoryChart, VictoryBar, VictoryStack, VictoryTheme, VictoryAxis, VictoryTooltip, VictoryVoronoiContainer, VictoryLabel } from 'victory'

class CompareRentBar extends Component {

  //    data format
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
  //    ]

  render() {
    let cities = this.props.cities;
    return (
      <div>
        <div style={{ width: `500px`, margin: `auto`, paddingTop: '20' }}>
          <div>
            <VictoryChart
              domainPadding={40}
              theme={VictoryTheme.material}
              animate={{ duration: 500, easing: "bounce"}}
              padding={{ left: 60, right: 20, bottom: 50, top: 50 }}
              containerComponent={
                <VictoryVoronoiContainer
                />}
              >
              <VictoryLabel 
                text={`Rent Comparison: ${cities[0].city_name_short} vs. ${cities[1].city_name_short}`} 
                verticalAnchor={"end"}
                x={80}
                y={30}
                />
              <VictoryAxis
                tickValues={cities.map((city) => city.city_name_short)}
                label={"Cities"}
                />
              <VictoryAxis
                tickLabelComponent={<VictoryLabel textAnchor="start" x={4} />}
                dependentAxis
                tickFormat={(y) => {
                  return `$${y}`;
                }}
                fixLabelOverlap={true}
                label={"Median Rent"}
                style={{ 
                  tickLabels: { 
                    fontSize: 10, 
                    fill: "green", 
                  }, 
                }}
                />
              <VictoryBar
                alignment={"middle"}
                barRatio={.8}
                labelComponent={
                  <VictoryTooltip
                    cornerRadius={(d) => d.x > 6 ? 0 : 20}
                    pointerLength={(d) => d.y > 0 ? 5 : 20}
                    flyoutStyle={{
                      stroke: (d) => d.x === 10 ?
                        "tomato" : "black",
                    }}
                    dy={-60}
                  />}
                data={cities.map((city) => { 
                  return { 
                    city: city.city_name_short, 
                    rent: typeof city.rent_cost === 'string' ? Math.floor(city.rent_cost.replace(/[,\s]/,"")) : city.rent_cost, 
                    label: `Rent: ${typeof city.rent_cost === 'string' ? `$${city.rent_cost.slice(0, city.rent_cost.length-3)}` : `$${Math.floor(city.rent_cost)}`}`
                  } 
                })}
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
                // size={(datum, active) => active ? 5 : 3}
              />
            </VictoryChart>
          </div>
        </div>
      </div>
    );
  }
}

export default CompareRentBar;
