
// cost_of_living_index
// :
// Array(5)
// 0
// :
// {index: 97.8, year: "2015"}
// 1
// :
// {index: 97.8, year: "2013"}
// 2
// :
// {index: 98.4, year: "2011"}
// 3
// :
// {index: 98, year: "2012"}
// 4
// :
// {index: 97.7, year: "2014"}
// length
// :
// 5
// __proto__
// :
// Array(0)
// cost_of_living_rank
// :
// Array(5)
// 0
// :
// {rank: 86, year: "2012"}
// 1
// :
// {rank: 93, year: "2014"}
// 2
// :
// {rank: 91, year: "2013"}
// 3
// :
// {rank: 90, year: "2015"}
// 4
// :
// {rank: 82, year: "2011"}
// length

// violent_crime_data
// :
// crime_count
// :
// 2340
// crime_rate
// :
// 0.009011264080100126
// year
// :
// "2014"

import React, { Component } from 'react';
import { VictoryChart, VictoryBar, VictoryLine, VictoryTheme, VictoryAxis, VictoryTooltip, VictoryVoronoiContainer, VictoryLabel, VictoryLegend } from 'victory'

class CompareHistCOL extends Component {

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

    console.log(cities);

    let compareFn = (a, b) => {
      return parseInt(a.year) - parseInt(b.year); 
    };

    console.log(JSON.stringify(cities[0].cost_of_living_index.sort(compareFn).map((year) => year.year)));
    
    return (
      <div>
        <div style={{ width: `500px`, margin: `auto`, paddingTop: '20' }}>
          <div>
            <VictoryChart
              domainPadding={70}
              theme={VictoryTheme.greyscale}
              animate={{ duration: 500, easing: "bounce"}}
              padding={{ left: 70, right: 20, bottom: 50, top: 30 }}
              containerComponent={
                <VictoryVoronoiContainer
                />}
              >
              {/* <VictoryLabel 
                text={`Cost of Living Comparison: ${cities[0].city_name_short} vs. ${cities[1].city_name_short}`} 
                verticalAnchor={"end"}
                x={120}
                y={30}
                /> */}
              <VictoryLegend x={120} y={4}
                title={`Cost of Living Comparison`}
                centerTitle
                orientation="horizontal"
                // standalone
                style={{ border: { stroke: "black" }, title: { fontSize: 12 }, labels: { fontSize: 10 }}}
                data={[
                  { name: cities[0].city_name_short, symbol: { fill: "tomato"} },
                  { name: cities[1].city_name_short, symbol: { fill: "blue" } },
                ]}
              />
              <VictoryAxis
                tickValues={cities[0].cost_of_living_index.sort(compareFn).map((year) => year.year)}
                label={"Year"}
                />
              <VictoryAxis
                tickLabelComponent={<VictoryLabel textAnchor="start" x={34} />}
                axisLabelComponent={<VictoryLabel dy={-22} />}
                dependentAxis
                tickFormat={(y) => {
                  return `${y}`;
                }}
                fixLabelOverlap={true}
                label={"Cost of Living"}
                style={{
                  tickLabels: {
                    fontSize: 12,
                    fill: "black",
                  },
                }}
              />
              {/* <VictoryBar
                alignment={"middle"}
                barRatio={.7}
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
                    crimes: city.violent_crime_data.crime_rate * 1000, 
                    label: `Violent Crimes/1000 Residents: ${city.violent_crime_data.crime_rate * 1000}`
                  } 
                })}
                x={"city"}
                y={"crimes"}
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
              /> */}
              {cities.map((city, idx) => {
                return (
                  <VictoryLine 
                    data={city.cost_of_living_index.sort(compareFn).map((year) => ({ year: year.year, colIndex: year.index}))}
                    x={"year"}
                    y={"colIndex"}
                    labels={(datum) => datum.y}
                    labelComponent={<VictoryLabel dy={-3}/>}
                    style={{
                      data: { stroke:  idx === 0 ? 'tomato' : 'blue'},
                      parent: { border: "1px solid #ccc"}
                    }}
                  />
                );
              })}
            </VictoryChart>
          </div>
        </div>
      </div>
    );
  }
}

export default CompareHistCOL;


//${typeof city.rent_cost === 'string' ? `$${city.rent_cost.slice(0, city.rent_cost.length-3)}` : `$${Math.floor(city.rent_cost)}